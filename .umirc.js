/*
 * @Author: your name
 * @Date: 2021-03-27 20:54:58
 * @LastEditTime: 2023-10-27 16:56:02
 * @LastEditors: 1039874238 1039874237@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \jxx-app\umiApp\.umirc.js
 */
// ref: https://umijs.org/config/
let target = 'http://111.229.247.177/autoLearnApi'
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
          component: '../pages/botNJTech'
        },
        {
          path: '/botNJTech',
          component: '../pages/botNJTech'
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
    "/autoLearnApi": {
      "target": target,
      "changeOrigin": true,
      "pathRewrite": { "^/autoLearnApi" : "" }
    }
  }
}
