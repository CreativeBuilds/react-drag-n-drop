/**
 * Get templates in templates and converts it to a JSON based structure
 */
export default function getTemplates() {
  let index = require('../../templates/index').default;
  let obj = {};
  Object.keys(index).forEach(key => {
    console.log(obj, index, index[key]);
    obj[key] = index[key].options;
  });
  return obj;
}
