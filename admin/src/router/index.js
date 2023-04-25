import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/',
    name: 'Home',
    redirect: '/create',
    component: Home,
    children: [
      {
        path: 'create',
        name: 'create',
        component: () =>
          import(
            /* webpackChunkName: "create" */ '../components/CreateArticle.vue'
          )
      },
      {
        path: 'list',
        name: 'list',
        component: () =>
          import(/* webpackChunkName: "list" */ '../components/ArticleList.vue')
      },
      {
        path: 'message',
        name: 'message',
        component: () =>
          import(
            /* webpackChunkName: "message" */ '../components/CommentResponse.vue'
          )
      },
      {
        path: 'totalchart',
        name: 'totalchart',
        component: () =>
          import(
            /* webpackChunkName: "totalchart" */ '../components/TotalChart.vue'
          )
      },
      {
        path: 'articlechart',
        name: 'articlechart',
        component: () =>
          import(
            /* webpackChunkName: "articlechart" */ '../components/ArticleChart.vue'
          )
      },
      {
        path: 'commentchart',
        name: 'commentchart',
        component: () =>
          import(
            /* webpackChunkName: "messagechart" */ '../components/CommentChart.vue'
          )
      },
      {
        path: 'responsechart',
        name: 'responsechart',
        component: () =>
          import(
            /* webpackChunkName: "responsechart" */ '../components/ResponseChart.vue'
          )
      },
      {
        path: 'keywordstatistics',
        name: 'keywordstatistics',
        component: () =>
          import(
            /* webpackChunkName: "KeywordStatistics" */ '../components/KeywordStatistics.vue'
          )
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
