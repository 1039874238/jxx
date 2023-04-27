// import { message } from 'antd';
import { url } from '@/utils/urlConfig';
import { stringify } from 'qs';
import request from '@/utils/request';
export default class Server {
    // post
    static async getProject(params) {
        return request(`${url}jsnl/getProject`, {
            method: 'post',
            body: stringify(params),
        });
    }
    // post
    static async update(params) {
        return request(`${url}njsj/update`, {
            method: 'post',
            body: stringify(params),
        });
    }
    // post
    static async getUser(params) {
        return request(`${url}jsnl/getUser`, {
            method: 'post',
            body: stringify(params),
        });
    }
}
