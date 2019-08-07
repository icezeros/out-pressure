import url from 'url';
import path from 'path';
import { ipcMain, BrowserWindow } from 'electron';
import moment from 'moment';
import _ from 'lodash';
export default function handlePressureMessage() {
  ipcMain.on('pressure-start', async (event, data) => {
    // Object.assign(global, data);
    console.log('============ data =============');
    console.log(data);
    const pressure = global.pressure;
    if (pressure.job.enabled) {
      global.pressure.job = {
        ...global.pressure.job,
        enabled: false,
      };
      const db = global.db;
      const experiment = db.collections.get('experiment');
      const log = db.collections.get('log');
      const logs = await log.asyncFind({ experimentId: pressure.job._id });
      const values = logs.map(log => log.value);
      const max = _.max(values) || 0;
      const min = _.min(values) || 0;
      const count = values.length || 0;
      const average = _.sum(values) / count || 0;
      await experiment.asyncUpdate(
        { _id: pressure.job._id },
        {
          index: pressure.job.index,
          max,
          min,
          count,
          average,
          duration: moment.duration(moment() - pressure.job.time).asSeconds(),
          status: 'finished',
        },
        {
          upsert: true,
        }
      );
    } else {
      const db = global.db;
      const experiment = db.collections.get('experiment');
      const maxEp = await experiment.asyncFindOne({}, [
        ['sort', { index: -1 }],
      ]);
      const index = maxEp ? maxEp.index + 1 : 0;
      console.log('============ maxEp =============');
      console.log(maxEp);
      console.log('============ index =============');
      console.log(index);
      const result = await experiment.asyncInsert({
        index: index,
        status: 'pending',
      });
      console.log('============ result =============');
      console.log(result);
      global.pressure.job = {
        ...global.pressure.job,
        enabled: true,
        time: moment(),
        _id: result._id,
        index: index,
      };
    }
  });

  ipcMain.on('pressure-zero', (event, data) => {
    // Object.assign(global, data);
    console.log('============ data =============');
    console.log(data);
    global.pressure = {
      ...global.pressure,
      offset: 0 - global.pressure.baseValue,
      value: 0,
    };
    console.log('============ global =============');
    console.log(global.pressure);
  });
}
// global.pressure = {
//     job: {
//       enabled: false,
//       time: 0,
//     },
//     baseTime: moment().format('x'),
//     baseValue: -100,
//     offset: 0,
//     value: -100,
//     index: 0,
//     time: moment().format('x'),
//   };
