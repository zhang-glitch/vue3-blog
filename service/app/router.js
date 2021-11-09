'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 获取全部文章，最新列表查询字符串pageSize,pageNum
  router.get('/getAllNewArticleList', controller.list.getAllNewArticleList);
  // 获取全部文章，热度列表
  router.get('/getAllHeatArticleList', controller.list.getAllHeatArticleList);
  // id获取最新列表,默认是按着最新排行/:id/:pageSize
  router.get('/getNewArticle', controller.list.getNewArticleList);

  // id获取最新列表,默认是按着热度排行/:id/:pageSize
  router.get('/getHeatArticle', controller.list.getHeatArticleList);
  // 获取type
  router.get('/getTypeList', controller.type.getTypeList);
  // 获取文章详情
  router.get('/getDetail/:id', controller.detail.getArticleById);
  // 查询数据,最新
  router.get('/getSearchNewList', controller.search.getSearchNewList);
  // 查询数据，热度
  router.get('/getSearchHeatList', controller.search.getSearchHeatList);
  // 广告
  router.get('/getAdvert', controller.advert.getAdvert);
  // 学校
  router.get('/getSchool', controller.advert.getSchool);
  // 每日一句
  router.get('/getSentence', controller.advert.getSentence);
  // banner
  router.get('/getBanner', controller.advert.getBanner);
  // 获取评论列表
  router.get('/getCommentList/:id', controller.comment.getCommentList);
  // 添加评论
  router.post('/addComment', controller.comment.addComment);
  // 获取回复列表
  router.get('/getResponseList/:id', controller.response.getResponseList);
  // 添加回复
  router.post('/addResponse', controller.response.addResponse);
  // 获取文章的总访问量和总文章量和总点赞数
  router.get('/getStarCount', controller.list.getStarCount);
  // 获取简历
  router.get('/getResumeData', controller.resume.getResumeData);


  // 后端路由
  // 登录
  router.post('/admin/login', controller.admin.login);
  // 退出登录
  router.post('/admin/logout', controller.admin.logout);
  // 创建文章
  router.post('/admin/createArticle', controller.admin.createArticle);
  // 更新文章
  router.post('/admin/updateArticle', controller.admin.updateArticle);
  // 删除文章
  router.post('/admin/deleteArticle', controller.admin.deleteArticle);
  // 删除评论
  router.post('/admin/deleteComment', controller.admin.deleteComment);
  // 删除回复
  router.post('/admin/deleteResponse', controller.admin.deleteResponse);
  router.get('/admin/getMessageList', controller.admin.getMessageList);
  // 获取总体统计数据
  router.get('/admin/totalChartCount', controller.admin.totalChartCount);
  router.get('/admin/getCommentResponseCountByArticleId', controller.admin.getCommentResponseCountByArticleId);
};
