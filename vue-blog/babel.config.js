// module.exports = {
//   presets: [
//     '@vue/cli-plugin-babel/preset'
//   ]
// }


//babel.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', { 'modules': false }]
  ],
  'plugins': [
    [
      'component',
      {
        'libraryName': 'element-ui' / 'element-plus',
        'styleLibraryName': 'theme-chalk'
      }
    ]
  ]
}
