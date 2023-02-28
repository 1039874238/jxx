import Server from './server';
export default {
  namespace: 'haishiModel',
  state: {
    tableList:[],
    data:'test'
  },
  effects: {
    *create({ payload }, { call, put }) {
      const res = yield call(Server.createProject, payload);
      return res;
    },
    *getUser({ payload }, { call, put }) {
      const res = yield call(Server.getUser, payload);
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
