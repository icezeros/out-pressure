import url from 'url';
import path from 'path';
import fs from 'fs-extra';
import { ipcMain, BrowserWindow } from 'electron';
import moment from 'moment';
import { writeXlsx } from 'xls-write';
export default function handleHistoryMessage() {
  ipcMain.on('get-history-page-sync', async (event, pageInfo) => {
    const experiment = global.db.collections.get('experiment');
    const experiments = await experiment.asyncFind(
      {
        status: 'finished',
      },
      [
        ['sort', { index: -1 }],
        ['skip', (pageInfo.current - 1) * pageInfo.pageSize],
        ['limit', pageInfo.pageSize],
      ]
    );
    const count = await experiment.asyncCount({
      status: 'finished',
    });
    event.returnValue = {
      data: experiments,
      total: count,
    };
  });

  ipcMain.on('get-history-info-sync', async (event, id) => {
    const log = global.db.collections.get('log');
    const logs = await log.asyncFind(
      {
        experimentId: id,
      },
      [['sort', { index: 1 }]]
    );
    event.returnValue = logs;
  });

  ipcMain.on('export-history-info', async (event, id) => {
    //   const devRootPath = '/media/pi';
    const devRootPath = '/Users/huguosen/Documents/GitHub/out-pressure/src';
    const list = fs.readdirSync(devRootPath);
    if (list.length === 0) {
      event.sender.send('export-history-result', {
        type: false,
        message: '未检测到U盘',
      });
      return;
    }
    // const outDir = path.join(devRootPath, list[0]);
    const outDir = devRootPath;
    console.log('============ outDir =============');
    console.log(outDir);
    const log = global.db.collections.get('log');
    console.log('============ id =============');
    console.log(id);
    const logs = await log.asyncFind(
      {
        experimentId: id,
      },
      [['sort', { index: 1 }]]
    );
    console.log('============ logs =============');
    console.log(logs);
    console.log('============ writeXlsx =============');
    console.log(writeXlsx);
    const filename = Date.now() + '.xlsx';
    const data = {
      sheets: [
        {
          header: [
            { _id: '_id标示值' },
            { index: '时间(起始为开机时间;单位:ms)' },
            { relativeIndex: '时间(起始为开始测量时间;单位:ms)' },
            { baseValue: '原始压力值' },
            { offset: '置零补偿量' },
            { value: '压力值' },
          ],
          items: logs,
          sheetName: 'sheet1',
        },
      ],
      filepath: path.join(outDir, filename),
    };
    writeXlsx(data);
    event.sender.send('export-history-result', {
      type: true,
      message: `成功导出到: ${list[0]}/${filename}`,
    });
  });

  ipcMain.on('delete-history-info-sync', async (event, data) => {
    const log = global.db.collections.get('log');
    const experiment = global.db.collections.get('experiment');
    const { _id, pageInfo } = data;
    console.log('============ id =============');
    console.log(data);
    await log.asyncRemove(
      {
        experimentId: _id,
      },
      {
        multi: true,
      }
    );
    await experiment.asyncRemove({ _id });
    const experiments = await experiment.asyncFind(
      {
        status: 'finished',
      },
      [
        ['sort', { index: -1 }],
        ['skip', (pageInfo.current - 1) * pageInfo.pageSize],
        ['limit', pageInfo.pageSize],
      ]
    );
    const count = await experiment.asyncCount({
      status: 'finished',
    });
    event.returnValue = {
      data: experiments,
      total: count,
    };
  });
}
