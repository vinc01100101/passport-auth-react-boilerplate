# Passport-Auth-React-Boilerplate

## with HMR and webpack-dev-module

My personal boilerplate for use that has HMR and webpack-dev-module

### HMR

Hot Module Replacement (HMR) exchanges, adds, or removes modules while an application is running, without a full reload. This can significantly speed up development in a few ways:

- Retain application state which is lost during a full reload.
- Save valuable development time by only updating what's changed.
- Instantly update the browser when modifications are made to CSS/JS in the source code, which is almost comparable to changing styles directly in the browser's dev tools.

https://webpack.js.org/concepts/hot-module-replacement/ - source (HMR)

### webpack-dev-middleware

An express-style development middleware for use with webpack bundles and allows for serving of the files emitted from webpack. This should be used for development only.

Some of the benefits of using this middleware include:

- No files are written to disk, rather it handles files in memory
- If files changed in watch mode, the middleware delays requests until compiling has completed.
- Supports hot module reload (HMR).

https://github.com/webpack/webpack-dev-middleware - source (webpack-dev-middleware)
