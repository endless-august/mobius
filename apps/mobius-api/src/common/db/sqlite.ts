import sqlite from 'better-sqlite3';
import { isUndefined } from 'lodash';
import { getLogger, Logger } from 'log4js';
import { DbSqliteConfig } from './index';

export class DbSqlite {
    config: DbSqliteConfig;
    db: sqlite.Database | undefined;
    logger: Logger;

    constructor(config: DbSqliteConfig) {
        this.logger = getLogger(config.name);
        this.config = config;
        this.connect();
    }

    connect = (): boolean => {
        if (!isUndefined(this.db) && this.db.open) return true;

        // connect / reconnect
        const { config, logger } = this;
        const options = {
            readonly: config.readonly ?? false,
            timeout: config.queryTimeout ?? 5_000,
        };
        try {
            logger.info(`[${config.name}] ${isUndefined(this.db) ? 'connecting' : 'reconnecting'}...`);
            this.db = sqlite(config.filename, options);
            if (this.db.open) {
                logger.info(`[${config.name}] connected`);
                return true;
            }
            logger.error(`[${config.name}] connect failed`);
        } catch (e) {
            logger.error(`[${config.name}] connect failed: ${e}`);
        }
        return false;
    };
}
