const path = require('path');

module.exports = {
  resolve: {
    alias: {
      'components': path.resolve(__dirname, 'src/components'),
      'services': path.resolve(__dirname, 'src/services'),
      'store': path.resolve(__dirname, 'src/store'),
    },
    extensions: ['.jsx', '.js', '.scss', '.json'],
  },
};