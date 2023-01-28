import { env } from './config/env';
import { dbcfg } from './database/dbcfg';
import { Server } from './common/server';
import { initLogger } from './common/log';
import { DEFAULT_LOG_LEVEL_DEV, DEFAULT_LOG_LEVEL_PROD, DEFAULT_LOG_PATH } from './config/constant';
import { controllers } from './controllers';
import { initDbPools } from './common/db';

// logger
initLogger({ path: DEFAULT_LOG_PATH, level: env.isDev ? DEFAULT_LOG_LEVEL_DEV : DEFAULT_LOG_LEVEL_PROD });

// database
initDbPools(dbcfg);

// server
class ApiServer extends Server {}
const server = new ApiServer();
server.init();
server.registRouters(controllers);
server.registMiddlewares();
server.start(env.port);
