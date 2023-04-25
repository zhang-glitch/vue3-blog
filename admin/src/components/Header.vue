<template>
  <div class="header">
    <div class="logo">
      <a href="/">
        <span className="sign">
          <span className="fast-flicker">H</span> -
          <span className="flicker">M</span>
        </span>
        <span className="header-txt">IT小白，赶上前端大军!</span>
      </a>
    </div>
    <div class="log-in-out">
      <router-link to="/login" v-if="!isLogin" class="login-btn">
        <el-button type="primary">登录</el-button>
      </router-link>
      <el-dropdown>
        <span class="el-dropdown-link">
          <span class="down-icon"><UserFilled /></span>
          <span class="username">{{ username }}</span>
          <!-- <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon> -->
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item disabled>修改密码</el-dropdown-item>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { ElMessage } from 'element-plus'
import request from '../http/request'
// import { useStore } from 'vuex'
export default defineComponent({
  name: 'Header',
  setup() {
    // 获取登录状态
    // const store = useStore()
    // const isLogin = computed(() => store.state.isLogin)
    const isLogin = !!window.localStorage.getItem('token')
    const username = localStorage.getItem('username')
    const logout = async () => {
      const data = await request({
        url: '/admin/logout',
        method: 'post',
      })
      if (data === 'ok') {
        ElMessage.success('退出成功，即将跳转到登录页面')
        window.location.href = '/login'
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('username')
      } else {
        ElMessage.error('退出失败')
      }
    }
    return {
      logout,
      isLogin,
      username,
    }
  },
})
</script>

<style lang="scss">
.header {
  box-sizing: border-box;
  background: #fff;
  height: 50px;
  padding-left: 30px;
  padding-right: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  .logo {
    a {
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
        color: #000;
        display: inline-block;
        padding-left: 1rem;
        font-weight: bold;
      }
    }
  }

  .log-in-out {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    .down-icon {
      height: 20px;
      width: 20px;
      display: inline-block;
      vertical-align: middle;
    }
    .username {
      margin-left: 5px;
      vertical-align: middle;
    }
    .login-btn {
      margin-right: 10px;
    }
  }
}
</style>
