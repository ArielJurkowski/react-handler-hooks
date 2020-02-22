const fs = require('fs');

const sourceFolder = './../src/';
const targetFolder = './src/hooks/';

fs.readdirSync(sourceFolder)
    .filter(name => name.indexOf('use') === 0)
    .map(name => [sourceFolder + name, targetFolder + name])
    .forEach(([sourceFile, targetFile]) => fs.copyFileSync(sourceFile, targetFile));
