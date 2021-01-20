/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const PrerenderSPAPlugin = require('prerender-spa-plugin');

module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: '@import "@/styles/vars.scss";',
            },
        },
    },
    devServer: {
        port: '3000',
        https: false,
    },
    publicPath: process.env.NODE_ENV === 'production' ? '/iknow/' : '/',
    configureWebpack: {
        plugins: [
            new PrerenderSPAPlugin({
                staticDir: path.join(__dirname, 'dist'),
                routes: ['/'],
            }),
        ],
    },
};
