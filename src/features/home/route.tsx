import { MobRoute } from '@/common/routes';
import { Home } from './Home';
import { pages } from '../menu/menus';

export const HomeRootPath = '/';

const route: MobRoute = {
    key: 'home',
    path: HomeRootPath,
    element: <Home />,
    children: [...pages],
};
export default route;
