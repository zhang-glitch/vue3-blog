import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入加载条样式
import 'nprogress/nprogress.css'
import 'element-plus/lib/theme-chalk/index.css'
// 导入图标样式
import './assets/icon/iconfont.css'

// 使用async
import 'regenerator-runtime/runtime'
import {
  ElButton,
  ElMenu,
  ElSubmenu,
  ElMenuItem,
  ElTable,
  ElTableColumn,
  ElTag,
  ElPagination,
  ElPopover,
  ElPopconfirm,
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  ElRadioGroup,
  ElRadio,
  ElCard,
  ElIcon,
  ElUpload,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu
} from 'element-plus'

import { UserFilled, ArrowDown, Notebook } from '@element-plus/icons-vue'

import VueEcharts from 'vue-echarts'
import * as echarts from 'echarts'

const app = createApp(App)
app.use(ElButton)
app.use(ElMenu)
app.use(ElSubmenu)
app.use(ElMenuItem)
app.use(ElTable)
app.use(ElTableColumn)
app.use(ElTag)
app.use(ElPagination)
app.use(ElPopover)
app.use(ElPopconfirm)
app.use(ElForm)
app.use(ElFormItem)
app.use(ElInput)
app.use(ElSelect)
app.use(ElOption)
app.use(ElRadioGroup)
app.use(ElRadio)
app.use(ElCard)
app.use(ElIcon)
app.use(ElUpload)
app.use(ElDropdown)
app.use(ElDropdownItem)
app.use(ElDropdownMenu)
app.component('UserFilled', UserFilled)
app.component('ArrowDown', ArrowDown)
app.component('Notebook', Notebook)
app
  .use(store)
  .use(router)
  .component('vue-echarts', VueEcharts)
  .mount('#app')
app.echarts = echarts
