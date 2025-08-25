// loop through directories in the current folder that start with `template-`

import fs from "node:fs";
import path from "node:path";
import cp from "node:child_process";

const __dirname = path.resolve();
const templates = fs.readdirSync(__dirname).filter(f=>f.startsWith('template-')).map(f=>f.replace(/^template-/, ''));
cp.execSync('rm -rf generated', {stdio: 'inherit'});
for (const template of templates) {
  cp.execSync(`npx . --template ${template} generated/p-${template}`, {stdio: 'inherit'});
  cp.execSync(`cd generated/p-${template} && npm install && npm run build`, {stdio: 'inherit'});
}
