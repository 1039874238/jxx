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
    static async deleteBot(params) {
        return request(`${url}bot/deleteBot`, {
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
    // post
    static async deleteBrowser(params) {
        return request(`${url}bot/deleteBrowser`, {
            method: 'post',
            body: stringify(params),
        });
    }
    // post
    static async updateStudents(params) {
        return request(`${url}bot/updateStudents`, {
            method: 'post',
            body: stringify(params),
        });
    }
    // post
    static async getStudents(params) {
        return request(`${url}bot/getStudents`, {
            method: 'post',
            body: stringify(params),
        });
    }
    // post
    static async getConfig(params) {
        return request(`${url}bot/getConfig`, {
            method: 'post',
            body: stringify(params),
        });
    }
    // post
    static async updateConfig(params) {
        return request(`${url}bot/updateConfig`, {
            method: 'post',
            body: stringify(params),
        });
    }
}
