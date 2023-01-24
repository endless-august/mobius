import Koa from 'koa';
import Router from '@koa/router';
import { koaBody } from 'koa-body';
import { getLogger, Logger } from 'log4js';
import { v4 as uuidv4 } from 'uuid';
import { forEach, isUndefined } from 'lodash';
import { getIp } from './utils';

export declare type RequestCtx = Koa.Context & {
    traceId: string;
    logger: Logger;
    rawdata: object;
    jsondata: object;
};

export class ServiceDefault {
    public reqtype = 'json';
}

export interface Service extends ServiceDefault {
    execute: (ctx: RequestCtx) => Promise<void>;
}

export interface Controller {
    path: string;
    service: Service;
}

export class Server {
    private app: Koa;
    private router: Router;
    private isReady = false;

    constructor() {
        const app = new Koa();
        const router = new Router();

        // trace id & logger
        app.use(async (ctx: RequestCtx, next) => {
            ctx.traceId = ctx.get('X-Request-Id') ?? uuidv4();
            if (isUndefined(ctx.logger)) ctx.logger = getLogger(ctx.traceId);

            // logger context
            const { url, req, path, traceId, logger } = ctx;
            logger.addContext('ip', getIp(req));
            logger.addContext('trace', traceId);
            logger.addContext('path', path);

            // response time
            logger.info(url, getIp(req));
            const startTime = Date.now();
            await next();
            const endTime = Date.now();
            logger.info('cost time: %dms', endTime - startTime);
        });

        this.app = app;
        this.router = router;
    }

    init = (): void => {
        this.isReady = true;
    };

    registRouters = (controllers: Controller[]): void => {
        const { router, app, isReady } = this;
        forEach(controllers, c =>
            router.post(
                c.path,
                koaBody(),
                async (ctx: RequestCtx, next) => {
                    if (!isReady) return;
                    ctx.rawdata = ctx.request.body;
                    if (c.service.reqtype === 'json') ctx.jsondata = ctx.request.body;
                    await next();
                },
                c.service.execute,
            ),
        );
        app.use(router.routes());
    };

    registMiddlewares = (): void => {
        const { app } = this;
        app.use(async (ctx: RequestCtx) => {
            const { logger, method, path } = ctx;
            logger.warn('Unsupport request: ', method, path);
        });
    };

    start = (port: number): void => {
        const { app } = this;
        app.listen(port);
        getLogger().info('server started');
    };
}
