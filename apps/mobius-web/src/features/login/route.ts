import { MobRoute } from '@/web/common/routes';
import { createElement } from 'react';
import { Login } from './Login';

const route: MobRoute = {
    key: 'login',
    path: 'login',
    element: createElement(Login),
    component: Login,
};
export default route;
