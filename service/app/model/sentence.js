'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;


  const Sentence = app.model.define('daysentence', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    image: STRING,
    text: STRING,
  });


  return Sentence;
};
