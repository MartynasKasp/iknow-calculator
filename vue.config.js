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
    configureWebpack: {
        plugins: [
            new PrerenderSPAPlugin({
                staticDir: path.join(__dirname, 'dist'),
                routes: ['/'],
            }),
        ],
    },
    pwa: {
        name: 'iKNOW Calculator',
        themeColor: '#448aff',
        workboxOptions: {
            cleanupOutdatedCaches: true,
            skipWaiting: true,
        },
        iconPaths: {
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon: 'favicon.ico',
            msTileImage: 'favicon.ico',
        },
        startUrl: '/?utm_source=a2hs',
    },
};
