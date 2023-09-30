import Server from './server';
export default {
  namespace: 'techModel',
  state: {
    tableList:[],
    data:'test'
  },
  effects: {
    *addBot({ payload }, { call, put }) {
      const res = yield call(Server.addBot, payload);
      return res;
    },
    *getBot({ payload }, { call, put }) {
      const res = yield call(Server.getBot, payload);
      return res;
    },
    *addBrowser({ payload }, { call, put }) {
      const res = yield call(Server.addBrowser, payload);
      return res;
    },
    *update({ payload }, { call, put }) {
      const res = yield call(Server.updateProject, payload);
      return res;
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
