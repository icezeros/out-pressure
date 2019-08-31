import moment from 'moment';
import _ from 'lodash';
export default {
  namespace: 'sensor',

  state: {
    visible: false,
    currentPressure: {
      job: {
        enabled: false,
        time: 0,
      },
      baseTime: moment().format('x'),
      baseValue: 0,
      offset: 0,
      value: 0,
      index: 0,
      time: moment().format('x'),
    },
    historyPressures: [],
    chartInfo: {
      startIndexTmp: 0,
      endIndexTmp: 0,
      ticks: [0],
    },
  },
  effects: {
    *toggle({ payload }, { call }) {
      //   yie
    },
    // *fetch(_, { call, put }) {
    //   const response = yield call(fakeChartData);
    //   yield put({
    //     type: 'save',
    //     payload: response,
    //   });
    // },
    // *fetchSalesData(_, { call, put }) {
    //   const response = yield call(fakeChartData);
    //   yield put({
    //     type: 'save',
    //     payload: {
    //       salesData: response.salesData,
    //     },
    //   });
    // },
  },
  reducers: {
    updatePressure(state, { payload }) {
      const historyPressures = [...state.historyPressures, payload.pressure];
      if (historyPressures.length > 100) {
        historyPressures.shift();
      }
      // 1
      //   const endIndexTmp = historyPressures.length - 1;
      //   const startIndexTmp = endIndexTmp - 10 > 0 ? endIndexTmp - 10 : 0;
      //   const ticks = _.range(
      //     Math.floor(
      //       moment.duration(
      //         (historyPressures[startIndexTmp] &&
      //           historyPressures[startIndexTmp].index) ||
      //           0,
      //         'ms'
      //       )
      //     ) + 1000,
      //     Math.ceil(
      //       moment.duration(
      //         (historyPressures[endIndexTmp] &&
      //           historyPressures[endIndexTmp].index) ||
      //           0,
      //         'ms'
      //       )
      //     ) + 1000,
      //     1000
      //   );
      //   console.log('============ ticks =============');
      //   console.log(ticks);
      // 2
      let hisLength = historyPressures.length - 1;
      let leftIndex = (leftIndex = Math.floor(
        moment
          .duration(
            (historyPressures[0] && historyPressures[0].index) || 0,
            'ms'
          )
          .asSeconds()
      ));
      let rightIndex = Math.ceil(
        moment
          .duration(
            (historyPressures[hisLength] &&
              historyPressures[hisLength].index) ||
              0,
            'ms'
          )
          .asSeconds()
      );
      const endIndexTmp = hisLength;
      let startIndexTmp = 0;
      for (let i = hisLength; i >= 0; i--) {
        const tmpPressure = historyPressures[i];
        if (
          tmpPressure &&
          rightIndex - moment.duration(tmpPressure.index, 'ms').asSeconds() > 10
        ) {
          leftIndex = Math.floor(
            moment.duration(tmpPressure.index, 'ms').asSeconds()
          );
          startIndexTmp = i;
          break;
        }
      }
      const ticks = _.range(
        leftIndex * 1000 + 1000,
        rightIndex * 1000 + 1000,
        1000
      );

      return {
        ...state,
        historyPressures,
        currentPressure: payload.pressure,
        chartInfo: {
          startIndexTmp,
          endIndexTmp,
          ticks,
          //   ticks: _.range(
          //     leftIndex * 1000 + 1000,
          //     rightIndex * 1000 + 1000,
          //     1000
          //   ),
        },
      };
    },
  },
};
