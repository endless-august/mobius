import { RouteObject } from 'react-router-dom';
import { Home } from './Home';
import menus from './menus';

const route: RouteObject = {
    path: '/',
    element: <Home />,
    children: [...menus],
};
export default route;
