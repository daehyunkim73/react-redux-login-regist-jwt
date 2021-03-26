const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api/front_api/',
        createProxyMiddleware({
            target: 'http://127.0.0.1:8082',
            changeOrigin: true,
        })
    );
};