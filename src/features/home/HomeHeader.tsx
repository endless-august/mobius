import React, { Component } from 'react';
// import * as actions from './redux/actions';
// import { logout } from '../login/redux/actions';
import { Menu, Button, Popover, Badge } from 'antd';
import { Link } from 'react-router-dom';
// import HeaderNav from './HeaderNav';
// import { getMenuConfig } from './menuConfig';
// import { X6MC } from '@/components/php/SVGIcon';

export class Header extends Component {
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

    state = {};

    render() {
        // const { adminInfo, navList, computedMatch, pathname } = this.props;
        return (
            <div className='home-header'>
                {/* <div className={classnames('home-header__title', { 'title-collapsed': true })}> */}
                {/* <X6MC collapsed={this.props.collapsed} /> */}
                {/* </div> */}
                {/* <HeaderNav
                    className='home-header__nav'
                    // navList={navList}
                    // computedMatch={computedMatch}
                    // pathname={pathname}
                    // onClose={this.onClose}
                    // onCloseAll={this.onCloseAll}
                    // onReload={this.onReload}
                    // onSort={this.onSort}
                /> */}
                {/* <div className='home-header__setting'>
                    <Button className='home-header__setting-button' icon='reload' type='link' onClick={this.onReload} />
                </div> */}
                {/* <div ref={node => (this.user = node)} className='home-header__user'>
                    <Popover
                        placement='bottomRight'
                        getPopupContainer={() => this.user}
                        content={
                            <Menu theme='dark'>
                                <Menu.Item>
                                    <Link
                                        to='/modify-password'
                                        onClick={() => {
                                            const modifyPasswordRoute = getMenuConfig('modify-password');
                                            this.props.actions.redirectTo(modifyPasswordRoute);
                                        }}
                                    >
                                        <span>
                                            <Icon type='user' />
                                            修改密码
                                        </span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item onClick={() => this.props.actions.logout()}>
                                    <Link to='/login'>
                                        <span>
                                            <Icon type='user' />
                                            退出登录
                                        </span>
                                    </Link>
                                </Menu.Item>
                            </Menu>
                        }
                    >
                        <Button className='home-header__user-button' icon='user' type='link'>
                            {adminInfo.name}
                        </Button>
                    </Popover>
                </div> */}
            </div>
        );
    }
}

// /* istanbul ignore next */
// function mapStateToProps(state) {
//     return {
//         navList: state.home.navList,
//         collapsed: state.home.collapsed,
//         adminInfo: state.admin.adminInfo,
//     };
// }

// /* istanbul ignore next */
// function mapDispatchToProps(dispatch) {
//     return {
//         actions: bindActionCreators({ ...actions, logout }, dispatch),
//     };
// }

export default Header;
