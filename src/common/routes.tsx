import { RouteObject } from 'react-router-dom';
import { App } from '@/features/common/App';
import { PageNotFound } from '@/features/common/PageNotFound';
import homeRoute from '@/features/home/route';
import loginRoute from '@/features/login/route';

export declare type MobRoute = RouteObject & {
    name?: string;
    icon?: string;
    isDir?: boolean;
    submenus?: MobRoute[];
    hidden?: boolean;
};

const routes: MobRoute[] = [
    {
        path: '/',
        element: <App />,
        errorElement: <PageNotFound />,
        children: [loginRoute, homeRoute],
    },
];
export default routes;
