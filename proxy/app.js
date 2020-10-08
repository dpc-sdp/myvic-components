// include dependencies
const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

// proxy middleware options
const items = {
  abs: {
    target: 'http://stat.data.abs.gov.au', // target host
    changeOrigin: true, // needed for virtual hosted sites
    pathRewrite: {
      '^/abs/': ''
    }
  },
  address: {
    target: 'https://api.vic.gov.au:443/delwp/address/v1/suggestions', // target host
    changeOrigin: true, // needed for virtual hosted sites
    pathRewrite: {
      '^/api-address-suggestions': ''
    },
    headers: {
      apiKey: process.env.ADDRESS_API_KEY
    }
  }
}

const app = express()
app.get('/', (req, res) => res.send('Myvic proxy server'))

const absProxy = createProxyMiddleware(items.abs)
app.use('/abs', absProxy)

const addressProxy = createProxyMiddleware(items.address)
app.use('/api-address-suggestions', addressProxy)

app.listen(3000)
