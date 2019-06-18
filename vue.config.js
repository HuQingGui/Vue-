/* 
  webpack配置
*/
var path = require('path')

function resolve (pathUrl){
  return path.resolve(__dirname,pathUrl)
}


module.exports = {
  chainWebpack: function ( config ){
    config.resolve.alias
    .set('Css',resolve('src/assets/css'))
    .set('Common',resolve('src/components/common'))
    .set('Utils',resolve('src/utils'))
    .set('Store',resolve('src/store'))
    .set('Pages',resolve('src/components/pages'))
    .set('Filters',resolve('src/filters'))
    .set('Img',resolve('src/assets/img'))
    .set('Api',resolve('src/api'))
  },
//   devServer : {
//     proxy: {
//       '/wangyi' : {
//         target : 'http://localhost:4000',
//         changeOrigin: true,
//         pathRewrite: {
//             '^/wangyi': ''
//         }
//       }
//     }
//   }
}