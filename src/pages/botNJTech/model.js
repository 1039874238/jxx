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
    *deleteBot({ payload }, { call, put }) {
      const res = yield call(Server.deleteBot, payload);
      return res;
    },
    *addBrowser({ payload }, { call, put }) {
      const res = yield call(Server.addBrowser, payload);
      return res;
    },
    *deleteBrowser({ payload }, { call, put }) {
      const res = yield call(Server.deleteBrowser, payload);
      return res;
    },
    *getStudents({ payload }, { call, put }) {
      const res = yield call(Server.getStudents, payload);
      return res;
    },
    *updateStudents({ payload }, { call, put }) {
      const res = yield call(Server.updateStudents, payload);
      return res;
    },
    *getConfig({ payload }, { call, put }) {
      const res = yield call(Server.getConfig, payload);
      return res;
    },
    *updateConfig({ payload }, { call, put }) {
      const res = yield call(Server.updateConfig, payload);
      return res;
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
