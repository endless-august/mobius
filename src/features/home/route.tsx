import { MobRoute } from '@/common/routes';
import { Home } from './Home';
import { pages } from '../menu/menus';

const route: MobRoute = {
    key: 'home',
    path: '/',
    element: <Home />,
    children: [...pages],
};
export default route;
