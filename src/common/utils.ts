import { isUndefined, isNull } from 'lodash';

export const getLocalValue = (field: string, key: string, defaultValue: any) => {
    if (window.localStorage) {
        const storage = window.localStorage;
        const v = storage.getItem(field);
        try {
            if (v !== null) {
                const o = JSON.parse(v) || null;
                if (isUndefined(o) || isNull(o) || isUndefined(o[key]) || isNull(o[key])) return defaultValue;
                else return o[key];
            }
        } catch (error) {}
    }
    return defaultValue;
};

export const setLocalValue = (field: string, key: string, value: any) => {
    if (window.localStorage) {
        const storage = window.localStorage;
        const v = storage.getItem(field);
        let o: any = {};
        try {
            if (v !== null) o = JSON.parse(v) || {};
        } catch (error) {}
        o[key] = value;
        storage.setItem(field, JSON.stringify(o));
    }
};

export const getSessionValue = (field: string, key: string, defaultValue: any) => {
    if (window.sessionStorage) {
        const storage = window.sessionStorage;
        const v = storage.getItem(field);
        try {
            if (v !== null) {
                const o = JSON.parse(v) || null;
                if (isUndefined(o) || isNull(o) || isUndefined(o[key]) || isNull(o[key])) return defaultValue;
                else return o[key];
            }
        } catch (error) {}
    }
    return defaultValue;
};

export const setSessionValue = (field: string, key: string, value: any) => {
    if (window.sessionStorage) {
        const storage = window.sessionStorage;
        const v = storage.getItem(field);
        let o: any = {};
        try {
            if (v !== null) o = JSON.parse(v) || {};
        } catch (error) {}
        o[key] = value;
        storage.setItem(field, JSON.stringify(o));
    }
};

export function isMobileEnv() {
    var n = !!window.navigator.appVersion.match(/AppleWebKit.*Mobile.*/);
    return n;
}
