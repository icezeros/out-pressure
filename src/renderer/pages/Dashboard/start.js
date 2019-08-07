import React, { Component } from 'react';
import { connect } from 'dva';

@connect(({ sensor }) => ({
  currentPressure: sensor.currentPressure,
}))
export default class Pressure extends Component {
  render() {
    const { currentPressure } = this.props;
    return (
      <div>
        <span>{currentPressure.value}</span>
      </div>
    );
  }
}
