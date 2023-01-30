const path = require('path');

module.exports = {
  entry: './js/index.js',
  output: {
    filename: 'MamaMia.wlp-bundle.js',
    path: path.resolve(__dirname, 'deploy'),
  },
};