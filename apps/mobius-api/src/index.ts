import { env } from './config/env';
import { Server } from './common/server';
import { initLogger } from './common/log';
import { DEFAULT_LOG_LEVEL_DEV, DEFAULT_LOG_LEVEL_PROD, DEFAULT_LOG_PATH } from './config/constant';
import { controllers } from './controllers';
import { initDbPools, DbEngine } from './common/db';

// logger
initLogger({ path: DEFAULT_LOG_PATH, level: env.isDev ? DEFAULT_LOG_LEVEL_DEV : DEFAULT_LOG_LEVEL_PROD });

// database
initDbPools([
    {
        name: 'sqlite',
        engine: DbEngine.SQLITE,
        master: true,
        filename: env.sqlite_path,
        queryTimeout: 60_000,
    },
]);

// server
class ApiServer extends Server {}
const server = new ApiServer();
server.init();
server.registRouters(controllers);
server.registMiddlewares();
server.start(env.port);
