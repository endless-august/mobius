import { MobRoute } from '@/common/routes';
import { default as startRoute } from '../start/route';
import { default as searchRoute } from '../search/route';
import { default as settingsRoute } from '../settings/route';

const menus: MobRoute[] = [...startRoute, ...searchRoute, ...settingsRoute];

const pageReducer = (previousValue: MobRoute[], currentValue: MobRoute): MobRoute[] => {
    if (currentValue.isDir) return previousValue.concat(currentValue.submenus?.reduce(pageReducer, []) ?? []);
    else return previousValue.concat([currentValue]);
};

const pages = menus.reduce(pageReducer, []);
const pagesByKey = {} as { [key: string]: MobRoute };
pages.forEach(x => (pagesByKey[x.key] = x));
const getPageByKey = (key: string): MobRoute => pagesByKey[key];

export { pages, menus, pagesByKey, getPageByKey };
