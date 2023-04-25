'use strict'

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize

  const Login = app.model.define('admin_user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    userName: STRING,
    password: STRING,
    createTime: {
      type: INTEGER
    }
  })

  return Login
}
