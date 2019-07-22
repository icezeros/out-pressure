import { app } from 'electron';
import is from 'electron-is';

import logger from './logger';
import Application from './Application';
import handleQuit from './event/quit';
import handleMessage from './event';
// import Db from './service/nedb';

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
  await handelAppReady();
  handleQuit();
  handleMessage();
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
