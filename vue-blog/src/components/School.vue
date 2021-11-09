<template>
  <div class="school">
    <el-card shadow="always">
      <template #header>
        <span class="school-title">我的大学</span>
      </template>
      <template v-if="schoolList.length">
        <el-carousel>
          <el-carousel-item v-for="item in schoolList"
                            :key="item.id">
            <a href="javascript:;">
              <el-image :src="item.image"></el-image>
            </a>
            <ul class="school-info-wrapper">
              <li>
                <i class="iconfont icondizhi"></i>
                <span class="school-info">{{item.local}}</span>
              </li>
              <li>
                <i class="iconfont iconfangwu"></i>
                <span class="school-info">{{item.schoolName}}</span>
              </li>
              <li>
                <i class="iconfont iconguanwang"></i>
                <span class="school-info">{{item.website}}</span>
              </li>
            </ul>
          </el-carousel-item>
        </el-carousel>
      </template>
      <lazy-img v-else></lazy-img>
    </el-card>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import request from '../http/request'
import LazyImg from './LazyImg.vue'

export default defineComponent({
  name: 'School',
  components: {
    LazyImg,
  },
  setup() {
    const schoolList = ref([])
    const getSchoolList = async () => {
      const data = await request({
        url: '/getSchool',
        method: 'get',
      })
      schoolList.value = data
    }
    getSchoolList()
    return {
      schoolList,
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
