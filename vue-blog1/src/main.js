import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import store from './store/index'
import router from './route/index'
import 'element-plus/lib/theme-chalk/index.css';
// 导入图标样式
import './assets/icon/iconfont.css'
// 引入国家纪念日函数
import memorial from './hooks/memorial.js'
//引入加载条样式
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


import {
  ElButton,
  ElRow,
  ElCol,
  ElInput,
  ElMenu,
  ElMenuItem,
  ElCarousel,
  ElCarouselItem,
  ElCard,
  ElTabs,
  ElTabPane,
  ElSkeleton,
  ElImage,
  ElTag,
  ElSpace,
  ElDivider,
  ElEmpty,
  ElDrawer,
  ElDialog,
  ElTree,
  ElAvatar,
  ElForm,
  ElFormItem,
  ElMessage,
  ElTooltip,
  ElTimeline,
  ElTimelineItem,
  ElBacktop,
  ElLoading,
  ElAffix
} from 'element-plus'

const app = createApp(App)
app.use(ElButton)
app.use(ElRow)
app.use(ElCol)
app.use(ElInput)
app.use(ElMenu)
app.use(ElMenuItem)
app.use(ElCarousel)
app.use(ElCarouselItem)
app.use(ElCard)
app.use(ElTabPane)
app.use(ElTabs)
app.use(ElSkeleton)
app.use(ElImage)
app.use(ElTag)
app.use(ElSpace)
app.use(ElDivider)
app.use(ElEmpty)
app.use(ElDrawer)
app.use(ElDialog)
app.use(ElTree)
app.use(ElAvatar)
app.use(ElForm)
app.use(ElFormItem)
app.use(ElMessage)
app.use(ElTooltip)
app.use(ElTimeline)
app.use(ElTimelineItem)
app.use(ElBacktop)
app.use(ElLoading)
app.use(ElImage)
app.use(ElAffix)

// 控制台的显示内容
console.log('%c 欢迎来到 昊淼Blog! ', 'background: rgba(18, 141, 244, 0.1); color: #1890ff');
console.log('%c 如果你看到了这里，你一定具有一颗追求编程的心，让我们一起加油吧！', 'color: #1890ff');


// 国家纪念日
memorial()
// 点击鼠标的样式
// let index = 0;
// const fnTextPopup = (event) => {
//   let arr = ['富强', '民主', '文明', '和谐', '自由', '平等', '公正', '法治', '爱国', '敬业', '诚信', '友善']
//   if (!arr || !arr.length) {
//     return;
//   }

//   let x = event.pageX,
//     y = event.pageY;
//   let eleText = document.createElement('span');
//   eleText.className = 'text-popup';
//   eleText.style.color = `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256})`
//   document.documentElement.appendChild(eleText);
//   if (arr[index]) {
//     eleText.innerHTML = arr[index];
//   } else {
//     index = 0;
//     eleText.innerHTML = arr[0];
//   }
//   // 动画结束后删除自己
//   eleText.addEventListener('animationend', function () {
//     eleText.parentNode.removeChild(eleText);
//   });
//   // 位置
//   eleText.style.left = (x - eleText.clientWidth / 2) + 'px';
//   eleText.style.top = (y - eleText.clientHeight) + 'px';
//   // index递增
//   index++;
// };

// document.documentElement.addEventListener('click', fnTextPopup, false)

// 添加加载条样式
// axios请求拦截器
axios.interceptors.request.use(
  config => {
    NProgress.start() // 设置加载进度条(开始..)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// axios响应拦截器
axios.interceptors.response.use(
  function (response) {
    NProgress.done() // 设置加载进度条(结束..)
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

axios.defaults.baseURL = 'http://127.0.0.1:7001';
app.use(store)
app.use(router)
app.mount('#app')
