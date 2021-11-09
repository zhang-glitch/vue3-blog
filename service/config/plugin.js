'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  static: {
    enable: true,
  },

  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },

  cors: {
    enable: true,
    package: 'egg-cors',
  },

  mysql: {
    enable: true,
    package: 'egg-mysql',
  },

  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
};
