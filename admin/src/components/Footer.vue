<template>
  <div class="admin-footer">
    <p class="about-mark">@ 2023 <a href="https://www.haomiao.love/about">昊淼博客</a></p>
    <p class="aq"><a href="https://beian.miit.gov.cn">豫ICP备2023010223号</a></p>
    <p>记录美好的生活经历，欢迎交流</p>
  </div>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {}
})
</script>
<style  scoped lang="scss">
  .admin-footer {
    height: 57px;
    line-height: 57px;
    font-size: 16px;
    display: flex;
    justify-content: center;
    /* border-top: 4px solid #ccc;  */
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.5); /* 设置一个沿着Y轴向下偏移3像素，模糊半径为5像素的灰色阴影*/

    .about-mark a{
      color: #1890ff;
      margin-right: 20px;
    }

    .aq a {
      color: #eb5858;
      margin-right: 20px;
    }
    
  }
</style>