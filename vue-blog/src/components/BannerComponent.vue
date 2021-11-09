<template>
  <div class="banner-component">
    <el-row>
      <!-- 996px无 -->
      <el-col :xs="0"
              :sm="24"
              :md="24"
              :lg="24"
              :xl="24">
        <template v-if="bannerList.length">
          <el-carousel :interval="4000"
                       type="card"
                       indicator-position="none">
            <el-carousel-item v-for="item in bannerList"
                              :key="item.id">
              <a href="javascript:;">
                <lazy-img :imgUrl="item.image"></lazy-img>
              </a>
            </el-carousel-item>
          </el-carousel>
        </template>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import request from '../http/request'
import LazyImg from './LazyImg.vue'

export default defineComponent({
  name: 'BannerComponent',
  components: {
    LazyImg,
  },
  setup() {
    const bannerList = ref([])

    const getBannerList = async () => {
      const data = await request({
        url: '/getBanner',
        method: 'get',
      })
      bannerList.value = data
    }

    getBannerList()

    return {
      bannerList,
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
