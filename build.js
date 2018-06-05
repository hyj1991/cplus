'use strict';
const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const map = {
  1: 'chapter 1',
  2: 'chapter 2',
  3: 'chapter 3',
  4: 'chapter 4',
  5: 'chapter 5',
  6: 'chapter 6',
  7: 'chapter 7',
  8: 'chapter 8',
  9: 'chapter 9',
  10: 'chapter 10',
  11: 'chapter 11',
  12: 'chapter 12',
  13: 'chapter 13',
  14: 'chapter 14',
  15: 'chapter 15',
  16: 'chapter 16',
  17: 'chapter 17',
  18: 'chapter 18',
  19: 'chapter 19',
  20: 'chapter 20'
}

function getRegexp(chapter, g) {
  if (g)
    return chapter ? new RegExp(`0x${chapter}_([\\w]+).cc`, 'g') : new RegExp(`0x(\\d{4})_([\\w]+).cc`, 'g');
  else
    return chapter ? new RegExp(`0x${chapter}_([\\w]+).cc`) : new RegExp(`0x(\\d{4})_([\\w]+).cc`);
}

function lsFiles(dir, chapter) {
  let files = fs.readdirSync(dir);
  let regexp = getRegexp(chapter);
  files = files.filter(file => regexp.test(file));
  return files;
}

function lsModifyFiles(chapter) {
  let result = cp.execSync('git status').toString();
  let regexp = getRegexp(chapter, true);
  let tmp;
  let total = [];
  while (tmp = regexp.exec(result)) {
    total.push(tmp[0]);
  }
  let rt = /(0x\d{4})/;
  total = total.reduce((cache, file) => {
    let t = parseInt(rt.exec(file)[1], 16);
    if (map[t] && cache[map[t]])
      cache[map[t]].push(file);
    else
      cache[map[t]] = [file];
    return cache;
  }, {});
  Object.keys(total).forEach(msg => {
    let commitMessage = `add: ${msg} files\n\n`;
    total[msg].forEach(file => {
      commitMessage += `  - ${file}\n`
      cp.execSync(`git add ${file}`);
    });
    cp.execSync(`git commit -m  '${commitMessage}'`);
  });
}

function build(dir, chapter) {
  dir = dir || __dirname;
  let files = lsFiles(dir, chapter);
  files.forEach(file => fs.copyFileSync(
    path.join(dir, file), path.join(__dirname, file)));
  lsModifyFiles(chapter);
}

build(process.argv[2], process.argv[3]);