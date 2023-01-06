import React, { Component } from 'react';
// import { Menu, Icon, Button } from 'antd';
// import { findDOMNode } from 'react-dom';
// import classnames from 'classnames';
// import _ from 'lodash';
// import { XcDndProvider, XcDrag, XcDrop, XcResizeObserver } from '@/components';
// import history from '@/common/history';
// import shallowEqual from 'shallowequal';
// import { saveNav } from './redux/navigateTo';

export default class HeaderNav extends Component {
    state = {
        closeAll: false,
        leftDisabled: false,
        rightDisabled: false,
    };

    // navList = [];

    // containerWidth = 0;
    // menuWidth = 0;

    // componentDidMount() {
    //     this.$node = findDOMNode(this);
    //     this.$node.onmousewheel = _.throttle(e => {
    //         if (!e) return;
    //         const delta = e.wheelDelta || e.detail;
    //         if (delta) {
    //             if (delta > 0) {
    //                 //当滑轮向上滚动时
    //                 this.scroll(-1, delta);
    //             }
    //             if (delta < 0) {
    //                 //当滑轮向下滚动时
    //                 this.scroll(1, -1 * delta);
    //             }
    //         }
    //     }, 0);

    //     this.recordContainerWidth();
    //     this.recordMenuWidth();
    //     this.check();
    // }

    // componentDidUpdate() {
    //     this.recordContainerWidth();
    //     this.recordMenuWidth();
    //     this.check(true);
    //     this.delay(this.center);

    //     saveNav(this.props.navList);
    // }

    // delay = (cb, delayTime = 200) => {
    //     this.clearDelayTimer();

    //     this.delayTimer = setTimeout(() => {
    //         cb && cb();
    //         this.clearDelayTimer();
    //     }, delayTime);
    // };

    // clearDelayTimer = () => {
    //     if (this.delayTimer) {
    //         clearTimeout(this.delayTimer);
    //         this.delayTimer = null;
    //     }
    // };

    // scroll = (dir, gap) => {
    //     if (gap == null) {
    //         gap = 200;
    //         if (this.itemWidth) {
    //             let total = 0;
    //             for (let i = 0; i < this.navList.length; ++i) {
    //                 const item = this.navList[i];
    //                 const width = this.itemWidth[item.key] || 0;
    //                 total += width;

    //                 if (dir > 0) {
    //                     // ->
    //                     const scrollWidth = this.refs.container.scrollLeft + this.containerWidth;
    //                     if (total > scrollWidth + 1) {
    //                         const ret = total - scrollWidth;
    //                         if (ret > 80) {
    //                             gap = ret;
    //                             break;
    //                         }
    //                     }
    //                 } else {
    //                     if (total > this.refs.container.scrollLeft - 1) {
    //                         const ret = width - (total - this.refs.container.scrollLeft);
    //                         if (ret <= 80 && i > 0) {
    //                             gap = ret + this.itemWidth[this.navList[i - 1].key] || 0;
    //                         } else {
    //                             gap = ret;
    //                         }
    //                         break;
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     this.refs.container.scrollTo({ left: this.refs.container.scrollLeft + gap * dir, behavior: 'smooth' });
    // };

    // check = isUpdate => {
    //     if (isUpdate) {
    //         if (shallowEqual(this.navList, this.props.navList)) {
    //             return;
    //         }
    //     }
    //     this.navList = [...this.props.navList];
    //     this.itemWidth = this.navList.reduce((obj, o) => {
    //         if (this.itemWidth && this.itemWidth[o.key]) {
    //             return { ...obj, [o.key]: this.itemWidth[o.key] };
    //         }
    //         return { ...obj, [o.key]: this.$node.querySelector('#item_' + o.key).getBoundingClientRect().width };
    //     }, {});

    //     const closeAll = this.menuWidth > this.containerWidth;
    //     if (this.state.closeAll !== closeAll) {
    //         this.setState({ closeAll });
    //     }
    // };

    // center = () => {
    //     const { computedMatch } = this.props;

    //     let offset = 0;
    //     for (let i = 0; i < this.navList.length; ++i) {
    //         const item = this.navList[i];
    //         const width = this.itemWidth[item.key] || 0;
    //         const active = computedMatch && computedMatch.path === item.absolutePath;
    //         offset += active ? width / 2 : width;

    //         if (active) {
    //             break;
    //         }
    //     }

    //     const left = offset - this.containerWidth / 2;
    //     if (this.lastLeft === left) return;
    //     this.lastLeft = left;

    //     this.refs.container.scrollTo({ left: left, behavior: 'smooth' });
    // };

    // recordContainerWidth = () => {
    //     const { width } = this.refs.container.getBoundingClientRect();
    //     this.containerWidth = width;
    // };

    // recordMenuWidth = () => {
    //     const { width } = findDOMNode(this.refs.menu).getBoundingClientRect();
    //     this.menuWidth = width;
    // };

    // onResize = () => {
    //     this.recordContainerWidth();
    //     this.check();
    //     this.delay(this.center);
    // };

    // onScroll = dir => {
    //     this.scroll(dir);
    //     if (dir < 0 && this.refs.container.scrollLeft === 0) {
    //         this.setState({ leftDisabled: true, rightDisabled: false });
    //     }
    // };

    // render() {
    //     const { closeAll } = this.state;
    //     const { className, navList, computedMatch, pathname } = this.props;

    //     const selectedKeys = navList.filter(nav => computedMatch && nav.absolutePath === computedMatch.path).map(nav => '' + nav.key);

    //     const closeStyle = { display: closeAll ? '' : 'none' };

    //     return (
    //         <XcResizeObserver onResize={this.onResize}>
    //             <div className={className}>
    //                 <div className='home-header__setting' style={closeStyle}>
    //                     <Button
    //                         className='home-header__setting-button'
    //                         style={{ margin: 0 }}
    //                         icon='left'
    //                         type='link'
    //                         onClick={this.onScroll.bind(this, -1)}
    //                     />
    //                 </div>
    //                 <div className='home-header__nav-menu' ref='container'>
    //                     <XcDndProvider>
    //                         <Menu
    //                             ref='menu'
    //                             style={{ lineHeight: '64px', width: 'fit-content' }}
    //                             theme='dark'
    //                             mode='horizontal'
    //                             selectedKeys={selectedKeys}
    //                         >
    //                             {navList.map(nav => {
    //                                 const { key, name, absolutePath } = nav;
    //                                 const active = computedMatch && computedMatch.path === absolutePath;
    //                                 const path = active ? pathname : nav.headerPath || absolutePath;
    //                                 nav.headerPath = path;
    //                                 return (
    //                                     <Menu.Item className='home-header__nav-menu-item' key={'' + key}>
    //                                         <XcDrop
    //                                             direction='horizontal'
    //                                             getItem={() => ({ key: nav.key })}
    //                                             onHover={(dropItem, dragItem, hoverDir) => {
    //                                                 this.props.onSort &&
    //                                                     this.props.onSort({ dropKey: dropItem.key, dragKey: dragItem.key, hoverDir });
    //                                             }}
    //                                             canDrop={(dropItem, dragItem, hoverDir) => {
    //                                                 const navList = this.props.navList;
    //                                                 if (dropItem.key === dragItem.key) {
    //                                                     return false;
    //                                                 }
    //                                                 const dragIndex = navList.findIndex(x => x.key === dragItem.key);
    //                                                 const dropIndex = navList.findIndex(x => x.key === dropItem.key);
    //                                                 const oneOrZero = dragIndex < dropIndex ? 0 : 1;
    //                                                 const insertIndex = hoverDir > 0 ? dropIndex : dropIndex - 1;
    //                                                 const resultIndex = insertIndex + oneOrZero;
    //                                                 if (resultIndex === dragIndex) {
    //                                                     return false;
    //                                                 }
    //                                                 return true;
    //                                             }}
    //                                         >
    //                                             {() => (
    //                                                 <XcDrag getItem={() => ({ key: nav.key })}>
    //                                                     {({ isDragging }) => {
    //                                                         return (
    //                                                             <div
    //                                                                 id={'item_' + key}
    //                                                                 style={{
    //                                                                     opacity: isDragging ? 0 : 1,
    //                                                                     padding: '0 20px',
    //                                                                     position: 'relative',
    //                                                                 }}
    //                                                                 onClick={() => {
    //                                                                     history.push(path);
    //                                                                 }}
    //                                                             >
    //                                                                 <div className='home-header__nav-menu-item-text'>
    //                                                                     <span>{name}</span>
    //                                                                 </div>
    //                                                                 <Icon
    //                                                                     className={classnames('icon close', { active })}
    //                                                                     type='close'
    //                                                                     onClick={e => {
    //                                                                         e.stopPropagation();
    //                                                                         this.props.onClose && this.props.onClose({ key, active });
    //                                                                     }}
    //                                                                 />
    //                                                                 {active && (
    //                                                                     <Icon
    //                                                                         className='icon reload'
    //                                                                         type='reload'
    //                                                                         onClick={e => {
    //                                                                             e.stopPropagation();
    //                                                                             this.props.onReload && this.props.onReload();
    //                                                                         }}
    //                                                                     />
    //                                                                 )}
    //                                                             </div>
    //                                                         );
    //                                                     }}
    //                                                 </XcDrag>
    //                                             )}
    //                                             {/* xcdrag */}
    //                                         </XcDrop>
    //                                     </Menu.Item>
    //                                 );
    //                             })}
    //                         </Menu>
    //                     </XcDndProvider>
    //                 </div>

    //                 <div className='home-header__setting' style={closeStyle}>
    //                     <Button
    //                         className='home-header__setting-button'
    //                         style={{ margin: 0 }}
    //                         icon='right'
    //                         type='link'
    //                         onClick={this.onScroll.bind(this, 1)}
    //                     />
    //                 </div>
    //                 <div className='home-header__setting'>
    //                     <Button
    //                         className='home-header__setting-button'
    //                         style={{ marginRight: 0 }}
    //                         icon='close'
    //                         type='link'
    //                         onClick={() => this.props.onCloseAll && this.props.onCloseAll({ computedMatch })}
    //                     />
    //                 </div>
    //             </div>
    //         </XcResizeObserver>
    //     );
    // }
}
