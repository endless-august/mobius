import React, { FC } from 'react';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import zhCN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';
import { store } from './common/store';
import routes from './common/routes';

const router = createBrowserRouter(routes);

const Root: FC = () => {
    return (
        <ConfigProvider locale={zhCN}>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </ConfigProvider>
    );
};

export default Root;
