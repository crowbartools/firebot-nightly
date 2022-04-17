const path = require('path');
const { readFileSync, writeFileSync } = require('fs');

const packagePath = path.resolve('./package.json');
const package = JSON.parse(readFileSync(packagePath, 'utf-8'));

package.version += `-nightly-${process.argv[2]}`;

writeFileSync(packagePath, JSON.stringify(package), 'utf-8');

console.log('Version set to:', package.version);