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
              style={{ height: 200, padding: 20 }}
            >
              {/* <Button type="primary" size="large">
                开始
              </Button> */}

              <Button
                fullWidth
                variant="contained"
                color="primary"
                style={{ height: 150 }}
              >
                开始测量
              </Button>
            </Paper>
          </Col>
          <Col span={8}>
            <Paper
              elevation={20}
              raised={true}
              title="压力"
              style={{ height: 200, padding: 20 }}
            >
              <Button variant="contained" fullWidth color="primary">
                压力置零
              </Button>
              <Divider>压力</Divider>
              <p style={{ size: 66 }}>{}</p>
            </Paper>
          </Col>
          <Col span={8}>
            <Paper
              elevation={20}
              raised={true}
              title="位移"
              style={{ height: 200, padding: 20 }}
            >
              <Button variant="contained" fullWidth color="primary">
                位移置零
              </Button>
              <Divider>位移</Divider>
            </Paper>
          </Col>
        </Row>
      </div>
    );
  }
}
{
  /* <div>
        <div className={styles.dataContainer}>
          <Row>
            <Col span={8}>
              <Button type="primary">压力置零</Button>
            </Col>
            <Col span={8}>
              <Button type="primary">开始</Button>
            </Col>
            <Col span={8}>col-8</Col>
          </Row>
        </div>

        <Row>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
        </Row>
        <Row>
          <Col span={24}>sdfasdfasdf</Col>
        </Row>
        <Card title="卡片标题">
          <Col span={18}>
            <CurvedChart />
          </Col>
          <Col span={6}>4444</Col>
        </Card>
        <Row />
      </div> */
}
