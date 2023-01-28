import { isNull, isUndefined, find } from 'lodash';
import { getLogger, Logger } from 'log4js';
import { DbConfigPool, DbEngineType, DbEngine, db } from './index';
import { DbSqlite } from './engines/sqlite';
import { DbOperation } from './query';
// import { DbMysql } from './engines/mysql';

export class DbPool {
    public config: DbConfigPool;
    public logger: Logger;
    private engine: DbEngine;
    private isTableChecked = false;

    constructor(config: DbConfigPool) {
        this.config = config;
        this.logger = getLogger(config.name);
        if (config.engine === DbEngineType.SQLITE) this.engine = new DbSqlite(config, this.logger);
        // else if (config.engine === DbEngineType.MYSQL) this.engine = new DbMysql(config, this.logger);
        else throw new Error(`unsupported db engine: ${config}`);
    }

    tryConnect = async (): Promise<boolean> => {
        const { config, engine, isTableChecked, logger } = this;

        const connected = await engine.connect();
        if (!connected) return false;

        // check table only once
        if (isTableChecked || isUndefined(config.tablesToSync)) return true;

        for (const table of config.tablesToSync) {
            const tabeName = table.name;
            const localColumns = await engine.tableInfo(tabeName);
            if (isNull(localColumns)) {
                // table not found, creating...
                const result = await db(tabeName).use(config.name).create(table);
                if (result) logger.info(`√ [${tabeName}] table create success`);
                else logger.error(`× [${tabeName}] table create failed`);
            } else {
                // table found, check columns
                logger.info(`√ [${tabeName}] table exist`);

                for (const column of table.columns) {
                    if (find(localColumns, { name: column.name })) continue;
                    const result = await db(tabeName).use(config.name).addColumn(column);
                    if (result) logger.info(`√ [${tabeName}] add column [${column.name}] success`);
                    else logger.error(`× [${tabeName}] add column [${column.name}] failed`);
                }
            }

            // check indexes
            if (!isUndefined(table.indexes)) {
                const localIndexes = await engine.tableIndex(tabeName);
                for (const index of table.indexes) {
                    if (!isNull(localIndexes) && find(localIndexes, { name: index.name })) continue;
                    const result = await db(tabeName).use(config.name).addIndex(index);
                    if (result) logger.info(`√ [${tabeName}] add index [${index.name}] success`);
                    else logger.error(`× [${tabeName}] add index [${index.name}] failed`);
                }
            }
        }

        return false;
    };

    run = async (sql: string, operation: DbOperation): Promise<boolean> => {
        if (operation === DbOperation.CREATE || operation === DbOperation.ADD_COLUMN || operation === DbOperation.ADD_INDEX) {
            return await this.engine.run(sql);
        }
        return false;
    };
}
