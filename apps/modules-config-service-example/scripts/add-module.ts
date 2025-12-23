import { readFile, writeFile } from "node:fs/promises";

const [,, serviceName, serviceUrl ] = process.argv

import path from "node:path";

const currentDir = import.meta.dirname;

const jsonPath = path.join("..", currentDir, "modules.json");

const stringfiedJson = await readFile(jsonPath, {
  encoding: 'utf-8'
});

const json = JSON.parse(stringfiedJson);


json[serviceName] = new URL(serviceUrl).toString();

await writeFile(jsonPath,  JSON.stringify(json), {
  mode: 'w'
})