import Server from "./server";
export default {
    namespace: 'ngcProject',
    state: {
    },
    effects: {
        * createProject({ payload }, { call, put }) {
            console.log(payload);
            const res = yield call(Server.createProject, payload)
           return res
        },
        * getProject({ payload }, { call, put }) {
            const res = yield call(Server.getProject, payload)
           return res
        },
        * updateProject({ payload }, { call, put }) {
            const res = yield call(Server.updateProject, payload)
           return res
        },
        * getProjectWithCookie({ payload }, { call, put }) {
            const res = yield call(Server.getProjectWithCookie, payload)
           return res
        }
    },
    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload };
        }
    }
};