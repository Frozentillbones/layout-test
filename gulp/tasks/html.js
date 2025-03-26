import fileInclude from "gulp-file-include";
import { getPathConfig } from "../config/paths.js";

export const html = () => {
  const pathConfig = getPathConfig();

  return app.gulp
    .src(pathConfig.source.html)
    .pipe(
      app.plumber(
        app.notify.onError({
          title: "HTML",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(app.debug())
    .pipe(fileInclude())
    .pipe(app.replace(/@img\//g, "./img/"))
    .pipe(
      app.gulpIf(
        !app.isDev,
        app.version({
          value: "%DT%",
          append: {
            key: "_v",
            to: ["css", "js"],
          },
          output: {
            file: "version.json",
          },
        })
      )
    )
    .pipe(app.gulp.dest(pathConfig.dist.html))
    .pipe(app.gulpIf(app.isDev, app.browsersync.stream()));
};
