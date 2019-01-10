// import rimraf from 'rimraf';

var fs = require('fs');
var path = require('path');
var deleteFolderRecursive = function(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file, index) {
      var curPath = path + '/' + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

export default function deleteComponent(token) {
  deleteFolderRecursive(path.join(__dirname, '/siteComponents', token));
}
