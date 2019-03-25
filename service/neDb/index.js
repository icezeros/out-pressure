const path = require('path');
const fs = require('fs');
const Datastore = require('nedb');
// const base58 = require('bs58');
// const base64 = require('js-base64').Base64;

const dbCommonConfig = {
  autoload: true,
  timestampData: true,
  // afterSerialization: data => base64.encode(data),
  // beforeDeserialization: data => base64.decode(data),
};

const test = new Datastore({
  ...dbCommonConfig,
  filename: path.join(__dirname, 'datafile.db'),
});
class NeDb {
  constructor() {
    this.collection = [];
    this.dbCommonConfig = {
      autoload: true,
      timestampData: true,
      // afterSerialization: data => base64.encode(data),
      // beforeDeserialization: data => base64.decode(data),
    };
  }
  initCollections() {
    const that = this;
    const dir = path.join(__dirname, 'db');
    const dbFiles = this.getDbFiles(dir);
    dbFiles.forEach((file) => {
      that.collection.push(
        new Datastore({
          ...that.dbCommonConfig,
          filename: file,
        }),
      );
    });
  }

  getDbFiles(dir) {
    const results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
      const tmpFile = `${dir}/${file}`;
      const stat = fs.statSync(tmpFile);
      if (stat.isFile()) {
        results.push(tmpFile);
      }
    });
    return results;
  }
}

module.exports = NeDb;
