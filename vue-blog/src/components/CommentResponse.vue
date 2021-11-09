<template>
  <div class="comment-response">
    <div class="comment-main">
      <div class="comment-item">
        <div class="comment-avatar">
          <el-avatar src="/comment.jpg"></el-avatar>
        </div>
        <div class="comment-content">
          <div class="comment-author">
            <span>{{comments?.commentName}}</span>
            <i>{{moment(+comments?.commentTime).format("YYYY-MM-DD hh:mm:ss")}}</i>
          </div>
          <div class="comment-detail">{{comments?.commentText}}</div>
          <span class="comment-action"
                @click="handleResponse(comments?.id)">回复</span>
        </div>
      </div>
      <div class="response-main">
        <div class="comment-item"
             v-for="response in responses"
             :key="response.id">
          <div class="comment-avatar">
            <el-avatar src="/response.jpg"></el-avatar>
          </div>
          <div class="comment-content">
            <div class="comment-author">
              <span>{{response?.responseName}}</span>
              <i>{{moment(+response?.responseTime).format("YYYY-MM-DD hh:mm:ss")}}</i>
            </div>
            <div class="comment-detail">{{response?.responseText}}</div>
          </div>
        </div>
      </div>
    </div>
    <response-input></response-input>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import ResponseInput from './ResponseInput.vue'
import emitter from 'util/emitter.js'
import moment from 'moment'

export default defineComponent({
  name: 'CommentResponse',
  props: ['comments'],
  components: {
    ResponseInput,
  },
  setup(props) {
    const responses = reactive(props.comments.responseList)
    // 触发回复按钮
    const handleResponse = (commentId) => {
      emitter.emit('handleIsResponseInput', {
        isDialog: true,
        commentId,
      })
    }
    return {
      responses,
      handleResponse,
      moment,
    }
  },
})
</script>

<style lang="scss">
@import 'assets/config.scss';

.comment-response {
  .comment-main,
  .response-main {
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
