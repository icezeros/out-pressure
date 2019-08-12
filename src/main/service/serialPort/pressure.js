// const _ = require('lodash');
// const iconv = require('iconv-lite');

import _ from 'lodash';
import iconv from 'iconv-lite';
import moment from 'moment';
// { tag1: 'ST', tag3: 'NT', time: '1564410688501', value: 0 }
// 引入数据编码格式转换模块
iconv.skipDecodeWarning = true;
export default async function analyPressure({ time, data }) {
  const pressure = global.pressure;

  const tmpMessage = iconv.decode(data, 'ascii');
  let message = '';
  _.forEach(tmpMessage, (v, k) => {
    if (v === '\r') {
      if (k >= 14) {
        message = tmpMessage.substring(k - 14, k);
        // console.log('============ message =============');
        // console.log(message);
      } else {
        message = tmpMessage.substring(k + 1, k + 15);
      }
    }
  });

  const arr = message.split(',');
  const basePressure = {
    tag1: arr[0],
    tag3: arr[1],
    time: time,
    baseValue: Number(arr[2]),
  };
  if (
    (pressure.baseValue !== basePressure.baseValue &&
      Math.abs(basePressure.time - pressure.time) > 200) ||
    Math.abs(basePressure.time - pressure.time) > 1000
  ) {
    pressure.baseValue = basePressure.baseValue;
    pressure.value = basePressure.baseValue + pressure.offset;
    pressure.time = basePressure.time;
    pressure.index = basePressure.time - pressure.baseTime;
    if (pressure.job.enabled) {
      const countDown = moment
        .duration(60, 'seconds')
        .subtract(moment.duration(pressure.time - pressure.job.time))
        .asSeconds();
      if (countDown >= 0) {
        // 数据记录
        const db = global.db;
        const log = db.collections.get('log');

        pressure.job = {
          ...pressure.job,
          countDown: Math.round(countDown),
        };
        log.insert({
          baseTime: pressure.baseTime.format('x'),
          baseValue: pressure.baseValue,
          offset: pressure.offset,
          value: pressure.value,
          index: pressure.index,
          relativeIndex: moment
            .duration(pressure.time - pressure.job.time, 'ms')
            .asMilliseconds(),
          time: pressure.time.format('x'),
          experimentId: pressure.job._id,
        });
      } else {
        pressure.job = {
          ...pressure.job,
          enabled: false,
          countDown: countDown,
        };
        const tmpPressure = global.pressure;
        const db = global.db;
        const experiment = db.collections.get('experiment');
        const log = db.collections.get('log');
        const logs = await log.asyncFind({ experimentId: tmpPressure.job._id });
        const values = logs.map(log => log.value);
        const max = _.max(values) || 0;
        const min = _.min(values) || 0;
        const count = values.length || 0;
        const average = _.sum(values) / count || 0;
        await experiment.asyncUpdate(
          { _id: tmpPressure.job._id },
          {
            index: tmpPressure.job.index,
            max,
            min,
            count,
            average,
            duration: moment
              .duration(moment() - tmpPressure.job.time)
              .asSeconds(),
            status: 'finished',
          },
          {
            upsert: true,
          }
        );
      }
    }

    const mainWindow = global.application.windowManager.getWindow('main');
    mainWindow.webContents.send('main-msg-pressure', pressure);
  }
  return arr;
}
