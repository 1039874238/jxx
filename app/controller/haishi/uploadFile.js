'use strict';

const Controller = require('egg').Controller;
const xlsx = require('xlsx');

class uploadFileController extends Controller {
  /**
   * @上传文件-将excel文件数据输入到user表
   * 两种类型，file和stream
   * 这里使用的是stream
   */
  async uploadFiles_stream() {
    this.uploadFileStream();
    this.ctx.body = {
      code: 200,
      masg: 'success',
      data: '上传成功',
    };
  }
  // stream 获取上传文件，然后解析存库
  async uploadFileStream() {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    // 存储获取到的数据
    let exceldata = [];
    stream.on('data', function(chunk) {
      // 读取内容
      const workbook = xlsx.read(chunk, { type: 'buffer' });
      // 遍历每张工作表进行读取（这里默认只读取第一张表）
      for (const sheet in workbook.Sheets) {
        if (workbook.Sheets.hasOwnProperty(sheet)) {
          // 利用 sheet_to_json 方法将 excel 转成 json 数据
          exceldata = exceldata.concat(
            xlsx.utils.sheet_to_json(workbook.Sheets[sheet])
          );
          // break; // 如果只取第一张表，就取消注释这行
        }
      }
      if (exceldata.length > 0) {
        // 将excel数据增添到库里
        try {
          const students = [];
          exceldata.forEach(item => {
            const student = {};
            student.idCard = item.account.toLocaleUpperCase();
            student.password = item.password ? item.password : student.idCard.substring(student.idCard.length - 6);
            students.push(student);
          });
          ctx.service.haishi.addUser({ students });
        } catch (err) {
          console.log(err);
        }
      }
    });
  }
}

module.exports = uploadFileController;
