'use strict';

const BaseController = require('./baseController');

class Type extends BaseController {
  async getTypeList () {
    const { ctx } = this;
    const data = await ctx.service.type.getTypeList();
    this.success(data);
  }

}

module.exports = Type;
