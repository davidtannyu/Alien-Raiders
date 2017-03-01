module.exports = {
  entry: "./lib/main.js",
  output: {
    path: "./lib",
  	filename: "alien_raiders.js"
  },
  resolve: {
    extensions: ['.js', '*']
  },
  devtool: 'source-map',
};
