import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildPath = "./dist";
const srcPath = "./src";

const root = path.basename(path.resolve());

export const getPathConfig = () => {
  const hasPageFile = fs.existsSync(`${__dirname}/page.json`);
  let pageFile;

  if (!hasPageFile) {
    fs.writeFileSync(
      `${__dirname}/page.json`,
      JSON.stringify({ page: "" }, null, 2)
    );
    pageFile = fs.readFileSync(`${__dirname}/page.json`, "utf8");
  } else {
    pageFile = fs.readFileSync(`${__dirname}/page.json`, "utf8");
  }

  const { page } = JSON.parse(pageFile);

  const getHtml = () => {
    if (page) {
      return `${page}.html`;
    }

    return "index.html";
  };

  const pathConfig = {
    dist: {
      fonts: `${buildPath}/fonts/`,
      img: `${buildPath}/img/`,
      js: `${buildPath}/js/`,
      css: `${buildPath}/css/`,
      html: `${buildPath}/`,
      files: `${buildPath}/files/`,
    },
    source: {
      fonts: `${srcPath}/fonts`,
      img: `${srcPath}/img/**/*.{jpg,png,gif,webp,ico}`,
      svg: `${srcPath}/img/vector/icons/*.svg`,
      js: `${srcPath}/js/main.ts`,
      scss: `${srcPath}/scss/index.scss`,
      html: `${srcPath}/${getHtml()}`,
      files: `${srcPath}/files/**/*.*`,
      svgImages: `${srcPath}/img/vector/*.svg`,
      data: `${srcPath}/data/**/*.json`,
    },
    watch: {
      fonts: `${srcPath}/fonts`,
      img: `${srcPath}/img/**/*.{jpg,png,gif,webp,ico}`,
      svg: `${srcPath}/img/vector/icons/*.svg`,
      svgImages: `${srcPath}/img/vector/*.svg`,
      js: `${srcPath}/js/**/*.{js,ts}`,
      scss: `${srcPath}/scss/**/*.scss`,
      html: `${srcPath}/**/*.html`,
      files: `${srcPath}/files/**/*.*`,
    },
    delete: buildPath,
    build: buildPath,
    src: srcPath,
    root,
  };

  return pathConfig;
};
