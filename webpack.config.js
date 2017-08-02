const path = require('path');

module.exports = {
  entry: "./lib/main.js",
  output: {
    path:  __dirname + "/lib",
  	filename: "alien_raiders.js"
  },
  resolve: {
    extensions: ['.js', '*']
  },
  devtool: 'source-map',
};
