import React, { FC } from 'react';
import { Tabs, TabsProps, Button, Space, Tooltip, ButtonProps } from 'antd';
import { getPageByKey } from '@/web/features/menu/menus';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CloseOutlined, ReloadOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '@/web/common/hooks/useRedux';
import { useForceUpdate } from '@/web/common/hooks/useForceUpdate';
import { selectNaviList, selectActive, selectNextTab, closeTab } from './redux/navi';
import { __ } from '@/web/common/i18n';
import { ToolBar } from './ToolBar';
import { createContentWrapper } from './ContentWrapper';

export const TabBar: FC = () => {
    const naviList = useAppSelector(selectNaviList);
    const active = useAppSelector(selectActive);
    const nextTab = useAppSelector(selectNextTab);
    const forceUpdate = useForceUpdate();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onChangeTab: TabsProps['onChange'] = key => {
        const page = getPageByKey(key);
        if (page && page.path) {
            if (!active || active.key !== key) {
                navigate(page.path);
            }
        }
    };
    const onCloseTab: ButtonProps['onClick'] = () => {
        if (nextTab) {
            dispatch(closeTab());
            navigate(nextTab.path);
        }
    };

    const onReloadTab: ButtonProps['onClick'] = () => {
        if (active) {
            const page = getPageByKey(active.key);
            if (page && page.component) {
                page.element = createContentWrapper(page.component);
                forceUpdate();
            }
        }
    };

    const activeKey = active?.key ? active.key : '';
    const tabItem = naviList.map(data => {
        const { key, name, icon } = data;
        const page = getPageByKey(key);
        return {
            key,
            label: (
                <>
                    {icon ? <FontAwesomeIcon className='anticon' icon={icon as any} /> : ''}
                    {__(name)}
                </>
            ),
            closable: false,
            children: page.element,
        };
    });

    const extraButtons = (
        <div className='home-tabbar__extra'>
            <Space>
                <Tooltip title={__('navi.tabs.close')} mouseEnterDelay={1}>
                    <Button
                        className='home-tabbar__extra-button'
                        style={{ marginLeft: 10 }}
                        icon={<CloseOutlined />}
                        type='text'
                        onClick={onCloseTab}
                    />
                </Tooltip>
                <Tooltip title={__('navi.tabs.reload')} mouseEnterDelay={1}>
                    <Button className='home-tabbar__extra-button' icon={<ReloadOutlined />} type='text' onClick={onReloadTab} />
                </Tooltip>
            </Space>
            <ToolBar />
        </div>
    );

    // console.log('render tabbar');
    return (
        <div className='home-tabbar'>
            <Tabs
                hideAdd
                type='card'
                activeKey={activeKey}
                animated={true}
                tabBarGutter={5}
                size='middle'
                items={tabItem}
                onChange={onChangeTab}
                tabBarExtraContent={extraButtons}
            />
        </div>
    );
};
