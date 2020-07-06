// Environment variables that need exposing to cypress go here - use the example site .env file
require('dotenv').config()

module.exports = (on, config) => {

  config.env = {}

  return config
}
