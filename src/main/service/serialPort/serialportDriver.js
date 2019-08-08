// const SerialPortDriver = require('serialport');
// const iconv = require('iconv-lite'); // 引入数据编码格式转换模块
// const moment = require('moment');

import SerialPortDriver from 'serialport';
import iconv from 'iconv-lite';
import moment from 'moment';
class SerialPort {
  constructor({
    baudRate = 9600,
    autoOpen = true,
    dataBits = 7,
    stopBits = 1,
  }) {
    this.serialPort = null;
    this.baudRate = baudRate;
    this.autoOpen = autoOpen;
    this.dataBits = dataBits;
    this.stopBits = stopBits;
    this.messageCb = null;
    this.errCb = null;
  }

  static async scanPort() {
    return new Promise((resolve, reject) => {
      SerialPortDriver.list((error, ports) => {
        if (error) {
          return reject(error);
        }
        return resolve(ports);
      });
    });
  }

  openSerial(messageCb) {
    const that = this;
    if (messageCb) {
      that.messageCb = messageCb;
    }
    // that.serialPort = new SerialPort('/dev/tty.wchusbserial14410', {
    // that.serialPort = new SerialPortDriver('/dev/tty.usbserial-14610', {
    that.serialPort = new SerialPortDriver('/dev/ttyUSB0', {
      // 波特率，可在设备管理器中对应端口的属性中查看
      baudRate: that.baudRate,
      autoOpen: that.autoOpen,
      dataBits: that.dataBits,
      stopBits: that.stopBits,
      // parity: parity,
    });
    that.serialPort.on('data', data => {
      if (that.messageCb) {
        that.messageCb({ time: moment(), data });
      }
    });
    // 错误监听
    that.serialPort.on('error', error => {
      console.log(`error: ${error}`);
    });
  }

  //   readData(dealData) {
  //     this.serialPort.on('data', (data) => {
  //       const message = iconv.decode(data, 'ascii');
  //       console.log('============ message =============');
  //       console.log(
  //         moment()
  //           .format('YYYY-MM-DD hh:mm:ss SSS')
  //           .toString(),
  //       );
  //       console.log(message.split(','));

  //       console.log();
  //       console.log();
  //       console.log();
  //       console.log();
  //       console.log();
  //       console.log();
  //     });
  //     // 错误监听
  //     this.serialPort.on('error', (error) => {
  //       console.log(`error: ${error}`);
  //     });
  //   }
}

export default SerialPort;
