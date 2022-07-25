import _defineProperty from '@babel/runtime/helpers/defineProperty';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

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
