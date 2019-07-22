import React from 'react';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util,
} from 'bizcharts';

function getComponent() {
  var data = [];
  let chart;
  const scale = {
    time: {
      alias: '时间',
      type: 'linear',
      //   range: [0, 1],
      //   mask: 'MM:ss',
      minLimit: 10,
      //   mask: 'MM:ss',
      formatter: value => {
        return value / 10;
      },
      tickCount: 10,
      //   tickInterval: 10,
      nice: false,
    },
    temperature: {
      alias: '平均温度(°C)',
      //   min: 10,
      //   max: 35,
    },
    type: {
      type: 'cat',
    },
  };

  class SliderChart extends React.Component {
    constructor() {
      super();
      this.state = {
        data,
      };
    }

    componentDidMount() {
      console.log('============ 1345 =============');
      console.log(1345);
      let i = 1;
      let n = 0;
      setInterval(() => {
        var now = new Date();
        var time = now.getTime();
        // var temperature1 = ~~(Math.random() * 5) + 22;
        // var temperature2 = ~~(Math.random() * 7) + 17;
        i = i * 1.0001;
        var temperature1 = i;

        // if (data.length > 200) {
        //   data.shift();
        //   data.shift();
        // }
        if (data.length > 200) {
          scale.time.tickInterval = 20;
        }

        data.push({
          time: n,
          temperature: temperature1,
          type: '记录1',
        });
        // data.push({
        //   time: time,
        //   temperature: temperature2,
        //   type: '记录2',
        // });
        n++;
        this.setState({
          data,
        });
      }, 100);
    }
    render() {
      console.log(data.length);

      return (
        <Chart
          animation="false"
          data={data}
          scale={scale}
          forceFit
          onGetG2Instance={g2Chart => {
            chart = g2Chart;
          }}
        >
          <Tooltip />
          {data.length !== 0 ? <Axis /> : ''}
          <Geom
            type="line"
            position="time*temperature"
            color={['type', ['#ff7f0e', '#2ca02c']]}
            shape="smooth"
            size={2}
          />
        </Chart>
      );
    }
  }

  return SliderChart;
}

export default class Linerealtime extends React.Component {
  render() {
    const SliderChart = getComponent();
    return (
      <div height={100}>
        <SliderChart />
      </div>
    );
  }
}
