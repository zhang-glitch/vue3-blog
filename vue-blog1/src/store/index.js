import { createStore } from "vuex";
import axios from 'axios'


const state = {
  // 全部文章
  articleList: [],
  // 文章总数
  articleTotal: 0,
  // 获取最新文章
  newArticleList: [],
  // 获取热门文章
  heatArticleList: [],
  // 文章类型
  type: [],
  // 头部菜单索引
  navIndex: '0',
  // 获取不同类型的文章
  articleTypeList: [],
  // 获取文章详情
  detailArticle: null,
  // 获取文章评论列表
  commentList: [],
  // 阅读总数
  allViews: 0,
  // 获取搜索的文章
  searchArticleList: [],
  // 获取搜索文章总数
  searchArticleCount: 0,
  //不同类型文章数量
  typeArticleCount: 0,
  // 文章目录数组
  anchorList: []
}

const getters = {
  getNavIndex (state) {
    return state.navIndex
  },
  // 返回不同类型文章得数量
  getArticleTypeListNum (state) {
    return state.articleTypeList.length;
  },
  // 获取目录数量
  getAnchorList (state) {
    return state.anchorList
  }
}

const mutations = {
  // 获取全部文章
  getArticleList (state, val) {
    state.articleList = val
  },
  // 获取文章总数
  getArticleTotal (state, articleTotal) {
    state.articleTotal = articleTotal
  },
  // 获取最新文章
  getNewArticleList (state, newArticleList) {
    state.newArticleList = newArticleList
  },
  // 获取热门文章
  getHeatArticleList (state, heatArticleList) {
    state.heatArticleList = heatArticleList
  },
  // 获取文章类型
  getType (state, type) {
    state.type = type
  },
  // 存取头部菜单索引
  getNavIndex (state, navIndex) {
    state.navIndex = navIndex
  },
  // 根据文章类型请求各类型文章列表
  getArticleListById (state, articleTypeList) {
    state.articleTypeList = articleTypeList
  },
  // 获取文章详情
  getArticleById (state, detailArticle) {
    state.detailArticle = detailArticle
  },
  // 更新类型文章
  updateTypeArticleList (state, params) {
    state.articleTypeList = params
  },
  // 获取文章评论列表
  getCommentList (state, commentData) {
    state.commentList = commentData
  },
  //获取文章阅读总数
  getAllArticleCount (state, allViews) {
    state.allViews = allViews
  },
  // 获取搜索的文章
  getSearchArticleList (state, searchArticleList) {
    state.searchArticleList = searchArticleList
  },
  // 获取文章总数
  getSearchArticleCount (state, searchAllCount) {
    state.searchArticleCount = searchAllCount
  },
  // 获取不同类别文章总数
  getTypeArticleCount (state, typeArticleCount) {
    state.typeArticleCount = typeArticleCount
  },
  // 取出目录数组
  getAnchorList (state, anchorList) {
    state.anchorList = anchorList
  }
}



const actions = {
  // 获取全部文章
  async getArticleList ({ commit }, params) {
    const { data } = await axios.get(`/default/getArticleList/${params.size}`)
    if (data && data.data.length !== 0) {
      commit('getArticleList', data.data)
      return data.data
    }
  },
  // 获取文章总数
  async getArticleTotal ({ commit }) {
    const { data } = await axios.get(`/default/getArticleTotal`);
    if (data && data.data.length !== 0) {
      commit('getArticleTotal', data.data[0].artcleTotal)
      return data.data[0].artcleTotal
    }
  },
  // 获取文章类型
  async getType ({ commit }) {
    const { data } = await axios.get('/default/getTypeInfo')
    if (data && data.data.length) {
      // console.log(data.data)
      commit('getType', data.data)
      return data.data
    }
  },
  // 获取最新文章
  async getNewArticleList ({ commit }, params) {
    const { data } = await axios.get(`/default/getNewArticleList/${params.size}`)
    // console.log(data)
    if (data && data.data.length) {
      commit('getNewArticleList', data.data)
      return data.data
    }
  },
  // 获取热门文章
  async getHeatArticleList ({ commit }, params) {
    const { data } = await axios.get(`/default/getHeatArticleList/${params.size}`)
    // console.log(data)
    commit('getHeatArticleList', data.data)
    return data.data
  },
  // 根据文章类型请求各类型文章列表
  async getArticleListById ({ commit }, { id, size }) {
    const { data } = await axios.get(`/default/getListById/${id}/${size}`)
    if (data && data.data.length) {
      // console.log("摄影", data.data)
      commit('getArticleListById', data.data)
      return data.data
    } else {
      commit('getArticleListById', [])
      return []
    }
  },
  // 获取详情文章
  async getArticleById ({ commit }, { id }) {
    const { data } = await axios.get(`/default/getArticleById/${id}`);
    // console.log(data)
    if (data && data.data.length) {
      commit("getArticleById", data.data[0])
      return data.data[0]
    }
  },
  // 更新类型文章
  updateTypeArticleList ({ commit }, params) {
    // console.log(params)
    commit("updateTypeArticleList", params)
  },
  //获取评论数据
  async getCommentList ({ commit }, params) {
    const { data } = await axios(`/default/getCommentById/${params.id}`)

    // console.log(data)
    if (data && data.commentData) {
      const length = data.commentData.length
      // 将回复的数据添加到对应的评论列表中
      for (let i = 0; i < length; i++) {
        const response = await axios(`/default/getResponseById/${data.commentData[i].id}`)
        data.commentData[i].responseList = response.data.data
      }
      // console.log('res', data.commentData)
      commit("getCommentList", data.commentData)
      return data.commentData
    }
  },

  // 获取总阅读量
  async getAllArticleCount ({ commit }) {
    const { data } = await axios.get('/default/getAllArticleCount');
    commit('getAllArticleCount', data.data[0].allViewCount)
  },

  // 获取搜索文章数据
  async getSearchArticleList ({ commit }, params) {
    const { data } = await axios.get(`/default/getSearchArticleByTitle/${params.searchVal}/${params.size}`);
    if (data && data.data.length) {
      commit("getSearchArticleList", data.data)
      return data.data
    } else {
      // 如果没有搜索到，还将其置空
      commit("getSearchArticleList", [])
    }
  },
  // 获取搜索的文章总数
  async getSearchArticleCount ({ commit }, params) {
    const { data } = await axios.get(`/default/getSearchArticleCount/${params.searchVal}`);
    // console.log(data)
    if (data && data.data.length) {
      commit("getSearchArticleCount", data.data[0].searchAllCount)
      return data.data[0].searchAllCount
    }
  },
  // 获取搜索到的全部数据
  async getAllSearchArticle ({ commit }, params) {
    const { data } = await axios.get(`/default/getAllSearchArticle/${params.searchVal}`);
    // console.log(data)
    if (data) {
      commit("getAllSearchArticle", data.data)
      return data.data
    }
  },
  // 获取类别文章总数量
  async getTypeArticleCount ({ commit }, params) {
    const { data } = await axios.get(`/default/getTypeArticleCount/${params.id}`);
    if (data && data.data.length) {
      commit("getTypeArticleCount", data.data[0].typeAllCount);
      return data.data[0].typeAllCount
    }
  },
  // 获取文章目录
  getAnchorList ({ commit }, params) {
    if (params) {
      commit("getAnchorList", params)
      return params
    }
  }
}

const store = createStore({
  state,
  mutations,
  getters,
  actions
})

export default store
