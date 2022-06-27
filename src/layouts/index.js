/*
 * @Author: your name
 * @Date: 2020-12-16 15:45:37
 * @LastEditTime: 2022-06-25 14:43:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \app\src\layouts\index.js
 */
import React from 'react';
import { connect } from 'dva';
import { message,Drawer } from 'antd';
import router from 'umi/router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {UserOutlined} from '@ant-design/icons'


@connect(({ loginModel }) => ({
  ...loginModel
}))
class BasicLayout extends React.Component {
  state={
    showRightBox:false
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'loginModel/save',
      payload: {
        loginUser: sessionStorage.getItem('roles'),
      }
    })
  }
  changeRoter = (e) => {
    router.push(e.key);
  }
  handleLogout = () => {
    sessionStorage.setItem('roles', null);
    this.props.dispatch({
      type: 'loginModel/save',
      payload: {
        loginUser: null,
      }
    })
    router.push('/login');
    message.success('退出成功！');
  }
  toPerson = () => {
    router.push('/person');
  }
  openLeftBox=()=>{
    this.setState({
      showRightBox:true
    })
  }
  render() {
    return (
      <>
        <div style={{height:'60px',lineHeight:'60px',display:'flex',borderBottom:'1px solid #ccc'}}>
          <div style={{margin:'0 20px',cursor:'pointer'}} onClick={()=>this.openLeftBox()}>
          <UserOutlined />
          </div>
          <div style={{flex:'1',textAlign:'center'}}>海天盛宴。</div>
        </div>
        <TransitionGroup>
          <CSSTransition key={window.location.pathname} classNames="fade" timeout={300}>
            <div style={{ height: 'calc(100vh - 60px)' }}>
              {this.props.children}
            </div>
          </CSSTransition>
        </TransitionGroup>
        <Drawer width={'60vw'} closable={false} title={this.props.loginUser&&JSON.parse(this.props.loginUser).userName} placement="left"  onClose={()=>{this.setState({showRightBox:false})}} visible={this.state.showRightBox}>
        <p onClick={()=>this.handleLogout()}>退出</p>
      </Drawer>
      </>
    );
  }
}

export default BasicLayout;
