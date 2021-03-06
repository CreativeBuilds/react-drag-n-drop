/**
 * Get components in siteComponents and converts it to a JSON based structure
 */
export default function getComponents() {
  let index = require('../../siteComponents/index').default;
  let obj = {};
  Object.keys(index).forEach(key => {
    console.log(obj, index, index[key]);
    obj[key] = index[key].options;
  });
  return obj;
}
