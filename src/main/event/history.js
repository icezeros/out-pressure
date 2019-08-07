import url from 'url';
import path from 'path';
import { ipcMain, BrowserWindow } from 'electron';
import moment from 'moment';
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
}
