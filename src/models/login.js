/*
 * @Author: your name
 * @Date: 2021-03-04 11:01:59
 * @LastEditTime: 2022-07-01 14:40:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \app\src\pages\login\model.js
 */
import Server from "../servers";
export default {
    namespace: 'loginModel',
    state: {
        userInfo: {},
        loginUser: null,
    },

    effects: {
        * login({ payload }, { call, put }) {
            const res = yield call(Server.login, payload)
            yield put({
                type: 'save',
                payload: {
                    userInfo: res,
                }
            });
            return res
        },
        * getAllUser({ payload }, { call, put }) {
            const res = yield call(Server.getAllUser, payload)
            return res
        }
    },
    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload };
        }
    }
};