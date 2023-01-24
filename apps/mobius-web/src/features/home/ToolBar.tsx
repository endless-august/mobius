import React, { FC } from 'react';
import { Button, ButtonProps } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export const ToolBar: FC = () => {
    const onUserClick: ButtonProps['onClick'] = () => {};
    return (
        <div className='home-toolbar'>
            <Button className='home-toolbar__user' icon={<UserOutlined />} type='text' onClick={onUserClick} />
        </div>
    );
};
