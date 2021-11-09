
'use strict';

const BaseController = require('./baseController');

class Advert extends BaseController {
  // 读取广告图片
  async getAdvert () {
    const { ctx } = this;
    const data = await ctx.service.advert.getAdvert();
    this.success(data);
  }

  // 学校
  async getSchool () {
    const { ctx } = this;
    const data = await ctx.service.advert.getSchool();
    this.success(data);
  }

  // 每日一句
  async getSentence () {
    const { ctx } = this;
    const data = await ctx.service.advert.getSentence();
    this.success(data);
  }

  // banner
  async getBanner () {
    const { ctx } = this;
    const data = await ctx.service.advert.getBanner();
    this.success(data);
  }

}

module.exports = Advert;
