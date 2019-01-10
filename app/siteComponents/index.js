const path = require('path');
const fs = require('fs');
const normalizedPath = path.join(__dirname, 'siteComponents');
let obj = {};
fs.readdirSync(normalizedPath).forEach(file => {
  if (file !== 'index.js') {
    obj[file.replace('.js', '')] = require('./' + file + '/app.js');
  }
});
console.log(obj, 'REEEEEEEE');
export default obj;

// module.exports = {
//   app: require('./app/app'),
//   body: require('./body/app'),
//   test: require('./test/app'),
//   blah: require('./blah/app')
// };
