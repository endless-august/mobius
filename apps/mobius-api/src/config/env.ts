import minimist from 'minimist';
import { isString, toNumber } from 'lodash';
import { ensureDirSync } from 'fs-extra';
import { DEFAULT_PORT, DEFAULT_ROOT_PATH, DEFAULT_SQLITE_FILENAME } from './constant';

export enum EnvType {
    DEV = 'dev',
    PROD = 'prod',
}

// parse command line parameters
// -m: env type, dev or prod
// -p: port
const argv = minimist(process.argv.slice(2));
const type = isString(argv.m) && argv.m === EnvType.PROD ? EnvType.PROD : EnvType.DEV;
const port = isString(argv.p) && toNumber(argv.p) > 0 ? toNumber(argv.p) : DEFAULT_PORT;

const root_path = DEFAULT_ROOT_PATH;
const sqlite_path = root_path + '/' + DEFAULT_SQLITE_FILENAME;
ensureDirSync(root_path);

export const env = { type, port, isDev: type === EnvType.DEV, isProd: type === EnvType.PROD, sqlite_path, root_path };
