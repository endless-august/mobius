import { RouteObject } from 'react-router-dom';
import { App } from '@/web/features/common/App';
import { PageNotFound } from '@/web/features/common/PageNotFound';
import homeRoute from '@/web/features/home/route';
import loginRoute from '@/web/features/login/route';
import { createElement, FC } from 'react';

export declare type MobRoute = RouteObject & {
    key: string; // unique key
    name?: string; // name for display
    icon?: string; // icon for display
    isDir?: boolean; // whether it is a directory
    submenus?: MobRoute[]; // only directory has submenus
    hidden?: boolean; // whether it is hidden
    parent?: MobRoute; // parent route
    component?: FC;
};

const routes: MobRoute[] = [
    {
        key: 'root',
        path: '/',
        element: createElement(App),
        component: App,
        errorElement: createElement(PageNotFound),
        children: [loginRoute, homeRoute],
    },
];
export default routes;
