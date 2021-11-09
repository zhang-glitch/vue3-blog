<template>
  <div class="comment-response">
    <div class="comment-main">
      <div class="comment-item">
        <div class="comment-avatar">
          <el-avatar  src="/comment.jpg"></el-avatar>
        </div>
        <div class="comment-content">
          <div class="comment-author">
            <span>{{comments && comments.commentName}}</span>
            <i>{{comments && comments.commentTime}}</i>
          </div>
          <div class="comment-detail">{{comments && comments.commentText}}</div>
          <div class="comment-action" @click="handleResponse(comments.id)">回复</div>
        </div>
      </div>
      <div class="response-main">
        <div class="comment-item" v-for="response in responses" :key="response.id">
          <div class="comment-avatar">
            <el-avatar  src="/response.jpg"></el-avatar>
          </div>
          <div class="comment-content">
            <div class="comment-author">
              <span>{{response && response.responseName}}</span>
              <i>{{response && response.responseTime}}</i>
            </div>
            <div class="comment-detail">{{response && response.responseText}}</div>
          </div>
        </div>
      </div>
    </div>
    <response-input></response-input>
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
import ResponseInput from './ResponseInput.vue'
import emitter from 'hooks/emitter.js'

export default defineComponent( {
  name: 'CommentResponse',
  props:['comments'],
  components: {
    ResponseInput
  },
  setup(props) {
    const responses = reactive(props.comments.responseList)
    // console.log(props.comments)
    // 触发回复按钮
    const handleResponse = (commentId) => {
      emitter.emit('handleIsResponseInput', {
        isDialog: true,
        commentId
      })
    }
    return {
      responses,
      handleResponse
    }
  }
})
</script>

<style lang="scss">
  @import 'assets/config.scss';

  .comment-response {
    .comment-main, .response-main {
      .comment-item {
        display: flex;
        padding: 16px 0;
        .comment-avatar {
          margin-right: 12px;
        }
        .comment-content {
          flex: 1 1 auto;
          font-size: $fontJ;

          .comment-author {
            margin-bottom: 4px;
            span {
              color: $text-color-secondary;
            }
            i {
              color: #ccc;
              margin-left: 10px;
            } 
          }

          .comment-detail {
            white-space: pre-wrap;
            margin-bottom: 1em;
          }

          .comment-action {
            cursor: pointer;
            font-size: 12px;
            color: $text-color-secondary;
          }
        }
      }
    }

    .response-main {
      margin-left: 44px;
      padding: 0 15px;
      background-color: #f5f7fa;
      border-radius: 5px;
    }
  }
</style>