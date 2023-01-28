import { env } from '../config/env';
import { DbEngineType, DbConfigSqlite, dbColumnId, dbColumnDeleted, dbColumnCreateTime, dbColumnUpdateTime } from '../common/db';
import { test } from './test';
import { isUndefined } from 'lodash';

const tables = [test];
tables.forEach(table => {
    if (isUndefined(table.uniqueId) || table.uniqueId) table.columns.unshift(dbColumnId);
    if (isUndefined(table.softDelete || table.softDelete)) table.columns.push(dbColumnDeleted);
    if (isUndefined(table.createTime) || table.createTime) table.columns.push(dbColumnCreateTime);
    if (isUndefined(table.updateTime) || table.updateTime) table.columns.push(dbColumnUpdateTime);
});

export const dbcfg: DbConfigSqlite[] = [
    {
        name: 'sqlite',
        engine: DbEngineType.SQLITE,
        master: true,
        filename: env.sqlite_path,
        queryTimeout: 60_000,
        tablesToSync: tables,
    },
];
