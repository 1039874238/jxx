/*
 * @Author: your name
 * @Date: 2020-12-16 15:45:37
 * @LastEditTime: 2023-11-02 11:18:45
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
  { label: '南审', key: '/botNjsj' },
  { label: '南工程', key: '/botNgc' },
  { label: '海事', key: '/botJshs' },
  { label: '南工', key: '/botNgd' },
  { label: '药科', key: '/botZgyk' },
  { label: '南科院', key: '/botNky' },
  { label: '农林', key: '/botJsnl' },
  { label: '南工业', key: '/botNJTech' },
];
let defaultSelectedKeys = null;

@connect(({ loginModel }) => ({
  ...loginModel,
}))
class BasicLayout extends React.Component {
  state = {
    showRightBox: false,
  };
  componentDidMount() {
    this.props.dispatch({
      type: 'loginModel/save',
      payload: {
        loginUser: sessionStorage.getItem('roles'),
      },
    });
    defaultSelectedKeys = window.location.hash.replace('#', '');
    router.push(defaultSelectedKeys);
  }
  changeRoter = e => {
    router.push(e.key);
  };
  handleOption = ({ key }) => {
    switch (key) {
      case '1':
        console.log(1);
        break;

      default:
        this.handleLogout();
        break;
    }
  };
  handleLogout = () => {
    sessionStorage.setItem('roles', null);
    this.props.dispatch({
      type: 'loginModel/save',
      payload: {
        loginUser: null,
      },
    });
    router.push('/login');
    message.success('退出成功！');
  };
  render() {
    const optionItem = [
      // {
      //   label: '个人信息',
      //   key: '1',
      // },
      {
        label: '注销',
        key: '2',
      },
    ];
    let userEle = (
      <div style={{ width: '100px' }}>
        <Menu onClick={this.handleOption} items={optionItem} />
      </div>
    );
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
                  <Dropdown overlay={userEle} placement="bottom">
                    <div>
                      <Avatar
                        size={32}
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                      />
                    </div>
                  </Dropdown>
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
