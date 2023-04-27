/*
 * @Author: your name
 * @Date: 2021-03-27 20:54:58
 * @LastEditTime: 2023-04-27 11:41:36
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Description: In User Settings Edit
 * @FilePath: \jxx-app\umiApp\.umirc.js
 */
// ref: https://umijs.org/config/
let target = 'http://120.48.37.141/api'
// let target = 'http://localhost:7001/'
export default {
  treeShaking: true,
  routes: [
    { path: '/login', component: '../pages/login' },
    {
      path: '/',
      Routes: ['./src/utils/auth.js'],
      component: '../layouts/index', 
      routes: [
        {
          path: '/',
          component: '../pages/botNjsj'
        },
        {
          path: '/botNjsj',
          component: '../pages/botNjsj'
        },
        {
          path: '/botJshs',
          component: '../pages/botJshs'
        },
        {
          path: '/botNgd',
          component: '../pages/botNgd'
        },
        {
          path: '/botZgyk',
          component: '../pages/botZgyk'
        },
        {
          path: '/botNky',
          component: '../pages/botNky'
        },
        {
          path: '/botJsnl',
          component: '../pages/botJsnl'
        },
      ]
    }
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'Umi',
      dll: false,

      routes: {
        exclude: [
          /components\//,
        ],
      },
    }],
  ],
  publicPath:'./',
  history:'hash',
  proxy: {
    "/api": {
      "target": target,
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  }
}
