'use strict'

const { Service } = require('egg')

class File extends Service {
  async addFileImg(params) {
    const { ctx } = this
    const res = await ctx.model.File.create(params)
    console.log('====shangchuan1上传', res)
    return res
  }
}

module.exports = File
