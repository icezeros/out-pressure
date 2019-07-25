const { isArray } = require('lodash');
const data = require('./data');
function start(arr, obj) {
  if (!isArray(arr)) {
    throw new Error('first param must be array');
  }
  arr.forEach(data => {
    if (data.funcType === 2) {
      data.addObj = obj;
    }
    if (data.children && data.children.length > 0) {
      start(data.children, obj);
    }
  });
  return arr;
}
console.log(data);
const result = start(data, { test007: 1 });
console.log(JSON.stringify(result));
