'use strict'

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize

  const SearchStatistics = app.model.define('search', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    keyword: STRING,
    search_count: INTEGER,
    article_ids: STRING,
    article_count: INTEGER,
    type_ids: STRING,
  })

  // // 也需要取其他表中的数据。这里的as type表示最后返回的对象名
  // Search.associate = () => {
  //   app.model.Search.belongsTo(app.model.Type, { foreignKey: 'type_id', as: 'type' });
  // };

  return SearchStatistics
}
