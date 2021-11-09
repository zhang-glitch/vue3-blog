<template>
  <div class="show-comment">
    <div class="comment-title">
      <p>评论列表</p>
    </div>
    <el-divider></el-divider>
    <template v-if="commentList.length">
      <comment-response v-for="comment in commentList"
                        :key="comment.id"
                        :comments="comment">
      </comment-response>
    </template>
    <div class="loader"
         v-else>
      <div class="txt"
           style="text-align: center; margin-top: 56px;">
        <span>靓仔，</span> <span>暂时没有评论哟！</span> <span>赶快发表第一谈吧！</span>
      </div>
    </div>
  </div>

</template>

<script>
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import CommentResponse from './CommentResponse.vue'

export default defineComponent({
  name: 'ShowComment',
  components: {
    CommentResponse,
  },
  setup() {
    // 请求评论数据
    const store = useStore()
    const route = useRoute()

    const getCommentList = async function () {
      await store.dispatch('getCommentList', {
        id: route.query.id,
      })
    }

    getCommentList()

    const commentList = computed(() => store.state.commentList)
    return {
      commentList,
    }
  },
})
</script>

<style lang="scss">
@import 'assets/config';
.show-comment {
  padding: 0 12px;
  .comment-title {
    margin-bottom: -10px;
    color: $text-color-secondary;
  }
}
</style>
