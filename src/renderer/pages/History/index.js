import { Table, Divider, Tag, Modal /* Card */ } from 'antd';
import React, { Component } from 'react';
import ChartModal from './chart-modal';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
const { Column, ColumnGroup } = Table;

const data = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '4',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '5',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '6',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '7',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '8',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '9',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '10',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
export default class History extends Component {
  constructor() {
    super();
    this.state = {
      pageCurrent: 1,
      visible: false,
    };
  }
  onChange = pageInfo => {
    this.setState({
      pageCurrent: pageInfo.current,
    });
  };
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  clickRow = data => {
    console.log('========data');
    console.log(data);
    this.setState({
      visible: true,
    });
  };
  render() {
    const { pageCurrent } = this.state;
    return (
      <div>
        <Paper
          raised={true}
          elevation={20}
          style={{
            paddingTop: 10,
          }}
        >
          {''}
          w2323423
        </Paper>
        <Paper
          raised={true}
          elevation={20}
          style={{
            marginTop: 10,
            paddingTop: 10,
          }}
        >
          {''}
          <Table
            dataSource={data}
            size="middle"
            pagination={{ total: 500, defaultCurrent: 1, current: pageCurrent }}
            onChange={this.onChange}
            onRow={(record, index) => {
              return {
                onClick: event => {
                  {
                    /* console.log('========event');
                console.log(index);
                console.log(record);
                console.log(event.type);
                console.log(event.target);
                console.log(event.metaKey); */
                  }
                }, // 点击行
                onDoubleClick: event => {},
                onContextMenu: event => {},
                onMouseEnter: event => {}, // 鼠标移入行
                onMouseLeave: event => {},
              };
            }}
          >
            <Column title="First Name" dataIndex="firstName" key="firstName" />

            <Column title="Age" dataIndex="age" key="age" />
            <Column title="Address" dataIndex="address" key="address" />
            <Column
              title="Tags"
              dataIndex="tags"
              key="tags"
              render={tags => (
                <span>
                  {tags.map(tag => (
                    <Tag color="blue" key={tag}>
                      {tag}
                    </Tag>
                  ))}
                </span>
              )}
            />
            <Column
              title="Action"
              key="action"
              render={(text, record) => (
                <span>
                  <a onClick={() => this.clickRow(record)}>
                    详情 {record.lastName}
                  </a>
                  <Divider type="vertical" />
                  <a href="javascript:;">删除</a>
                </span>
              )}
            />
          </Table>
          <ChartModal
            visible={this.state.visible}
            handleOk={this.handleOk}
            handleCancel={this.handleCancel}
          />
        </Paper>
      </div>
    );
  }
}
