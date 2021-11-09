'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Response = app.model.define('response', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    comment_id: INTEGER,
    responseName: STRING,
    responseText: STRING,
    responseTime: {
      type: INTEGER,
    },
    article_id: INTEGER,
    type_id: INTEGER,
  });

  // 关联评论表
  // Response.associate = () => {
  //   app.model.Response.belongsTo(app.model.Comment, { foreignKey: 'comment_id', as: 'commentList' });
  // };


  return Response;
};
