
'use strict';

const BaseController = require('./baseController');

class Resume extends BaseController {
  // 请求简历数据
  async getResumeData () {
    const { ctx } = this;
    const data = await ctx.model.Resume.findOne();
    this.success(data);
  }

}

module.exports = Resume;
