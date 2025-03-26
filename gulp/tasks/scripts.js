import webpack from "webpack-stream";
import sourcemaps from "gulp-sourcemaps";
import { getPathConfig } from "../config/paths.js";

export const scripts = () => {
  const pathConfig = getPathConfig();
  return app.gulp
    .src(pathConfig.source.js, { sourcemaps: app.isDev })
    .pipe(app.newer(pathConfig.dist.js))
    .pipe(
      app.plumber(
        app.notify.onError({
          title: "JS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(app.debug())
    .pipe(app.gulpIf(app.isDev, sourcemaps.init()))
    .pipe(
      webpack({
        mode: app.isDev ? "development" : "production",
        output: {
          filename: "index.min.js",
        },
        module: {
          rules: [
            {
              test: /\.tsx?$/,
              use: "ts-loader",
              exclude: /node_modules/,
            },
          ],
        },
        resolve: {
          extensions: [".tsx", ".ts", ".js"],
        },
      })
    )
    .pipe(app.gulpIf(app.isDev, sourcemaps.write()))
    .pipe(app.gulp.dest(pathConfig.dist.js))
    .pipe(app.gulpIf(app.isDev, app.browsersync.stream()));
};
