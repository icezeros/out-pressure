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

// @connect(({ sensor }) => ({
//   sensor,
//   currentPressure: sensor.currentPressure,
// }))
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
        <Row>
          <Paper
            elevation={20}
            raised={true}
            bordered={true}
            style={{ height: 400, padding: 0 }}
          >
            <CurvedChart />
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
              >
                XXXXX
              </Button>
            </Paper>
          </Col>
          <Col span={8}>
            <Paper
              elevation={20}
              raised={true}
              title="XXXXX"
              style={{ height: 260, padding: 20 }}
            >
              <Button variant="contained" fullWidth color="primary">
                XXXX
              </Button>
              <Divider>XXXX</Divider>
              <p style={{ size: 66 }}>{}</p>
            </Paper>
          </Col>
          <Col span={8}>
            <Paper
              elevation={20}
              raised={true}
              title="XXXXX"
              style={{ height: 260, padding: 20 }}
            >
              <Button variant="contained" fullWidth color="primary">
                XXXX
              </Button>
              <Divider>XXXXX</Divider>
            </Paper>
          </Col>
        </Row>
      </div>
    );
  }
}
