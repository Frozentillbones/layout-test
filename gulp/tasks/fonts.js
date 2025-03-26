import ttf2Woff from "gulp-ttf2woff";
import ttf2woff2 from "gulp-ttf2woff2";
import { getPathConfig } from "../config/paths.js";

export const fonts = () => {
  const pathConfig = getPathConfig();
  return app.gulp
    .src(`${pathConfig.source.fonts}/**/*.ttf`)
    .pipe(app.newer(pathConfig.dist.fonts))
    .pipe(
      app.plumber(
        app.notify.onError({
          title: "TTF2WOFF_FONTS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(app.debug())
    .pipe(ttf2Woff())
    .pipe(app.gulp.dest(pathConfig.dist.fonts))
    .pipe(app.gulp.src(`${pathConfig.source.fonts}/**/*.ttf`))
    .pipe(
      app.plumber(
        app.notify.onError({
          title: "TTF2WOFF2_FONTS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(app.debug())
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(pathConfig.dist.fonts))
    .pipe(app.gulpIf(app.isDev, app.browsersync.stream()));
};
