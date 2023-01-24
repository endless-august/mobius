import { Outlet } from 'react-router-dom';
import React, { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { startPagePath } from '@/web/features/start/route';

export const App: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === '/') {
            // redirect to start page when accessing the root path
            navigate(startPagePath);
        }
    }, [location, navigate]);
    return (
        <>
            <Outlet />
        </>
    );
};
