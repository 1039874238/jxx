import { history } from 'umi'
import api from 'api'
import {message} from 'antd'
const { pathToRegexp } = require("path-to-regexp")

const { loginUser } = api

export default {
  namespace: 'login',

  state: {},
  effects: {
    *login({ payload }, { put, call, select }) {
      const data = yield call(loginUser, payload)
      const { locationQuery } = yield select(_ => _.app)
      if (data.state === 200) {
        const { from } = locationQuery
        message.success(data.msg)
        yield put({ type: 'app/query' })
        if (!pathToRegexp('/login').exec(from)) {
          if (['', '/'].includes(from)) history.push('/dashboard')
          else history.push(from)
        } else {
          history.push('/dashboard')
        }
      } else {
        message.error(data.msg)
      }
    },
  },
}
