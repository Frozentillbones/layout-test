import { getPathConfig } from "../config/paths.js";

export const server = (done) => {
  const pathConfig = getPathConfig();
  app.browsersync.init({
    server: {
      baseDir: pathConfig.dist.html,
    },
    open: true,
    port: 9999,
  });
};
