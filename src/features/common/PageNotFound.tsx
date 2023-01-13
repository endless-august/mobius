import { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPageByPath } from '@/features/menu/menus';
import { startPagePath } from '@/features/start/route';

export const PageNotFound: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const pathname = location.pathname.substring(1);
        const page = getPageByPath(pathname);
        if (!page) {
            // redirect to start page when no matching route is found
            navigate(startPagePath);
        }
    }, [location, navigate]);
    return <>Page not found.</>;
};
