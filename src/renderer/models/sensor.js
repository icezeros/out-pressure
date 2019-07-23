export default {
  namespace: 'sensor',

  state: {
    visible: false,
    currentPressure: 0,
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
      console.log('============ payload =============');
      console.log(payload);
      console.log('============ state =============');
      console.log(state);
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
