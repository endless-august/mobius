import { FC } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { __ } from '@/common/i18n';

const LoginForm: FC = () => {
    const onFinish = (values: any) => {};
    // const handleSubmit = e => {
    //     e.preventDefault();
    //     this.props.form.validateFields((err, values) => {
    //         if (!err) {
    //             http.post('login/login', values).then(res => {
    //                 const { code, msg } = res;
    //                 if (code !== 0) {
    //                     message.info(msg);

    //                     this.props.onLoginFail && this.props.onLoginFail(res);
    //                     return;
    //                 }
    //                 const history = this.props.history;
    //                 // if (history.location.state && history.location.state.forceLogin) {
    //                 //     history.goBack();
    //                 // } else {
    //                 //     history.replace('/');
    //                 // }
    //                 history.replace('/');
    //             });
    //         }
    //     });
    // };

    return (
        <Form className='login-form' onFinish={onFinish}>
            <Form.Item
                name='name'
                rules={[
                    {
                        required: true,
                        message: '账号不能为空',
                    },
                ]}
            >
                <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='账号' />
            </Form.Item>
            <Form.Item
                name='password'
                rules={[
                    {
                        required: true,
                        message: '密码不能为空',
                    },
                ]}
            >
                <Input prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='密码' />
            </Form.Item>
            <Checkbox>{__('login.remember_me')}</Checkbox>
            <Form.Item>
                <Button className='login-form-button' type='primary' htmlType='submit'>
                    登录
                </Button>
            </Form.Item>
        </Form>
    );
};

export const Login: FC = () => {
    return (
        <div className='login-index' style={{ background: '#f5f5f5' }}>
            <div className='login-index__container' style={{ width: 365, height: 400 }}>
                <div
                    style={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 105,
                    }}
                >
                    <LoginForm />
                </div>
            </div>
        </div>
    );
};
