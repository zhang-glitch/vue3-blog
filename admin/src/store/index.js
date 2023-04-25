import { createStore } from 'vuex'
import request from '../http/request'

const state = {
  articleList: {},
  messageLst: [],
  article: {},
  isLogin: false,
  keywordList: []
}

const mutations = {
  getArticleList(state, data) {
    state.articleList = data
  },
  getMessageList(state, data) {
    state.messageLst = data
  },
  getArticle(state, data) {
    state.article = data
  },
  updateLogin(state, data) {
    state.isLogin = data
  },
  // 获取搜索词列表
  getKeywordList(state, data) {
    state.keywordList = data.keywordList
  }
}

const actions = {
  // 获取文章列表
  async getArticleList({ commit }, params) {
    const data = request({
      url: '/getAllNewArticleList',
      method: 'get',
      params
    })
    commit('getArticleList', data)
    return data
  },

  // 获取评论列表
  async getMessageList({ commit }, params) {
    const data = await request({
      url: `/admin/getMessageList`,
      method: 'get',
      params
    })
    const length = data.messageData.length
    // 将回复的数据添加到对应的评论列表中
    for (let i = 0; i < length; i++) {
      const _responseList = await request({
        url: `/getResponseList/${data.messageData[i].id}`,
        method: 'get'
      })
      data.messageData[i].responseList = _responseList
    }
    commit('getMessageList', data)
    return data
  },

  // 获取搜索关键词列表
  async getKeywordList({ commit }) {
    const data = await request({
      url: `/getKeywordStatistics`,
      method: 'get'
    })
    commit('getKeywordList', data)
    return data
  }
}

export default createStore({
  state,
  mutations,
  actions
})
