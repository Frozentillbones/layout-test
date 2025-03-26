import { getPathConfig } from "../config/paths.js";

export const copy = () => {
  const pathConfig = getPathConfig();
  return app.gulp
    .src(pathConfig.source.files)
    .pipe(
      app.plumber(
        app.notify.onError({
          title: "FILES",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(app.newer(pathConfig.dist.files))
    .pipe(app.debug())
    .pipe(app.gulp.dest(pathConfig.dist.files))
    .pipe(app.gulpIf(app.isDev, app.browsersync.stream()));
};

export const copySVGImages = () => {
  const pathConfig = getPathConfig();
  return app.gulp
    .src(pathConfig.source.svgImages)
    .pipe(
      app.plumber(
        app.notify.onError({
          title: "SVG IMAGES",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(app.newer(`${pathConfig.dist.img}/svg/`))
    .pipe(app.debug())
    .pipe(app.gulp.dest(`${pathConfig.dist.img}/svg/`))
    .pipe(app.gulpIf(app.isDev, app.browsersync.stream()));
};
