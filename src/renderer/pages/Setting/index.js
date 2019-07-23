import { Table, Divider, Tag, Row, Col /* , Button */ } from 'antd';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
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
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
export default class Setting extends Component {
  render() {
    return (
      <div>
        <Row gutter={16} style={{}}>
          <Col span={12}>
            <Paper
              elevation={20}
              raised={true}
              title="XXXXX"
              style={{ height: 330, padding: 20 }}
            >
              {/* <Button variant="contained" fullWidth color="primary">
                仪 表 设 置
              </Button> */}
              <Card
                variant="contained"
                fullWidth
                color="primary"
                style={{
                  padding: 10,
                  backgroundColor: '#fff',
                }}
              >
                仪 表 设 置
              </Card>
              <Divider />
              <p style={{ size: 66 }}>{}</p>
            </Paper>
          </Col>
          <Col span={12}>
            <Paper
              elevation={20}
              raised={true}
              title="XXXXX"
              style={{ height: 330, padding: 20 }}
            >
              <Button variant="contained" fullWidth color="primary">
                XXXX
              </Button>
              <Divider />
            </Paper>
          </Col>
        </Row>
        <Row gutter={16} style={{ paddingTop: 20 }}>
          <Col span={12}>
            <Paper
              elevation={20}
              raised={true}
              title="XXXXX"
              style={{ height: 330, padding: 20 }}
            >
              <Button variant="contained" fullWidth color="primary">
                XXXX
              </Button>
              <Divider />
              <p style={{ size: 66 }}>{}</p>
            </Paper>
          </Col>
          <Col span={12}>
            <Paper
              elevation={20}
              raised={true}
              title="XXXXX"
              style={{ height: 330, padding: 20 }}
            >
              <Button variant="contained" fullWidth color="primary">
                XXXX
              </Button>
              <Divider />
            </Paper>
          </Col>
        </Row>
      </div>
    );
  }
}
{
  /* <Card style={{ padding: 0, margin: 0 }}>
        <Table dataSource={data}>
         
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
                <a href="javascript:;">Invite {record.lastName}</a>
                <Divider type="vertical" />
                <a href="javascript:;">Delete</a>
              </span>
            )}
          />
        </Table>
      
        </Card> */
}
