// import { message } from 'antd';
import { url } from '../utils/urlConfig';
import { stringify } from 'qs';
import request from '../utils/request';
export default class Server {
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
    // post
    static async createMember(params) {
        return request(`${url}member/create`, {
            method: 'post',
            body: stringify(params),
        });
    }
    // post
    static async updateMember(params) {
        return request(`${url}member/update`, {
            method: 'post',
            body: stringify(params),
        });
    }
    // get
    static async getMember(params) {
        return request(`${url}member/get?${stringify(params)}`);
    }
}
