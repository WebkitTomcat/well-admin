const path = require('path')
function resolve (dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {
  pwa: {
    iconPaths: {
      favicon32: 'https://static.geon.top/admin/ui/img/fav-190124.png',
      favicon16: 'https://static.geon.top/admin/ui/img/fav-190124.png',
      appleTouchIcon: 'https://static.geon.top/admin/ui/img/fav-190124.png',
      maskIcon: 'https://static.geon.top/admin/ui/img/fav-190124.png',
      msTileImage: 'https://static.geon.top/admin/ui/img/fav-190124.png'
    }
  },
  publicPath: '/',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        disableHostCheck: true,
        // ws: true,
        ws: false,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
