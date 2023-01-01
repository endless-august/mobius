import { RouteObject } from 'react-router-dom';
import { default as startRoute } from '../start/route';
import { default as searchRoute } from '../search/route';
import { default as settingsRoute } from '../settings/route';

const menus: RouteObject[] = [...startRoute, ...searchRoute, ...settingsRoute];
export default menus;
