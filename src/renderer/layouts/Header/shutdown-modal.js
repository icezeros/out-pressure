import { Table, Divider, Tag, Modal /* Card */ } from 'antd';
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Chart from '../../components/Chart';
export default class ShutdownModal extends Component {
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
        visible={visible}
        footer={null}
        closable={false}
        onOk={handleOk}
        onCancel={handleCancel}
        width={400}
        centered={true}
        bodyStyle={{ backgroundColor: '#424242', zIndex: 500 }}
      >
        {/* <Chart data={data} /> */}
        <p>sss</p>
      </Modal>
    );
  }
}
