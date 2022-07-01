/*
 * @Author: your name
 * @Date: 2021-01-21 13:50:15
 * @LastEditTime: 2022-07-01 14:40:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \app\src\models\global.js
 */
import Server from "../servers";
export default {
    namespace: 'global',
    state: {

    },
    effects: {
        * createActive({ payload }, { call, put }) {
            const res = yield call(Server.createActive, payload)
            return res
        },
        * getActive({ payload }, { call, put }) {
            const res = yield call(Server.getActive, payload)
            return res
        },
        * deleteActive({ payload }, { call, put }) {
            const res = yield call(Server.deleteActive, payload)
            return res
        },
        * startActive({ payload }, { call, put }) {
            const res = yield call(Server.startActive, payload)
            return res
        }
    },
    reducers: {

    }
};