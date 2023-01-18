import { RequestCtx, Service, ServiceDefault } from '../common/server';

export class LoginService extends ServiceDefault implements Service {
    execute = async (ctx: RequestCtx) => {
        const { logger, rawdata, jsondata } = ctx;
        logger.info('rawdata: %s', rawdata, jsondata);
        ctx.body = 'hello world';
    };
}
