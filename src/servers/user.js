// import { message } from 'antd';
import { url } from '../utils/urlConfig';
import { stringify } from 'qs';
import request from '../utils/request';

let toForm = (v) => {
    const data = new FormData();
    for (let key in v) {
        data.append(key, v[key]);
    }
    return data;
};

export default class Server {
    // get
    static async handleQuery(params) {
        return request(`${url}queryurl?${stringify(params)}`);
    }
    // get
    static async getAllUser(params) {
        return request(`${url}getAllUser`);
    }
    // post
    static async createUser(params) {
        return request(`${url}registered`, {
            method: 'post',
            body: stringify(params),
        });
    }
    // post
    static async login(params) {
        return request(`${url}login`, {
            method: 'post',
            body: stringify(params),
        });
    }
    // post
    static async createActive(params) {
        return request(`${url}createActive`, {
            method: 'post',
            body: stringify(params),
        });
    }
    // post
    static async getActive(params) {
        return request(`${url}getActive`, {
            method: 'post',
            body: stringify(params),
        });
    }
    // post
    static async deleteActive(params) {
        return request(`${url}deleteActive`, {
            method: 'post',
            body: stringify(params),
        });
    }
    // post
    static async startActive(params) {
        return request(`${url}startActive`, {
            method: 'post',
            body: stringify(params),
        });
    }
}
