import { createStore } from 'vuex'
import request from '../http/request'

const state = {
  // 文章列表
  articleList: [],
  // 列表总数
  count: 0,
  // 类别
  typeList: [],
  // 文章详情
  detail: {},
  // 广告
  advert: {},
  // 学校
  school: [],
  // 每日一句
  sentence: {},
  // banner
  bannerList: [],
  // 评论列表
  commentList: [],
  // 总阅读量，总文章量，总分享量
  viewStarCount: {},
  // 简历
  resume: {},
  // 搜索词列表
  keywordList: [],
  // 保存搜索关键词,做联动处理
  searchValue: ''
}

const mutations = {
  // 获取文章列表和数量
  getArticleList(state, data) {
    state.articleList = data.articleData
    state.count = data.count
  },

  // 获取文章类别
  getTypeList(state, data) {
    state.typeList = data
  },

  // 获取文章详情
  getDetail(state, data) {
    state.detail = data
  },

  // 获取广告
  getAdvert(state, data) {
    state.advert = data
  },

  // 获取学校
  getSchool(state, data) {
    state.school = data
  },

  // 获取每日一句
  getSentence(state, data) {
    state.sentence = data
  },

  // 获取banner
  getBanner(state, data) {
    state.bannerList = data
  },

  // 获取评论列表
  getCommentList(state, data) {
    state.commentList = data
  },

  // 获取总阅读量和文章数
  getStarCount(state, data) {
    state.viewStarCount = data
  },

  // 获取简历
  getResumeData(state, data) {
    state.resume = data
  },

  // 获取搜索词列表
  getKeywordList(state, data) {
    state.keywordList = data.keywordList
  },
  // 获取搜索词
  getSearchValue(state, data) {
    state.searchValue = data
  }
}

const actions = {
  // 获取全部最新文章列表和数量
  async getAllNewArticleList({ commit }, params) {
    const data = await request({
      url: `/getAllNewArticleList`,
      method: 'get',
      params
    })

    commit('getArticleList', data)
    return data
  },

  // 获取全部热度文章列表和数量pageSize, pageNum
  async getAllHeatArticleList({ commit }, params) {
    const data = await request({
      url: `/getAllHeatArticleList`,
      method: 'get',
      params
    })

    commit('getArticleList', data)
    return data
  },

  // 获取分类最新列表和数量
  async getNewArticleList({ commit }, params) {
    const data = await request({
      url: `/getNewArticle`,
      method: 'get',
      params
    })

    commit('getArticleList', data)
    return data
  },

  // 获取分类热度列表和数量
  async getHeatArticleList({ commit }, params) {
    const data = await request({
      url: `/getHeatArticle`,
      method: 'get',
      params
    })

    commit('getArticleList', data)
    return data
  },

  // 获取文章类型
  async getTypeList({ commit }) {
    const data = await request({
      url: '/getTypeList',
      method: 'get'
    })
    commit('getTypeList', data)
    return data
  },

  // 获取文章详情
  async getDetail({ commit }, params) {
    const data = await request({
      url: `/getDetail/${params.id}`,
      method: 'get'
    })
    commit('getDetail', data)
    return data
  },

  // 获取文章查询最新列表和数量
  async getSearchNewList({ commit }, params) {
    const data = await request({
      url: `/getSearchNewList`,
      method: 'get',
      params
    })
    commit('getArticleList', data)
    return data
  },

  // 获取文章查询热度列表和数量
  async getSearchHeatList({ commit }, params) {
    const data = await request({
      url: `/getSearchHeatList`,
      method: 'get',
      params
    })
    commit('getArticleList', data)
    return data
  },

  // 获取广告
  async getAdvert({ commit }) {
    const data = await request({
      url: `/getAdvert`,
      method: 'get'
    })
    commit('getAdvert', data)
    return data
  },

  // 获取学校
  async getSchool({ commit }) {
    const data = await request({
      url: `/getSchool`,
      method: 'get'
    })
    commit('getSchool', data)
    return data
  },

  // 获取每日一句
  async getSentence({ commit }) {
    const data = await request({
      url: `/getSentence`,
      method: 'get'
    })
    commit('getSentence', data)
    return data
  },

  // 获取banner
  async getBanner({ commit }) {
    const data = await request({
      url: `/getBanner`,
      method: 'get'
    })
    commit('getBanner', data)
    return data
  },

  // 获取评论列表
  async getCommentList({ commit }, params) {
    const data = await request({
      url: `/getCommentList/${params.id}`,
      method: 'get'
    })
    const length = data.length
    // 将回复的数据添加到对应的评论列表中
    for (let i = 0; i < length; i++) {
      const _responseList = await request({
        url: `/getResponseList/${data[i].id}`,
        method: 'get'
      })
      data[i].responseList = _responseList
    }
    commit('getCommentList', data)
    return data
  },

  // 获取总阅读量和文章数
  async getStarCount({ commit }) {
    const data = await request({
      url: `/getStarCount`,
      method: 'get'
    })
    commit('getStarCount', data)
    return data
  },

  // 获取简历
  async getResumeData({ commit }) {
    const data = await request({
      url: `/getResumeData`,
      method: 'get'
    })
    commit('getResumeData', data)
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
