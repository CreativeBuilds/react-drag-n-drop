import getChildByID from './getChildById.js';
import uuidv4 from 'uuid/v4';

/**
 * @desc takes id and content tree and finds the object you're looking for and replaces it with replacement
 */
//console.log(getChildByID);
export default function addChildToTree({ id, children, child }) {
  // Uses Object.assign to replace keys

  return getChildByID({ id, content: children }).then(info => {
    let { element, contentPath, path } = info;
    let parent = element;
    let tree = contentPath;
    let keys = path;
    //console.log(parent, tree, keys, 'start');
    if (!parent.children) parent.children = {};
    let id = uuidv4();
    let copy = Object.assign({}, child);
    copy.id = id;
    parent.children[id] = copy;
    //console.log(parent, tree, keys, 'end');
    return tree;
  });
}
