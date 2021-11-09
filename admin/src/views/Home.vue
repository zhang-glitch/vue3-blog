<template>
  <div class="home-wrapper">
    <Header />
    <div class="home">
      <el-menu class="menu"
               @select="handleSelect"
               :collapse="isCollapse">
        <div class="btn-collapse"
             @click="handleCollapse">
          <i :class="collapseIcon"></i>
        </div>
        <el-submenu index="1">
          <template #title>
            <i class="el-icon-location"></i>
            <span>文章</span>
          </template>
          <el-menu-item index="create">写文章</el-menu-item>
          <el-menu-item index="list">文章列表</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template #title>
            <i class="el-icon-location"></i>
            <span>留言</span>
          </template>
          <el-menu-item index="message">评论</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template #title>
            <i class="el-icon-location"></i>
            <span>网站统计</span>
          </template>
          <el-menu-item index="totalchart">
            <!-- <i class="el-icon-setting"></i> -->
            <template #title>总体统计</template>
          </el-menu-item>
          <el-menu-item index="articlechart">
            <!-- <i class="el-icon-setting"></i> -->
            <template #title>文章统计</template>
          </el-menu-item>
          <el-menu-item index="commentchart">
            <!-- <i class="el-icon-setting"></i> -->
            <template #title>评论统计</template>
          </el-menu-item>
          <el-menu-item index="responsechart">
            <!-- <i class="el-icon-setting"></i> -->
            <template #title>回复统计</template>
          </el-menu-item>
        </el-submenu>

      </el-menu>
      <!-- 内容区域 -->
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'
export default defineComponent({
  name: 'Home',
  components: {
    Header,
  },
  setup() {
    const isCollapse = ref(false)
    const collapseIcon = ref('el-icon-caret-left')
    const router = useRouter()

    const handleSelect = (key) => {
      if (key === 'create') {
        router.push('/create')
      } else if (key === 'list') {
        router.push('/list')
      } else if (key === 'message') {
        router.push('/message')
      } else if (key === 'totalchart') {
        router.push('/totalchart')
      } else if (key === 'articlechart') {
        router.push('/articlechart')
      } else if (key === 'commentchart') {
        router.push('/commentchart')
      } else if (key === 'responsechart') {
        router.push('/responsechart')
      }
    }
    const handleCollapse = () => {
      isCollapse.value = !isCollapse.value
      if (isCollapse.value) {
        // 折叠
        collapseIcon.value = 'el-icon-caret-right'
      } else {
        collapseIcon.value = 'el-icon-caret-left'
      }
    }
    return {
      isCollapse,
      collapseIcon,
      handleCollapse,
      handleSelect,
    }
  },
})
</script>

<style lang="scss">
.home-wrapper {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
}
.home {
  display: flex;
  height: 100%;
  width: 100%;

  .menu {
    box-sizing: border-box;
    height: 100%;
    // 折叠按钮
    .btn-collapse {
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      i {
        font-size: 20px;
      }
    }
  }
  .content {
    flex: 1;
  }
}
</style>
