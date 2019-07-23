import React, { Component } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import Paper from '@material-ui/core/Paper';

export default class Demo extends Component {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/zjb47e83/';
  constructor() {
    super();
    this.state = {
      data: [
        {
          name: 1,
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 2,
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
      ],
    };
  }

  componentDidMount() {
    let i = 3;
    setInterval(() => {
      const tmpData = this.state.data;
      if (tmpData.length > 10) {
        tmpData.shift();
      }
      tmpData.push({
        name: i,
        uv: 3300,
        pv: 2420,
        amt: 2600,
      });
      i++;
      console.log('============ i =============');
      console.log(i);
      console.log('============ tmpData =============');
      console.log(tmpData);
      this.setState(() => {
        return { data: [...tmpData] };
      });
    }, 1000);
  }

  render() {
    const { data } = this.state;
    return (
      <Paper elevation={20} style={{ height: 400, padding: 0 }}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line yAxisId="right" type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </Paper>
    );
  }
}
