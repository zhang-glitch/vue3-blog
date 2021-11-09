<template>
  <div class="school">
    <el-card shadow="always">
      <template #header>
        <span class="school-title">广告位</span>
      </template>
      <div class="advert-img">
        <a :href="advert.advLink">
          <img :src="advert.image">
        </a>
      </div>
    </el-card>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import request from '../http/request'

export default defineComponent({
  name: 'Advert',
  setup() {
    const advert = ref({})
    const getAdvert = async () => {
      const data = await request({
        url: '/getAdvert',
        method: 'get',
      })
      advert.value = data[0]
    }
    getAdvert()
    return {
      advert,
    }
  },
})
</script>

<style  lang="scss">
@import 'assets/config.scss';
.school {
  margin-top: 30px;
  .school-title {
    font-size: 16px;
    color: $primary-color;
    font-weight: 600;
    letter-spacing: 2px;
  }

  .school-info-wrapper {
    margin-top: 30px;
    .school-info {
      margin-left: 10px;
    }
  }
}
</style>
