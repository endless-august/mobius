import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { FC } from 'react';
import { MobRoute } from '@/common/routes';
import { size } from 'lodash';
import '@/common/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { menus } from '@/features/menu/menus';
import { __ } from '@/common/i18n';

type MenuItem = Required<MenuProps>['items'][number];

const iconStyle = {}; //{ minWidth: 14, fontSize: 14, marginRight: 10 };
const menuItem = (data: MobRoute): MenuItem => {
    const { key, name, icon } = data;
    return {
        key,
        label: __(name),
        icon: icon ? <FontAwesomeIcon icon={icon as any} style={iconStyle} /> : '',
    };
};

const menuDir = (data: MobRoute): MenuItem => {
    const { key, isDir, name, icon, submenus } = data;
    return isDir || size(submenus) > 0
        ? {
              key,
              label: __(name),
              icon: icon ? <FontAwesomeIcon icon={icon as any} style={iconStyle} /> : '',
              children: submenus && submenus.map(x => menuDir(x)),
          }
        : menuItem(data);
};

export const HomeSider: FC = () => {
    return (
        <>
            <Menu theme='dark' mode='inline' items={menus.map(x => menuDir(x))} />
        </>
    );
};
