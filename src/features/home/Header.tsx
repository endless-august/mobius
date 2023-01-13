import { FC } from 'react';
import { NaviBar } from './NaviBar';

export const Header: FC = () => {
    return (
        <div className='home-header'>
            <NaviBar className='home-header__nav' />
        </div>
    );
};
