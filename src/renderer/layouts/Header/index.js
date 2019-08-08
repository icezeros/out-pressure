import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';
import './index.css';
import { connect } from 'dva';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';

const { Header } = Layout;

@connect(({ sensor, router }) => ({
  sensor,
  currentPressure: sensor.currentPressure,
  pathname: router.location.pathname,
}))
class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    console.log('============ location.hash =============');
    console.log(location.hash);
    const hash = location.hash.split('/')[1];
    console.log(hash);
  }
  shouldComponentUpdate(newProps, newState) {
    return true;
  }
  render() {
    const { currentPressure, pathname } = this.props;
    console.log('pathname====');
    console.log(pathname);
    return (
      <Header className="header">
        <Row>
          <Col span={8}>col-12</Col>
          <Col span={8}>
            {pathname !== '/Dashboard' ? (
              <Col span={8}>压力: {currentPressure.value}</Col>
            ) : (
              ''
            )}
          </Col>
          <Col style={{ paddingLeft: 200 }} span={8}>
            <Fab size="small" variant="extended" aria-label="Edit">
              关机
            </Fab>
          </Col>
        </Row>
      </Header>
    );
  }
}

export default HeaderComponent;
