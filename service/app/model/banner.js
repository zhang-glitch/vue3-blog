'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;


  const Banner = app.model.define('banner', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    image: STRING,
    articleLink: STRING,
  });


  return Banner;
};
