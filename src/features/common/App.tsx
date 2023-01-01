import { FC } from 'react';
import { Outlet } from 'react-router-dom';
export const App: FC = () => {
    return (
        <div className='home-app'>
            <Outlet />
        </div>
    );
};
