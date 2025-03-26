import dart from "sass";
import gulpSass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";

import minify from "gulp-clean-css";
import autoPrefixer from "gulp-autoprefixer";
import { getPathConfig } from "../config/paths.js";

const sass = gulpSass(dart);

export const scss = () => {
  const pathConfig = getPathConfig();
  return app.gulp
    .src(pathConfig.source.scss)
    .pipe(app.newer(pathConfig.dist.css))
    .pipe(
      app.plumber(
        app.notify.onError({
          title: "SCSS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(app.replace(/@img\//g, "./img/"))
    .pipe(app.debug())
    .pipe(app.gulpIf(app.isDev, sourcemaps.init()))
    .pipe(
      sass({
        allowEmpty: true,
      })
    )
    .pipe(app.gulpIf(app.isDev, sourcemaps.write()))
    .pipe(
      app.gulpIf(
        !app.isDev,
        autoPrefixer({
          grid: true,
          overrideBrowserslist: ["last 3 versions"],
          cascade: true,
        })
      )
    )
    .pipe(app.gulpIf(!app.isDev, minify()))
    .pipe(
      app.rename({
        basename: "index",
        extname: ".min.css",
      })
    )
    .pipe(app.gulp.dest(pathConfig.dist.css))
    .pipe(app.gulpIf(app.isDev, app.browsersync.stream()));
};
