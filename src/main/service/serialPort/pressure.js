const moment = require('dayjs');
const _ = require('lodash');
const iconv = require('iconv-lite');
// 引入数据编码格式转换模块
let flag;
function analyData({ time, data }) {
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
}

module.exports = {
  analyData,
};
