'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Resume = app.model.define('resume', {
    // 必须的有id
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    resume_content: STRING,
  });


  return Resume;
};
