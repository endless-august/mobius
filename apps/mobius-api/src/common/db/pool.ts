import { DbPoolConfig, DbEngine } from './index';
import { DbSqlite } from './sqlite';
// import { DbMysql } from './mysql';

export class DbPool {
    config: DbPoolConfig;
    sqlite?: DbSqlite;
    // mysql?: DbMysql;

    constructor(config: DbPoolConfig) {
        this.config = config;
        if (config.engine === DbEngine.SQLITE) {
            this.sqlite = new DbSqlite(config);
        } else if (config.engine === DbEngine.MYSQL) {
            // this.mysql = new DbMysql(config);
        }
    }
}
