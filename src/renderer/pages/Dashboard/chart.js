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
@connect(({ sensor }) => ({
  sensor,
  historyPressures: sensor.historyPressures,
}))
export default class Chart extends Component {
  constructor() {
    super();
    this.state = {
      historyPressures: [],
      index: 0,
    };
  }

  render() {
    const { historyPressures } = this.props;
    console.log('============ historyPressures =============');
    console.log(historyPressures);
    const index = historyPressures
      ? historyPressures.length > 10
        ? historyPressures.length - 10
        : 0
      : 0;
    return (
      <div className="line-chart-wrapper">
        <LineChart
          width={1050}
          height={400}
          data={historyPressures}
          margin={{ top: 40, right: 40, bottom: 20, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <XAxis interval="10" dataKey="date">
            <Label value="时间" offset="-33" position="insideBottomRight" />
          </XAxis>
          <YAxis
            domain={['auto', 'auto']}
            axisLine="false"
            tickLine="false"
            label={{
              value: '压力',
              offset: -5,
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
          />
          <Legend />
          <Line dataKey="pressure" stroke="#0be636" dot />
          <Brush dataKey="date" startIndex={index}>
            <AreaChart>
              <YAxis hide domain={['auto', 'auto']} />
              <Area
                dataKey="pressure"
                stroke="#0be636"
                fill="#0be636"
                dot={false}
              />
            </AreaChart>
          </Brush>
        </LineChart>
      </div>
    );
  }
}
