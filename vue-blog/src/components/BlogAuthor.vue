<template>
  <el-card shadow="always"
           class="blog-author-container">
    <template #header>
      <span class="author">博主</span>
    </template>
    <div class="blog-author">
      <!-- <el-avatar src="/response.jpg"
                 alt="博主本人"
                 :size="100"></el-avatar> -->
      <div className='head-portrait'
           ref="avatarRef">
        <div className="btn-bg"></div>
        <!--   -->
        <div className="play"
             ref='playRef'
             :style="{background: isPaly ? `url(${'/pause.svg'})` : `url(${'/play.svg'})`}">
          <audio loop
                 ref="audioRef"
                 crossOrigin="anonymous"
                 src="/music.mp3">
          </audio>
        </div>
      </div>
      <div class="slo loader">
        <div class="txt">
          <span>IT</span><span>小白, </span><span>赶上前端大军</span>
        </div>
      </div>
      <div class="mark-tags">
        <el-tag>学生</el-tag>
        <el-tag type="info">软件工程</el-tag>
        <el-tag type="warning">前端</el-tag>
        <el-tag type="danger">后端</el-tag>
        <el-tag type="danger">文章总数 <span>
            <vue-count-to :startVal="0"
                          :endVal="viewStarArticleCount?.allArticle"
                          :duration="1000" />
          </span>
        </el-tag>
        <el-tag type="success">被访问 <span>
            <vue-count-to :startVal="0"
                          :endVal="viewStarArticleCount?.allViewCount"
                          :duration="1000" />
          </span>
        </el-tag>
      </div>
      <div class="social-contact">
        <el-divider>社交帐号</el-divider>
        <div class="social-box">
          <ul>
            <li>
              <el-tooltip effect="dark"
                          content="B站: https://space.bilibili.com/1583726151"
                          placement="top">
                <a href="https://space.bilibili.com/1583726151"><i class="iconfont icon-Bzhan"></i></a>
              </el-tooltip>
            </li>
            <li>
              <el-tooltip effect="dark"
                          content="github: https://github.com/zhang-glitch"
                          placement="top">
                <a href="https://github.com/zhang-glitch"><i class="iconfont icon-github"></i></a>
              </el-tooltip>
            </li>
            <li>
              <el-tooltip effect="dark"
                          content="weChat: zhenshang-ZH"
                          placement="top">
                <i class="iconfont icon-weixin"></i>
              </el-tooltip>
            </li>
            <li>
              <el-tooltip effect="dark"
                          content="QQ: 669638556"
                          placement="top">
                <i class="iconfont icon-QQ"></i>
              </el-tooltip>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import VueCountTo from './vue-count-to/VueCountTo.vue'

export default defineComponent({
  name: 'BlogAuthor',
  components: { VueCountTo },
  setup() {
    const store = useStore()
    // 控制音乐播放按钮
    const audioRef = ref(null)
    const playRef = ref(null)
    const avatarRef = ref(null)
    const isPaly = ref(false)
    const playMusic = () => {
      let timer = null
      let i = 0
      playRef.value.onclick = async () => {
        if (audioRef.value.paused) {
          audioRef.value.play()
          isPaly.value = true
          timer = setInterval(function () {
            i == 360 ? (i = 0) : i++
            if (avatarRef.value) {
              avatarRef.value.style.transform = 'rotate(' + i + 'deg)'
            }
          }, 30)
        } else {
          audioRef.value.pause()
          isPaly.value = false
          clearInterval(timer)
        }
      }
    }

    onMounted(() => {
      // console.log('playRef', playRef)
      // console.log('audioRef', audioRef)
      // console.log('avatarRef', avatarRef)
      playRef.value && playMusic()
    })

    // 访问次数
    const viewStarArticleCount = ref({})
    const getStarCount = async () => {
      const _viewStarArticleCount = await store.dispatch('getStarCount')
      viewStarArticleCount.value = _viewStarArticleCount
    }

    getStarCount()
    return {
      viewStarArticleCount,
      audioRef,
      playRef,
      isPaly,
      avatarRef,
    }
  },
})
</script>

<style lang="scss">
@import 'assets/config.scss';

.blog-author-container {
  .author {
    font-size: 16px;
    color: $primary-color;
    font-weight: 600;
    letter-spacing: 2px;
  }
}
.blog-author {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  // // 头像样式
  // .el-avatar {
  //   animation: avatar 2s linear both infinite;
  //   margin-bottom: 0.5rem;
  // }

  .head-portrait {
    margin: 0 auto;
    border-radius: 50%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    background-image: url('../assets/audio/head_portrait.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    animation: avatar 2s linear both infinite;
    margin-bottom: 0.5rem;

    @keyframes avatar {
      0% {
        box-shadow: 0 0 1px white, 0 0 5px white, 0 0 10px white,
          0 0 20px #e7aeae, 0 0 5px #1e1e1e, 0 0 11px pink;
      }
      100% {
        box-shadow: 0 0 5px white, 0 0 10px #e7aeae, 0 0 15px #0cb4f1,
          0 0 8px #1e1e1e, 0 0 10px #0cb4f1, 0 0 12px #e7aeae;
      }
    }

    /* 播放背景 */
    .btn-bg {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 25px;
      height: 35px;
      background-color: #e7aeae;
      background: url('../assets/audio/btn-bg.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100%;
      animation: controlbg 3s linear infinite;
    }

    @keyframes controlbg {
      0% {
        transform: rotate(0);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    /* 播放按钮 */
    .play {
      position: absolute;
      width: 20px;
      height: 20px;
      background-repeat: no-repeat !important;
      background-position: center !important;
      background-size: 90% 90% !important;
      transition: 0.5s;
      z-index: 999;
    }
  }

  .slo {
    padding: 10px 0;
    letter-spacing: 2px;
    text-align: center;
  }

  .mark-tags {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .el-tag {
      margin-right: 5px;
      margin-top: 5px;
    }
  }

  .social-contact {
    width: 100%;
    .el-divider__text.is-center {
      color: $text-color-secondary;
    }

    .social-box {
      ul {
        display: flex;
        justify-content: space-around;
        li {
          a:hover {
            color: $text-color;
          }

          i {
            font-size: 28px;
          }
        }
      }
    }
  }
}
</style>
