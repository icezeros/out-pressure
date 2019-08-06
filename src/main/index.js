import { app } from 'electron';
import is from 'electron-is';

import logger from './logger';
import Application from './Application';
import handleQuit from './event/quit';
import handleMessage from './event';
// import Db from './service/nedb';
import SerialPort from './service/serialPort/serialportDriver';
import Db from './service/nedb';
import analyPressure from './service/serialPort/pressure';
import moment from 'moment';

if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path')
    .join(__dirname, '/static')
    .replace(/\\/g, '\\\\');
}

// if (is.windows()) {
//   app.setAppUserModelId(appId);
// }
const application = new Application();
global.application = application;

function makeSingleInstance(callback) {
  if (is.mas()) {
    callback();
    return;
  }

  const gotSingleLock = app.requestSingleInstanceLock();
  if (!gotSingleLock) {
    app.quit();
  } else {
    app.on('second-instance', (event, argv, workingDirectory) => {
      logger.warn('second-instance====>', argv, workingDirectory);
      application.showPage('main');
      if (!is.macOS() && argv.length > 1) {
        this.handleAppLaunchArgv(argv);
      }
    });

    callback();
  }
}

async function init() {
  globalPressure();
  dbInit();
  await handelAppReady();
  const result = await SerialPort.scanPort();
  console.log('============ result =============');
  console.log(result);

  handleQuit();
  handleMessage();
  //   pressureInit();
  let i = 0;
  setInterval(() => {
    // console.log('============ global.pressure =============');
    // console.log(global.pressure);
    // const mainWindow = global.application.windowManager.getWindow('main');
    // mainWindow.webContents.send('main-msg-pressure', {
    //   job: {
    //     enabled: false,
    //     time: 0,
    //   },
    //   baseTime: global.pressure.baseTime,
    //   baseValue: 100,
    //   offset: 0,
    //   value: -100,
    //   index: (moment().format('x') - global.pressure.baseTime) / 1000,
    //   time: moment().format('x'),
    // });
    // { tag1: 'ST', tag3: 'NT', time: '1564410688501', value: 0 }
    console.log('============ 4444 =============');
    console.log(4444);
    const a = Math.floor(Math.random() * 100);
    analyPressure({
      time: moment(),
      data: `ST,NT,+000${a > 95 ? a : 100}.00\r\n`,
    });
  }, 100);
}
function dbInit() {
  global.db = new Db();
}
function globalPressure() {
  global.pressure = {
    job: {
      enabled: false,
      time: 0,
    },
    baseTime: moment().format('x'),
    baseValue: -100,
    offset: 0,
    value: -100,
    index: 0,
    time: moment().format('x'),
  };
}
function pressureInit() {
  console.log('============ SerialPort =============');
  console.log(SerialPort);
  console.log('============ analyPressure =============');
  console.log(analyPressure);
  const serial = new SerialPort({});
  serial.openSerial(analyPressure);
  //   const mainWindow = global.application.windowManager.getWindow('main');
}

function handelAppReady() {
  return new Promise((resolve, reject) => {
    app.on('ready', () => {
      application.showPage('main');

      global.application.on('ready', () => {
        //   this.sendUrlToApplication();
        //   this.sendFileToApplication();
      });
      return resolve();
    });

    // app.on('activate', () => {
    //   if (global.application) {
    //     logger.info('[Motrix] activate');
    //     global.application.showPage('index');
    //   }
    // });
  });
}

function handleAppWillQuit() {
  app.on('will-quit', () => {
    logger.info('[Motrix] will-quit');
    if (global.application) {
      global.application.stop();
    }
  });
}

// makeSingleInstance(init);
init();
// const test = new Db();
// const fileName = `${Math.random() * 10}`;
// // const fileName = `5555`;

// test.addCollection(fileName);
// test.collections.get(fileName).insert({ a: 1, b: 4 });
// console.log('============ test =============');
// console.log(test);
