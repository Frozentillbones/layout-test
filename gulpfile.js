import gulp from "gulp";

import plumber from "gulp-plumber";
import debug from "gulp-debug";
import replace from "gulp-replace";
import version from "gulp-version-number";
import notify from "gulp-notify";
import browsersync from "browser-sync";
import rename from "gulp-rename";
import gulpIf from "gulp-if";
import newer from "gulp-newer";

global.app = {
  isDev: process.argv.includes("--dev"),
  gulp,
  newer,
  plumber,
  debug,
  replace,
  version,
  notify,
  browsersync,
  rename,
  gulpIf,
};

import { getPathConfig } from "./gulp/config/paths.js";
import { copy, copySVGImages } from "./gulp/tasks/copy.js";
import { clean } from "./gulp/tasks/clean.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { scripts } from "./gulp/tasks/scripts.js";
import { images } from "./gulp/tasks/images.js";
import { fonts } from "./gulp/tasks/fonts.js";
import { sprite } from "./gulp/tasks/sprite.js";
import { page } from "./gulp/tasks/page.js";

const watcher = () => {
  const pathConfig = getPathConfig();

  gulp.watch(pathConfig.source.files, copy);
  gulp.watch(pathConfig.source.svgImages, copySVGImages);
  gulp.watch(pathConfig.source.data, html);
  gulp.watch(pathConfig.watch.html, html);
  gulp.watch(pathConfig.watch.scss, scss);
  gulp.watch(pathConfig.watch.js, scripts);
  gulp.watch(pathConfig.watch.img, images);
  gulp.watch(pathConfig.watch.fonts, fonts);
  gulp.watch(pathConfig.watch.svg, sprite);
};

const buildHTML = gulp.series(html);

const buildScriptsAndStyles = gulp.parallel(scss, scripts);

const buildFiles = gulp.parallel(copy, images, copySVGImages, fonts, sprite);

const build = gulp.series(clean, buildHTML, buildScriptsAndStyles, buildFiles);

const dev = gulp.series(
  gulp.parallel(buildHTML, buildScriptsAndStyles),
  gulp.parallel(watcher, server)
);

export { dev };
export { build };
export { buildHTML };
export { buildFiles };
export { buildScriptsAndStyles };
export { page };
export { clean };

gulp.task("default", dev);
