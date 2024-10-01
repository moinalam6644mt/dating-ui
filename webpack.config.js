// webpack.config.js
const path = require('path');

module.exports = {
  // Your existing Webpack configuration
  resolve: {
    fallback: {
      "assert": require.resolve("assert/")
    }
  },

  output: {
    chunkFilename: '[name].chunk.js',
    filename: '[name].bundle.js',
  }
  
  // Other Webpack configuration options...
};
