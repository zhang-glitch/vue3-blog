<template>
  <div class="article-list">
    <div class="article-wrapper container">
      <div class="row">
        <div class="col-12 col-sm-12 col-md-12 col-lg-9 col-xl-9">
          <el-card shadow="always">
            <el-tabs @tab-click="onTabClick" v-model="navIndex">
              <el-tab-pane 
                :label="item.tab" 
                v-for="item in tabsTitle" 
                :key="item.id"
                >
                  <component :is="currentListComponent"></component>
              </el-tab-pane>
            </el-tabs>
            
          </el-card>
        </div>
        <div class="col-0 col-sm-0 col-md-0 col-lg-3 col-xl-3 asist-bar">
          <blog-author></blog-author>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, shallowRef } from "vue";
import {useStore} from 'vuex'
import BlogAuthor from './BlogAuthor.vue'
import HeatArticleList from './listcomponent/HeatArticleList.vue'
import LifeArticleList from './listcomponent/LifeArticleList.vue'
import ArtArticleList from './listcomponent/ArtArticleList.vue'
import PhotoArticleList from './listcomponent/PhotoArticleList.vue'
import { useRouter } from "vue-router";

export default defineComponent({
  name: 'ArticleList',
  props: {
    tabsTitle: {
      type: Array,
      required: true
    }
  },
  components: {
    BlogAuthor
  },
  setup() {
    // 不同类型文章列表,当进入页面后先渲染根据热度排序组件
    let currentListComponent = shallowRef(HeatArticleList);
    const store = useStore();
    const router = useRouter();
 

        
    // 从store中取navIndex
    let navIndex = computed(() => {
      return store.getters.getNavIndex
    })

    const onTabClick = async (val) => {
      // 拿到选项卡的当前实例index
      const {index} = val
      if(index === '0') {
        console.log("list ----- 0")
        // 如果val===0时，获取全部文章列表,按热度排序
        currentListComponent.value = HeatArticleList;
      }else if(index === '1') {
        console.log("list ----- 1")
        // 如果val===1时，表示获取技术文章列表，根据热度排序
        currentListComponent.value = ArtArticleList;
      }else if(index === '2') {
        console.log("list ----- 2")
        // 获取摄影文章
        currentListComponent.value = PhotoArticleList;
      }else if(index === '3') {
        console.log("list ----- 3")
        // 获取生活文章
        currentListComponent.value = LifeArticleList;
      }
    }
    router.beforeEach(async (to, from, next) => {
      // to即将进入的路由， from离开的路由， next下一个
      if(to.query.type === "1") {
        // 获取技术文章
        currentListComponent.value = ArtArticleList;
      }else if(to.query.type === "2") {
        // 获取摄影文章
        currentListComponent.value = PhotoArticleList;
      }else {
        // 获取生活文章
        currentListComponent.value = LifeArticleList;
      }
      next()
    })
    return {
      onTabClick,
      navIndex,
      currentListComponent
    }
  }

})
</script>

<style lang="scss">
   @import 'assets/config.scss';
  .article-list {
    margin-top: 20px;
    margin-bottom: 100px;

    .article-wrapper {
      .more {
        text-align: center;
        .el-divider--horizontal {
          width: 70%;
          margin: 70px auto 30px;
          .el-divider__text {
            color: $text-color-secondary;
          }
        }
      }
      .el-tabs__active-bar {
        display: none !important;
      }
      
      .el-tabs__item {
        font-size: 16px;
        
      }
      .el-tabs__item:hover {
        font-weight: bold;
      }
      .el-tabs__item.is-active {
        font-weight: bold;
      }
    }
  }

  // 当小于992px时，隐藏侧边栏
  @media screen and (max-width: 992px) {
    .asist-bar {
      display: none;
    }
  }
</style>