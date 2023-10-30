/*
 * @Author: your name
 * @Date: 2020-12-16 15:45:37
 * @LastEditTime: 2023-10-30 17:25:01
 * @LastEditors: 1039874238 1039874237@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \app\src\layouts\index.js
 */
import React from 'react';
import { connect } from 'dva';
import { Layout, Menu, Row, Col, Avatar, message, Dropdown, ConfigProvider } from 'antd';
import router from 'umi/router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import zhCN from 'antd/es/locale/zh_CN';

const { Header, Content } = Layout;
const mainMenu = [
  { label: '南工大', key: '/botNJTech' },
];
const defaultSelectedKeys = window.location.hash.replace('#', '');

@connect(({ loginModel }) => ({
  ...loginModel,
}))
class BasicLayout extends React.Component {
  state = {
    showRightBox: false,
  };
  changeRoter = e => {
    router.push(e.key);
  };
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <Layout>
          <Header>
            <Row>
              <Col span={22}>
                <Menu
                  theme="dark"
                  mode="horizontal"
                  style={{ lineHeight: '64px' }}
                  onClick={this.changeRoter}
                  defaultSelectedKeys={[defaultSelectedKeys]}
                  items={mainMenu}
                />
              </Col>
              <Col span={2}>
                <div style={{ textAlign: 'right' }}>
                    <div>
                      <Avatar
                        size={32}
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                      />
                    </div>
                </div>
              </Col>
            </Row>
          </Header>
          <Content>
            <TransitionGroup>
              <CSSTransition key={window.location.pathname} classNames="fade" timeout={300}>
                <div style={{ height: 'calc(100vh - 64px)', padding: '10px 20px' }}>
                  {this.props.children}
                </div>
              </CSSTransition>
            </TransitionGroup>
          </Content>
        </Layout>
      </ConfigProvider>
    );
  }
}

export default BasicLayout;
