// include dependencies
const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

// proxy middleware options
const items = {
  abs: {
    target: 'https://api.data.abs.gov.au', // target host
    changeOrigin: true, // needed for virtual hosted sites
    pathRewrite: {
      '^/abs/': ''
    }
  }
}

const app = express()
app.get('/', (req, res) => res.send('Myvic proxy server'))

const absProxy = createProxyMiddleware(items.abs)
app.use('/abs', absProxy)

app.listen(3000)
