import React, { Component } from 'react';
import { connect } from 'dva';

@connect(({ sensor }) => ({
  currentPressure: sensor.currentPressure,
}))
export default class Pressure extends Component {
  render() {
    const { currentPressure } = this.props;
    return (
      <div style={{ height: 100, width: 100, paddingLeft: 100 }}>
        <font style={{ fontSize: '500%' }}>{currentPressure.value}</font>
      </div>
    );
  }
}
