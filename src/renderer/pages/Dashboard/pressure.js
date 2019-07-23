import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Divider, Col /* Button */ /* Card */ } from 'antd';
import CurvedChart from '../../components/Chart';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import styles from './index.css';
console.log('============ CurvedChart =============');
console.log(CurvedChart);

import Chart from './chart';

@connect(({ sensor }) => ({
    currentPressure: sensor.currentPressure,
  }))
export default class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {} = this.props;
    console.log('============ currentPressure =============');
    console.log();
    return (
      <div>
        <span>aa</span>
      </div>
    );
  }
}
