/* eslint-disable @typescript-eslint/no-explicit-any */
import { enUS } from '@/web/locales/en-US';
import { zhCN } from '@/web/locales/zh-CN';
import { isUndefined } from 'lodash';

const locales = { enUS, zhCN };
const defaultLocale = 'zhCN';
let currentLocale = locales[defaultLocale];

const setLocale = (locale: 'enUS' | 'zhCN') => (currentLocale = locales[locale]);
const __ = (key: string | undefined) => {
    if (isUndefined(key)) return '';
    const keys = key.split('.');
    let value: any = currentLocale;
    for (const k of keys) {
        value = value[k] ?? [];
    }
    return value;
};
export { setLocale, __ };
