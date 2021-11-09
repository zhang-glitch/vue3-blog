<template>
  <div v-loading="isLoading"
       :element-loading-spinner="'el-icon-loading'">
    <lay-out>
      <div class="wrap clear">
        <!-- 头部背景 -->
        <div class="detail-img">
          <div class="cover-box">
            <div class="b-cover">
              <lazy-img :imgUrl="article.image"></lazy-img>
            </div>
            <div class="s-cover">
              <!-- <div class="item-background"
                   v-if="article.image"
                   :style="{backgroundImage: `url(${article.image})`}"></div> -->
              <lazy-img :imgUrl="article.image"></lazy-img>
            </div>
          </div>
        </div>
        <!-- 文章详情 -->
        <div class="detail">
          <div class="detail-wrapper">
            <div class="info container">
              <h1 class="article-title">{{article ? article.title : ''}}</h1>
              <div class="user-nav"
                   style="margin-left: 3px;">
                <ul>
                  <li style="padding-left: 0;">
                    {{article ? article.author : 'js臻'}}
                    <em></em>
                  </li>
                  <li>

                    {{article ? moment(article.addTime).startOf('hour').fromNow() : ''}}
                    <em></em>
                  </li>
                  <li>
                    <i class="iconfont icon-huo"></i>
                    {{article ? article.view_count : ''}}
                    <em></em>
                  </li>
                  <li>
                    <i class="iconfont icon-dianzan_active"></i>
                    {{article ? article.star : ''}}
                  </li>
                </ul>
              </div>
            </div>
            <el-divider></el-divider>
            <div class="show-article-main">
              <div class="show-article-main-wrapper container">
                <div class="row">
                  <div class=" share-star-wrapper">
                    <el-card style="position: fixed; z-index: 99 !important; left: 5px !important;">
                      <div class="share-star">
                        <span class="star">
                          <i class="iconfont icon-dianzan_active"></i>
                        </span>
                        <span class="share">
                          <i class="el-icon-share"></i>
                        </span>
                      </div>
                    </el-card>
                  </div>
                  <div class="col-12 col-sm-12 col-md-11 col-lg-8 col-xl-9 detailed-content">
                    <el-card>
                      <!-- 内容区域 -->
                      <div id="preview"></div>
                      <el-divider style="margin-top: 50px;"></el-divider>
                      <div class="reward">
                        <p>"你的赞赏，是对我最大的支持哦 !"</p>
                        <div class="reward-btn">
                          <el-button type="primary"
                                     round
                                     @click="isReward=true">
                            <span class="iconfont icon-zanshang"></span>
                            赞赏支持
                          </el-button>
                        </div>
                        <div class="reward-background">
                          <img src="/reward.png"
                               alt="">
                        </div>
                      </div>
                      <!-- 展示评论 -->
                      <show-comment></show-comment>
                    </el-card>
                    <!-- 评论 -->
                    <el-card style="margin-top: 30px;">
                      <comment-input></comment-input>
                    </el-card>
                  </div>
                  <div class="col-0 col-sm-0 col-md-0 col-lg-3 col-xl-3 catelog">
                    <el-affix :offset="100">
                      <el-card class="nav-wrapper">
                        <template #header>
                          <i class="iconfont icon-shu"></i>
                          <span>目录</span>
                        </template>
                        <div className="toc-list"
                             :style="{ maxHeight: 500, overflowY: 'auto' }"
                             id="outline"></div>
                      </el-card>
                    </el-affix>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 赞赏的弹窗 -->
        <div class="reward-dialog">
          <el-dialog v-model="isReward"
                     width="300px"
                     :show-close="false"
                     :lock-scroll="false">
            <div class="reward-box">
              <img :src="wechatAliPayImg"
                   alt="">
              <div class="reward-footer">
                <div class="we-chat"
                     @click="handleWeCaht">
                  <i class="iconfont"
                     :class="weChatClass"></i>
                  <span>微信</span>
                </div>
                <div class="ali-pay"
                     @click="handleAliPay">
                  <i class="iconfont"
                     :class="aliPayClass"></i>
                  <span>支付宝</span>
                </div>
              </div>
            </div>
          </el-dialog>
        </div>
      </div>
    </lay-out>
    <!-- 预览图片 -->
    <preview-photo :imagesArr="imagesArr"
                   :imgIndex="imgIndex"></preview-photo>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from 'vue'
import moment from 'moment'
import 'highlight.js/styles/monokai-sublime.css'
import 'vditor/dist/index.css'
import Vditor from 'vditor'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import LayOut from 'components/LayOut.vue'
import ShowComment from 'components/ShowComment.vue'
import CommentInput from 'components/CommentInput.vue'
import PreviewPhoto from 'components/PreviewPhoto.vue'
import emitter from '../util/emitter'
import LazyImg from 'components/LazyImg.vue'
// 转化为中文
moment.locale('zh-cn')
export default defineComponent({
  name: 'detail',
  components: {
    LayOut,
    ShowComment,
    CommentInput,
    PreviewPhoto,
    LazyImg,
  },
  setup() {
    const isLoading = ref(true)
    const route = useRoute()
    const { id } = route.query
    const store = useStore()
    // 文章对象
    const article = ref({})
    const imagesArr = ref([])
    const imgIndex = ref(0)

    // 请求文章数据
    const getArticle = async () => {
      const _article = await store.dispatch('getDetail', { id })
      article.value = _article
      // 传入markdown文章
      getHTMLContent(_article.article_content)
      isLoading.value = false
      // 改变网站标题
      document.title = `昊淼博客 - ${_article.title}`
    }

    const getHTMLContent = function (markdown = '暂无数据') {
      const previewElement = document.getElementById('preview')
      const outlineElement = document.getElementById('outline')

      // 大纲
      const initOutline = () => {
        const headingElements = []
        Array.from(previewElement.children).forEach((item) => {
          if (
            item.tagName.length === 2 &&
            item.tagName !== 'HR' &&
            item.tagName.indexOf('H') === 0
          ) {
            headingElements.push(item)
          }
        })

        // 给目录初始化样式并添加title
        document
          .querySelector('#outline ul li > span')
          .classList.add('vditor-outline__item--current')

        const arrayList = Array.from(
          document.querySelectorAll('#outline ul li > span')
        )
        // 设置title
        for (let i = 0; i < arrayList.length; i++) {
          arrayList[i].setAttribute('title', arrayList[i].innerText)
        }

        let toc = []
        window.addEventListener('scroll', () => {
          const scrollTop = window.scrollY
          toc = []
          headingElements.forEach((item) => {
            toc.push({
              id: item.id,
              offsetTop: item.offsetTop,
            })
          })

          let flag = 0 // 防止执行多次添加标识
          if (toc.length !== 0 && flag === 0) {
            flag++
            let flagHeight = toc[toc.length - 1].offsetTop * 2
            let lastChildpro = { id: '尾部添加高度', offsetTop: flagHeight } //尾部添加高度防止底部标签无法选取
            toc.push(lastChildpro)
          }

          const currentElement = document.querySelector(
            '.vditor-outline__item--current'
          )
          for (let i = 0, iMax = toc.length; i < iMax; i++) {
            if (scrollTop < toc[i].offsetTop - 30) {
              if (currentElement) {
                currentElement.classList.remove('vditor-outline__item--current')
              }
              let index = i > 0 ? i - 1 : 0
              document.querySelector(
                'span[data-target-id="' + toc[index].id + '"]'
              ) &&
                document
                  .querySelector('span[data-target-id="' + toc[index].id + '"]')
                  .classList.add('vditor-outline__item--current')
              break
            }
          }
        })
      }

      // 将markdown添加到指定的dom中
      Vditor.preview(previewElement, markdown, {
        speech: {
          enable: true, // 选中语言朗读
        },
        hljs: {
          lineNumber: true,
          style: 'native',
        },
        anchor: 2, // 为标题添加锚点 0：不渲染；1：渲染于标题前；2：渲染于标题后，默认 0
        lazyLoadImage: '/lazyImage.jpg', // 懒加载
        after: async () => {
          // 大纲，目录
          Vditor.outlineRender(previewElement, outlineElement)
          if (outlineElement.innerText.trim() !== '') {
            outlineElement.style.display = 'block'
            initOutline()
          }
          // 图片预览
          let _imagesArr = [] // 预览图片的数组
          const imgs = previewElement.getElementsByTagName('img')

          for (let index = 0; index < imgs.length; index++) {
            _imagesArr.push(imgs[index].getAttribute('data-src'))
            imgs[index].setAttribute('data-index', index)
            imgs[index].style.height = 'auto'

            imgs[index].onclick = () => {
              imgIndex.value = index
              // 当点击图片发送全局事件
              emitter.emit('clickImg', { visible: true })
            }
          }

          imagesArr.value = _imagesArr // 加载完成设置预览数组

          Vditor.codeRender(previewElement) // 为代码块添加赋值按钮
        },
      })
    }

    onMounted(() => {
      getArticle()
    })

    // 赞赏显示
    const isReward = ref(false)
    const wechatAliPayImg = ref('/wechat.png')
    const isWeChat = ref(true)
    // icon-zhifubaozhifu1(高亮)  icon-zhifubaozhifu(不高亮)
    // const aliClass = ref("icon-zhifubaozhifu")
    // eslint-disable-next-line vue/return-in-computed-property
    const weChatClass = computed(() => {
      return isWeChat.value ? 'icon-wechat-pay-fill' : 'icon-wechat_pay'
    })
    const aliPayClass = computed(() => {
      return isWeChat.value ? 'icon-zhifubaozhifu' : 'icon-zhifubaozhifu1'
    })

    const handleWeCaht = () => {
      wechatAliPayImg.value = '/wechat.png'
      isWeChat.value = true
    }
    const handleAliPay = () => {
      wechatAliPayImg.value = '/alipay.png'
      isWeChat.value = false
    }

    return {
      article,
      isReward,
      wechatAliPayImg,
      handleWeCaht,
      handleAliPay,
      weChatClass,
      aliPayClass,
      isLoading,
      moment,
      imagesArr,
      imgIndex,
    }
  },
})
</script>

<style lang="scss">
@import 'assets/config.scss';
@import 'assets/md.scss';
// 高亮微信图标
.icon-wechat-pay-fill {
  color: #2bad13;
}
.icon-zhifubaozhifu1 {
  color: #00a3ee;
}

.detail-img {
  margin-top: 80px;
  .cover-box {
    position: relative;
    padding: 20px;
    background: #fff;
    display: block;
    margin-bottom: 20px;
    margin-top: 5px;

    .b-cover {
      height: 300px;
      overflow: hidden;

      .item-background {
        filter: blur(12px);
        object-fit: cover;
        transform: scale(1.2);
      }
    }

    .s-cover {
      width: 400px;
      height: 270px;
      position: absolute;
      right: 100px;
      top: 185px;
      padding: 20px;
      background: #fff;
      z-index: 2;
    }
  }
}
.detail {
  margin-bottom: 100px;
  .detail-wrapper {
    .info {
      .article-title {
        margin-bottom: 0.5em;
        color: $heading-color;
        font-weight: 600;
        font-size: $fontB;
        line-height: 1.23;
        font-family: cursive;
      }
      .user-nav {
        ul {
          display: flex;
          align-items: center;
          li {
            position: relative;
            padding: 0 14px;
            font-size: $fontJ;
            color: $text-color;
            cursor: pointer;
            i {
              margin-right: 5px;
            }
            em {
              display: block;
              position: absolute;
              width: 1px;
              height: 14px;
              right: 0;
              top: 50%;
              margin-top: -7px;
              background-color: #e8e8e8;
            }
          }
        }
      }
    }
    .el-divider {
      background-color: #e8e8e8;
    }
    .show-article-main {
      .share-star {
        display: flex;
        flex-direction: column;
        align-items: center;
        span {
          width: 28px;
          height: 28px;
          text-align: center;
          line-height: 28px;
          background-color: #eee;
          border-radius: 2px;
          cursor: pointer;
        }
        .star {
          margin-bottom: 8px;
        }
        i {
          font-size: 16px;
        }
      }

      // 赞赏样式
      .reward {
        text-align: center;
        margin-bottom: 30px;
        .reward-btn {
          margin: 10px 0 30px;
        }
        .reward-background {
          display: inline-block;
          width: 160px;
          height: 160px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }

      // 目录样式
      .catelog {
        .nav-wrapper {
          background-color: #fff;
          padding: 10px;
          overflow: hidden;
          border-radius: 0px;
        }
        .el-card__header {
          border-bottom: none;
          font-size: 18px;
          color: $primary-color;
          font-weight: 600;
          i {
            margin-right: 12px;
            font-size: 20px;
            vertical-align: middle;
          }
        }
        // .catelog-content {
        //   ul {
        //     li {
        //       height: 30px;
        //       font-size: 16px;
        //       padding: 20px 10px;
        //       display: flex;
        //       flex-direction: column;
        //       justify-content: center;
        //       &:hover {
        //         background-color: #e7f3fe;
        //         a {
        //           color: $primary-color;
        //         }
        //       }
        //     }
        //   }
        // }
        .toc-list {
          font-size: 14px;
          & > ul {
            position: relative;
            list-style: none;

            li {
              list-style: none;
            }

            &::before {
              position: absolute;
              display: block;
              width: 1px;
              height: 100%;
              margin: 0 auto;
              background-color: #e8e8e8;
              content: ' ';
            }

            span {
              padding: 3px 10px;
              display: flex;
              align-items: center;
              cursor: pointer;
              position: relative;
              transition: all 0.3s;
              flex: 1;
              overflow: hidden;

              & span {
                display: inline-block;
                width: 200px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }

              &:hover {
                color: #1890ff !important;
              }

              &::after {
                position: absolute;
                content: '';
                width: 2px;
                height: 100%;
                top: 0;
                right: 0;
                left: 0;
                border-right: 2px solid transparent;
                opacity: 0;
                border-radius: 0px;
                transition: all 0.3s;
              }
            }
          }
        }

        .vditor-outline__action {
          margin-left: 2px;
          margin-right: 0;
        }

        .vditor-outline__item--current {
          background-color: #e6f7ff;
          color: #1890ff;
          position: relative;

          &::after {
            opacity: 1 !important;
            border-color: #1890ff !important;
          }
        }
      }

      .opacity {
        animation: 0.5s ani linear;
        -webkit-animation: 0.5s ani linear;
        -moz-animation: 0.5s ani linear;
      }

      @keyframes ani {
        0% {
          opacity: 0;
        }

        50% {
          opacity: 0.5;
        }

        100% {
          opacity: 1;
        }
      }

      // 文章详情
      #preview {
        font-size: 14px;

        p {
          line-height: 1.8;
        }

        .vditor-copy span {
          top: -22px;
          right: 10px;
        }

        svg {
          fill: currentColor;
          display: inline-block;
          stroke: currentColor;
        }

        p > code {
          display: inline-block;
          background-color: #fff5f5 !important;
          border-radius: 0px;
          font-size: 13px;
          padding: 2px 5px;
          color: #ff502c;
          margin: 0px 3px;
          line-height: 1.1rem;
          word-wrap: break-word;
          word-break: break-all;
        }

        code {
          border-radius: 0px !important;
        }

        pre:before {
          content: '';
          display: block;
          background: url('/code.png');
          height: 32px;
          width: 100%;
          background-size: 44px;
          background-repeat: no-repeat;
          background-color: #2b2b2b;
          border-top-left-radius: 0px;
          border-top-right-radius: 0px;
          background-position: 10px 10px;
        }
      }
    }
  }
}

.reward-box {
  height: 300px;
  img {
    width: 100%;
    height: 90%;
  }

  .reward-footer {
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 16px;
    .we-chat,
    .ali-pay {
      cursor: pointer;
      i {
        font-size: 28px;
        margin-right: 8px;
        vertical-align: middle;
      }
    }
  }
}

.reward-dialog {
  .el-dialog__header {
    padding: 0;
  }
}

@media screen and (max-width: 992px) {
  .catelog {
    display: none;
  }
}

@media screen and (max-width: 768px) {
  .share-star-wrapper {
    display: none;
  }
  .detail-img {
    display: none !important;
  }
  .detail {
    margin-top: 80px;
  }
}
</style>
