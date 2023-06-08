// import { message } from 'antd';
import { url } from '@/utils/urlConfig';
import { stringify } from 'qs';
import request from '@/utils/request';
export default class Server {
   
    // post
    static async createProject(params) {
        console.log(params);
        return request(`${url}ngc/create`, {
            method: 'post',
            body: stringify(params),
        });
    }
    // post
    static async updateProject(params) {
        return request(`${url}ngc/update`, {
            method: 'post',
            body: stringify(params),
        });
    }
    // post
    static async getProject(params) {
        return request(`${url}ngc/get`, {
            method: 'post',
            body: stringify(params),
        });
    }
    // post
    static async getProjectWithCookie(params) {
        return request(`${url}ngc/getProjectWithCookie`, {
            method: 'post',
            body: stringify(params),
        });
    }
}
