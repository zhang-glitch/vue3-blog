<template>
  <div class="comment-response">
    <el-table
      :data="messageList"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      stripe
      :tree-props="{ children: 'responseList' }"
    >
      <el-table-column>
        <template #header>
          <div class="time">留言名称</div>
        </template>
        <template #default="scope">
          {{ scope.row.commentName || scope.row.responseName }}
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template #header>
          <div class="time">留言内容</div>
        </template>
        <template #default="scope">
          {{ scope.row.commentText || scope.row.responseText }}
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template #header>
          <div class="time">留言时间</div>
        </template>
        <template #default="scope">
          {{
            moment(+scope.row.commentTime || +scope.row.responseTime).format(
              'YYYY-MM-DD'
            )
          }}
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template #header>
          <div class="operate">操作</div>
        </template>
        <template #default="scope">
          <el-popconfirm
            confirmButtonText="确定"
            cancelButtonText="取消"
            confirmButtonType="danger"
            cancelButtonType="primary"
            icon="el-icon-info"
            iconColor="red"
            :title="`确定要删除${
              scope.row.commentName || scope.row.responseName
            }的留言及评论吗？`"
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
import moment from 'moment'
import request from '../http/request'
import { ElMessage } from 'element-plus'
export default defineComponent({
  name: 'CommentResponse',
  setup() {
    const store = useStore()
    const messageList = ref([])
    const size = ref(8)
    const num = ref(1)
    const countAll = ref(0)
    const getMessageList = async () => {
      const res = await store.dispatch('getMessageList', {
        pageSize: size.value,
        pageNum: num.value,
      })
      messageList.value = res.messageData
      countAll.value = res.count
    }

    getMessageList()

    // 真正删除
    const handleConfirm = async (row) => {
      // 删除时，需要将回复也删了
      if (row.article_id) {
        await request({
          url: '/admin/deleteComment',
          method: 'post',
          data: {
            id: row.id,
          },
        })
      } else {
        await request({
          url: '/admin/deleteResponse',
          method: 'post',
          data: {
            id: row.id,
          },
        })
      }

      // 再次请求留言列表
      getMessageList()

      ElMessage.success({
        message: `${row.commentName || row.responseName}的留言及回复删除成功`,
        type: 'success',
      })
    }

    const handleCancel = async (row) => {
      ElMessage.error({
        message: `${row.commentName || row.responseName}的留言及回复删除失败`,
        type: 'danger',
      })
    }
    // 当前页数
    const handleCurrentChange = (val) => {
      num.value = val
      getMessageList()
    }
    return {
      messageList,
      size,
      num,
      countAll,
      moment,
      handleCurrentChange,
      handleCancel,
      handleConfirm,
    }
  },
})
</script>

<style lang="scss">
.comment-response {
  .el-table {
    flex: 1;
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    height: 55px;
    margin-top: 30px;
    /* .el-pagination {
      position: absolute;
      bottom: 0;
      right: 20px;
    } */
  }
}
</style>
