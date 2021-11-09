import { createWebHistory, createRouter } from 'vue-router'

const index = () => import(/* webpackChunkName: 'index'*/'views/index.vue');
const list = () => import(/* webpackChunkName: 'list'*/'views/list.vue');
const detail = () => import(/* webpackChunkName: 'detail'*/'views/detail.vue');
const about = () => import(/* webpackChunkName: 'about'*/'views/about.vue');
const search = () => import(/* webpackChunkName: 'search'*/'views/search.vue');

const routes = [
  {
    path: "/",
    name: "index",
    component: index
  },
  {
    path: "/list",
    name: "list",
    component: list
  },
  {
    path: '/detail',
    name: 'detail',
    component: detail
  },
  {
    path: '/about',
    name: 'about',
    component: about
  },
  {
    path: '/search',
    name: 'search',
    component: search
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router