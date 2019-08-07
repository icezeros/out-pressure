import { Table, Divider, Tag, Modal /* Card */ } from 'antd';
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Chart from '../../components/Chart';
export default class ChartModal extends Component {
  constructor() {
    super();
    this.state = {
      visible: true,
    };
  }

  render() {
    const { visible, handleCancel, handleOk, data } = this.props;
    console.log('============ data =============');
    console.log(data);
    return (
      <Modal
        title="详情"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={900}
      >
        <Chart data={data} />
      </Modal>
    );
  }
}
