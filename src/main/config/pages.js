import is from 'electron-is';
import url from 'url';
import path from 'path';

export default {
  main: {
    window: {
      title: 'Test',
      //   width: 1024,
      //   height: 768,
      width: 1280,
      height: 800,
      minWidth: 840,
      minHeight: 420,
      //   fullscreen: true,
      titleBarStyle: 'customButtonsOnHover',
      // backgroundColor: '#FFFFFF',
      //   transparent: !is.windows(),
    },
    bindCloseToHide: true,
    url: is.dev()
      ? `http://localhost:8000/`
      : url.format({
          pathname: path.join(__dirname, '../renderer/index.html'),
          protocol: 'file:',
          slashes: true,
        }),
  },
};
