// import { message } from 'antd';
import { url } from '@/utils/urlConfig';
import { stringify } from 'qs';
import request from '@/utils/request';
export default class Server {
    // post
    static async create(params) {
        console.log(params);
        return request(`${url}njsj/create`, {
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
    static async get(params) {
        return request(`${url}njsj/get`, {
            method: 'post',
            body: stringify(params),
        });
    }
}
