'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Advert = app.model.define('advert', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    image: STRING,
    advLink: STRING,

  });


  return Advert;
};
