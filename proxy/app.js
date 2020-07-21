// include dependencies
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

// proxy middleware options
const options = {
  target: 'http://stat.data.abs.gov.au', // target host
  changeOrigin: true, // needed for virtual hosted sites
  pathRewrite: {
    '^/abs/': '',
  }
};

// create the proxy (without context)
const absProxy = createProxyMiddleware(options);

// mount `exampleProxy` in web server
const app = express();
app.use('/abs', absProxy);

app.listen(3000);