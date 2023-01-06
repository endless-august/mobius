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

export { pages, menus };
