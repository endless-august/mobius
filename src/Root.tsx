import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './features/home/App';
import Home from './features/home/Home';
import { store } from './common/store';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: 'contacts/:contactId',
                element: <Home />,
            },
        ],
    },
]);

const Root: FC = () => {
    return (
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    );
};

export default Root;
