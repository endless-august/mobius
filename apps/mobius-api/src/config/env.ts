import minimist from 'minimist';
import { isString, toNumber } from 'lodash';
import { DEFAULT_PORT } from './constant';

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

export const env = { type, port, isDev: type === EnvType.DEV, isProd: type === EnvType.PROD };
