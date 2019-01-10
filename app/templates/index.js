const path = require('path');
const fs = require('fs');
const normalizedPath = path.join(__dirname, 'templates');
let obj = {};
fs.readdirSync(normalizedPath).forEach(file => {
  if (file !== 'index.js') {
    obj[file.replace('.js', '')] = require('./' + file + '/index.js');
  }
});

export default obj;
