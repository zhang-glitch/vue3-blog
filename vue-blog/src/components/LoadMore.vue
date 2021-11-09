<template>
  <div class="load-more">
    <el-button plain
               @click="handleLoadMore"
               v-if="isLoadMore">加载更多</el-button>
    <div v-else
         class="load-more-info">~亲,暂无更多文章~</div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoadMore',
  emits: ['handleLoadMore'],
  props: {
    isLoadMore: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, context) {
    const handleLoadMore = () => {
      context.emit('handleLoadMore')
    }
    return {
      handleLoadMore,
    }
  },
})
</script>
<style lang="scss">
.load-more {
  display: flex;
  justify-content: center;
  margin-top: 30px;

  .load-more-info {
    font-size: 16px;
    letter-spacing: 5px;
    color: rgba(0, 0, 0, 0.45);
  }
}
</style>
