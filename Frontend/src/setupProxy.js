const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: `http://${ process.env.BACKEND_HOST || 'localhost' }:3000`,
      changeOrigin: true,
    })
  );
};