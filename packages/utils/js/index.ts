/** 删除对象中值为: null, undefined, NaN, ''的属性 */
export const deleteNullObjectKey = (obj: any) => {
  Object.keys(obj).forEach((key) => {
    if ([null, undefined, NaN, ''].includes(obj[key])) {
      delete obj[key];
    }
  });
};

/**
 * @description: 替换占位符
 * @param {string} str
 * @param {object} obj
 * @example replaceKeyFromValue(`Hello {name}`,{name:'Word'})=>Hello Word
 * @return {*}
 */
export const replaceKeyFromValue = (str: string, obj: object) => {
  Object.keys(obj).forEach((v) => {
    // eslint-disable-next-line
    str = str.replace(new RegExp(`{${v}}`, 'ig'), obj[v]);
  });
  return str;
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
export const deepClone = <T>(val: T): T => {
  function clone(obj: any, hash: any) {
    const newobj: any = Array.isArray(obj) ? [] : {};
    // eslint-disable-next-line
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
  return clone(val, undefined);
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

/**
 * @description: 防抖函数（Promise）
 * @param {Function} fn 函数
 * @param {number} delay 延迟时间
 * @param {boolean} leading 首次立即执行
 * @return {Promise}
 */
export const debounce = (fn: Function, delay: number, leading = false) => {
  let timer;
  const debounceFn = function () {
    if (timer) {
      clearTimeout(timer);
    }
    // @ts-ignore
    const _this = this;
    const _arguments = arguments;
    return new Promise((resolve) => {
      if (leading) {
        let isFirst = false;
        if (!timer) {
          resolve(fn.apply(_this, _arguments));
          isFirst = true;
        }
        timer = setTimeout(() => {
          timer = null;
          if (!isFirst) {
            resolve(fn.apply(_this, _arguments));
          }
        }, delay);
      } else {
        timer = setTimeout(() => {
          resolve(fn.apply(_this, _arguments));
        }, delay);
      }
    });
  };

  debounceFn.cancel = function () {
    clearTimeout(timer);
    timer = null;
  };
  return debounceFn;
};

/**
 * @description: 节流函数（Promise）
 * @param {Function} fn 函数
 * @param {number} interval 间隔
 * @param {boolean} trailing 最后一次执行
 * @return {Promise}
 */
export const throttle = (fn: Function, interval: number, trailing = false) => {
  let lastTime = 0;
  let timer;
  return function () {
    // @ts-ignore
    const _this = this;
    const _arguments = arguments;
    const newTime = new Date().getTime();

    if (timer) {
      clearTimeout(timer);
    }

    let result;
    return new Promise((resolve) => {
      if (newTime - lastTime > interval) {
        result = fn.apply(_this, _arguments);
        resolve(result);

        lastTime = newTime;
      } else if (trailing) {
        timer = setTimeout(() => {
          result = fn.apply(_this, _arguments);
          resolve(result);
        }, interval);
      }
    });
  };
};
