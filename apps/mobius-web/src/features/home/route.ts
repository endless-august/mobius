import { MobRoute } from '@/web/common/routes';
import { Home } from './Home';
import { pages } from '@/web/features/menu/menus';
import { createElement } from 'react';

export const HomeRootPath = '/';

const route: MobRoute = {
    key: 'home',
    path: HomeRootPath,
    element: createElement(Home),
    component: Home,
    children: [...pages],
};
export default route;
