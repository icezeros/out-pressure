import { Table, Divider, Tag, Modal /* Card */ } from 'antd';
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';

export default class ChartModal extends Component {
  constructor() {
    super();
    this.state = {
      visible: true,
    };
  }

  render() {
    const { visible, handleCancel, handleOk } = this.props;
    return (
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    );
  }
}
