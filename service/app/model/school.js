'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const School = app.model.define('school', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    image: STRING,
    schoolName: STRING,
    local: STRING,
    website: STRING,
  });


  return School;
};
