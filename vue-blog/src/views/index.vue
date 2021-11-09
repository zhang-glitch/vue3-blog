<template>
  <lay-out>
    <div class="wrap clear">
      <!-- <audio style="margin-top: 100px;"
             src="../assets/audio/music.mp3"
             loop
             autoplay
             controls>播放</audio> -->
      <!-- 头部背景 -->
      <background-img :imgUrl="'/indexbg.jpg'"></background-img>
      <!-- bannner -->
      <banner-component></banner-component>
      <!-- 文章主体 -->
      <article-list :tabsTitle="tabsTitle"></article-list>
    </div>
  </lay-out>
</template>

<script>
import { defineComponent, reactive } from 'vue'
// import {useStore} from 'vuex'
import BackgroundImg from 'components/BackgroundImg.vue'
import BannerComponent from 'components/BannerComponent.vue'
import LayOut from 'components/LayOut.vue'
import ArticleList from 'components/ArticleList.vue'

export default defineComponent({
  name: 'index',
  components: {
    LayOut,
    BackgroundImg,
    BannerComponent,
    ArticleList,
  },
  setup() {
    const tabsTitle = reactive([
      {
        id: '1',
        tab: '最新',
      },
      {
        id: '2',
        tab: '热门',
      },
    ])

    // const store = useStore()
    // const newSize = ref(5);
    // let articleList = reactive([]);
    // // const heatSize = ref(5);
    // // 获取最新文章
    // store.dispatch('getNewArticleList', {size: newSize.value})
    // const requireArticleList = computed({
    //   get() {
    //     return () => store.state.newArticleList
    //   },
    //   set(val) {
    //     articleList = val
    //   }
    // })

    return {
      tabsTitle,
    }
  },
})
</script>

<style lang="scss">
@import 'assets/config.scss';
</style>
