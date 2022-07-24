console.log([...[2, 34]]);
const a = { ...{ age: 1 } }; // 对象展开，会引入'@babel/runtime/helpers/esm/objectSpread2'
console.log(a);
/** 删除对象中值为: null, undefined, NaN, ''的属性 */
export const deleteNullObjectKey = (obj: any) => {
  Object.keys(obj).forEach((key) => {
    if ([null, undefined, NaN, ''].includes(obj[key])) {
      delete obj[key];
    }
  });
};
