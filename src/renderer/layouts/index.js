import React, { Component } from 'react';
import { Layout, LocaleProvider } from 'antd';
import { connect } from 'dva';
import Card from '@material-ui/core/Card';
import 'antd/dist/antd.less';
import Paper from '@material-ui/core/Paper';
import router from 'umi/router';

import zhCN from 'antd/lib/locale-provider/zh_CN';
import { ipcRenderer } from 'electron';
import Header from './Header';
import Nav from './Nav';
// import RouteContent from '$routes';
import './index.css';

const { Content } = Layout;
// var { ipcRenderer } = require('electron');
// let ipcRenderer;
// let electron;
// if (window.require) {
//   electron = window.require('electron');
//   ipcRenderer = electron.ipcRenderer;
// }
@connect(({}) => ({}))
export default class App extends Component {
  componentDidMount() {
    ipcRenderer.on('main-msg-pressure', (event, msg) => {
      //   this.setState({ msg });
      this.props.dispatch({
        type: 'sensor/updatePressure',
        payload: {
          pressure: msg,
        },
      });
    });
    router.push('/Dashboard');
  }

  render() {
    const { children, location } = this.props;

    return (
      <LocaleProvider locale={zhCN}>
        <Layout className="container">
          <Nav />
          <Layout className="bodyContainer">
            <Header />
            <Content className="bodyContainer2">{children}</Content>
          </Layout>
        </Layout>
      </LocaleProvider>
    );
  }
}
