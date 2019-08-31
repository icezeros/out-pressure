import {
  Table,
  Divider,
  Tag,
  Modal,
  Popconfirm,
  Icon,
  message /* Card */,
} from 'antd';
import React, { Component } from 'react';
import ChartModal from './chart-modal';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
const { Column, ColumnGroup } = Table;
import { ipcRenderer } from 'electron';

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
      pageInfo: { total: 500, defaultCurrent: 1, current: 1 },
      pageCurrent: 1,
      data: data,
      visible: false,
      chartData: [],
    };
  }
  componentWillMount() {
    this.rendDataByPages({ current: 1, pageSize: 10 });
    ipcRenderer.on('export-history-result', (event, data) => {
      console.log('============ event,data =============');
      console.log(event, data);
      if (data && data.type) {
        message.success(data.message, 5);
      } else {
        message.error(data.message, 5);
      }
    });
  }
  onChangePage = pageInfo => {
    this.rendDataByPages(pageInfo);
  };
  // { current: 2, defaultCurrent: 1, pageSize: 10, total: 500 }

  rendDataByPages = pageInfo => {
    console.log('============ pageInfo =============');
    console.log(pageInfo);
    const { data, total } = ipcRenderer.sendSync(
      'get-history-page-sync',
      pageInfo
    );
    console.log('============ result =============');
    console.log(data);
    // { total: 500, defaultCurrent: 1, current: 1 },
    this.setState({
      pageInfo: { ...pageInfo, total: total },
      data: data,
    });
  };
  exportData = record => {
    ipcRenderer.send('export-history-info', record._id);
  };
  deleteData = record => {
    const pageInfo = this.state.pageInfo;
    const { data, total } = ipcRenderer.sendSync('delete-history-info-sync', {
      _id: record._id,
      pageInfo: pageInfo,
    });
    this.setState({
      pageInfo: { ...pageInfo, total: total },
      data: data,
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
    const result = ipcRenderer.sendSync('get-history-info-sync', data._id);
    console.log('============ result =============');
    console.log(result);
    this.setState({
      visible: true,
      chartData: result,
    });
  };
  // {"max":91,"min":1,"count":3,"average":41.666666666666664,"duration":3.679,"_id":"qJWkKjZLIsbOzvFs","createdAt":{"$$date":1565159110762},"updatedAt":{"$$date":1565159114443}}

  render() {
    const { pageCurrent, data, pageInfo, chartData } = this.state;
    return (
      <div>
        {/* <Paper
          raised={true}
          elevation={20}
          style={{
            paddingTop: 10,
          }}
        >
          {''}
          w2323423
        </Paper> */}
        <Paper
          raised={true}
          elevation={20}
          style={{
            marginTop: 10,
            padding: 10,
          }}
        >
          {''}
          <Table
            dataSource={data}
            pagination={pageInfo}
            onChange={this.onChangePage}
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
            <Column title="编号" dataIndex="index" key="index" />

            <Column title="最大值" dataIndex="max" key="max" />
            <Column title="最小值" dataIndex="min" key="min" />
            <Column title="记录节点数" dataIndex="count" key="count" />
            <Column title="持续时间" dataIndex="duration" key="duration" />
            {/* <Column
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
            /> */}
            <Column
              title="操作"
              key="action"
              render={(text, record) => (
                <span>
                  <a onClick={() => this.clickRow(record)}>
                    详情 {record.lastName}
                  </a>
                  <Divider type="vertical" />
                  <a onClick={() => this.exportData(record)}>导出</a>
                  <Divider type="vertical" />
                  <Popconfirm
                    title="你确定要删除吗（删除后无法恢复）？"
                    placement="topRight"
                    onConfirm={() => this.deleteData(record)}
                    icon={
                      <Icon type="question-circle-o" style={{ color: 'red' }} />
                    }
                  >
                    <a>删除</a>
                  </Popconfirm>
                  {/* <a onClick={() => this.deleteData(record)}>删除</a> */}
                  {/* <Divider type="vertical" /> */}
                </span>
              )}
            />
          </Table>
          <ChartModal
            visible={this.state.visible}
            handleOk={this.handleOk}
            handleCancel={this.handleCancel}
            data={chartData}
          />
        </Paper>
      </div>
    );
  }
}
