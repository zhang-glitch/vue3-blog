import store from '../store'
/**
 * 
 * @param {*} size 初始文章条数
 * @param {*} articleList articleList
 * @param {*} store store
 * @param {*} total 文章列表总数
 * @param {*} isMore isMore
 */
// const store = useStore();
const useLoadMore = (articleList, dispatchName, total, isMore, requestParams) => async () => {
  requestParams.size.value++;
  if (requestParams && requestParams.id) {
    articleList.value = await store.dispatch(dispatchName, { size: requestParams.size.value, id: requestParams.id })
  } else if (requestParams && requestParams.searchVal) {
    articleList.value = await store.dispatch(dispatchName, { size: requestParams.size.value, searchVal: requestParams.searchVal })
  } else {
    articleList.value = await store.dispatch(dispatchName, { size: requestParams.size.value })
  }
  // 如果分割的文章数等于总数，则表示没有文章了
  if (requestParams.size.value >= total.value) {
    isMore.value = false
  } else {
    isMore.value = true
  }
}
export default useLoadMore;
