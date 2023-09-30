// import { message } from 'antd';
import { url } from '@/utils/urlConfig';
import { stringify } from 'qs';
import request from '@/utils/request';
export default class Server {
    // post
    static async addBot(params) {
        return request(`${url}bot/addBot`, {
            method: 'post',
            body: stringify(params),
        });
    }
    // post
    static async getBot(params) {
        return request(`${url}bot/getBot`, {
            method: 'post',
            body: stringify(params),
        });
    }
    // post
    static async addBrowser(params) {
        return request(`${url}bot/addBrowser`, {
            method: 'post',
            body: stringify(params),
        });
    }
}
