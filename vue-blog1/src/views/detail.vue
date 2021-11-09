<template>
<div v-loading="isLoading" :element-loading-spinner="'el-icon-loading'">
  <lay-out>
    <div class="wrap clear">
      <!-- 头部背景 -->
      <top-image></top-image>
      <!-- 文章详情 -->
      <div class="detail">
        <div class="detail-wrapper">
          <div class="info container">
            <h1 class="article-title">{{detailArticle ? detailArticle.title : ''}}</h1>
            <div class="user-nav" style="margin-left: 3px;">
              <ul>
                <li style="padding-left: 0;">
                  {{detailArticle ? detailArticle.author : 'js臻'}}
                  <em></em>
                </li>
                <li>
                  {{detailArticle ? detailArticle.addTime : ''}}
                  <em></em>
                </li>
                <li>
                  <i class="iconfont icon-huo"></i>
                  {{detailArticle ? detailArticle.view_count : ''}}
                  <em></em>
                </li>
                <li>
                  <i class="iconfont icon-dianzan_active"></i>
                  {{detailArticle ? detailArticle.star : ''}}
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
                    <div v-html="contentHTML"></div>
                    <el-divider style="margin-top: 50px;"></el-divider>
                    <div class="reward">
                      <p>"你的赞赏，是对我最大的支持哦 !"</p>
                      <div class="reward-btn">
                        <el-button type="primary" round @click="isReward=true">
                          <span class="iconfont icon-zanshang"></span>
                          赞赏支持
                        </el-button>
                      </div>
                      <div class="reward-background">
                        <img src="/reward.png" alt="">
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
                <div class="col-0 col-sm-0 col-md-0 col-lg-3 col-xl-3 catelog" >
                  <el-affix :offset="100">
                    <el-card v-if="anchorList.length !== 0">
                      <template #header>
                        <i class="iconfont icon-shu"></i>
                        <span>目录</span>
                      </template>
                      <div class="catelog-content" style="max-height: calc(100vh - 247px); 
                        overflow-y: scroll;">
                        <ul>
                          <li v-for="item in anchorList" :key="item.anchor">
                            <a :href="`#${item.anchor}`">{{item.text}}</a>
                          </li>
                        </ul>
                      </div>
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
        <el-dialog
          v-model="isReward"
          width="300px"
          :show-close="false"
          :lock-scroll="false"
          >
          <div class="reward-box">
            <img :src="wechatAliPayImg" alt="">
            <div class="reward-footer">
              <div class="we-chat" @click="handleWeCaht">
                <i class="iconfont" :class="weChatClass"></i>
                <span>微信</span>
              </div>
              <div class="ali-pay" @click="handleAliPay">
                <i class="iconfont" :class="aliPayClass"></i>
                <span>支付宝</span>
              </div>
            </div>
          </div>
        </el-dialog>
      </div>

    </div>
  </lay-out>
</div>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import Tocify from 'hooks/tocify.js'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css';
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'
import TopImage from 'components/TopImage.vue'
import LayOut from 'components/LayOut.vue'
import ShowComment from 'components/ShowComment.vue'
import CommentInput from 'components/CommentInput.vue'


export default defineComponent({
  name: 'detail',
  components: {
    TopImage,
    LayOut,
    ShowComment,
    CommentInput
  },
  setup() {
    const isLoading = ref(true)
    const route = useRoute();
    const {id} = route.query
    const store = useStore();
   
    store.dispatch('getArticleById', {id}).then(res => {
      if(res) {
        isLoading.value = false
      }
    })
    const detailArticle = computed(() => store.state.detailArticle);
    // 解析marked
    const renderer = new marked.Renderer()
    // 生产markdown索引目录
    const tocify = new Tocify()
    renderer.heading = function (text, level) {
      const anchor = tocify.add(text, level);
      return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
    };
    // 将目录存储到vuex中
    store.dispatch("getAnchorList", tocify.tocItems)
    const anchorList = computed(() => store.state.anchorList)
    console.log(anchorList)
    marked.setOptions({
      renderer: renderer,
      gfm: true,
      pedantic: false,
      sanitize: false,
      tables: true,
      breaks: false,
      smartLists: true,
      smartypants: false,
      xhtml: false,
      highlight: (code) => hljs.highlightAuto(code).value
    });

    // eslint-disable-next-line vue/return-in-computed-property
    let contentHTML = computed(() => {
      if(detailArticle.value && detailArticle.value.article_content) {
        return marked(detailArticle.value.article_content)
      }
    })

    // 生成目录

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
      return isWeChat.value ? "icon-zhifubaozhifu" : 'icon-zhifubaozhifu1'
    })

    const handleWeCaht = () => {
      wechatAliPayImg.value = "/wechat.png"
      isWeChat.value = true;
    }
    const handleAliPay = () => {
      wechatAliPayImg.value = "/alipay.png"
      isWeChat.value = false;
    }

    return {
      detailArticle,
      contentHTML,
      isReward,
      wechatAliPayImg,
      handleWeCaht,
      handleAliPay,
      weChatClass,
      aliPayClass,
      isLoading,
      anchorList
    }
  }
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
  .detail {
    margin-bottom: 100px;
    .detail-wrapper {
      .info {
        .article-title {
          margin-bottom: 0.5em;
          color:$heading-color;
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
            background-color:#eee;
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
          .catelog-content {
            ul {
              li {
                height: 30px;
                font-size: 16px;
                padding: 20px 10px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                &:hover {
                  background-color: #e7f3fe;
                  a {
                    color: $primary-color;
                  }
                }
              }
            }
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
      .we-chat, .ali-pay {
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

  @media screen  and (max-width: 768px){
    .share-star-wrapper {
      display: none;
    }
  }
</style>