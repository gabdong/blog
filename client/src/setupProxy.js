const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/apis", {
      target: process.env.REACT_APP_SERVER_URL,
      changeOrigin: true,
    })
  );
};
