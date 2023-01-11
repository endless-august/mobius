import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { FC } from 'react';
import { MobRoute } from '@/common/routes';
import { size } from 'lodash';
import '@/common/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { menus, getPageByKey } from '@/features/menu/menus';
import { __ } from '@/common/i18n';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/common/hooks/useRedux';
import { selectCollapsed, selectActive, navigateTo, collapseSider } from './redux/navi';

type MenuItem = Required<MenuProps>['items'][number];

export const SiderBar: FC = () => {
    const active = useAppSelector(selectActive);
    const collapsed = useAppSelector(selectCollapsed);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onClick: MenuProps['onClick'] = ({ key }) => {
        const page = getPageByKey(key);
        const { path, name } = page;
        if (path) {
            if (!active || active.key !== key) {
                navigate(path);
                dispatch(navigateTo({ key, path, name: name ?? '' }));
            }
        }
    };
    const selectedKeys = active?.key ? [active.key] : [];

    const iconStyle = {}; //{ minWidth: 14, fontSize: 14, marginRight: 10 };
    const menuItem = (data: MobRoute): MenuItem => {
        const { key, name, icon } = data;
        return {
            key,
            label: __(name),
            icon: icon ? <FontAwesomeIcon className='anticon' icon={icon as any} style={iconStyle} /> : '',
        };
    };

    const menuDir = (data: MobRoute): MenuItem => {
        const { key, isDir, name, icon, submenus } = data;
        return isDir || size(submenus) > 0
            ? {
                  key,
                  label: __(name),
                  icon: icon ? <FontAwesomeIcon className='anticon' icon={icon as any} style={iconStyle} /> : '',
                  children: submenus && submenus.map(x => menuDir(x)),
                  onTitleMouseEnter: ({ key, domEvent }) => {},
                  onTitleMouseLeave: ({ key, domEvent }) => {},
              }
            : menuItem(data);
    };

    return (
        <div className='home-sider'>
            <div className='home-sider-trigger' onClick={() => dispatch(collapseSider())}>
                {collapsed ? <RightOutlined /> : <LeftOutlined />}
            </div>
            <Menu
                theme='dark'
                mode='inline'
                style={{ flex: 1, borderRight: 0, overflow: 'hidden auto' }}
                items={menus.map(x => menuDir(x))}
                onClick={onClick}
                selectedKeys={selectedKeys}
            />
        </div>
    );
};
