var path = require('path');

var config = {
  entry: ['whatwg-fetch', './js/main.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  }
}

module.exports = config;
