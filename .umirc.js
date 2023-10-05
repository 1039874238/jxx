/*
 * @Author: your name
 * @Date: 2021-03-27 20:54:58
 * @LastEditTime: 2023-06-08 20:21:55
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Description: In User Settings Edit
 * @FilePath: \jxx-app\umiApp\.umirc.js
 */
// ref: https://umijs.org/config/
let target = 'http://192.168.31.76/autoLearnApi'
// let target = 'http://localhost:7001/'
export default {
  treeShaking: true,
  routes: [
    {
      path: '/',
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
