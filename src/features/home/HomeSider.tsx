import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { FC, useEffect, useState } from 'react';
import { MobRoute } from '@/common/routes';
import { size } from 'lodash';
import '@/common/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { menus, getPageByKey } from '@/features/menu/menus';
import { __ } from '@/common/i18n';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/common/hooks/useRedux';
import { navigateTo, selectNavi } from './redux/navi';

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
    const navi = useAppSelector(selectNavi);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onClick: MenuProps['onClick'] = ({ key }) => {
        const page = getPageByKey(key);
        const { path, name } = page;
        if (path) {
            if (!navi.active || navi.active.key !== key) {
                navigate(path);
                dispatch(navigateTo({ key, path, name: name ?? '' }));
            }
        }
    };

    const [selectedKeys, setSelectedKeys] = useState(navi.active?.key ? [navi.active.key] : []);
    useEffect(() => {
        console.log(navi);
        setSelectedKeys(navi.active?.key ? [navi.active.key] : []);
    }, [navi]);
    return (
        <>
            <Menu theme='dark' mode='inline' items={menus.map(x => menuDir(x))} onClick={onClick} selectedKeys={selectedKeys} />
        </>
    );
};
