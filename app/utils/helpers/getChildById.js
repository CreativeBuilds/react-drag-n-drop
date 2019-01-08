/**
 * @param id ID or path to element ex: body/header/logo
 * @param content content tree to find a child by
 *
 * @desc takes id and content tree and finds the object you're looking for
 *
 * obj[key1][key2][key3].children = {}
 */
export default function getChildById({ id, content }) {
  return new Promise((res, rej) => {
    let path = id.split('/');
    // This removes ["", ""] if the id is just "/" or ends/starts with a "/"
    if (path.length > 0) {
      if (!path[0].length) {
        path.shift();
      }
      if (!path[path.length - 1].length) {
        path.splice(-1, 1);
      }
    }
    let contentPath = content;
    let str = `contentPath`;
    for (let x = 0; x < path.length; x++) {
      str = str + `.children['${path[x]}']`;
    }
    //console.log('STR', str, contentPath);
    let element = eval(str);
    //console.log('CONTENT PATH', contentPath);
    res({ element, contentPath, path });
  });
}
