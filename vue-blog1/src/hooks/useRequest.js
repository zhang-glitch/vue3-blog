/**
 * 
 * @param {string} url 请求路径
 * @param {string} mutationName commit提交类型
 * @param {commit} commit 
 * @param {object} config 请求参数
 * @param {any} extraData 其他参数
 */
import axios from 'axios'
const useRequest = async (url, mutationName, commit, config = { method: 'get' }, extraData) => {
  const { data } = await axios(url, config);
  if (data && data.data) {
    if (extraData) {
      commit(mutationName, { data, extraData })
    } else {
      commit(mutationName, data)
    }
  }
  // 这个返回可有可无
  return data
}

export default useRequest