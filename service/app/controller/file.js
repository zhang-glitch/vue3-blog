'use strict'

const BaseController = require('./baseController')
const fs = require('fs')
const path = require('path')

class File extends BaseController {
  // post请求
  async addFileImg() {
    const { ctx } = this
    const file = ctx.request.files[0]
    console.log('file', file)
    // 获取临时文件的filepathname
    const fileName = new Date().getTime()
    const readStream = fs.createReadStream(file.filepath)
    const writeStream = fs.createWriteStream(
      path.join(
        __dirname,
        `../public/${fileName}.${file.mime.split('/').pop()}`
      )
    )
    readStream.pipe(writeStream)

    const fileInfo = {
      filename: fileName,
      mimetype: file.mime,
      file_url: `http://127.0.0.1:7001/public/${fileName}.${file.mime
        .split('/')
        .pop()}`
    }
    // 查询字符串传参
    const data = await ctx.service.file.addFileImg(fileInfo)
    if (data) {
      this.success({ data, isSuccess: true })
    } else {
      ctx.body = { isSuccess: false }
    }
  }
}

module.exports = File
