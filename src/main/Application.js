import { EventEmitter } from 'events';
import { app } from 'electron';
import is from 'electron-is';
import path from 'path';
import url from 'url';

import ConfigManager from './config';

import logger from './logger';
import WindowManager from './window/index';
import handleQuit from './event/quit';
import handleMessage from './event';
import onCrash from './system/crash';
import createTray from './system/tray';

export default class Application extends EventEmitter {
  constructor() {
    super();
    this.isReady = false;
    this.mainWindow = null;
    this.mainWindows = {};
    this.configManager = new ConfigManager();
    this.windowManager = this.windowManager = new WindowManager({
      userConfig: this.configManager.getUserConfig(),
    });
    this.init();
    // this.makeSingleInstance(() => {
    //   //   this.start('main');
    //   console.log('============ 1111 =============');
    //   console.log(1111);
    //   this.init();
    // });
  }

  init() {
    this.initWindowManager();
  }
  initWindowManager() {
    this.windowManager.on('window-resized', data => {
      this.storeWindowState(data);
    });
    this.windowManager.on('window-moved', data => {
      this.storeWindowState(data);
    });
    this.windowManager.on('window-closed', data => {
      this.storeWindowState(data);
    });
  }

  storeWindowState(data = {}) {
    const enabled = this.configManager.getUserConfig('keep-window-state');
    if (!enabled) {
      return;
    }

    const state = this.configManager.getUserConfig('window-state', {});
    const { page, bounds } = data;
    const newState = {
      ...state,
      [page]: bounds,
    };
    this.configManager.setUserConfig('window-state', newState);
  }

  start(page, options = {}) {
    this.showPage(page, options);
  }

  showPage(page, options = {}) {
    const { openedAtLogin } = options;
    console.log('============ 111 =============');
    console.log(111);
    const win = this.windowManager.openWindow(page, {
      hidden: openedAtLogin,
    });
    win.once('ready-to-show', () => {
      this.isReady = true;
      this.emit('ready');
    });
    if (is.macOS()) {
      //   this.touchBarManager.setup(page, win);
    }
  }

  show(page = 'main') {
    this.windowManager.showWindow(page);
  }

  hide(page) {
    if (page) {
      this.windowManager.hideWindow(page);
    } else {
      this.windowManager.hideAllWindow();
    }
  }

  toggle(page = 'main') {
    this.windowManager.toggleWindow(page);
  }

  closePage(page) {
    this.windowManager.destroyWindow(page);
  }

  stop() {
    // this.engine.stop()
    // this.energyManager.stopPowerSaveBlocker()
    // this.trayManager.destroy()
  }
}
