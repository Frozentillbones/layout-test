import svgSprite from "gulp-svg-sprite";
import { getPathConfig } from "../config/paths.js";

export const sprite = () => {
  const pathConfig = getPathConfig();
  return app.gulp
    .src(pathConfig.source.svg)
    .pipe(app.newer(pathConfig.dist.img))
    .pipe(
      app.plumber(
        app.notify.onError({
          title: "svg",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(app.debug())
    .pipe(
      svgSprite({
        svg: {
          namespaceClassnames: false,
        },
        mode: {
          symbol: {
            sprite: "../svg/sprite.svg",
          },
        },
      })
    )
    .pipe(app.gulp.dest(`${pathConfig.dist.img}`))
    .pipe(app.gulpIf(app.isDev, app.browsersync.stream()));
};
