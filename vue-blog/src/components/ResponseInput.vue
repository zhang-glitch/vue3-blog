<template>
  <div class="response-input">
    <el-dialog title="欢迎回复"
               v-model="dialogVisible"
               width="50%"
               :before-close="hanleClose"
               :lock-scroll="false">
      <div class="response-box">
        <el-form :model="formVal"
                 :rules="rules"
                 ref="formDom">
          <el-form-item label="昵称"
                        prop="responseName">
            <el-input v-model="formVal.responseName"
                      placeholder="请输入昵称"
                      class="res-name">
            </el-input>
          </el-form-item>
          <el-form-item label="回复内容"
                        prop="responseText">
            <el-input type="textarea"
                      placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。"
                      v-model="formVal.responseText"
                      class="res-content">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="hanleClose">取 消</el-button>
          <el-button type="primary"
                     @click="handleEnsure">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
import emitter from 'util/emitter.js'
import { ElMessage } from 'element-plus'
import request from '../http/request'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'ResponseInput',
  setup() {
    const dialogVisible = ref(false)
    const formVal = reactive({
      responseName: '',
      responseText: '',
    })

    const rules = reactive({
      responseName: [
        { required: true, message: '昵称不能为空', trigger: 'blur' },
        { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' },
      ],
      responseText: [
        { required: true, message: '回复的内容不能为空', trigger: 'blur' },
      ],
    })

    // 获取评论id
    const commentId = ref('')
    // 触发handleIsResponseInput事件
    emitter.on('handleIsResponseInput', (params) => {
      // 点击回复，打开对话框
      dialogVisible.value = params.isDialog
      commentId.value = params.commentId
    })

    const hanleClose = () => {
      dialogVisible.value = false
      // 关闭后清空数据
      formVal.responseName = ''
      formVal.responseText = ''
    }

    const formDom = ref(null)
    const store = useStore()
    const route = useRoute()

    const getCommentList = async function () {
      await store.dispatch('getCommentList', {
        id: +route.query.id,
      })
    }

    const handleEnsure = () => {
      // 先校验
      if (formDom.value) {
        formDom.value.validate(async (valid) => {
          if (valid) {
            // 发送请求
            const { isSuccess } = await request({
              url: '/addResponse',
              method: 'post',
              data: {
                responseName: formVal.responseName,
                responseText: formVal.responseText,
                responseTime: new Date().getTime(),
                comment_id: commentId.value,
                article_id: +route.query.id,
                type_id: +store.state.detail.type_id,
              },
            })

            if (isSuccess) {
              ElMessage.success(`亲爱的 "${formVal.responseName}" , 回复成功`)
              // 再次发送展示评论
              getCommentList()
              // 关闭后清空数据
              formVal.responseName = ''
              formVal.responseText = ''

              // 关闭会话框
              dialogVisible.value = false
            }
          } else {
            ElMessage.error(
              `亲爱的 "${formVal.responseName}" , 回复失败哦, 请重新尝试!`
            )
            // 关闭后清空数据
            formVal.responseName = ''
            formVal.responseText = ''

            // 关闭会话框
            dialogVisible.value = false
          }
        })
      }
    }
    return {
      dialogVisible,
      formVal,
      hanleClose,
      handleEnsure,
      formDom,
      rules,
    }
  },
})
</script>

<style lang="scss">
@import 'assets/config.scss';
.response-input {
  .el-dialog__title {
    color: $text-color;
  }
  .response-box {
    .res-content {
      .el-textarea__inner {
        min-height: 70px !important;
      }
    }
  }
}
</style>
