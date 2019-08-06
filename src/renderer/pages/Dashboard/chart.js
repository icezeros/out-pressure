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
      startIndex: 0,
      endIndex: 0,
      autoMove: true,
      areaLength: 10,
    };
  }
  test = ({ startIndex, endIndex }) => {
    const { historyPressures } = this.props;
    this.setState({
      startIndex,
      endIndex,
      autoMove: endIndex === historyPressures.length - 1,
      areaLength: endIndex - startIndex,
    });
    console.log({ startIndex, endIndex }, historyPressures.length);
  };
  test2 = a => {
    console.log('====443====');
    console.log(a);
  };
  render() {
    const { historyPressures = [] } = this.props;
    const { autoMove, startIndex, endIndex, areaLength } = this.state;
    console.log('========= autoMove==========');
    console.log(autoMove);
    console.log();

    console.log('========= startIndex==========');
    console.log(startIndex);
    console.log();

    console.log('========= endIndex==========');
    console.log(endIndex);
    console.log();

    console.log('========= areaLength==========');
    console.log(areaLength);
    console.log();

    console.log('========= historyPressures.length==========');
    console.log(historyPressures.length);
    console.log();

    const endIndexTmp = autoMove ? historyPressures.length - 1 : endIndex;
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
          width={1050}
          height={400}
          data={historyPressures}
          margin={{ top: 40, right: 40, bottom: 20, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <XAxis
            interval="10"
            dataKey="index"
            domain={[
              (historyPressures &&
                historyPressures[startIndexTmp] &&
                historyPressures[startIndexTmp].index) ||
                'auto',
              (historyPressures &&
                historyPressures[endIndexTmp] &&
                historyPressures[endIndexTmp].index) ||
                'auto',
            ]}
            type="number"
            tickFormatter={value => {
              console.log('============ value =============');
              console.log(value);
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
          >
            <AreaChart>
              <YAxis hide domain={['auto', 'auto']} />
              <XAxis
                interval="10"
                dataKey="index"
                domain={[
                  historyPressures[0].index || 'auto',
                  historyPressures[historyPressures.length - 1].index || 'auto',
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
