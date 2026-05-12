const path = require('path');

module.exports = {
  entry: "./bootstrap.js",
  output: {
    path: path.resolve(__dirname),
    filename: "output.js"
  },
  mode: "production"
};
