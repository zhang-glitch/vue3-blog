import axios from 'axios'
import NProgress from 'nprogress'
import { ElMessage } from 'element-plus'

function request(config) {
  const instance = axios.create({
    baseURL: 'http://127.0.0.1:7001',
    timeout: 5000,
    // 这里如果不开启cookie跨域，则cookie不能保存在cookie缓存中。
    withCredentials: true //开启cookie跨域
  })
  // 添加加载条样式
  // axios请求拦截器
  const includeUrl = ['/admin/login', '/admin/getMessageList']
  instance.interceptors.request.use(
    (config) => {
      NProgress.start() // 设置加载进度条(开始..)
      // 在发送请求之前携带token
      if (includeUrl.includes(config.url)) {
        return config
      } else {
        config.headers = {
          token: localStorage.getItem('token') && localStorage.getItem('token')
        }
        return config
      }
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  // axios响应拦截器
  instance.interceptors.response.use(
    function(res) {
      NProgress.done() // 设置加载进度条(结束..)
      if (res.data.status === 200) {
        // 设置token
        if (res?.data?.data?.token) {
          window.localStorage.setItem('token', res.data.data.token)
        }
        return res.data.data
      } else if (res.data.status === 1001) {
        ElMessage.warning({
          message: '未登录，即将跳转到登录页面!',
          type: 'warning'
        })
        // 重定向到登录页面
        // window.location.href = '/login'
        return res.data
      } else {
        return '请求错误'
      }
    },
    function(error) {
      return Promise.reject(error)
    }
  )

  return instance(config)
}

export default request
