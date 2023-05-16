<template>
  <div class="footer">
    <el-row>
      <el-col :xs="0" :sm="0" :md="6" :lg="6" :xl="6">
        <div class="footer-content">
          <div class="footer-logo">
            <a href="/">
              <h1 class="hao">昊</h1>
              <h1 class="miao">淼</h1>
            </a>
          </div>
          <div class="content">
            <p class="about-mark">@ 2023 <a href="/about">昊淼博客</a> </p>
            <p><a href="https://beian.miit.gov.cn">豫ICP备2023010223号</a></p>
            <p>记录美好的生活经历，欢迎交流</p>
          </div>
        </div>
      </el-col>
      <el-col :xs="0" :sm="24" :md="18" :lg="18" :xl="18">
        <div class="tool-list">
          <a
            class="tool-item"
            :href="item.link"
            v-for="item in toolsData"
            :key="item.id"
            @mousemove="moveItem(item.id)"
            @mouseleave="leaveItem"
            :style="{
              backgroundColor: `${activeIndex === item.id ? item.bgColor : ''}`,
            }"
          >
            <i
              className="tool-icon"
              :style="{
                background: `url(${
                  activeIndex === item.id ? item.hoverIcon : item.icon
                })`,
              }"
            ></i>
            <div className="tool-desc">
              <div className="hide-desc" />
              <div
                className="inner"
                :style="{
                  color: item.bgColor === '#fff' ? '#333' : '',
                }"
              >
                <p className="name">{{ item.name }}</p>
                <p className="describe">{{ item.describe }}</p>
              </div>
            </div>
          </a>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Footer',
  setup() {
    const activeIndex = ref(null)
    const toolsData = ref([
      {
        id: 1,
        name: 'VsCode',
        describe: '我们现在主要开发工具，懂的都懂！',
        icon: '/footer/vscode-1.png',
        hoverIcon: '/footer/vscode.png',
        bgColor: '#2C2C32',
        link: 'https://code.visualstudio.com/',
      },
      // {
      //   id: 2,
      //   name: 'nextJs',
      //   describe: '目前网站主要前端框架  React和NextJS！',
      //   icon: '/footer/next-1.png',
      //   hoverIcon: '/footer/next.png',
      //   bgColor: '#fff',
      //   link: 'https://www.nextjs.cn/',
      // },
      {
        id: 3,
        name: 'PS',
        describe: '对，我就是在用ps，你打我呀！',
        icon: '/footer/ps-1.png',
        hoverIcon: '/footer/ps.png',
        bgColor: '#38c8fe',
        link: 'https://www.adobe.com/cn/products/photoshop.html',
      },
      // {
      //   id: 4,
      //   name: 'Ant Design',
      //   describe: '我们网站大量使用的UI库，Antd yyds！🙏',
      //   icon: '/footer/antd-1.png',
      //   hoverIcon: '/footer/antd.png',
      //   bgColor: '#1890ff',
      //   link: 'https://ant.design/index-cn',
      // },
      {
        id: 5,
        name: '哔哩哔哩',
        describe: '我们文章中的所有视频都放在了B站！',
        icon: '/footer/bilibili-1.png',
        hoverIcon: '/footer/bilibili.png',
        bgColor: '#fb7299',
        link: 'https://www.bilibili.com/',
      },
      {
        id: 6,
        name: '网易云音乐',
        describe: '博主一般敲代码，都会打开音乐的！',
        icon: '/footer/wyyyy-1.png',
        hoverIcon: '/footer/wyyyy.png',
        bgColor: '#fff',
        link: 'https://music.163.com/',
      },
      {
        id: 7,
        name: 'Github',
        describe: '你能看到的，我们都开源在Github上了！',
        icon: '/footer/github.png',
        hoverIcon: '/footer/github-1.png',
        bgColor: '#000',
        link: 'https://github.com/',
      },
      {
        id: 8,
        name: '码云',
        describe: '没有梯子，我们项目管理用的是码云，不是GitHub。',
        icon: '/footer/mayun-1.png',
        hoverIcon: '/footer/mayun.png',
        bgColor: '#40485b',
        link: 'https://gitee.com/',
      },
      {
        id: 9,
        name: '稿定设计',
        describe: '我们网站几乎所有作图都是出自稿定设计，稿定打钱！',
        icon: '/footer/gaoding-1.png',
        hoverIcon: '/footer/gaoding.png',
        bgColor: '#3260f4',
        link: 'https://gaoding.com/',
      },
      // {
      //   id: 10,
      //   name: '和风天气',
      //   describe: '白嫖的天气数据，真香！感谢和风天气！🙏',
      //   icon: '/footer/hftq.png',
      //   hoverIcon: '/footer/hftq.png',
      //   bgColor: '#fff',
      //   link: 'https://www.qweather.com/',
      // },
    ])

    // 当移入一个item时
    const moveItem = (id) => {
      activeIndex.value = id
    }
    // 当鼠标移出时
    const leaveItem = () => {
      activeIndex.value = null
    }
    return {
      toolsData,
      activeIndex,
      moveItem,
      leaveItem,
    }
  },
})
</script>

<style lang="scss">
@import 'assets/config.scss';

.footer {
  background: #2a2a32;
  position: relative;
  width: 100%;

  .footer-content {
    display: flex;
    .footer-logo {
      height: 82px;
      margin-left: 50px;
      h1 {
        position: absolute;
        top: 20px;
        font-family: cursive;
        font-size: 20px;
        color: $primary-color;
      }
      .miao {
        position: absolute;
        top: 40px;
        left: 70px;
        color: $secondary-color;
      }
    }

    .content {
      margin-left: 70px;
      color: #777;
      font-size: 14px;
      align-self: center;
      letter-spacing: 2px;
      p {
        a {
          color: $primary-color;
        }
      }
      .about-mark {
        /* margin-bottom: 5px; */
        vertical-align: bottom;
      }
    }
  }

  .tool-list {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 80px;
    overflow: hidden;

    .tool-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      transition: all 0.3s;

      .tool-icon {
        width: 30px;
        height: 30px;
        display: inline-block;
        background-size: cover !important;
      }

      .tool-desc {
        position: relative;
        overflow: hidden;

        .hide-desc {
          opacity: 0;
          width: 0;
          height: 120px;
          transition: all 0.3s;
        }

        .inner {
          position: absolute;
          left: 0;
          top: 0;
          width: 200px;
          color: #fff;
          padding: 24px 20px;
          opacity: 0;
          transition: all 0.3s;

          .name {
            font-weight: bold;
            font-size: 14px;
            margin: 4px 0 2px;
          }

          .describe {
            font-size: 12px;
            margin: 0;
          }
        }
      }

      &:hover .hide-desc {
        width: 200px;
        opacity: 1;
      }

      &:hover .inner {
        opacity: 1;
      }
    }

    @keyframes rotate1 {
      0% {
        transform: translateY(0);
      }

      25% {
        transform: translateY(2px);
      }

      50% {
        transform: translateY(4px) scale(1.1, 0.9);
      }

      75% {
        ransform: translateY(2px);
      }

      100% {
        transform: translateY(0);
      }
    }
  }
}
</style>
