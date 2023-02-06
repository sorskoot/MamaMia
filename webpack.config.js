const path = require('path');

module.exports = {
  entry: '/MamaMia-bundle.js',
  output: {
    filename: 'MamaMia-bundle.js',
    path: path.resolve(__dirname, 'deploy'),
  },
};