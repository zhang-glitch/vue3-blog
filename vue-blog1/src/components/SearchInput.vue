<template>
   <div class="search-input">
     <el-input
        placeholder="请输入内容"
        v-model="searchValue"
      >
        <template #suffix>
          <i class="el-input__icon el-icon-search" @click="skipSearchPage"></i>
        </template>
      </el-input>
   </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import emitter from 'hooks/emitter.js'
import { useStore } from "vuex";

export default defineComponent({
  name: 'SearchInput',
  setup() {
    let searchValue = ref("")
    const router = useRouter();
    const store = useStore()
    const skipSearchPage = () => {
      // 发送请求
      store.dispatch("getSearchArticleList", {searchVal: searchValue.value, size: 5})
      // 跳转页面
      router.push(`/search?searchVal=${searchValue.value}&size=5`)
      // 获取搜索的文章总数
      store.dispatch("getSearchArticleCount", {searchVal: searchValue.value})
      // 当处于移动端时，传递关闭侧边功能栏
      emitter.emit("handleCloseXsMenu", false)
    }
    return {
      searchValue,
      skipSearchPage
    }
  }
})
</script>

<style lang="scss">
  @import 'assets/config.scss';
  .search-input {
    // width: 200px;
    width:100%;
    height: 30px;
    line-height: 46px;

    .el-input--suffix .el-input__inner {
      border-radius: 20px;
    }

    //修改图标位置
    .el-input__suffix {
      right: 0px;
    }

    //修改搜索图标宽度
    .el-input__icon {
      width: 50px;
    }

    .el-input__prefix, .el-input__suffix {
      border-radius: 0px 20px 20px 0;
      background-color: #deecfa;
      color: #4ba7fd;
      &:hover {
        color: $primary-color;
        background-color: #c8e2f9;
        cursor: pointer;
        border-radius: 20px;
        i {
          font-weight: bold;
        }
      }
      
    }
  }
</style>