const SerialPort = require('./serialportDriver');
const iconv = require('iconv-lite'); // 引入数据编码格式转换模块
const moment = require('dayjs');
const _ = require('lodash');

function getIndex(strFlag) {
  // let index = 0;
  const result = {
    start: 100,
    end: 0,
  };
  _.forEach(strFlag, (v, k) => {
    if (v === '\r' && k < result.start) {
      console.log('============ k =============');
      console.log(k);
      result.start = k;
    }
    if (v === '\n' && k > result.end) {
      console.log('============ k2 =============');
      console.log(k);
      result.end = k;
    }
  });
  result.start += 2;
  result.end -= 1;
  return result;
}

(async () => {
  //   const result = await SerialPort.scanPort();
  //   console.log('============ result =============');
  //   console.log(result);
  //   let index;
  //   let strFlag;
  let flag;
  const serial = new SerialPort({});
  serial.openSerial(({ time, data }) => {
    const tmpMessage = iconv.decode(data, 'ascii');

    if (!flag) {
      flag = {
        start: 100,
        end: 0,
      };
      _.forEach(tmpMessage, (v, k) => {
        if (v === '\r' && k < flag.start) {
          flag.start = k;
        }
        if (v === '\n' && k > flag.end) {
          flag.end = k;
        }
      });
      flag.start += 2;
      flag.end -= 1;
      return flag;
    }
    const message = tmpMessage.substring(flag.start, flag.end);
    const arr = message.split(',');
    const result = {
      tag1: arr[0],
      tag3: arr[1],
      time,
      value: Number(arr[2]),
    };
    console.log('============ result =============');
    console.log(result);

    console.log();
  });
})();
// console.log('============ SerialPort =============');
// console.log(SerialPort);
// const serial = new SerialPort({});
