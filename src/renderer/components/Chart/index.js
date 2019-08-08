import React, { Component } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  Brush,
  AreaChart,
  Area,
} from 'recharts';
import { connect } from 'dva';
import moment from 'moment';
export default class Chart extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      index: 0,
      startIndex: 0,
      endIndex: 0,
      autoMove: true,
      areaLength: 10,
    };
  }
  test = ({ startIndex, endIndex }) => {
    const { data } = this.props;
    this.setState({
      startIndex,
      endIndex,
      autoMove: endIndex === data.length - 1,
      areaLength: endIndex - startIndex,
    });
    console.log({ startIndex, endIndex }, data.length);
  };
  test2 = a => {
    console.log('====443====');
    console.log(a);
  };
  render() {
    const { data = [] } = this.props;
    const { autoMove, startIndex, endIndex, areaLength } = this.state;

    const endIndexTmp = autoMove ? data.length - 1 : endIndex;
    const startIndexTmp = autoMove
      ? endIndexTmp - areaLength > 0
        ? endIndexTmp - areaLength
        : 0
      : startIndex;
    console.log('========= endIndexTmp==========');
    console.log(endIndexTmp);
    console.log();

    console.log('========= startIndexTmp==========');
    console.log(startIndexTmp);
    console.log();
    return (
      <div className="line-chart-wrapper">
        <LineChart
          width={800}
          height={400}
          data={data}
          margin={{ top: 40, right: 40, bottom: 20, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <XAxis
            interval="10"
            dataKey="index"
            domain={[
              (data && data[startIndexTmp] && data[startIndexTmp].index) ||
                'auto',
              (data && data[endIndexTmp] && data[endIndexTmp].index) || 'auto',
            ]}
            type="number"
            tickFormatter={value => {
              return moment.duration(value, 'ms').asSeconds();
            }}
          >
            <Label value="时间" offset={-33} position="insideBottomRight" />
          </XAxis>
          <YAxis
            domain={['auto', 'auto']}
            axisLine="false"
            tickLine="false"
            label={{
              value: '压力',
              offset: -2,
              position: 'insideTopLeft',
            }}
            labelStyle={{ marginLeft: 500 }}
          />
          <Tooltip
            wrapperStyle={{
              borderColor: 'white',
              boxShadow: '2px 2px 3px 0px rgb(204, 204, 204)',
            }}
            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
            labelStyle={{ fontWeight: 'bold', color: '#666666' }}
            formatter={(value, name) => {
              return [value, name];
            }}
            labelFormatter={(value, name) => {
              return [moment.duration(value, 'ms').asSeconds(), name];
            }}
          />
          <Legend />
          <Line
            dataKey="value"
            isAnimationActive={false}
            stroke="#0be636"
            dot
          />
          <Brush
            dataKey="index"
            startIndex={startIndexTmp}
            endIndex={endIndexTmp}
            onChange={this.test}
            tickFormatter={value => {
              return moment.duration(value, 'ms').asSeconds();
            }}
          >
            <AreaChart>
              <YAxis hide domain={['auto', 'auto']} />
              <XAxis
                interval="10"
                dataKey="index"
                domain={[
                  (data[0] && data[0].index) || 'auto',
                  (data[data.length - 1] && data[data.length - 1].index) ||
                    'auto' ||
                    'auto',
                ]}
                type="number"
                hide={true}
              />
              <Area
                dataKey="value"
                stroke="#0be636"
                fill="#0be636"
                isAnimationActive={false}
                dot={false}
                onMouseMove={this.test2}
              />
            </AreaChart>
          </Brush>
        </LineChart>
      </div>
    );
  }
}
