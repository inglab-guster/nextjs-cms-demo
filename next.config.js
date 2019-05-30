const withCSS = require('@zeit/next-css')
module.exports = withCSS({
    cssModules: true
    // exportPathMap: async function (defaultPathMap) {
    //     return {
    //         '/': { page: '/' },
    //         '/about': { page: '/about' },
    //         // '/post': { page: '/post', query: { id: '975' } },
    //     };
    // }
})