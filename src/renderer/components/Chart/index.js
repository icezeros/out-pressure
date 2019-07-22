import { Component } from 'react';
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

export default class CurvedChart extends Component {
  render() {
    const { height = 400 } = this.props;
    const data = [
      {
        month: 'Jan',
        city: 'Tokyo',
        temperature: 7,
        displacement: 1,
        pressure: 1.2,
      },
      {
        month: 'Jan',
        city: 'London',
        temperature: 3.9,
        displacement: 1,
        pressure: 1.2,
      },
      {
        month: 'Feb',
        city: 'Tokyo',
        temperature: 6.9,
        displacement: 1,
        pressure: 1.2,
      },
      {
        month: 'Feb',
        city: 'London',
        temperature: 4.2,
        displacement: 1,
        pressure: 1.2,
      },
      {
        month: 'Mar',
        city: 'Tokyo',
        temperature: 9.5,
        displacement: 1,
        pressure: 1.2,
      },
      {
        month: 'Mar',
        city: 'London',
        temperature: 5.7,
        displacement: 1,
        pressure: 1.2,
      },
      {
        month: 'Apr',
        city: 'Tokyo',
        temperature: 14.5,
        displacement: 1,
        pressure: 1.2,
      },
      {
        month: 'Apr',
        city: 'London',
        temperature: 8.5,
        displacement: 1,
        pressure: 1.2,
      },
      {
        month: 'May',
        city: 'Tokyo',
        temperature: 18.4,
        displacement: 1,
        pressure: 1.2,
      },
      {
        month: 'May',
        city: 'London',
        temperature: 11.9,
        displacement: 1,
        pressure: 1.2,
      },
      {
        month: 'Jun',
        city: 'Tokyo',
        temperature: 21.5,
        displacement: 1,
        pressure: 1.2,
      },
      {
        month: 'Jun',
        city: 'London',
        temperature: 15.2,
        displacement: 1,
        pressure: 1.2,
      },
      {
        month: 'Jul',
        city: 'Tokyo',
        temperature: 25.2,
        displacement: 1,
        pressure: 1.2,
      },
      {
        month: 'Jul',
        city: 'London',
        temperature: 17,
        displacement: 1,
        pressure: 1.2,
      },
      {
        month: 'Aug',
        city: 'Tokyo',
        temperature: 26.5,
        displacement: 1,
        pressure: 1.2,
      },
      {
        month: 'Aug',
        city: 'London',
        temperature: 16.6,
        displacement: 1,
        pressure: 1.2,
      },
      {
        month: 'Sep',
        city: 'Tokyo',
        temperature: 23.3,
        displacement: 1,
        pressure: 1.2,
      },
      {
        month: 'Sep',
        city: 'London',
        temperature: 14.2,
        displacement: 1,
        pressure: 1.2,
      },
      {
        month: 'Oct',
        city: 'Tokyo',
        temperature: 18.3,
        displacement: 1,
        pressure: 1.2,
      },
      {
        month: 'Oct',
        city: 'London',
        temperature: 10.3,
        displacement: 1,
        pressure: 1.2,
      },
      {
        month: 'Nov',
        city: 'Tokyo',
        temperature: 13.9,
        displacement: 1,
        pressure: 1.2,
      },
      {
        month: 'Nov',
        city: 'London',
        temperature: 6.6,
        displacement: 1,
        pressure: 1.2,
      },
      {
        month: 'Dec',
        city: 'Tokyo',
        temperature: 9.6,
        displacement: 1,
        pressure: 1.2,
      },
      {
        month: 'Dec',
        city: 'London',
        temperature: 4.8,
        displacement: 1,
        pressure: 1.2,
      },
    ];
    const cols = {
      month: {
        range: [0, 1],
      },
    };
    return (
      <div style={{ margin: 0 }}>
        <Chart
          height={height}
          animation="false"
          data={data}
          scale={cols}
          forceFit
        >
          <Legend />
          <Axis name="month" />
          {/* <Axis name="displacement" position="right" /> */}
          <Axis
            name="temperature"
            label={{
              formatter: val => val,
            }}
          />
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom
            type="line"
            position="month*temperature"
            size={2}
            color={'city'}
            shape={'smooth'}
          />
          <Geom
            type="point"
            position="month*temperature"
            size={4}
            shape={'circle'}
            color={'city'}
            style={{
              stroke: '#fff',
              lineWidth: 1,
            }}
          />
        </Chart>
      </div>
    );
  }
}
