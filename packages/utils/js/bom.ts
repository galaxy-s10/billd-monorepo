/**
 * @description: 判断设备类型
 * @return {*}
 */
export const judgeDevice = () => {
  const ua = navigator.userAgent.toLowerCase();
  console.log(ua);
  const isAndroid = ua.indexOf('android') !== -1; // Android
  const isiOS = ua.indexOf('iphone os') !== -1; // iOS
  const isIpad = ua.indexOf('ipad') !== -1; // ipad
  return {
    isAndroid,
    isiOS,
    isIpad,
  };
};

/**
 * @description: 判断是否是浏览器环境
 * @param {*} boolean
 * @return {*}
 */
export const isBrowser = (): boolean =>
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined';
