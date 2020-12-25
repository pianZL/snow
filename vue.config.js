module.exports = {
  devServer: {
    port:8080,
      // proxy: {
      //     '/api': {
      //         target: 'localhost:7788',
      //         changeOrigin: true,
      //         pathRewrite: {
      //             '^/api': ''
      //         }
      //     },
      // },
  },
  lintOnSave: false, //关闭eslint的；
  // 修改图标
  // pwa: {
  //     iconPaths: {
  //         favicon32: 'favicon.ico',
  //         favicon16: 'favicon.ico',
  //         appleTouchIcon: 'favicon.ico',
  //         maskIcon: 'favicon.ico',
  //         msTileImage: 'favicon.ico'
  //     }
  // }
}
