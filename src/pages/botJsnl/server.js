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
    static async updateUser(params) {
        return request(`${url}jsnl/updateUser`, {
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
