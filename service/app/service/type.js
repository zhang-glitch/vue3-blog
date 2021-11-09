'use strict';


const { Service } = require('egg');

class Type extends Service {
  async getTypeList () {
    const { ctx } = this;
    const res = await ctx.model.Type.findAll();
    return res;
  }
}

module.exports = Type;
