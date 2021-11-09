import store from '../store'
import { computed } from 'vue'
// 获取不同类型文章总数
const Typetotal = computed(() => store.getters.getArticleTypeListNum);

export default function IsEmpty(isEmpty) {
  // 判断是否有文章
  if (Typetotal.value !== 0) {
    isEmpty.value = false
  } else {
    isEmpty.value = true
  }
}