
'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Detail = app.model.define('article', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    type_id: INTEGER,
    title: STRING,
    article_content: STRING,
    view_count: INTEGER,
    tags: STRING,
    author: STRING,
    slogan: STRING,
    star: INTEGER,
    image: STRING,
    addTime: {
      type: INTEGER,
    },


  });


  return Detail;
};
