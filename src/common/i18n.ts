import { enUS } from '../locales/en-US';
import { zhCN } from '../locales/zh-CN';

const locales = { enUS, zhCN };
const defaultLocale = 'zhCN';
let currentLocale = locales[defaultLocale];

const setLocale = (locale: 'enUS' | 'zhCN') => (currentLocale = locales[locale]);
const __ = (key: string | undefined) => {
    if (!key) return '';
    const keys = key.split('.');
    let value: any = currentLocale;
    for (const k of keys) {
        value = value[k];
    }
    return value;
};
export { setLocale, __ };
