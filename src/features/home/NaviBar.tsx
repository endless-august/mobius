import { FC } from 'react';
import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import { getPageByKey } from '@/features/menu/menus';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector } from '@/common/hooks/useRedux';
import { selectNaviList, selectActive } from './redux/navi';
import { __ } from '@/common/i18n';

interface PropsType {
    className: string;
}

export const NaviBar: FC<PropsType> = ({ className }) => {
    const naviList = useAppSelector(selectNaviList);
    const active = useAppSelector(selectActive);
    const navigate = useNavigate();
    const onChange: TabsProps['onChange'] = key => {
        const page = getPageByKey(key);
        if (page && page.path) {
            if (!active || active.key !== key) {
                navigate(page.path);
            }
        }
    };
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

    return (
        <div className={className}>
            <div className='home-header__nav-menu'>
                <Tabs
                    hideAdd
                    type='card'
                    style={{ paddingLeft: '15px', paddingTop: '20px' }}
                    activeKey={activeKey}
                    animated={true}
                    tabBarGutter={5}
                    size='middle'
                    items={tabItem}
                    onChange={onChange}
                />
            </div>
        </div>
    );
};
