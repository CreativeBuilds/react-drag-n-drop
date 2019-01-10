// import rimraf from 'rimraf';

var fs = require('fs');
var path = require('path');
var deleteFolderRecursive = function(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file, index) {
      var curPath = path + '/' + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

export default function deleteComponent(token) {
  //   rimraf(__dirname + '../../siteComponents/' + token, err => {
  //     console.error(err);
  //     if (err) return alert(err);
  //     alert('Deleted component!');
  //   });
  console.log(path.join(__dirname, '/siteComponents', token), 'REMOVING');
  deleteFolderRecursive(path.join(__dirname, '/siteComponents', token));
}
