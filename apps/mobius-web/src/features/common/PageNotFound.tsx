import React, { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPageByPath } from '@/web/features/menu/menus';
import { startPagePath } from '@/web/features/start/route';
import { isUndefined } from 'lodash';

export const PageNotFound: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const pathname = location.pathname.substring(1);
        const page = getPageByPath(pathname);
        if (isUndefined(page)) {
            // redirect to start page when no matching route is found
            navigate(startPagePath);
        }
    }, [location, navigate]);
    return <>Page not found.</>;
};
