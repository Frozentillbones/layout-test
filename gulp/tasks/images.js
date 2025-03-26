import imagemin from "gulp-imagemin";
import { getPathConfig } from "../config/paths.js";

export const images = () => {
  const pathConfig = getPathConfig();
  return app.gulp
    .src(pathConfig.source.img)
    .pipe(app.newer(pathConfig.dist.img))
    .pipe(
      app.plumber(
        app.notify.onError({
          title: "IMAGES",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(app.debug())
    .pipe(
      app.gulpIf(
        !app.isDev,
        imagemin({
          progressive: true,
          interlaced: true,
          optimizationLevel: 7,
        })
      )
    )
    .pipe(app.gulp.dest(pathConfig.dist.img))
    .pipe(app.gulpIf(app.isDev, app.browsersync.stream()));
};
