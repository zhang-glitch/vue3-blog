<template>
  <div class="create-article">
    <div class="create-wrapper">
      <el-form ref="form"
               :model="formVal"
               :rules="rules">
        <el-form-item class="title-operate"
                      prop="title">
          <el-input class="title"
                    maxlength="80"
                    placeholder="请输入文章标题"
                    v-model="formVal.title"></el-input>
          <div class="operate">
            <el-button @click="handleSave">草稿箱</el-button>
            <!-- 点击发布后的弹窗 -->
            <el-popover popper-class="publish-wrapper"
                        placement="bottom"
                        trigger="click"
                        :width="560"
                        :visible="visible">
              <el-form ref="formContainer"
                       :model="formVal"
                       :rules="rules">
                <el-form-item label="分类:"
                              class="type"
                              prop="type">
                  <el-radio-group v-model="formVal.type">
                    <el-radio label="技术"></el-radio>
                    <el-radio label="摄影"></el-radio>
                    <el-radio label="生活"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="添加标签:"
                              class="tags"
                              prop="tags">
                  <el-input v-model="formVal.tags"
                            placeholder="请输入文章标签"></el-input>
                </el-form-item>
                <el-form-item label="文章封面:"
                              class="image"
                              prop="image">
                  <el-input v-model="formVal.image"
                            placeholder="请输入文章封面路径"></el-input>
                </el-form-item>
                <el-form-item label="添加简介:"
                              class="slogan"
                              prop="slogan">
                  <el-input type="textarea"
                            v-model="formVal.slogan"
                            placeholder="请输入文章封面路径"></el-input>
                </el-form-item>
                <el-form-item label="作者:"
                              class="author"
                              prop="author">
                  <el-input v-model="formVal.author"
                            placeholder="请输入作者昵称"></el-input>
                </el-form-item>
              </el-form>
              <div style="text-align: right; margin: 0">
                <el-button size="mini"
                           @click="visible = false">取消</el-button>
                <el-button type="primary"
                           size="mini"
                           @click="ensurePublish">确定并{{updatePublishText}}</el-button>
              </div>
              <template #reference>
                <el-button type="primary"
                           @click="handlePublish">{{updatePublishText}}</el-button>
              </template>
            </el-popover>
          </div>
        </el-form-item>
        <el-form-item prop="article_content">
          <div id="vditor"
               v-text="formVal.article_content"></div>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import 'vditor/dist/index.css'
import Vditor from 'vditor'
import request from '../http/request'
import { ElMessage } from 'element-plus'
// import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'CreateArticle',
  setup() {
    const contentEditor = ref({})
    const isOutline = ref(false)
    const visible = ref(false)
    const formVal = ref({
      title: '',
      author: '',
      type: '',
      slogan: '',
      tags: '',
      article_content: '',
      image: '',
    })
    const type_id = ref(1)
    const formContainer = ref(null)
    // 确定发布文章的字体。更新/发布
    const updatePublishText = ref('发布')

    const getVditor = function () {
      contentEditor.value = new Vditor('vditor', {
        height: 600,
        placeholder: '此处为话题内容……',
        counter: {
          enable: true,
          type: 'markdown',
        },
        // 编辑器主题
        theme: 'classic',
        outline: {
          enable: isOutline.value,
          position: 'right',
        },
        preview: {
          delay: 0,
          hljs: {
            enable: true,
            lineNumber: true,
            style: 'native',
          },
          theme: {
            list: {
              dark: 'Dark',
              light: 'Light',
              wechat: 'WeChat',
              classic: 'classic',
            },
          },
        },
        tab: '\t',
        typewriterMode: true,
        toolbarConfig: {
          pin: true,
        },
        cache: {
          enable: false,
        },
        mode: 'sv',
        toolbar: [
          'emoji',
          'headings',
          'bold',
          'italic',
          'strike',
          'link',
          '|',
          'list',
          'ordered-list',
          'check',
          'outdent',
          'indent',
          '|',
          'quote',
          'line',
          'code',
          'inline-code',
          'insert-before',
          'insert-after',
          '|',
          // 'record',
          'table',
          '|',
          'undo',
          'redo',
          '|',
          'edit-mode',
          // 'content-theme',
          'code-theme',
          'export',
          {
            name: 'more',
            toolbar: [
              'fullscreen',
              'outline',
              'both',
              'preview',
              'info',
              'help',
            ],
          },
        ],
      })
    }

    onMounted(() => {
      getVditor()
    })

    // 外层表单验证规则
    const rules = ref({
      title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
      author: [{ required: true, message: '作者不能为空', trigger: 'blur' }],
      type: [{ required: true, message: '文章类型不能为空', trigger: 'blur' }],
      slogan: [
        { required: true, message: '文章简介不能为空', trigger: 'blur' },
      ],
      tags: [{ required: true, message: '文章标签不能为空', trigger: 'blur' }],
      image: [{ required: true, message: '文章封面不能为空', trigger: 'blur' }],
      article_content: [
        { required: true, message: '文章内容不能为空', trigger: 'blur' },
      ],
    })

    // 点击发布
    const handlePublish = () => {
      visible.value = true
    }

    // 文章创建和修改接口的请求
    const http = async (url, data) => {
      const res = await request({
        url,
        method: 'post',
        data,
      })

      if (res === '创建成功') {
        // 清空缓存，发布的文章
        window.localStorage.setItem('articleSave', '')
      } else if (res === '编辑成功') {
        // 清空缓存，编辑的文章
        window.localStorage.setItem('article', '')
      }

      if (res == '创建成功' || res == '编辑成功') {
        ElMessage.success({
          message: `《${formVal.value.title}》文章${res}`,
          type: 'success',
        })
        visible.value = false
      } else {
        ElMessage.error(`《${formVal.value.title}》文章创建失败`)
        visible.value = true
      }
    }

    // 确定并发布
    const ensurePublish = () => {
      // 赋值文章内容。再点击发布按钮的时候，会出现bug。点击后vditor会消失。
      formVal.value.article_content = contentEditor.value.getValue()
      // 验证表单
      formContainer.value?.validate(async (valid) => {
        if (valid) {
          if (updatePublishText.value === '更新') {
            // 更新文章的请求
            await http('/admin/updateArticle', formVal.value)
          } else {
            // 发布文章
            if (formVal.value.type === '技术') {
              type_id.value = '1'
            } else if (formVal.value.type === '摄影') {
              type_id.value = '2'
            } else {
              type_id.value = '3'
            }
            // 发送请求
            const createData = {
              ...formVal.value,
              type_id: type_id.value,
              addTime: new Date().getTime(),
              view_count: 0,
              star: 0,
            }
            await http('/admin/createArticle', createData)
          }
          // 清空表单
          formVal.value.title = ''
          formVal.value.author = ''
          formVal.value.type = ''
          formVal.value.slogan = ''
          formVal.value.tags = ''
          formVal.value.image = ''
          formVal.value.article_content = ''
        } else {
          return false
        }
      })
      // // 这里因为创建文章后，不会显示编辑组件了，所以需要再次创建一个编辑器组件。
      getVditor()
    }

    // 草稿箱
    const handleSave = () => {
      // 赋值文章内容。再点击发布按钮的时候，会出现bug。点击后vditor会消失。
      formVal.value.article_content = contentEditor.value.getValue()
      // 点击草稿箱后，先删除缓存的编辑文章
      window.localStorage.removeItem('article')
      // 将草稿保存到本地
      window.localStorage.setItem('articleSave', JSON.stringify(formVal.value))
      // 关闭弹窗
      visible.value = false
    }

    // 赋值表单项和文字
    const article = localStorage.getItem('article')
    const articleSave = localStorage.getItem('articleSave')
    if (article) {
      // 先清除articleSave
      // 先删除保存在草稿箱的记录。
      window.localStorage.removeItem('articleSave')
      // 更新
      updatePublishText.value = '更新'
      formVal.value = JSON.parse(article)
    } else if (articleSave) {
      updatePublishText.value = '发布'
      // 先清除修改的文章记录
      window.localStorage.removeItem('article')
      formVal.value = JSON.parse(articleSave)
    }

    // // 当修改文章时
    // const router = useRouter()
    // const instance = getCurrentInstance()
    // router.beforeEach((to, from, next) => {
    //   console.log('first===============')
    //   // 只要是进入这里，给formVal赋值都是无效的。
    //   if (from.name == 'list' && to.name == 'create') {
    //     // console.log('=======', from)
    //     // 改变发布文章的字体
    //     updatePublishText.value = '更新'
    //     // console.log('=====updatePublic', updatePublishText)
    //     // // 先删除保存在草稿箱的记录。
    //     // window.localStorage.removeItem('articleSave')
    //     const article = window.localStorage.getItem('article')
    //     if (article) {
    //       formVal.value = JSON.parse(article)
    //       // console.log(formVal.value)
    //     }

    //     instance.ctx.$forceUpdate()
    //   } else {
    //     // 改变发布文章的字体
    //     updatePublishText.value = '发布'
    //     // console.log('=====updatePublic', updatePublishText)
    //     // 取出保存的数据
    //     const articleSave = window.localStorage.getItem('articleSave')
    //     if (articleSave) {
    //       formVal.value = JSON.parse(articleSave)
    //       // console.log('articleSave', formVal.value)
    //     }

    //     instance.ctx.$forceUpdate()
    //   }
    //   next()
    // })

    return {
      formVal,
      handlePublish,
      visible,
      rules,
      ensurePublish,
      formContainer,
      handleSave,
      updatePublishText,
    }
  },
})
</script>

<style lang="scss">
// 弹窗样式
.publish-wrapper {
  margin: 1.8rem -3rem 0 0 !important;
  white-space: nowrap;
  color: #909090;
  background-color: #fff;
  border: 1px solid #ddd;

  .type label,
  .tags label,
  .image label,
  .slogan label,
  .author label {
    color: #1d2129;
    width: 85px !important;
  }
}
.create-article {
  .create-wrapper {
    .title-operate {
      box-sizing: border-box;
      border-bottom: 1px solid #eee;
      margin-bottom: 0px;
      .el-form-item__content {
        padding: 0 27px;
        height: 5.334rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .title {
          flex: 1 1 auto;
          width: auto;
          .el-input__inner {
            height: 100%;
            line-height: 100%;
            margin: 0;
            padding: 0;
            font-size: 24px;
            font-weight: 500;
            color: #1d2129;
            border: none;
            outline: none;
          }
        }
      }
    }
  }
}
</style>
