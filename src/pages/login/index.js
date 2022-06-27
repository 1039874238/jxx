/*
 * @Author: your name
 * @Date: 2021-03-27 21:03:48
 * @LastEditTime: 2022-06-26 13:43:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jxx-app\umiApp\src\pages\login\index.js
 */

import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, message, Input, Button, Card } from 'antd';
import { UserOutlined, LockOutlined,UserAddOutlined } from '@ant-design/icons';
import router from 'umi/router';
import Styles from './index.less'

@connect(({ loginModel, userModel }) => ({
    ...loginModel,
    ...userModel
}))
class Login extends Component {
    state = {
        loginLoading: false,
        isLogin: true
    }
    onFinish = (values) => {

        this.setState({
            loginLoading: true
        })
        const { dispatch } = this.props;
        if (this.state.isLogin) { // 登录
            dispatch({
                type: 'loginModel/login',
                payload: values
            })
                .then(res => {
                    if (res.state === 200) {
                        sessionStorage.setItem('roles', JSON.stringify(res.data));
                        router.push('/home');
                        message.destroy();
                        message.success(res.msg);
                    } else {
                        message.destroy();
                        message.warn(res.msg);
                    }
                })
                .finally(res => {
                    this.setState({
                        loginLoading: false
                    })
                })
        } else { // 注册
            dispatch({
                type: 'userModel/createUser',
                payload: values
            })
                .then(res => {
                    if (res.state === 200) {
                        message.destroy();
                        message.success(res.msg)
                        this.setState({
                            isLogin: true
                        })
                    } else {
                        message.destroy();
                        message.warn(res.msg);
                    }
                })
                .finally(res => {
                    this.setState({
                        loginLoading: false
                    })
                })
        }



    };
    openModel = () => {
        this.setState({
            isLogin: !this.state.isLogin
        })
    }
    render() {
        const { isLogin } = this.state
        return (
            <div style={{ height: '100%', paddingTop: '200px' }} className={Styles.login_page}>
                <div className={Styles.login_box}>
                    <Card>
                        <h1>
                            {isLogin ? '登录' : '注册'}
                        </h1>
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={this.onFinish}
                        >
                            {!isLogin &&
                                <Form.Item
                                    name="userName"
                                    rules={[{ required: true, message: '请输入用户名' }]}
                                >
                                    <Input prefix={<UserAddOutlined />} placeholder="用户名" />
                                </Form.Item>
                            }
                            <Form.Item
                                name="phone"
                                rules={[{ required: true, message: '请输入账号' },{min:8,message:'请输入至少8位数的账号'},{max:20,message:'请输入最多20位数的账号'}]}
                            >
                                <Input type={'number'} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: '请输入密码' },{min:8,message:'请输入至少8位数的密码'},{max:20,message:'请输入最多20位数的密码'}]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    placeholder="密码"
                                />
                            </Form.Item>
                            <Form.Item>
                                <div style={{ textAlign: 'center' }}>
                                    <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.loginLoading}>
                                        {isLogin ? '登录' : '注册'}
                                    </Button>
                                    <Button type='link' onClick={() => this.openModel()}>{isLogin ? "去注册" : '已有账号去登录'}</Button>
                                </div>
                                <br />
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Login;