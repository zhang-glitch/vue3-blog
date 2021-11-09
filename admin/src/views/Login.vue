<template>
  <div class="login">
    <div class="left">
      <span className="sign">
        <span className="fast-flicker">H</span> -
        <span className="flicker">M</span>
      </span>
    </div>
    <div class="right">
      <el-card>
        <template #header>
          登录
        </template>
        <el-form ref="formRef"
                 :model="form"
                 :rule="rules">
          <el-form-item label="用户名："
                        prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码："
                        prop="password">
            <el-input v-model="form.password"
                      type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="handleLogin">登录</el-button>
          </el-form-item>
        </el-form>

        <!-- 其他登陆方式 -->
        <div class="other-login">
          <p class="txt">其他登录方式</p>
          <ul>
            <li>qq</li>
            <li>github</li>
            <li>b站</li>
            <li>微信</li>
          </ul>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import request from '../http/request'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Login',
  setup() {
    const form = ref({
      username: '',
      password: '',
    })
    const formRef = ref(null)
    const router = useRouter()
    const store = useStore()

    // 外层表单验证规则
    const rules = ref({
      username: [
        { required: true, message: '请输入文章标题', trigger: 'blur' },
      ],
      password: [{ required: true, message: '作者不能为空', trigger: 'blur' }],
    })

    const handleLogin = () => {
      // 验证表单
      formRef.value?.validate(async (valid) => {
        if (valid) {
          // 发送请求
          const { isSuccess } = await request({
            url: '/admin/login',
            method: 'post',
            data: form.value,
          })
          if (isSuccess) {
            // 更新vuex中登录的状态
            store.commit('updateLogin', true)
            // 跳转到create
            router.push('/create')
            ElMessage.success({
              message: `'${form.value.username}'登陆成功`,
              type: 'success',
            })
          } else {
            ElMessage.error(`'${form.value.username}'登录失败`)
          }

          // 清空表单
          form.value.username = ''
          form.value.password = ''
        } else {
          return false
        }
      })
    }
    return {
      form,
      rules,
      handleLogin,
      formRef,
    }
  },
})
</script>

<style lang="scss">
.login {
  width: 100%;
  height: 100%;
  // background: skyblue;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .left {
    .sign {
      align-items: center;
      text-align: left;
      font-family: 'Clip';
      font-size: 15rem;
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
  }

  .right {
    .el-card__header {
      font-size: 24px;
      color: #409eff;
      border-bottom: none;
      font-weight: 600;
    }

    .el-form {
      padding: 20px 40px;
      label {
        width: 85px;
        height: 50px;
        line-height: 50px;
      }

      .el-form-item__content {
        height: 50px;
        line-height: 50px;

        .el-put {
          height: 50px;
          line-height: 50px;
        }
      }

      .el-button {
        width: 100%;
      }
    }

    .other-login {
      margin-top: 50px;
      text-align: center;
      .txt {
        text-align: center;
        font-size: 17px;
        font-weight: 400;
        color: #aaa;
        line-height: 40px;
      }
      ul {
        margin-top: 20px;
        display: flex;
        justify-content: space-evenly;
      }
    }
  }
}
</style>
