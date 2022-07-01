import Server from "../servers";
export default {
    namespace: 'memberModel',
    state: {
    },

    effects: {
        * createMember({ payload }, { call, put }) {
            const res = yield call(Server.createMember, payload)
           return res
        },
        * getMember({ payload }, { call, put }) {
            const res = yield call(Server.getMember, payload)
           return res
        },
        * updateMember({ payload }, { call, put }) {
            const res = yield call(Server.updateMember, payload)
           return res
        }
    },
    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload };
        }
    }
};