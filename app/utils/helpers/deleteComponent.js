import fs from 'fs';

export default function deleteComponent(token) {
  return new Promise((res, rej) => {
    fs.readFile(
      __dirname + '../../siteComponents/index.js',
      'utf8',
      (err, data) => {
        if (err) return rej(err);
        let found = false,
          x = 0,
          arr = data.split('\n');

        for (x = 0; x < arr.length; x++) {
          if (arr[x].includes(`${token}:`)) {
            found = true;
            break;
          }
        }

        if (found) {
          // If x is 1 less than length (last line) edit the line before it to remove the ','
          if (x === arr.length - 1) {
            arr[x - 1] = arr[x - 1].replace(',', '');
          }
          arr.splice(x - 1, 1);
          let str = arr.join('\n');
          fs.writeFile(__dirname + '../../siteComponents/index.js');
        } else {
          return rej('No component found with that name!');
        }
      }
    );
  });
}
