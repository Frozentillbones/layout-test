import del from "del";
import { getPathConfig } from "../config/paths.js";

export const deleteDistFiles = async () => {
  const pathConfig = getPathConfig();
  console.log(`Cleaning "${pathConfig.dist.files}" folder...`);
  try {
    await del(pathConfig.dist.files);
    console.log(`"${pathConfig.dist.files}" folder is clear.`);
  } catch {
    console.error(
      `There is something wrong with "${pathConfig.dist.files}" folder cleaning!`
    );
  }
};

export const clean = async () => {
  const pathConfig = getPathConfig();
  console.log(`Cleaning "${pathConfig.delete}" folder...`);
  try {
    await del(pathConfig.delete, { force: true });
    console.log(`"${pathConfig.delete}" folder is clear.`);
  } catch {
    console.error(
      `There is something wrong with "${pathConfig.delete}" folder cleaning!`
    );
  }
};
