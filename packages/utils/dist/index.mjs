import _objectSpread from '@babel/runtime/helpers/objectSpread2';

console.log([2, 34].concat());

var a = _objectSpread({}, {
  age: 1
}); // 对象展开，会引入'@babel/runtime/helpers/esm/objectSpread2'


console.log(a);
/** 删除对象中值为: null, undefined, NaN, ''的属性 */

var deleteNullObjectKey = function deleteNullObjectKey(obj) {
  Object.keys(obj).forEach(function (key) {
    if ([null, undefined, NaN, ''].includes(obj[key])) {
      delete obj[key];
    }
  });
};

export { deleteNullObjectKey };
