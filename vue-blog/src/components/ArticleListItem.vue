<template>
  <div class="article-list-item">
    <div class="article-list-item-wrapper">
      <div class="article-list-item-main">
        <div class="item-meta">
          <div class="item-meta-content">
            <h4 class="title">
              <el-tag class="type">{{ article.type?.typeName }}</el-tag>
              <a
                :href="`/detail?id=${article.id}`"
                target="_blank"
                v-html="title"
              >
              </a>
            </h4>
            <div class="tags clear">
              <el-row>
                <el-col :xs="0" :sm="24" :md="24" :lg="24" :xl="24">
                  <ul>
                    <li
                      v-for="(item, index) in handleTagsArr(article.tags)"
                      :key="index"
                      class="tag-item"
                    >
                      <el-tag>
                        <span>#</span>
                        {{ item }}
                      </el-tag>
                    </li>
                  </ul>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <div class="item-slogan">
          <a :href="`/detail?id=${article.id}`" target="_blank">{{
            article.slogan
          }}</a>
        </div>
        <el-row>
          <el-col :xs="0" :sm="24" :md="24" :lg="24" :xl="24">
            <ul class="item-action clear">
              <li style="padding-left: 0px">
                <span>
                  <i class="iconfont icon-huo"></i>
                  {{ article.view_count }}
                </span>
                <em></em>
              </li>
              <li>
                <span>
                  <i class="iconfont icon-dianzan_active"></i>
                  {{ article.star }}
                </span>
                <em></em>
              </li>
              <li>
                <span>{{ article.author }}</span>
                <em></em>
              </li>
              <li>
                <span>{{ moment(article.addTime).format('YYYY-MM-DD') }}</span>
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
      <div class="article-list-item-meta">
        <a :href="`/detail?id=${article.id}`" target="_blank" class="item-img">
          <el-image
            :src="article?.file?.file_url || article.image"
            lazy
            :alt="article.title"
          >
            <template #placeholder>
              <div class="el-image-box">
                <img src="/haomiao-blog.png" />
              </div>
            </template>
            <template #error>
              <div class="el-image-box">
                <i class="el-icon-picture-outline"></i>
              </div>
            </template>
          </el-image>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import handleTags from '../util/handleTags'
import moment from 'moment'

export default defineComponent({
  name: 'ArticleListItem',
  props: ['article', 'searchVal'],
  setup(props) {
    // 处理标签
    const handleTagsArr = handleTags

    // 处理标题
    const title = props.searchVal
      ? props.article.title.replace(
          new RegExp(props.searchVal, 'g'),
          `<i
                 class='hot-str'>${props.searchVal}</i>`
        )
      : props.article.title
    return {
      handleTagsArr,
      moment,
      title,
    }
  },
})
</script>

<style lang="scss">
@import 'assets/config.scss';

.article-list-item {
  .article-list-item-wrapper {
    display: flex;
    flex-direction: row-reverse;
    padding: 20px !important;
    margin-bottom: 10px;
    border-radius: 5px;
    &:hover {
      background: #f5f7fa;
      img {
        transform: scale(1.1);
      }
    }

    // 列表文本样式
    .article-list-item-main {
      flex: 1 0;
      .item-meta {
        // 标题样式
        .title {
          font-size: 20px;
          font-weight: bold !important;
          line-height: 30px !important;
          margin-bottom: 15px !important;
          .type {
            display: inline-block;
            height: 21px;
            line-height: 21px;
            padding: 0 4px;
            background: transparent;
            margin-right: 10px;
            vertical-align: text-bottom;
          }
          a {
            display: inline-block;

            .hot-str {
              color: #ff1616a1;
              font-style: normal;
            }
            &:hover {
              color: $primary-color;
            }
          }
        }
        // 标签样式
        .tags {
          margin-bottom: 15px;
          .tag-item {
            float: left;
            .el-tag {
              font-size: 14px;
              color: #555;
              padding: 0 8px;
              height: 24px;
              line-height: 24px;
              background: #f5f7fa;
              margin-right: 15px;
              span {
                color: $primary-color;
              }
              &:hover {
                cursor: pointer;
                color: #fff;
                background-color: $primary-color;
                span {
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .item-slogan {
        font-size: $fontJ;
        height: 48px;
        line-height: 24px;
        overflow: hidden;
        a {
          color: $text-color-secondary;
        }
      }

      .item-action {
        li {
          position: relative;
          float: left;
          font-size: $fontJ;
          height: 24px;
          line-height: 24px;
          text-align: center;
          color: $text-color-secondary;
          padding: 0 14px;
          &:hover {
            cursor: pointer;
          }
          i {
            margin-right: 5px;
          }
          em {
            display: inline-block;
            position: absolute;
            top: 50%;
            right: 0;
            width: 1px;
            height: 14px;
            margin-top: -7px;
            background-color: #e8e8e8;
          }
        }
      }
    }
    // 列表图片样式
    .article-list-item-meta {
      width: 260px;
      height: 165px;
      margin: 0 24px 0 0 !important;

      .item-img {
        height: 165px;
        width: 100%;
        background: #f0f5f9;
        border-radius: 5px;
        overflow: hidden;
        display: block;
        .el-image {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #909399;
          font-size: 26px;
          img {
            transition: all 0.3s;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 576px) {
  .article-list-item-meta {
    margin: auto auto 16px !important;
  }
  .article-list-item-meta .item-img {
    height: auto !important;
  }
  .article-list-item-meta .item-img img {
    height: auto !important;
  }

  .article-list-item .article-list-item-wrapper {
    flex-flow: row !important;
  }

  .article-list-item-main {
    min-width: 60% !important;
    margin-right: 20px !important;
  }

  .article-list-item-main {
    min-width: 220px;
  }

  .title {
    font-size: 16px !important;
  }

  .article-list-item-meta {
    margin: 0 !important;
    width: 100% !important;
    height: auto !important;
    overflow: hidden !important;
  }
}

@media screen and (max-width: 768px) {
  .article-list-item-meta {
    margin-left: 18px !important;
  }
}

@media screen and (max-width: 480px) {
  .article-list-item .article-list-item-wrapper {
    flex-flow: row !important;
    padding: 10px !important;
  }

  .article-list-item-main {
    margin-right: 10px !important;
  }

  .title {
    margin-bottom: 0 !important;
    a {
      display: inline !important;
    }
  }
  .item-slogan {
    display: none;
  }
}
</style>
