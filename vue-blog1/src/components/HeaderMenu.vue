<template>
  <div class="header-menu">
    <el-menu
      :default-active="activeIndex"
      :mode="mode"
      background-color="#000000"
      text-color="#686868"
      active-text-color="#eb5858"
      menu-trigger="click"
      @select="onSelect"
      >
      <el-menu-item v-for="(item) in menuArr" :key="item.id" :index="item.Id+''">
        <i :class="item.vueIcon"></i>
        <template #title>{{item.typeName}}</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import { useRouter, useRoute } from 'vue-router'
import {useStore} from 'vuex'

export default defineComponent({
  name: 'HeaderMenu',
  props: ["mode"],
  emits: ["handleDrawer"],
  setup(props, context) {

    let activeIndex = ref('1');
    //从store中取文章类型值
    const store = useStore();
    store.dispatch('getType')
    const menuArr = computed(() => {
      return store.state.type
    })


    // 点击item触发
    // 传递路由参数
    const router = useRouter();
    const route = useRoute();
    const onSelect = (val) => {
      // 将当前头部索引存取到vuex中，以便el-tabs标签获取。
      store.commit('getNavIndex', val)
      router.push(`/list?type=${val}`)

      // 当点击的时候，向移动端传递一个事件
      context.emit("handleDrawer", false)
    }

    return {
      menuArr,
      activeIndex,
      onSelect,
      route
    }
  }
})
</script>

<style lang="scss">
  @import 'assets/config.scss';
  .header-menu {
    height: 46px;
    display: flex;
    justify-content: space-around;

    // 去掉menu下方的1px的线
    .el-menu.el-menu--horizontal {
      border-bottom: none;
    }
    
    .el-menu, .el-menu .el-menu-item{
      height: 46px !important;
      line-height: 46px;
      color: #ffffff !important;
      background-color: rgba($color: #000000, $alpha: -0.3) !important;
      i {
        color: #ffffff !important;
      }
    }
    // 设置字体加粗
    .el-menu--horizontal>.el-menu-item {
      font-weight: 600 !important;
    }
    // 设置移入时的文字颜色
    .el-menu--horizontal > .el-menu-item:hover {
      color: $secondary-color !important;
      background-color: rgba($color: #ffffff, $alpha: 0.7) !important;
      i {
        color: $secondary-color !important;
      }
    }
    //设置活跃标签的样式
    .el-menu--horizontal>.el-menu-item.is-active {
      border-bottom: 0px solid transparent !important;
    }
  }

  // 设置移动端导航样式
  @media screen and (max-width: 768px) {
    .header-menu .el-menu .el-menu-item {
      color: #000000 !important;
      i {
        color: #000000 !important;
      }
    }
    .header-menu .el-menu .el-menu-item:hover {
      color: $primary-color !important;
      background: #e6f7ff !important;
      i {
        color: $primary-color !important;
      }
    }
    .header-menu {
      display: block;
    }
  }
</style>