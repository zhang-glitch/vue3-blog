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
import { defineComponent, shallowRef } from "vue";
import ArticleListItem from './ArticleListItem.vue'
import BlogAuthor from './BlogAuthor.vue'
import NewArticleList from './listcomponent/NewArticleList.vue'
import HeatArticleList from './listcomponent/HeatArticleList.vue'

export default defineComponent({
  name: 'ArticleList',
  props: {
    tabsTitle: {
      type: Array,
      required: true
    }
  },
  components: {
    ArticleListItem,
    BlogAuthor
  },

  setup() {
    // 不同类型文章列表
    let currentListComponent = shallowRef(NewArticleList);
    const onTabClick = async(val) => {
      // 拿到选项卡的当前实例index
      const {index} = val
      if(index === '0') {
        console.log("index ----- 0")
        // 当index===0时，渲染最新的列表组件
        currentListComponent.value = NewArticleList
      }else if(index === '1') {
        console.log("index ----- 1")
        // 当index===1时，渲染热度排序的列表组件
        currentListComponent.value = HeatArticleList
      }
    }
    return {
      onTabClick,
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