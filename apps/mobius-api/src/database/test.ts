import { DbTable } from 'src/common/db';

export const test: DbTable = {
    name: 'test',
    columns: [
        { name: 'bigint', type: 'bigint', length: 20 },
        { name: 'tinyint', type: 'tinyint', length: 1, defaultValue: 1 },
        { name: 'double', type: 'double', comment: 'double' },
        { name: 'decimal', type: 'decimal', length: 16, scale: 2 },
        { name: 'varchar', type: 'varchar', length: 255 },
        { name: 'text', type: 'text', length: 1024, notNull: false },
        { name: 'date', type: 'date' },
        { name: 'timestamp', type: 'timestamp' },
        { name: 'boolean', type: 'boolean' },
    ],
    indexes: [
        { name: 'test_index', columns: ['bigint'] },
        { name: 'test_index2', columns: ['date', 'timestamp'], unique: true },
    ],
};
