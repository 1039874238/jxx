import Server from "../servers";
export default {
    namespace: 'userModel',
    state: {
    },

    effects: {
        * createUser({ payload }, { call, put }) {
            const res = yield call(Server.createUser, payload)
           return res
        }
    },
    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload };
        }
    }
};