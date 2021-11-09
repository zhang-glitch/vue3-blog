import { ref } from 'vue'
/**
 * @param {*} isAppearMore 是否出现加载更多和文字说明
 * @param {*} isEmpty 数据是否为空
 * @param {*} articleList 文章列表
 * @param {*} size 请求约束数量
 */
function useAppearMore(isEmpty, articleList, size) {
  const appearMore = ref(true)
  if (isEmpty.value) {
    appearMore.value = false
  } else {
    // 文章不为空，然后数量小于约束数量，不显示
    if (articleList.value.length < size.value) {
      appearMore.value = false
    } else {
      appearMore.value = true
    }
  }
  return { appearMore }
}

export default useAppearMore