import moment from 'moment';
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
      return {
        ...state,
        historyPressures,
        currentPressure: payload.pressure,
      };
    },
  },
};
