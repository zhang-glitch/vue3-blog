<template>
  <router-view></router-view>

</template>

<script>
import { useRouter } from 'vue-router'
// import { unmounted } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import fnTextPopup from 'util/fnTextPopup.js'
export default {
  name: 'App',
  setup() {
    const router = useRouter()
    // 改变文章标题
    router.beforeEach(async (to, from, next) => {
      // to即将进入的路由， from离开的路由， next下一个
      if (to.name === 'index') {
        document.title = '欢迎来到昊淼博客~'
      } else if (to.name === 'list') {
        if (to.query.type === '1') {
          document.title = '昊淼博客-技术页面'
        } else if (to.query.type === '2') {
          document.title = '昊淼博客-摄影页面'
        } else {
          document.title = '昊淼博客-生活页面'
        }
      } else if (to.name === 'search') {
        document.title = '昊淼博客-搜索页面'
      } else {
        document.title = '昊淼博客-网站介绍页面'
      }
      next()
    })
    fnTextPopup()
  },
}
</script>

<style lang="scss">
@import 'assets/reset.scss';
@import 'assets/base.scss';
</style>

