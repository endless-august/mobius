export interface DbColumnBase {
    name: string;
    type: string;
    defaultValue?: string | number | boolean;
    comment?: string;
    notNull?: boolean;

    primary?: boolean;
    autoIncrement?: boolean;
    length?: number;
    scale?: number;
}

export interface DbColumnInt extends DbColumnBase {
    type: 'int' | 'integer';
    defaultValue?: number;
    length?: number;
    primary?: boolean;
    autoIncrement?: boolean;
}

export interface DbColumnNumber extends DbColumnBase {
    type: 'bigint' | 'tinyint' | 'double';
    defaultValue?: number;
    length?: number;
}

export interface DbColumnDecimal extends DbColumnBase {
    type: 'decimal';
    defaultValue?: number;
    length?: number;
    scale?: number;
}

export interface DbColumnText extends DbColumnBase {
    type: 'varchar' | 'text';
    defaultValue?: string;
    length?: number;
}

export interface DbColumnDate extends DbColumnBase {
    type: 'date' | 'datetime' | 'timestamp';
    defaultValue?: 'CURRENT_TIMESTAMP' | 'CURRENT_DATE' | 'CURRENT_TIME';
}

export interface DbColumnBoolean extends DbColumnBase {
    type: 'boolean';
    defaultValue?: boolean;
}

export type DbColumn = DbColumnInt | DbColumnNumber | DbColumnDecimal | DbColumnText | DbColumnDate | DbColumnBoolean;

export interface DbIndex {
    name: string;
    columns?: string[];
    unique?: boolean;
}

export interface DbTable {
    name: string;
    columns: DbColumn[];
    indexes?: DbIndex[];
    uniqueId?: boolean;
    softDelete?: boolean;
    createTime?: boolean;
    updateTime?: boolean;
}

export const dbColumnId: DbColumnInt = { name: 'id', type: 'integer', primary: true, autoIncrement: true, notNull: true };
export const dbColumnDeleted: DbColumnBoolean = { name: 'deleted', type: 'boolean', notNull: true, defaultValue: false };
export const dbColumnCreateTime: DbColumnDate = { name: 'create_time', type: 'datetime', notNull: true };
export const dbColumnUpdateTime: DbColumnDate = { name: 'update_time', type: 'datetime', notNull: true };
