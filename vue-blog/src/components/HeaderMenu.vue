<template>
  <div class="header-menu">
    <el-menu :default-active="activeIndex"
             :mode="mode"
             text-color="#686868"
             active-text-color="#eb5858"
             menu-trigger="click"
             @select="onSelect"
             class="header-menu-wrapper">
      <el-menu-item v-for="(item) in typeList"
                    :key="item.id"
                    :index="item.id+''">
        <i :class="item.vueIcon"></i>
        <template #title>{{item.typeName}}</template>
      </el-menu-item>
      <!-- 登录按钮 -->
      <el-menu-item class="login">
        <a href="http://127.0.0.1:8081/login"
           target="_blank">
          <i class="el-icon-monitor"></i>
          <!-- <template #title>登录</template> -->
          登录
        </a>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'HeaderMenu',
  props: ['mode'],
  emits: ['handleDrawer'],
  setup(props, context) {
    let activeIndex = ref(0)
    //从store中取文章类型值
    const store = useStore()
    const typeList = ref([])
    // 获取typeList
    const getTypeList = async () => {
      const data = await store.dispatch('getTypeList')
      typeList.value = data
    }

    getTypeList()

    // 点击item触发
    // 传递路由参数
    const router = useRouter()
    const route = useRoute()
    const onSelect = (index) => {
      activeIndex.value = index
      if (index !== null) {
        router.push(`/list?type=${index}`)
      }

      // 当点击的时候，向移动端传递一个事件
      context.emit('handleDrawer', false)
    }

    // 跳转到登录页面
    // const skipLogin = () => {
    //   router.push('http://localhost:8080/create')
    // }

    return {
      typeList,
      activeIndex,
      onSelect,
      route,
      // skipLogin,
    }
  },
})
</script>

<style lang="scss">
@import 'assets/config.scss';
.header-menu {
  height: 46px;
  display: flex;
  justify-content: space-around;

  .header-menu-wrapper {
    background: rgba($color: #000000, $alpha: -0.3) !important;
    &.el-menu--horizontal {
      border-bottom: none;
    }
    .el-menu-item {
      border-bottom: 0px !important;
      // 设置字体加粗
      font-weight: 600 !important;
      height: 46px !important;
      line-height: 46px;
      color: #ffffff !important;
      background-color: rgba($color: #000000, $alpha: -0.3) !important;
      i {
        color: #ffffff !important;
      }

      &.is-active {
        border-bottom: 0px !important;
        font-weight: 600;
        // color: rgb(235, 88, 88) !important;
        // i {
        //   color: rgb(235, 88, 88) !important;
        // }
      }
    }

    .login {
      background: #0b9eff;
    }
  }
  // 设置移入时的文字颜色
  .el-menu--horizontal > .el-menu-item:hover {
    color: $secondary-color !important;
    background-color: rgba($color: #ffffff, $alpha: 0.7) !important;
    i {
      color: $secondary-color !important;
    }
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
