import { isUndefined, forEach } from 'lodash';
import { DbPool } from './pool';

export enum DbEngine {
    MYSQL = 'mysql',
    SQLITE = 'sqlite',
}

export interface DbConfig {
    name: string;
    engine: DbEngine;
    master?: boolean;
    readonly?: boolean;
}

export interface DbSqliteConfig extends DbConfig {
    engine: DbEngine.SQLITE;
    filename: string;
    queryTimeout?: number;
}

export interface DbMysqlConfig extends DbConfig {
    engine: DbEngine.MYSQL;
}

export declare type DbPoolConfig = DbSqliteConfig | DbMysqlConfig;

const __pools: DbPool[] = [];

export const initDbPools = (configs: DbPoolConfig[]) => {
    forEach(configs, c => {
        __pools.push(new DbPool(c));
    });
};
