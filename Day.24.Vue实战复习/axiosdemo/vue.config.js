module.exports = { 
    　　devServer: {
        // 　　　　host: 'localhost',
        // 　　　　port: 8081,
        　　　　proxy: {
        　　　　　　'/api': {
        　　　　　　　　target: 'http://192.168.43.111:2000',// 要跨域的域名
        　　　　　　　　changeOrigin: true, // 是否开启跨域
        　　　　　　　　pathRewrite: {
        　　　　　　　　'^/api': '' // 在请求的时候 凡是/api开头的地址都可以跨域
        　　　　　　　　}
        　　　　　　},
        　　　　}
        　　}
    }