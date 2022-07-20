/** 删除对象中值为: null, undefined, NaN, ''的属性 */
/** 返回设备类型 */

var judgeDevice = function judgeDevice() {
  var ua = navigator.userAgent.toLowerCase();
  console.log(ua);
  var isAndroid = ua.indexOf('android') !== -1; // Android

  var isiOS = ua.indexOf('iphone os') !== -1; // iOS

  var isIpad = ua.indexOf('ipad') !== -1; // ipad

  return {
    isAndroid: isAndroid,
    isiOS: isiOS,
    isIpad: isIpad
  };
};

// import { judgeType } from './js';
console.log(judgeDevice);
