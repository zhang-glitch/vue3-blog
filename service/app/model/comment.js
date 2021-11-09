'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Comment = app.model.define('comment', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    commentName: STRING,
    commentText: STRING,
    article_id: INTEGER,
    commentTime: {
      type: INTEGER,
    },
    type_id: INTEGER,
  });

  return Comment;
};

