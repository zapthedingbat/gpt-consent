const fs = require('fs');
const path = require('path');
const uglify = require('uglify-js');

const distDir = './dist';
const sourceFilePath = './src/gpt-consent.js';
const sourceFile = fs.readFileSync(sourceFilePath, 'utf8');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// Minify file
const result = uglify.minify(sourceFile, {
  compress: true,
  mangle: true
});

if (result.error) {
  throw result.error;
}
fs.writeFileSync(path.join(distDir, 'g.js'), result.code);
