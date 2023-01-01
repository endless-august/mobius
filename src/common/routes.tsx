import { RouteObject } from 'react-router-dom';
import { App } from '@/features/common/App';
import { PageNotFound } from '@/features/common/PageNotFound';
import homeRoute from '@/features/home/route';
import loginRoute from '@/features/login/route';

const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        errorElement: <PageNotFound />,
        children: [loginRoute, homeRoute],
    },
];
export default routes;
