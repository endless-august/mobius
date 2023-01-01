import { MobRoute } from '@/common/routes';
import { Home } from './Home';
import menus from './menus';

const route: MobRoute = {
    path: '/',
    element: <Home />,
    children: [...menus],
};
export default route;
