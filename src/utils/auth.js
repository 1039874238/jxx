/*
 * @Author: your name
 * @Date: 2021-03-02 15:23:34
 * @LastEditTime: 2021-03-05 15:34:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \app\src\utils\auth.js
 */
import Redirect from 'umi/redirect';

export default (props) => {
    const isLogin = sessionStorage.getItem('roles') !== null && sessionStorage.getItem('roles') !== 'null';
    if (isLogin) {
        return <div>{props.children}</div>;
    } else {
        return <Redirect to="/login" />;
    }
};
