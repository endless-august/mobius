import { FC } from 'react';
import classnames from 'classnames';
// import { Menu } from 'antd';
import { NaviBar } from './NaviBar';
import { useAppSelector } from '@/common/hooks/useRedux';
import { selectCollapsed } from './redux/navi';

export const Header: FC = () => {
    // componentDidMount() {
    //     this.props.actions.initNav();
    // }

    // onClose = data => {
    //     this.props.actions.closeNav(data);
    // };

    // onCloseAll = () => {
    //     const { computedMatch } = this.props;
    //     this.props.actions.closeAllNav({ computedMatch });
    // };

    // onReload = () => {
    //     const { computedMatch } = this.props;
    //     this.props.actions.reload({ computedMatch });
    // };

    // onSort = data => {
    //     this.props.actions.sortNav(data);
    // };

    // const { adminInfo, navList, computedMatch, pathname } = this.props;
    const collapsed = useAppSelector(selectCollapsed);
    return (
        <div className='home-header'>
            <div className={classnames('home-header__title', { 'title-collapsed': collapsed })}>{collapsed ? 'M' : 'Mobius'}</div>
            <NaviBar
                className='home-header__nav'
                // navList={navList}
                // computedMatch={computedMatch}
                // pathname={pathname}
                // onClose={this.onClose}
                // onCloseAll={this.onCloseAll}
                // onReload={this.onReload}
                // onSort={this.onSort}
            />
        </div>
    );
};
