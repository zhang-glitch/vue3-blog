import axios from 'axios'
import NProgress from 'nprogress'

function request (config) {
  const instance = axios.create({
    baseURL: 'http://127.0.0.1:7001',
    timeout: 5000
  })
  // 添加加载条样式
  // axios请求拦截器
  instance.interceptors.request.use(
    req => {
      NProgress.start() // 设置加载进度条(开始..)
      return req
    },
    error => {
      return Promise.reject(error)
    }
  )
  // axios响应拦截器
  instance.interceptors.response.use(
    function (res) {
      NProgress.done() // 设置加载进度条(结束..)
      if (res.data.status === 200) {
        return res.data.data
      } else {
        return "请求错误"
      }
    },
    function (error) {
      return Promise.reject(error)
    }
  )

  return instance(config)
}

export default request
