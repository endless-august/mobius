import { MobRoute } from '@/web/common/routes';
import { default as startRoute } from '@/web/features/start/route';
import { default as searchRoute } from '@/web/features/search/route';
import { default as settingsRoute } from '@/web/features/settings/route';
import { isString } from 'lodash';

const menus: MobRoute[] = [...startRoute, ...searchRoute, ...settingsRoute];

const pageReducer = (previousValue: MobRoute[], currentValue: MobRoute): MobRoute[] => {
    if (currentValue.isDir) {
        const submenus = currentValue.submenus?.reduce(pageReducer, []) ?? [];
        submenus.forEach(x => (x.parent = currentValue));
        return previousValue.concat(submenus);
    } else return previousValue.concat([currentValue]);
};

const pages = menus.reduce(pageReducer, []);
const pagesByKey = {} as { [key: string]: MobRoute };
const pagesByPath = {} as { [path: string]: MobRoute };
pages.forEach(x => {
    pagesByKey[x.key] = x;
    if (isString(x.path)) pagesByPath[x.path] = x;
});
const getPageByKey = (key: string): MobRoute => pagesByKey[key];
const getPageByPath = (path: string): MobRoute => pagesByPath[path];

export { pages, menus, pagesByKey, getPageByKey, getPageByPath };
