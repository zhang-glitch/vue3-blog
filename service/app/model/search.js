
'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Search = app.model.define('article', {
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

  // 也需要取其他表中的数据。这里的as type表示最后返回的对象名
  Search.associate = () => {
    app.model.Search.belongsTo(app.model.Type, { foreignKey: 'type_id', as: 'type' });
  };

  return Search;
};
