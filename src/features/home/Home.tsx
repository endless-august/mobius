import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { isMobileEnv } from '@/common/utils';
import { Header } from './Header';
import { SiderBar } from './SiderBar';
import { useAppSelector } from '@/common/hooks/useRedux';
import { selectCollapsed } from './redux/navi';

export const Home: FC = () => {
    const collapsed = useAppSelector(selectCollapsed);
    return (
        <div className='home-index'>
            <Layout style={isMobileEnv() ? { width: '1334px' } : { height: '100vh' }}>
                <Layout.Header className='home-index__header' style={{ padding: 0 }}>
                    <Header />
                </Layout.Header>
                <Layout>
                    <Layout.Sider className='home-index__sider' width={260} trigger={null} collapsible collapsed={collapsed}>
                        <SiderBar />
                    </Layout.Sider>
                    <Layout>
                        <Layout.Content
                            className='home-index__content'
                            // ref={this.nodeRef}
                        >
                            {/* <HomeContent computedMatch={computedMatch} computedChild={computedChild} pathname={pathname} /> */}
                            <Outlet />
                        </Layout.Content>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    );
};
