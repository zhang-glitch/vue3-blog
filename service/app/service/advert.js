'use strict';


const { Service } = require('egg');

class Advert extends Service {
  // 广告
  async getAdvert () {
    const { ctx } = this;
    const res = await ctx.model.Advert.findAll();
    return res;
  }
  // 学校
  async getSchool () {
    const { ctx } = this;
    const res = await ctx.model.School.findAll();
    return res;
  }
  // 每日一句
  async getSentence () {
    const { ctx } = this;
    const res = await ctx.model.Sentence.findAll();
    return res;
  }
  // banner
  async getBanner () {
    const { ctx } = this;
    const res = await ctx.model.Banner.findAll();
    return res;
  }
}

module.exports = Advert;
