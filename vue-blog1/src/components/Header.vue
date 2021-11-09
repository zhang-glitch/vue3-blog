<template>
  <div class="header">
    <div class="container">
      <div class="row">
        <div class="col-6 col-sm-6 col-md-3 col-lg-4 col-xl-4" style="align-self: center;">
          <div class="logo">
            <a href="/">
              <img src="/logo.png" alt="">
            </a>
          </div>
        </div>
        <!-- 移动端显示菜单 -->
        <div class="col-6 col-sm-6 xs-menu" @click="isDrawer=true">
          <i :class="iconType"></i>
        </div>
        <div class="col-md-3 col-lg-4 col-xl-4">
          <div class="header-search-input">
            <search-input></search-input>
          </div>
        </div>
        <div class="col-md-6 col-lg-4 col-xl-4">
          <div class="header-menus">
            <header-menu mode="horizontal"></header-menu>
          </div>
        </div>
      </div>
    </div>
    <el-drawer
      title="昊淼博客"
      v-model="isDrawer"
      direction="rtl"
      destroy-on-close
      :show-close="false"
      >
      <div class="xs-search">
        <search-input />
      </div>
      <header-menu mode="vertical" @handleDrawer="isDrawer=$event"/>
    </el-drawer>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import SearchInput from './SearchInput'
import HeaderMenu from "./HeaderMenu.vue";
import emitter from 'hooks/emitter.js'

export default defineComponent( {
  name: 'Header',
  components: {
    SearchInput,
    HeaderMenu,
  },
  setup() {
    // 显示弹窗
    const isDrawer = ref(false)
    // 控制图标样式
    const iconType = computed(() => {
      return isDrawer.value ? 'el-icon-s-unfold' : 'el-icon-s-fold'
    })

    // 触发事件
    emitter.on('handleCloseXsMenu', (val) => {
      isDrawer.value = val
    })
    return {
      isDrawer,
      iconType
    }
  }
})
</script>

<style lang="scss">
  @import 'assets/config.scss';
  .header {
    height: 46px;
    background-color:rgba($color: #000000, $alpha: 0.7);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;

    a {
      display: block;
      width: 130px;
      height: 40px;
      line-height: 40px;
    }
    .xs-menu {
      font-size: $fontF;
      color: #ffffff;
      position: relative;
      &:hover {
        color: $primary-color;
      }
      i {
        position: absolute;
        right: 9px;   
        top: 50%;
        margin-top: -11px;
        cursor: pointer;
      }
    }
  } 

  // 控制弹窗按钮
  .el-drawer.rtl {
    width: 256px !important;
  }

  .el-drawer__header {
    span {
      font-size: $fontI;
      font-family:cursive;
      font-weight: 600;
    }
  }
  .xs-search {
    padding: 0 20px 35px;
  }
  @media screen and (min-width: 769px) {
    
    .xs-menu {
        display: none !important;
    }

  }
  @media screen and (max-width: 768px) {
    
    // 隐藏header-menu和search-input
    .header-menus, .header-search-input {
      display: none;
    }
  }

 
</style>