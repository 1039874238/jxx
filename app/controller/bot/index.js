'use strict';
const Controller = require('egg').Controller;
class BotController extends Controller {
  async addStudents() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.bot.addStudents(req);
  }
  async getStudents() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.bot.getStudents(req);
  }
  async updateStudents() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.bot.updateStudents(req);
  }
  async getOneStudents() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.bot.getOneStudents(req);
  }
  async resetStudents() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.bot.resetStudents(req);
  }
  async addBot() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.bot.addBot(req);
  }
  async deleteBot() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.bot.deleteBot(req);
  }
  async addBrowser() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.bot.addBrowser(req);
  }
  async setBrowserStatus() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.bot.setBrowserStatus(req);
  }
  async deleteBrowser() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.bot.deleteBrowser(req);
  }
  async getBot() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.bot.getBot(req);
  }
  async runBot() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.bot.runBot(req);
  }
  async updateConfig() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.bot.updateConfig(req);
  }
  async saveLog() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.bot.saveLog(req);
  }
  async queryLog() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.bot.queryLog(req);
  }
  async getConfig() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.bot.getConfig(req);
  }
  async getAllowRunStatus() {
    const { ctx } = this;
    await ctx.service.bot.getAllowRunStatus();
  }
  async checkBrowser() {
    const { ctx } = this;
    await ctx.service.bot.checkBrowser();
  }

}
module.exports = BotController;
