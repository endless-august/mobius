/* eslint-disable @typescript-eslint/no-explicit-any */
import { isUndefined, isNull } from 'lodash';

export const getLocalValue = (field: string, key: string, defaultValue: any) => {
    const storage = window.localStorage;
    if (!isUndefined(storage) && !isNull(storage)) {
        const v = storage.getItem(field);
        try {
            if (v !== null) {
                const o = JSON.parse(v) ?? null;
                if (isUndefined(o) || isNull(o) || isUndefined(o[key]) || isNull(o[key])) return defaultValue;
                else return o[key];
            }
        } catch (error) {
            console.log(error);
        }
    }
    return defaultValue;
};

export const setLocalValue = (field: string, key: string, value: any) => {
    const storage = window.localStorage;
    if (!isUndefined(storage) && !isNull(storage)) {
        const v = storage.getItem(field);
        let o: any = {};
        try {
            if (v !== null) o = JSON.parse(v) ?? {};
        } catch (error) {
            console.log(error);
        }
        o[key] = value;
        storage.setItem(field, JSON.stringify(o));
    }
};

export const getSessionValue = (field: string, key: string, defaultValue: any) => {
    const storage = window.sessionStorage;
    if (!isUndefined(storage) && !isNull(storage)) {
        const v = storage.getItem(field);
        try {
            if (v !== null) {
                const o = JSON.parse(v) ?? null;
                if (isUndefined(o) || isNull(o) || isUndefined(o[key]) || isNull(o[key])) return defaultValue;
                else return o[key];
            }
        } catch (error) {
            console.log(error);
        }
    }
    return defaultValue;
};

export const setSessionValue = (field: string, key: string, value: any) => {
    const storage = window.sessionStorage;
    if (!isUndefined(storage) && !isNull(storage)) {
        const v = storage.getItem(field);
        let o: any = {};
        try {
            if (v !== null) o = JSON.parse(v) ?? {};
        } catch (error) {
            console.log(error);
        }
        o[key] = value;
        storage.setItem(field, JSON.stringify(o));
    }
};

export const isMobileEnv = (): boolean => !!window.navigator.appVersion.match(/AppleWebKit.*Mobile.*/);
