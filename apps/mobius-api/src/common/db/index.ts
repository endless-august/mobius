import { isUndefined } from 'lodash';
import { DbPool } from './pool';
import { DbColumn, DbIndex, DbTable } from './table';

export * from './table';
export { db } from './query';

export enum DbEngineType {
    MYSQL = 'mysql',
    SQLITE = 'sqlite',
}

export interface DbEngine {
    /**
     * connect to database
     * @returns true if connected
     */
    connect: () => Promise<boolean>;

    /**
     * get table info
     * @param tableName - table name
     * @returns table's column info or null if not found
     */
    tableInfo: (tableName: string) => Promise<DbColumn[] | null>;

    tableIndex: (tableName: string) => Promise<DbIndex[] | null>;

    run: (sql: string) => Promise<boolean>;
}

export interface DbConfig {
    /**
     * custom unique name of the database, used for db pool name and logger name
     */
    name: string;

    /**
     * engine type of the database
     */
    engine: DbEngineType;

    /**
     * true if this is the default database, usefull when there is only one database
     *
     * @defaultValue false
     */
    master?: boolean;

    /**
     * true if this database is readonly
     *
     * @defaultValue false
     */
    readonly?: boolean;

    /**
     * prefix for all tables in this database
     *
     * @defaultValue empty string
     */
    prefix?: string;

    /**
     * the database will sync all tables in this list.
     * if table not found, it will be created.
     * if table exists, but missing some columns or indexes, the table will be updated.
     * it won't delete any columns / indexes / tables.
     *
     * @defaultValue []
     */
    tablesToSync?: DbTable[];
}

export interface DbConfigSqlite extends DbConfig {
    engine: DbEngineType.SQLITE;

    /**
     * sqlite database file path
     */
    filename: string;

    /**
     *  the number of milliseconds to wait when executing queries on a locked database, before throwing a SQLITE_BUSY error.
     *
     * @defaultValue 5000 ms
     */
    queryTimeout?: number;
}

export interface DbConfigMysql extends DbConfig {
    engine: DbEngineType.MYSQL;
}

export declare type DbConfigPool = DbConfigSqlite | DbConfigMysql;

const __pools: DbPool[] = [];

export const initDbPools = async (configs: DbConfigPool[]) => {
    for (const c of configs) {
        const pool = new DbPool(c);
        __pools.push(pool);

        // !!!try connect after push into the pool list!!!
        await pool.tryConnect();
    }
};

export const getDbPool = (name?: string): DbPool | undefined => {
    if (isUndefined(name)) return __pools.find(p => p.config.master);
    return __pools.find(p => p.config.name === name);
};
