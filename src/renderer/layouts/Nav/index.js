import React, { Component } from 'react';
import { Layout, Menu, Row, Icon } from 'antd';
import Link from 'umi/link';
// import icon from '$public/image/icon.png';
import './index.css';

const { Header } = Layout;
const { Item, SubMenu } = Menu;

class Nav extends Component {
  constructor(props) {
    super(props);
    console.log('============ location.hash =============');
    console.log(location.hash);
    const hash = location.hash.split('/')[1];
    this.state = { current: hash ? hash : 'Home' };
  }

  handleClick = e => {
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <div
        style={{ width: 160, height: '100%', zIndex: 999, position: 'fixed' }}
      >
        <div className="iconContainer">
          {/* <img src={icon} className="icon" /> */}
          <span className="titleText">压力测试仪</span>
        </div>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
          selectedKeys={[this.state.current]}
          onClick={this.handleClick}
        >
          <Item key="Dashboard">
            <Link to="/Dashboard">
              <Icon type="dashboard" theme="filled" />
              <span>仪表盘</span>
            </Link>
          </Item>

          <Item key="History">
            <Link to="/History">
              <Icon type="database" theme="filled" />
              <span>历史数据</span>
            </Link>
          </Item>
          <Item key="Setting">
            <Link to="/Setting">
              <Icon type="setting" theme="filled" />
              <span>设置</span>
            </Link>
          </Item>
          {/* <Item key="Demo">
            <Link to="/Demo">Demo</Link>
          </Item>
          <Item key="Chart">
            <Link to="/Chart">Chart</Link>
          </Item> */}
          {/* <Item key="Window">
            <Link to="/Window">窗口</Link>
          </Item>
          <Item key="IPC">
            <Link to="/IPC">进程通信</Link>
          </Item>
          <Item key="Dialog">
            <Link to="/Dialog">弹框</Link>
          </Item>
          <Item key="System">
            <Link to="/System">系统</Link>
          </Item>
          <Item key="MenuView">
            <Link to="/MenuView">菜单</Link>
          </Item>
          <Item key="Print">
            <Link to="/Print">打印</Link>
          </Item>
          <Item key="Protect">
            <Link to="/Protect">保护措施</Link>
          </Item>
          <Item key="Shell">
            <Link to="/Shell">Shell</Link>
          </Item>
          <Item key="Antd">
            <Link to="/Antd">Antd</Link>
          </Item>
          <Item key="Chart">
            <Link to="/Chart">Chart</Link>
          </Item> */}
        </Menu>
      </div>
    );
  }
}

export default Nav;
