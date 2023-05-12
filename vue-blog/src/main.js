import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入加载条样式
import 'nprogress/nprogress.css'
import 'element-plus/lib/theme-chalk/index.css'
// 导入图标样式
import './assets/icon/iconfont.css'
// 引入国家纪念日函数
import memorial from './util/memorial'
// 使用async
import 'regenerator-runtime/runtime'
import VueEcharts from 'vue-echarts'
import * as echarts from 'echarts'

// 国家纪念日
memorial()

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
console.log(
  '%c 欢迎来到 昊淼Blog! ',
  'background: rgba(18, 141, 244, 0.1); color: #1890ff'
)
console.log(
  '%c 如果你看到了这里，你一定具有一颗追求编程的心，让我们一起加油吧！',
  'color: #1890ff'
)

console.log(
  `%c
╔══╗       ╔══╗       ╔════╗        ╔════╗
║██║       ║██║       ║████║        ║████║   
║██║       ║██║      ║██║║██║      ║██║║██║
║██╚═══════╝██║     ║██║  ║██║    ║██║  ║██║
║█████████████║    ║██║    ║██║  ║██║    ║██║
║██╔═══════╗██║   ║██║      ║██║║██║       ║██║
║██║       ║██║  ║██║        ║████║         ║██║
╚══╝	   ╚══╝  ╚══╝  	     ╚════╝         ╚══╝
`,
  'color: #1890ff'
)
console.log(
  '\n' +
    ' %c 网站已开源，详情请移步 %c https://github.com/zhang-glitch/update-vue-blog ' +
    '\n',
  'color: #1890ff; background: rgba(18, 141, 244, 0.1); padding:5px 0;',
  'background: rgba(216, 32, 42, 0.1); padding:5px 0;'
)

app.echarts = echarts

app
  .use(store)
  .use(router)
  .component('vue-echarts', VueEcharts)
  .mount('#app')
