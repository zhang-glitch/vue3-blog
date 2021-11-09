<template>
  <div class="banner-component">
    <el-row>
      <!-- 996px无 -->
      <el-col :xs="0"
              :sm="24"
              :md="24"
              :lg="24"
              :xl="24">
        <el-carousel :interval="4000"
                     type="card"
                     indicator-position="none">
          <el-carousel-item v-for="item in bannerImg"
                            :key="item.id">
            <a href="javascript:;">
              <el-image :src="item.srcName"
                        :alt="item.altName"></el-image>
            </a>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'BannerComponent',
  setup() {
    const bannerImg = ref([
      {
        id: '1',
        altName: 'vue3',
        srcName:
          'http://cdn.lululuting.com/22686650-3164-11eb-989a-65d7366f70f3',
      },
      {
        id: '2',
        altName: 'react',
        srcName:
          'http://cdn.lululuting.com/22686650-3164-11eb-989a-65d7366f70f3',
      },
      {
        id: '3',
        altName: 'angular',
        srcName:
          'http://cdn.lululuting.com/22686650-3164-11eb-989a-65d7366f70f3',
      },
    ])

    return {
      bannerImg,
    }
  },
})
</script>

<style lang="scss">
.banner-component {
  max-height: 830px;
  margin-top: 220px;

  .el-carousel {
    height: 100%;
    a {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
}
</style>
