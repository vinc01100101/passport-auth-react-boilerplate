const express = require("express");
const app = express();
const mongoose = require("mongoose");

//server modules
const routes = require("./server_modules/routes"),
  auth = require("./server_modules/auth"),
  logger = require("./server_modules/logger");

//get the env mode set in package.json script, trip spaces
const nodeEnv = process.env.NODE_ENV.trim();
if (nodeEnv !== "production") {
  require("dotenv").config();
  console.log("development mode");

  const webpack = require("webpack");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const config = require("./webpack.config.js");

  //Add HMR plugin
  //  Hot Module Replacement (HMR) exchanges, adds, or removes modules
  //  while an application is running, without a full reload.
  //  This can significantly speed up development in a few ways:

  //  -Retain application state which is lost during a full reload.
  //  -Save valuable development time by only updating what's changed.
  //  -Instantly update the browser when modifications are made to CSS/JS in the source code, which is almost comparable to changing styles directly in the browser's dev tools.

  config.plugins.push(new webpack.HotModuleReplacementPlugin());

  const compiler = webpack(config);

  //Enable "webpack-dev-middleware"
  //  Some of the benefits of using this middleware include:
  //  -No files are written to disk, rather it handles files in memory
  //  -If files changed in watch mode, the middleware delays requests until compiling has completed.
  //  -Supports hot module reload (HMR).

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath,
    })
  );
}

app.use(express.static(__dirname + "/dist", { index: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);

const URI = process.env.URI;
mongoose.connect(
  URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) {
      return console.log("Error while connecting to database: " + err.message);
    } else {
      const user = new mongoose.Schema({
        username: { type: String, requred: true },
        password: { type: String, requred: true },
      });
      const UserModel = new mongoose.model("user", user);

      auth(app, client, UserModel);
      routes(app, UserModel);
    }
  }
);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Server started on port: " + port);
});
