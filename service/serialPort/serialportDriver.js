const SerialPortDriver = require('serialport');
const iconv = require('iconv-lite'); // 引入数据编码格式转换模块
const moment = require('dayjs');

class SerialPort {
  constructor({ baudRate = 9600, autoOpen = true, dataBits = 7, stopBits = 1 }) {
    this.serialPort;
    this.baudRate = baudRate;
    this.autoOpen = autoOpen;
    this.dataBits = dataBits;
    this.stopBits = stopBits;
    this.messageCb;
    this.errCb;
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

  openSerial() {
    // this.serialPort = new SerialPort('/dev/tty.wchusbserial14410', {
    this.serialPort = new SerialPort('/dev/tty.BeatsX-SPPServer', {
      // 波特率，可在设备管理器中对应端口的属性中查看
      baudRate: this.baudRate,
      autoOpen: this.autoOpen,
      dataBits: this.dataBits,
      stopBits: this.stopBits,
      // parity: parity,
    });
  }

  readData(dealData) {
    console.log('============ this.serialPort =============');
    console.log(this.serialPort);
    // this.serialPort.on('data', function(data) {
    //     dealData && dealData(data);
    //     // console.log('============ 1 =============');
    //     // // console.log(`data received: ${typeof data }`);
    //     // const message = iconv.decode(data, 'ascii');
    //     // console.log('============ message =============');
    //     // console.log(moment());
    //     // console.log(message);

    //     // console.log();
    //     // console.log();
    //     // console.log();
    //     // console.log();
    //     // console.log();
    //     // console.log();
    // });
    // //错误监听
    // this.serialPort.on('error', function(error) {
    //     console.log('error: ' + error);
    // });
  }
}

module.exports = SerialPort;
