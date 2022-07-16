/** 删除对象中值为: null, undefined, NaN, ''的属性 */
export const deleteNullObjectKey = (obj: any) => {
  Object.keys(obj).forEach((key) => {
    if ([null, undefined, NaN, ''].includes(obj[key])) {
      delete obj[key];
    }
  });
};

/**
 * 判断数据类型
 * https://github.com/iview/iview/blob/2.0/src/utils/assist.js
 */
export const judgeType = (obj: any): string => {
  const { toString } = Object.prototype;
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  };
  // @ts-ignore
  return map[toString.call(obj)];
};

/**
 * myName转化为my-name
 * https://github.com/vueComponent/ant-design-vue/blob/HEAD/antd-tools/generator-types/src/utils.ts
 */
export const toKebabCase = (input: string): string =>
  input.replace(
    /[A-Z]/g,
    (val, index) => (index === 0 ? '' : '-') + val.toLowerCase()
  );

/**
 * 获取滚动条宽度
 * https://github.com/iview/iview/blob/2.0/src/utils/assist.js
 */
export const getScrollBarSize = () => {
  const inner = document.createElement('div');
  inner.style.width = '100%';
  inner.style.height = '200px';

  const outer = document.createElement('div');
  const outerStyle = outer.style;

  outerStyle.position = 'absolute';
  outerStyle.top = '0px';
  outerStyle.left = '0px';
  outerStyle.pointerEvents = 'none';
  outerStyle.visibility = 'hidden';
  outerStyle.width = '200px';
  outerStyle.height = '150px';
  outerStyle.overflow = 'hidden';
  console.log(outerStyle.top);

  outer.appendChild(inner);

  document.body.appendChild(outer);

  const widthContained = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  let widthScroll = inner.offsetWidth;

  if (widthContained === widthScroll) {
    widthScroll = outer.clientWidth;
  }

  document.body.removeChild(outer);

  return widthContained - widthScroll;
};

/** 使用json进行深克隆  */
export const deepCloneByJson = <T>(obj: T): T =>
  JSON.parse(JSON.stringify(obj));

/** 手写深拷贝，解决循环引用 */
export const deepClone = <T>(obj: T): T => {
  function clone(obj: any, hash: WeakMap<object, any> | undefined) {
    const newobj: any = Array.isArray(obj) ? [] : {};
    hash = hash || new WeakMap();
    if (hash.has(obj)) {
      return hash.get(obj);
    }
    hash.set(obj, newobj);

    Object.keys(obj).forEach((i) => {
      if (obj[i] instanceof Object) {
        newobj[i] = clone(obj[i], hash);
      } else {
        newobj[i] = obj[i];
      }
    });
    return newobj;
  }
  return clone(obj, undefined);
};

/**
 * @description:  * 获取[min,max]之间的随机整数。如：[10,30],[-21,32],[-100,-20]
 * @param {number} min
 * @param {number} max
 * @return {*}
 */
export const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * @description: 获取随机字符串
 * @param {number} length
 * @return {*}
 */
export const getRandomString = (length: number): string => {
  const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let res = '';
  for (let i = 0; i < length; i += 1) {
    res += str.charAt(getRandomInt(0, str.length - 1));
  }
  return res;
};

/**
 * @description: 将内容复制到剪切板
 * @param {string} text
 * @return {*}
 */
export const copyToClipBoard = (text: string): void => {
  const oInput = document.createElement('input');
  oInput.value = text;
  document.body.appendChild(oInput);
  oInput.select(); // 选择对象
  document.execCommand('Copy'); // 执行浏览器复制命令
  oInput.parentElement?.removeChild(oInput);
};

/** 返回设备类型 */
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

/** 判断是否是浏览器环境 */
export const isBrowser = (): boolean =>
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined';
