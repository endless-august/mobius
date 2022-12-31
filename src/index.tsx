import React from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from 'antd';
import Root from './Root';
import reportWebVitals from './reportWebVitals';
import zhCN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';
import './styles/index.scss';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <ConfigProvider locale={zhCN}>
            <Root />
        </ConfigProvider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
