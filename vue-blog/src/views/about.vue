<template>
  <div class="about">
    <lay-out>
      <div class="about-main wrap">
        <el-row type="flex"
                :gutter="20">
          <el-col :span="18">
            <el-card>
              <h4 style="margin-bottom: 20px; font-size: 16px; font-weight: 600;">个人经历:</h4>
              <p class="resume-content">{{resume}}</p>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="history">
              <p class="title">历史: </p>
              <el-timeline>
                <el-timeline-item v-for="(activity, index) in activities"
                                  :key="index"
                                  :timestamp="activity.timestamp"
                                  :color="activity.color"
                                  :icon="activity.icon">
                  {{activity.content}}
                </el-timeline-item>
              </el-timeline>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </lay-out>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
import LayOut from 'components/LayOut.vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'about',
  components: {
    LayOut,
  },
  setup() {
    const activities = reactive([
      {
        content: '开始构建项目',
        timestamp: '2021-1-27',
        color: '#1890ff',
      },
      {
        content: '项目完成',
        timestamp: '2021-2-3',
        color: '#1890ff',
      },
      {
        content: '持续更新中...',
        icon: 'el-icon-loading',
      },
    ])

    const store = useStore()
    const resume = ref(null)
    const getResume = async () => {
      const _resume = await store.dispatch('getResumeData')
      resume.value = _resume.resume_content
    }
    getResume()
    return {
      activities,
      resume,
    }
  },
})
</script>

<style lang="scss">
@import 'assets/config.scss';
.el-timeline-item__icon {
  color: $primary-color;
}
.about {
  margin-top: 60px;

  .about-main {
    margin-bottom: 80px;
    .resume-content {
      font-size: 16px;
    }
    .history {
      p.title {
        margin-bottom: 20px;
        font-size: 16px;
        font-weight: 600;
        color: $primary-color;
      }
    }
  }
}
</style>
