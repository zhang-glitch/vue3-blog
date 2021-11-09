<template>
  <div class="header">
    <div class="container">
      <div class="row">
        <div class="col-8 col-sm-6 col-md-2 col-lg-3 col-xl-4"
             style="align-self: center;">
          <div class="logo">
            <a href="/"
               class="logo-btn">
              <span className="sign">
                <span className="fast-flicker">H</span> -
                <span className="flicker">M</span>
              </span>
              <span className="header-txt">IT小白，赶上前端大军!</span>
            </a>
          </div>
        </div>
        <!-- 移动端显示菜单 -->
        <div class="col-4 col-sm-6 xs-menu"
             @click="isDrawer=true">
          <i :class="iconType"></i>
        </div>
        <div class="col-md-3 col-lg-4 col-xl-4">
          <div class="header-search-input">
            <search-input></search-input>
          </div>
        </div>
        <div class="col-md-7 col-lg-5 col-xl-4">
          <div class="header-menus">
            <header-menu mode="horizontal"></header-menu>
          </div>
        </div>
      </div>
    </div>
    <el-drawer title="昊淼博客"
               v-model="isDrawer"
               direction="rtl"
               destroy-on-close
               :show-close="false">
      <div class="xs-search">
        <search-input />
      </div>
      <header-menu mode="vertical"
                   @handleDrawer="isDrawer=$event" />
    </el-drawer>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue'
import SearchInput from './SearchInput'
import HeaderMenu from './HeaderMenu.vue'
import emitter from 'util/emitter.js'

export default defineComponent({
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
      iconType,
    }
  },
})
</script>

<style lang="scss">
@import 'assets/config.scss';
.header {
  height: 46px;
  background-color: rgba($color: #000000, $alpha: 0.7);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;

  .logo-btn {
    display: block;
    // width: 130px;
    height: 40px;
    line-height: 40px;

    .sign {
      align-items: center;
      text-align: left;
      font-family: 'Clip';
      font-size: 2rem;
      color: #ffe6ff;
      text-shadow: 0 0 0.6rem #ffe6ff, 0 0 1.5rem #ff65bd,
        -0.2rem 0.1rem 1rem #ff65bd, 0.2rem 0.1rem 1rem #ff65bd,
        0 -0.5rem 2rem #ff2483, 0 0.5rem 3rem #ff2483;
    }

    @keyframes blink {
      0%,
      22%,
      36%,
      75% {
        color: #ffe6ff;
        text-shadow: 0 0 0.6rem #ffe6ff, 0 0 1.5rem #ff65bd,
          -0.2rem 0.1rem 1rem #ff65bd, 0.2rem 0.1rem 1rem #ff65bd,
          0 -0.5rem 2rem #ff2483, 0 0.5rem 3rem #ff2483;
      }
      28%,
      33% {
        color: #ff65bd;
        text-shadow: none;
      }
      82%,
      97% {
        color: #ff2483;
        text-shadow: none;
      }
    }

    .flicker {
      animation: shine 2s forwards, blink 3s 2s infinite;
    }

    .fast-flicker {
      animation: shine 2s forwards, blink 10s 1s infinite;
    }

    @keyframes shine {
      0% {
        color: #6b1839;
        text-shadow: none;
      }
      100% {
        color: #ffe6ff;
        text-shadow: 0 0 0.6rem #ffe6ff, 0 0 1.5rem #ff65bd,
          -0.2rem 0.1rem 1rem #ff65bd, 0.2rem 0.1rem 1rem #ff65bd,
          0 -0.5rem 2rem #ff2483, 0 0.5rem 3rem #ff2483;
      }
    }

    @keyframes flicker {
      from {
        opacity: 1;
      }

      4% {
        opacity: 0.9;
      }

      6% {
        opacity: 0.85;
      }

      8% {
        opacity: 0.95;
      }

      10% {
        opacity: 0.9;
      }

      11% {
        opacity: 0.922;
      }

      12% {
        opacity: 0.9;
      }

      14% {
        opacity: 0.95;
      }

      16% {
        opacity: 0.98;
      }

      17% {
        opacity: 0.9;
      }

      19% {
        opacity: 0.93;
      }

      20% {
        opacity: 0.99;
      }

      24% {
        opacity: 1;
      }

      26% {
        opacity: 0.94;
      }

      28% {
        opacity: 0.98;
      }

      37% {
        opacity: 0.93;
      }

      38% {
        opacity: 0.5;
      }

      39% {
        opacity: 0.96;
      }

      42% {
        opacity: 1;
      }

      44% {
        opacity: 0.97;
      }

      46% {
        opacity: 0.94;
      }

      56% {
        opacity: 0.9;
      }

      58% {
        opacity: 0.9;
      }

      60% {
        opacity: 0.99;
      }

      68% {
        opacity: 1;
      }

      70% {
        opacity: 0.9;
      }

      72% {
        opacity: 0.95;
      }

      93% {
        opacity: 0.93;
      }

      95% {
        opacity: 0.95;
      }

      97% {
        opacity: 0.93;
      }

      to {
        opacity: 1;
      }
    }

    .header-txt {
      font-size: 0.6rem;
      color: #fff;
      display: inline-block;
      padding-left: 1rem;
      font-weight: bold;
    }
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
    font-family: cursive;
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
  .header-menus,
  .header-search-input {
    display: none;
  }
}

// 控制 header-txt的显示或者隐藏
@media screen and (min-width: 768px) and (max-width: 991px) {
  .header-txt {
    display: none !important;
  }
}
</style>
