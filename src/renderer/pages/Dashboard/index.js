import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Divider, Col /* Button */ /* Card */ } from 'antd';
import CurvedChart from '../../components/Chart';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import styles from './index.css';
import moment from 'moment';
import Chart from './chart';
import Pressure from './pressure';
import { ipcRenderer } from 'electron';
@connect(({ sensor }) => ({
  sensor,
  currentPressure: sensor.currentPressure,
}))
export default class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleStart = e => {
    console.log('============ e =============');
    console.log(e);
    ipcRenderer.send('pressure-start', {
      a: 1,
    });
  };
  handlePressureZero = () => {
    ipcRenderer.send('pressure-zero', {
      a: 1,
    });
  };
  render() {
    const { currentPressure } = this.props;

    return (
      <div>
        <Row>
          <Paper
            elevation={20}
            raised={true}
            bordered={true}
            style={{ height: 400, padding: 0 }}
          >
            <Chart />
          </Paper>
        </Row>

        <Row gutter={16} style={{ marginTop: 20 }}>
          <Col span={8}>
            <Paper
              elevation={20}
              raised={true}
              bordered={true}
              style={{ height: 260, padding: 20 }}
            >
              {/* <Button type="primary" size="large">
                开始
              </Button> */}

              <Button
                fullWidth
                variant="contained"
                color="primary"
                style={{ height: '100%' }}
                onClick={this.handleStart}
              >
                {currentPressure.job && currentPressure.job.enabled ? (
                  <font style={{ fontSize: '300%' }}>
                    {`结束(${currentPressure.job.countDown})`}
                  </font>
                ) : (
                  <font style={{ fontSize: '400%' }}>开 始</font>
                )}
              </Button>
            </Paper>
          </Col>
          <Col span={8}>
            <Paper
              elevation={20}
              raised={true}
              title="压力"
              style={{ height: 260, padding: 20 }}
            >
              <Button
                variant="contained"
                fullWidth
                color="primary"
                onClick={this.handlePressureZero}
              >
                压力归零
              </Button>
              <Divider>压力</Divider>
              <Pressure />
            </Paper>
          </Col>
          <Col span={8}>
            <Paper
              elevation={20}
              raised={true}
              title="位移"
              style={{ height: 260, padding: 20 }}
            >
              <Button variant="contained" fullWidth color="primary">
                位移归零
              </Button>
              <Divider>位移</Divider>
            </Paper>
          </Col>
        </Row>
      </div>
    );
  }
}
