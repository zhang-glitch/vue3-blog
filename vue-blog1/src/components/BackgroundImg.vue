<template>
   <div class="background-img">
    <el-row>
      <!-- 768px无 -->
      <el-col :xs="0" :sm="24" :md="24" :lg="24" :xl="24">
        <suspense>
          <template #default>
            <div class="background-img-wrap" :style="{backgroundImage: 'url('+imgUrl+')'}">
              <div class="key-wrap wrap">
                <i class="key">等风也等你 @llm</i>
              </div>
            </div>
          </template>
          <template #fallback>
            <h1>~ 昊 淼 博 客 ~</h1>
          </template>
        </suspense>
      </el-col>
    </el-row>
   </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: 'BackgroundImg',
  props: ['imgUrl'],
  // setup(props) {
  //   const backgroundStyle = computed(() => props.imgUrl);
  //   return {
  //     backgroundStyle
  //   }
  // }
})
</script>

<style lang="scss">
  .background-img {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: -1;
    width: 100%;
    height: 200px;

    .background-img-wrap {
      height: 100%;
      width: 100%;
      background-position: 50% 50%;
      background-size: cover;
    }

    //使文字显示在通栏内
    .key-wrap {
      max-width: 1200px;
      height: 200px;
      margin: 0 auto;
      position: relative;

      .key {
        display: none;
        transition: all 1s;
      }
      &:hover {
        .key {
          position: absolute;
          bottom: 25px;
          left: 280px;
          display: block;
          background: rgba($color: #000000, $alpha: 0.7);
          color: #ffffff;
          padding: 5px 10px;
          font-size: 16px;
          font-family:cursive;
          border-radius: 3px;
          letter-spacing: 1px;
          cursor: pointer;
        }
      }
    }
    
    
  }
</style>