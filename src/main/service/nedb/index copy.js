// const path = require('path');
// const fs = require('fs');
// const DataStore = require('nedb');
// const base58 = require('bs58');
// const base64 = require('js-base64').Base64;

// import path from 'path';
// import fs from 'fs-extra';
// import * as DataStore from 'nedb';

const path = require('path');
const fs = require('fs-extra');
const DataStore = require('nedb');

const dbCommonConfig = {
  autoload: true,
  timestampData: true,
  // afterSerialization: data => base64.encode(data),
  // beforeDeserialization: data => base64.decode(data),
};

// export default class Db {
module.exports = class Db {
  constructor() {
    this.dbCommonConfig = {
      autoload: true,
      timestampData: true,
      // afterSerialization: data => base64.encode(data),
      // beforeDeserialization: data => base64.decode(data),
    };
    this.collections = new Map();
    // this.collections.set(
    //   'system',
    //   new DataStore({
    //     ...this.dbCommonConfig,
    //     filename: path.resolve(__dirname, 'db', 'system'),
    //   })
    // );
    this.dbPath = path.join(__dirname, 'db');
    this.initCollections();
  }
  initCollections() {
    console.log('============ this.dbPath =============');
    console.log(this.dbPath);
    const dbFiles = this.getDbFiles(this.dbPath);
    console.log('============ dbFiles =============');
    console.log(dbFiles);
    dbFiles.forEach(file => {
      this.collections.set(
        file,
        new DataStore({
          ...this.dbCommonConfig,
          filename: path.resolve(__dirname, 'db', file),
        })
      );
    });
  }

  getDbFiles(dir) {
    const results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const tmpFile = `${dir}/${file}`;
      const stat = fs.statSync(tmpFile);
      if (stat.isFile()) {
        results.push(file);
      }
    });
    return results;
  }
  removeCollections(files) {
    for (let file of files) {
      this.collections.delete(file);
      fs.removeSync(path.join(this.dbPath, file));
    }
  }
  addCollection(file) {
    console.log('============ file =============');
    console.log(file);
    if (this.collections.has(file)) {
      throw new Error(`${file} 已经存在`);
    }
    this.collections.set(
      file,
      new DataStore({
        ...this.dbCommonConfig,
        filename: path.resolve(__dirname, 'db', file),
      })
    );
  }
};
