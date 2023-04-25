<template>
  <div class="create-article">
    <el-table :data="articleList" stripe max-height="600">
      <el-table-column prop="type.typeName" label="类型" align="center">
      </el-table-column>
      <el-table-column prop="title" label="标题" align="center">
      </el-table-column>
      <el-table-column align="center">
        <template #header>
          <div class="tags">创建时间</div>
        </template>
        <template #default="scope">
          {{ moment(scope.row.addTime).format('YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column prop="view_count" label="浏览量" align="center">
      </el-table-column>
      <el-table-column align="center">
        <template #header>
          <div class="tags">标签</div>
        </template>
        <template #default="scope">
          <el-tag
            :type="item.colorText"
            v-for="(item, index) in handleTags(scope.row.tags)"
            :key="index"
            >{{ item.tagName }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="slogan" label="标语" align="center">
      </el-table-column>
      <el-table-column prop="star" label="点赞量" align="center">
      </el-table-column>
      <el-table-column prop="author" label="作者" align="center">
      </el-table-column>
      <el-table-column align="center">
        <template #header>
          <div class="operate">操作</div>
        </template>
        <template #default="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="handleEdit(scope.row)"
          ></el-button>
          <el-popconfirm
            confirmButtonText="确定"
            cancelButtonText="取消"
            confirmButtonType="danger"
            cancelButtonType="primary"
            icon="el-icon-info"
            iconColor="red"
            :title="`确定要删除${scope.row.title}这篇文章吗？`"
            @confirm="handleConfirm(scope.row)"
            @cancel="handleCancel(scope.row)"
          >
            <template #reference>
              <el-button
                type="danger"
                icon="el-icon-delete"
                :key="scope.$index"
                circle
              ></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        @prev-click="handleCurrentChange"
        @next-click="handleCurrentChange"
        :hide-on-single-page="true"
        :currentPage="num"
        :total="(parseInt(countAll / size) + 1) * 10"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import handleTags from '../util/handleTags'
import moment from 'moment'
import request from '../http/request'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import emitter from '../util/mitter.js'
export default defineComponent({
  name: 'ArticleList',
  setup() {
    const store = useStore()
    const size = ref(6)
    const num = ref(1)
    const articleList = ref([])
    const countAll = ref(0)
    const router = useRouter()
    // 获取文章列表
    const getArticleList = async () => {
      const _articleList = await store.dispatch('getArticleList', {
        pageSize: size.value,
        pageNum: num.value,
      })
      articleList.value = _articleList.articleData
      countAll.value = _articleList.count
    }

    getArticleList()

    // 编辑按钮
    const handleEdit = (row) => {
      const article = {
        ...row,
        type: row.type.typeName,
      }
      // 将文章保存在本地。
      window.localStorage.setItem('article', JSON.stringify(article))
      router.push('/create')
      emitter.emit('updateSubmitText', '更新')
    }
    // 删除按钮
    // 真正删除
    const handleConfirm = async (row) => {
      // 删除
      const res = await request({
        url: '/admin/deleteArticle',
        method: 'post',
        data: {
          id: row.id,
        },
      })
      // 再次请求留言列表
      getArticleList()
      if (res.status === 1001) {
        return
      }
      ElMessage.success({
        message: `${row.title}这篇文章删除成功`,
        type: 'success',
      })
    }

    const handleCancel = async (row) => {
      ElMessage.error({
        message: `${row.title}这篇文章删除失败`,
        type: 'danger',
      })
    }

    // 当前页数
    const handleCurrentChange = (val) => {
      num.value = val
      getArticleList()
    }
    return {
      articleList,
      handleEdit,
      handleTags,
      moment,
      handleCurrentChange,
      num,
      size,
      countAll,
      handleCancel,
      handleConfirm,
    }
  },
})
</script>

<style lang="scss">
.create-article {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  /* 这里通过绝对定位去解决横向滚动条问题 */
  position: relative;

  .el-table_1_column_6 {
    width: 200px;
    white-space: nowrap; //不让内容折行
    overflow: hidden; //溢出隐藏
    text-overflow: ellipsis; //添加省略号
  }

  .el-table_1_column_5 {
    box-sizing: border-box;
    .el-tag {
      margin-right: 5px;
      height: 22px;
      line-height: 22px;
    }
  }

  .el-table {
    flex: 1;
    position: absolute;
    right: 0;

    .el-table__body-wrapper {
      width: 100%;

      .el-table__body {
        width: 100% !important;
        overflow-x: scroll;
      }
    }
  }

  .pagination {
    height: 55px;
    /* display: flex;
    justify-content: flex-end;
    align-items: center; */
    .el-pagination {
      position: absolute;
      bottom: 50px;
      right: 20px;
    }
  }
}
</style>
