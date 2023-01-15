import { FC, useEffect } from 'react';
import { Layout } from 'antd';
import { TabBar } from './TabBar';
import { SiderBar } from './SiderBar';
import { useAppSelector, useAppDispatch } from '@/common/hooks/useRedux';
import { useLocation } from 'react-router-dom';
import { selectCollapsed, navigateTo } from './redux/navi';
import { getPageByPath } from '@/features/menu/menus';

export const Home: FC = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const collapsed = useAppSelector(selectCollapsed);

    useEffect(() => {
        const pathname = location.pathname.substring(1);
        const page = getPageByPath(pathname);
        if (page && page.path) {
            // sync navigation when location changed
            dispatch(navigateTo(page.key));
        }
    }, [location, dispatch]);

    // console.log('render home');
    return (
        <div className='home-index'>
            <Layout style={{ height: '100vh' }}>
                <Layout.Sider className='home-index__sider' width={220} trigger={null} collapsible collapsed={collapsed}>
                    <SiderBar />
                </Layout.Sider>
                <Layout className='home-index__tabbar'>
                    <TabBar />
                </Layout>
            </Layout>
        </div>
    );
};
