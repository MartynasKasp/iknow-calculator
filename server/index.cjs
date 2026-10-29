const { resolve } = require('path');
const fs = require('fs');
const history = require('connect-history-api-fallback');
const express = require('express');
const { GracefulShutdownManager } = require('@moebius/http-graceful-shutdown');
// const { createProxyMiddleware } = require('http-proxy-middleware');
const basicAuth = require('express-basic-auth');
const helmet = require('helmet');
// const { errorPage } = require('./errorPage.js');
// const https = require('https');

const app = express();

app.use(helmet({
    contentSecurityPolicy: false,
}));

const { PORT = 3000 } = process.env;
const {
    API_SERVER_HOST = 'CHANGE-ME',
    USE_BASIC_AUTH = false,
    BASIC_USER = 'admin',
    BASIC_PWD = '123456789',
} = process.env;
const options = {
    target: API_SERVER_HOST, // target host
    changeOrigin: true, // needed for virtual hosted sites
    ws: true, // proxy websockets
    // pathRewrite: {
    //     '^/graphql': '/graphql', // rewrite path
    // },
};
const distPath = resolve(__dirname, '../dist');
// const publicPath = resolve(__dirname, '../public');

// Load env

// const data = fs.readFileSync(`${publicPath}/env.1.js`, 'utf8');
// const env = {
//     VUE_APP_TEST: process.env.VUE_APP_TEST,
// };

// const injected = data.replace(/'{}'/g, `'${JSON.stringify(env)}'`);
// fs.writeFileSync(`${distPath}/env.1.js`, injected);

// const defaultSocialMetaProperties = `
//     <head>
//     <meta property="og:title" content="Usborne" />
//     <meta property="og:image" content="${env.VUE_APP_FULL_PATH}/img/usborne-logo-no-app.png" />
//     <meta property="twitter:card" content="summary_large_image" />
// `;

// const credentials = {
//     key: fs.readFileSync('server/server.key'),
//     cert: fs.readFileSync('server/server.pem'),
// };

// const httpsServer = https.createServer(credentials, app);

// UI

const staticConf = {
    maxAge: '1y',
    etag: false,
    index: false,
    setHeaders: (res, path) => {
        if (path.includes('service-worker.js')) { // || path.includes('env.1.js')) {
            res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
        }
    },
};

app.use(express.static(distPath, staticConf));

// const proxyMiddleware = createProxyMiddleware(options);

// API proxy
app.use('/', history());

// Used to remove verbosity of errors.
const errorHandler = function (err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(400).send('Something went wrong.');
};
app.use(errorHandler);

// app.use(basicAuth({
//     users: { admin3: 'ju28f2Bz' },
//     challenge: true,
// }));

// const getUnauthorizedResponse = () => errorPage;

if (USE_BASIC_AUTH) {
    const users = {};
    users[BASIC_USER] = BASIC_PWD;
    app.use(basicAuth({
        users,
        challenge: true,
        unauthorizedResponse: getUnauthorizedResponse,
    }));
}

app.get('/*', (req, res) => {
    let fileName = 'index.html';

    res.sendFile(fileName, {
        root: distPath,
        headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, private',
            'x-timestamp': Date.now(),
        },
    });
});

// Go
const server = app.listen(PORT, () => console.log(`App running on port ${PORT}!`));
const shutdownManager = new GracefulShutdownManager(server);

process.on('SIGTERM', () => {
    shutdownManager.terminate(() => {
        console.log('Server is gracefully terminated');
    });
});
