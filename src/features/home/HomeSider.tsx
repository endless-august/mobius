import { Menu } from 'antd';
import { FC } from 'react';
import { MobRoute } from '@/common/routes';
import { size } from 'lodash';
import '@/common/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { menus } from '@/features/menu/menus';
import { __ } from '@/common/i18n';

const { SubMenu } = Menu;

const iconStyle = {}; //{ minWidth: 14, fontSize: 14, marginRight: 10 };
const menuItem = (data: MobRoute) => {
    const { path, name, icon } = data;
    return (
        <Menu.Item key={name}>
            {/* <Link to={path} onClick={() => this.props.actions.redirectTo(data)}> */}
            <span>
                {icon ? <FontAwesomeIcon className='anticon' icon={icon as any} style={iconStyle} /> : <div className='anticon' />}
                <span>{__(name)}</span>
            </span>
            {/* </Link> */}
        </Menu.Item>
    );
};

const menuDir = (data: MobRoute) => {
    const { isDir, name, icon, submenus } = data;
    return isDir || size(submenus) > 0 ? (
        <SubMenu
            key={name}
            title={
                <span>
                    {icon ? (
                        <FontAwesomeIcon className='anticon' fixedWidth icon={icon as any} style={iconStyle} />
                    ) : (
                        <div className='anticon' />
                    )}
                    <span>{__(name)}</span>
                </span>
            }
        >
            {submenus && submenus.map(x => menuDir(x))}
        </SubMenu>
    ) : (
        menuItem(data)
    );
};

export const HomeSider: FC = () => {
    return (
        <>
            <Menu theme='dark' mode='inline'>
                {menus.map(x => menuDir(x))}
            </Menu>
        </>
    );
};
