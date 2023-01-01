import { MobRoute } from '@/common/routes';
import { default as startRoute } from '../start/route';
import { default as searchRoute } from '../search/route';
import { default as settingsRoute } from '../settings/route';

const menus: MobRoute[] = [...startRoute, ...searchRoute, ...settingsRoute];
export default menus;
