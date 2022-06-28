/*
 * @Author: your name
 * @Date: 2021-03-27 20:54:58
 * @LastEditTime: 2022-06-28 14:42:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jxx-app\umiApp\.umirc.js
 */
// ref: https://umijs.org/config/
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
          component: '../pages/home'
        },
        {
          path: '/home',
          component: '../pages/home'
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
      "target": "http://localhost:7001",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  }
}
