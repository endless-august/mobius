import { MobRoute } from '@/common/routes';
import { default as startRoute } from '../start/route';
import { default as searchRoute } from '../search/route';
import { default as settingsRoute } from '../settings/route';

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
    if (x.path) pagesByPath[x.path] = x;
});
const getPageByKey = (key: string): MobRoute => pagesByKey[key];
const getPageByPath = (path: string): MobRoute => pagesByPath[path];

export { pages, menus, pagesByKey, getPageByKey, getPageByPath };
