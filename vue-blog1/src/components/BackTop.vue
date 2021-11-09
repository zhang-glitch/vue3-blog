<template>
  <div class="back-top">
    <div class="top-box">
      <el-backtop :bottom="80" :right="50">
        <i class="iconfont icon-huojian2"></i>
      </el-backtop>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: 'BackTop',

})
</script>

<style lang="scss">
  @import 'assets/config.scss';
  .back-top {
    .top-box {
      i {
        font-size: 26px;
        color: $secondary-color;
      }
    }
  }
</style>