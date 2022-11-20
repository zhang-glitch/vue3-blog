'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const File = app.model.define('file', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    filename: STRING,
    mimetype: STRING,
    file_url: STRING,
    size: INTEGER
  });


  return File;
};
