const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://threadit-simple-reddit-clone.herokuapp.com",
      changeOrigin: true,
    })
  );
};
