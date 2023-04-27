import Server from './server';
export default {
  namespace: 'jsnlModel',
  state: {
    tableList:[],
    data:'test'
  },
  effects: {
    *getProject({ payload }, { call, put }) {
      const res = yield call(Server.getProject, payload);
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