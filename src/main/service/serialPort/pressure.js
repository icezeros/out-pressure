// const _ = require('lodash');
// const iconv = require('iconv-lite');

import _ from 'lodash';
import iconv from 'iconv-lite';
// { tag1: 'ST', tag3: 'NT', time: '1564410688501', value: 0 }
// 引入数据编码格式转换模块
export default function analyPressure({ time, data }) {
  console.log('============ 123432 =============');
  console.log(123432);
  const pressure = global.pressure;

  const tmpMessage = iconv.decode(data, 'ascii');
  let message = '';
  _.forEach(tmpMessage, (v, k) => {
    if (v === '\r') {
      console.log('============ rrr k =============');
      console.log(k);
      if (k >= 14) {
        message = tmpMessage.substring(k - 14, k);
        console.log('============ message =============');
        console.log(message);
      } else {
        message = tmpMessage.substring(k + 1, k + 15);
      }
    }
  });

  const arr = message.split(',');
  const basePressure = {
    tag1: arr[0],
    tag3: arr[1],
    time: time.format('x'),
    baseValue: Number(arr[2]),
  };
  console.log('============ arr =============');
  console.log(arr);
  console.log('============ basePressure =============');
  console.log(basePressure);
  console.log();
  if (
    pressure.baseValue !== basePressure.baseValue ||
    Math.abs(basePressure.time - pressure.time) > 1000
  ) {
    pressure.baseValue = basePressure.baseValue;
    pressure.value = basePressure.baseValue + pressure.offset;
    pressure.time = basePressure.time;
    pressure.index = basePressure.time - pressure.baseTime;

    if (pressure.job.enabled) {
      // 数据记录
    }

    const mainWindow = global.application.windowManager.getWindow('main');
    mainWindow.webContents.send('main-msg-pressure', pressure);
  }
  return arr;
}
