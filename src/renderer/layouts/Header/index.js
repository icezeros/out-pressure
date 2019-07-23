import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';
import './index.css';
import { connect } from 'dva';

const { Header } = Layout;

@connect(({ sensor }) => ({
  sensor,
  currentPressure: sensor.currentPressure,
}))
class HeaderComponent extends Component {
  render() {
    const { currentPressure } = this.props;
    return (
      <Header className="header">
        <Row>
          <Col span={8}>col-12</Col>
          <Col span={8}>压力: {currentPressure.pressure}</Col>
          <Col span={8}>col-6</Col>
        </Row>
      </Header>
    );
  }
}

export default HeaderComponent;
