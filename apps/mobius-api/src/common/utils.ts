import { IncomingMessage } from 'http';
import { isArray } from 'lodash';

export const getIp = (req: IncomingMessage): string => {
    let ip = req?.headers['x-real-ip'] || req?.headers['x-forwarded-for'] || req?.socket?.remoteAddress || '';
    if (isArray(ip)) {
        if (ip.length > 0) ip = ip[0];
        else ip = '';
    }
    if (ip.split(',').length > 0) ip = ip.split(',')[0];
    return ip;
};
