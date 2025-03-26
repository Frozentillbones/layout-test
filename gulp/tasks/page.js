import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";
import { getPathConfig } from "../config/paths.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const page = (cb) => {
  const dashedName = process.argv[3];
  const cfgPath = path.resolve(__dirname, "../config/page.json");

  if (!dashedName) {
    fs.writeFileSync(cfgPath, JSON.stringify({ page: "" }, null, 2));
    cb();
    console.log("index page is watching now.");
    return;
  }

  const pageName = dashedName.replace(/--/g, "");

  const pathConfig = getPathConfig();

  if (!fs.existsSync(`${pathConfig.src}/${pageName}.html`)) {
    // html
    let htmlTemplate = fs.readFileSync(
      path.resolve(__dirname, "../templates/template.html"),
      "utf-8"
    );
    htmlTemplate = htmlTemplate.replace(
      /____/g,
      `${pageName.charAt(0).toUpperCase()}${pageName.slice(1)}`
    );

    fs.writeFileSync(
      `${pathConfig.src}/${pageName}.html`,
      htmlTemplate,
      "utf-8"
    );
    // scss
    fs.mkdirSync(`${pathConfig.src}/scss/pages/${pageName}/`);
    fs.writeFileSync(
      `${pathConfig.src}/scss/pages/${pageName}/index.scss`,
      "",
      "utf-8"
    );
    // js
    fs.mkdirSync(`${pathConfig.src}/js/pages/${pageName}/`);
    fs.writeFileSync(
      `${pathConfig.src}/js/pages/${pageName}/main.ts`,
      "",
      "utf-8"
    );
  }

  fs.writeFileSync(cfgPath, JSON.stringify({ page: pageName }, null, 2));

  console.log(`${pageName} is watching now.`);

  cb();
};
