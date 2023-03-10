import log4js from 'log4js';
import moment from 'moment';

export interface LoggerOptions {
    path: string;
    level: 'debug' | 'info' | 'warn' | 'error';
}

export const initLogger = (opt: LoggerOptions) => {
    log4js.addLayout('json', config => logEvent => {
        return (
            JSON.stringify({
                trace_id: logEvent.context.trace ?? '',
                path: logEvent.context.path ?? '',
                ip: logEvent.context.ip ?? '',
                level: logEvent.level.levelStr ?? '',
                start_time: moment(logEvent.startTime).format('YYYY-MM-DD hh:mm:ss.SSS') ?? '',
                pid: logEvent.pid ?? '',
                data: logEvent.data,
            }) + config.separator
        );
    });

    log4js.configure({
        appenders: {
            stdout: {
                type: 'stdout',
                layout: {
                    type: 'pattern',
                    pattern: '%[[%z][%d{yyyy-MM-dd hh:mm:ss.SSS}][%c][%p]%] %m',
                },
            },
            file: {
                type: 'dateFile',
                filename: opt?.path ?? 'logs/default',
                pattern: 'yyyy-MM-dd.log',
                alwaysIncludePattern: true,
                layout: {
                    type: 'json',
                    separator: '',
                },
            },
        },
        categories: {
            default: { appenders: ['stdout', 'file'], level: opt?.level ?? 'debug' },
        },
    });
};
