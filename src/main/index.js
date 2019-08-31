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
  handleQuit();
  handleMessage();
  await clearData();
  if (process.env.NODE_ENV === 'development') {
    setInterval(() => {
      const a = Math.floor(Math.random() * 100);
      analyPressure({
        time: moment(),
        data: `ST,NT,+000${a}.00\r\n`,
      });
    }, 1000);
  } else {
    pressureInit();
  }
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
    baseTime: moment(),
    baseValue: -100,
    offset: 0,
    value: -100,
    index: 0,
    time: moment(),
  };
}
function pressureInit() {
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

async function clearData() {
  const db = global.db;
  if (!db) {
    throw new Error('db is not ready');
  }
  const log = db.collections.get('log');
  const experiment = db.collections.get('experiment');
  const experimentsUnFinished = await experiment.asyncFind({
    status: { $ne: 'finished' },
  });
  const experimentsFinished = await experiment.asyncFind(
    {
      status: 'finished',
    },
    [['sort', { index: -1 }], ['skip', 100]]
  );
  const experimentsUnFinishedIds = experimentsUnFinished.map(item => item._id);
  const experimentsFinishedIds = experimentsFinished.map(item => item._id);
  const experimentsIds = [
    ...experimentsUnFinishedIds,
    ...experimentsFinishedIds,
  ];
  const logs = await log.asyncFind({ experimentId: { $in: experimentsIds } });
  await log.asyncRemove(
    {
      experimentId: { $in: experimentsIds },
    },
    {
      multi: true,
    }
  );
  await experiment.asyncRemove(
    { _id: { $in: experimentsIds } },
    {
      multi: true,
    }
  );
}
// makeSingleInstance(init);
init();
// const test = new Db();
// const fileName = `${Math.random() * 10}`;
// // const fileName = `5555`;

// test.addCollection(fileName);
// test.collections.get(fileName).insert({ a: 1, b: 4 });
