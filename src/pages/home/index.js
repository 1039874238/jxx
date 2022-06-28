/*
 * @Author: your name
 * @Date: 2021-03-27 21:08:09
 * @LastEditTime: 2022-06-28 13:56:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jxx-app\umiApp\src\pages\home\index.js
 */
import { useCallback, useEffect, useState } from "react"
import { connect } from 'dva'
import * as dayjs from 'dayjs'
import { message } from "antd"
import Styles from './index.less'

const mapStateToProps = (state) => ({
    global: state.global,
    loginModel: state.loginModel,
})

export default connect(mapStateToProps)(({
    dispatch,
    loginModel: {
        loginUser
    }
}) => {
    setInterval(() => {
        setShowTime(dayjs().format('YYYY-MM-DD HH:mm:ss'))
    }, 1000);
    const [homename] = useState('welcome to home')
    const [nowTime] = useState(dayjs().hour())
    const [showTime,setShowTime] = useState(dayjs().format('YYYY-MM-DD HH:mm:ss'))
    const [state, setState] = useState('')
    const showMessage = useCallback(() => {
        if (7 <= nowTime && nowTime < 12) {
            return '早上好'
        } else if (12 <= nowTime && nowTime < 13) {
            return '中午好'
        } else if (13 <= nowTime && nowTime < 18) {
            return '下午好'
        } else {
            if (nowTime >= 23 || (nowTime >= 0 && nowTime < 7)) {
                message.warn('已经很晚了，早点休息！')
            }
            return '晚上好 '
        }
    }, [nowTime])
    
    useEffect(() => {
        if (loginUser !== null) {
            setState(showMessage())
        }
    }, [loginUser, showMessage])


    return (
       <>
        <div style={{ textAlign: "center" }} >
            <h3 className={Styles.textBox}>{homename}</h3>
            <div>
                {state}
            </div>
            <div>当前时间：{showTime}</div>
        </div>
        <div>
            
        </div>
       </>

    )
})