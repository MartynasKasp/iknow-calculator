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
    },
};
