import { FC } from 'react';
import { Tabs, TabsProps, Button, Space, Tooltip, ButtonProps } from 'antd';
import { getPageByKey } from '@/features/menu/menus';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CloseOutlined, ReloadOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '@/common/hooks/useRedux';
import { selectNaviList, selectActive, selectNextTab, closeTab } from './redux/navi';
import { __ } from '@/common/i18n';

interface PropsType {
    className: string;
}

export const NaviBar: FC<PropsType> = ({ className }) => {
    const naviList = useAppSelector(selectNaviList);
    const active = useAppSelector(selectActive);
    const nextTab = useAppSelector(selectNextTab);
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

    const onReloadTab: ButtonProps['onClick'] = () => {};

    const activeKey = active?.key ? active.key : '';
    const tabItem = naviList.map(data => {
        const { key, name, icon } = data;
        return {
            key,
            label: (
                <>
                    {icon ? <FontAwesomeIcon className='anticon' icon={icon as any} /> : ''}
                    {__(name)}
                </>
            ),
            closable: false,
        };
    });

    const extraButtons = (
        <Space>
            <Tooltip title={__('navi.tabs.close')} mouseEnterDelay={1}>
                <Button
                    className='home-header__nav-tabs-button'
                    style={{ marginLeft: '10px' }}
                    icon={<CloseOutlined />}
                    type='text'
                    // size='small'
                    onClick={onCloseTab}
                />
            </Tooltip>
            <Tooltip title={__('navi.tabs.reload')} mouseEnterDelay={1}>
                <Button
                    className='home-header__nav-tabs-button'
                    icon={<ReloadOutlined />}
                    type='text'
                    // size='small'
                    onClick={onReloadTab}
                />
            </Tooltip>
        </Space>
    );

    return (
        <div className={className}>
            <div className='home-header__nav-tabs'>
                <Tabs
                    hideAdd
                    type='card'
                    style={{ paddingLeft: '15px', paddingTop: '20px' }}
                    activeKey={activeKey}
                    animated={true}
                    tabBarGutter={5}
                    size='middle'
                    items={tabItem}
                    onChange={onChangeTab}
                    tabBarExtraContent={extraButtons}
                />
            </div>
        </div>
    );
};
