import sqlite from 'better-sqlite3';
import { forEach, isArray, isUndefined, lowerCase, trim } from 'lodash';
import { Logger } from 'log4js';
import { DbColumn, DbConfigSqlite, DbIndex } from '../index';
import { DbEngine } from '../index';

export class DbSqlite implements DbEngine {
    config: DbConfigSqlite;
    dbConnection: sqlite.Database | undefined;
    logger: Logger;

    constructor(config: DbConfigSqlite, logger: Logger) {
        this.logger = logger;
        this.config = config;
    }

    connect = async (): Promise<boolean> => {
        if (!isUndefined(this.dbConnection) && this.dbConnection.open) return true;

        // connect or reconnect
        const { config, logger } = this;
        const options = {
            readonly: config.readonly ?? false,
            timeout: config.queryTimeout ?? 5_000,
        };
        const dbname = '' + config.name;
        try {
            logger.info(`db [${dbname}] ${isUndefined(this.dbConnection) ? 'connecting' : 'reconnecting'}...`);
            this.dbConnection = sqlite(config.filename, options);
            if (this.dbConnection?.open) {
                logger.info(`db [${dbname}] connected`);
                return true;
            }
            // unknown error
            logger.error(`db [${dbname}] connect failed: ${this.dbConnection}`);
        } catch (e) {
            logger.error(`db [${dbname}] connect failed: ${e}`);
        }
        return false;
    };

    tableInfo = async (tableName: string): Promise<DbColumn[] | null> => {
        const { dbConnection, logger } = this;
        if (isUndefined(dbConnection) || !dbConnection.open) return null;

        try {
            const localColumns = dbConnection.pragma(`table_info(${tableName})`);
            if (isArray(localColumns) && localColumns.length > 0) {
                // exists
                // logger.debug(localColumns);
                const columns: DbColumn[] = [];
                forEach(localColumns, c => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    let type: any = '';
                    let length = 0;
                    let scale = 0;
                    let match = c.type.match(/(\w+)\((\d+),(\d+)\)/);
                    if (match) {
                        type = match[1];
                        length = parseInt(match[2]);
                        scale = parseInt(match[3]);
                    } else {
                        match = c.type.match(/(\w+)\((\d+)\)/);
                        if (match) {
                            type = match[1];
                            length = parseInt(match[2]);
                        } else type = c.type;
                    }

                    type = lowerCase(trim(type));
                    columns.push({
                        name: c.name,
                        type: type,
                        length,
                        scale,
                        notNull: c.notnull === 1,
                        defaultValue: c.dflt_value,
                        primary: c.pk === 1,
                        autoIncrement: c.pk === 1,
                    });
                });
                return columns;
            }
            // not exists
        } catch (e) {
            logger.error(`get table info failed: ${tableName}, ${e}`);
        }
        return null;
    };

    tableIndex = async (tableName: string): Promise<DbIndex[] | null> => {
        const { dbConnection, logger } = this;
        if (isUndefined(dbConnection) || !dbConnection.open) return null;

        try {
            const localIndexes = dbConnection.pragma(`index_list(${tableName})`);
            if (isArray(localIndexes) && localIndexes.length > 0) {
                // logger.debug(localIndexes);
                const indexes: DbIndex[] = [];
                forEach(localIndexes, i => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const { name, unique } = i;
                    indexes.push({
                        name,
                        unique: unique === 1,
                    });
                });
                return indexes;
            }
        } catch (e) {
            logger.error(`get index list failed: ${tableName}, ${e}`);
        }
        return null;
    };

    run = async (sql: string): Promise<boolean> => {
        const { dbConnection, logger } = this;
        try {
            if (isUndefined(dbConnection) || !dbConnection.open) return false;
            dbConnection.prepare(sql).run();
            return true;
        } catch (e) {
            logger.error(`run sql error: ${sql}, ${e}`);
        }
        return false;
    };
}
