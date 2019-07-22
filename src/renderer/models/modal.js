export default {
  namespace: 'modal',

  state: {
    visible: false,
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
    toggle(state) {
      return {
        visible: !state.visible,
      };
    },
    setTrue(state) {
      return {
        visible: true,
      };
    },
    setFalse(state) {
      return {
        visible: false,
      };
    },
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
