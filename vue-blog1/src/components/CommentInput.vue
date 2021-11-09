<template>
  <div class="comment-input">
    <el-divider>欢迎评论</el-divider>
    <el-form :model="formVal" :rules="rules" ref="formDom">
          <el-form-item 
            label="昵称" 
            prop="commentName"
          >
            <el-input 
            v-model="formVal.commentName" 
            placeholder="请输入昵称" 
            class="res-name"
            >
            </el-input>
          </el-form-item>
          <el-form-item 
            label="评论内容" 
            prop="commentText"
          >
            <el-input
              type="textarea"
              placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。"
              v-model="formVal.commentText"
              class="res-content"
            >
            </el-input>
        </el-form-item>
        <div class="comment-actions">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="handleEnsure">确定</el-button>
        </div>
      </el-form>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from "vue";
import { ElMessage } from 'element-plus'
import axios from 'axios'
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default defineComponent({
  name: 'CommentInput',
  setup() {
    const formVal = reactive({
      commentName: '',
      commentText: ''
    })

    const rules = reactive({
      commentName: [
        { required: true, message: '昵称不能为空', trigger: 'blur' },
        { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
      ],
      commentText: [
        { required: true, message: '回复的内容不能为空', trigger: 'blur' }
      ]
    })

    const handleClose = () => {
      formVal.commentName = ""
      formVal.commentText = ""
    }

    const formDom = ref(null);
    const store = useStore();
    const route = useRoute();
    const handleEnsure = () => {
      // 先校验
      if(formDom.value) {
        formDom.value.validate((valid) => {
          if (valid) {
            // 发送请求
            axios.post('/default/addComment', {
              commentName: formVal.commentName,
              commentText: formVal.commentText,
              commentTime: new Date().getTime() / 1000,
              article_id: route.query.id
            }).then(res => {
              if(res.data.isSuccess) {
                // 再次发送展示评论
                store.dispatch('getCommentList', {id: route.query.id})
                ElMessage.success(`亲爱的 "${formVal.commentName}" , 评论成功`)
                formVal.commentName = ""
                formVal.commentText = ""
              }
            })
          } else {
            ElMessage.error(`亲爱的 "${formVal.commentName}" , 评论失败哦, 请重新尝试!`)
            formVal.commentName = ""
            formVal.commentText = ""
          }
        })
      }
    }

    return {
      formVal,
      rules,
      formDom,
      handleEnsure,
      handleClose
    }

    
  }
})
</script>

<style lang="scss">
  @import 'assets/config.scss';
  .comment-input {
    position: relative;
    margin-top: 30px;
    padding-bottom: 60px;
    .el-divider {
      background-color: $primary-color !important;
    }
    .el-divider__text.is-center {
      color: $primary-color;
      font-size: 16px;
    }

    .comment-actions {
      position: absolute;
      right: 30px;

      bottom: 10px;
    }
  }
</style>