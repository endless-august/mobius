import { FC } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Layout } from 'antd';
import { isMobileEnv } from '@/common/utils';
// import { default as HomeHeader } from './Header';
import { HomeSider } from './HomeSider';

const { Header, Content, Sider } = Layout;

export const Home: FC = () => {
    return (
        <div className='home-index'>
            <Layout style={isMobileEnv() ? { width: '1334px' } : { height: '100vh' }}>
                {/* <Header className='home-index__header'> */}
                {/* <HomeHeader */}
                {/* // computedMatch={computedMatch} pathname={pathname} */}
                {/* /> */}
                {/* </Header> */}
                <Layout>
                    <Sider
                        className='home-index__sider'
                        width={260}
                        trigger={null}
                        collapsible
                        // collapsed={this.props.collapsed}
                    >
                        <HomeSider
                        // computedMatch={computedMatch}
                        />
                    </Sider>
                    <Layout>
                        <Content
                            className='home-index__content'
                            // ref={this.nodeRef}
                        >
                            {/* <HomeContent computedMatch={computedMatch} computedChild={computedChild} pathname={pathname} /> */}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    );
};
