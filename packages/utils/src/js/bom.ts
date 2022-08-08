/**
 * @description: 判断设备类型
 * @return {*}
 */
export const judgeDevice = () => {
  const ua = navigator.userAgent.toLowerCase();
  console.log(ua);
  const isAndroid = ua.indexOf('android') !== -1; // Android
  const isIOS = ua.indexOf('iphone os') !== -1; // iOS
  const isIpad = ua.indexOf('ipad') !== -1; // ipad
  return {
    isAndroid,
    isIOS,
    isIpad,
  };
};

/**
 * @description: 判断是否是浏览器环境
 * @param {*} boolean
 * @return {*}
 */
export const isBrowser = () =>
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined';

/**
 * @description: 判断是否是Safari浏览器
 * @return {*}
 */
export const isSafari = () => {
  return (
    /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
  );
};

/**
 * @description: 判断是否是ie浏览器
 * @return {*}
 */
export const isIe = () => {
  return (
    navigator.userAgent.indexOf('MSIE') !== -1 ||
    navigator.userAgent.indexOf('Trident') !== -1
  );
};
/**
 * @description: 判断是否是Firefox浏览器
 * @return {*}
 */
export const isFirefox = () => {
  return navigator.userAgent.indexOf('Firefox') !== -1;
};

/**
 * @description: 判断是否是支持webp
 * @return {*}
 */
export const isSupportWebp = () => {
  return (
    document
      .createElement('canvas')
      .toDataURL('image/webp')
      .indexOf('data:image/webp') === 0
  );
};
