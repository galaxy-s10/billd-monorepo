/**
 * @description: 删除对象中值为: null, undefined, NaN, ''的属性
 * @param {any} obj
 * @return {*}
 */
export const deleteUseLessObjectKey = (obj: any) => {
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
 * @return {*} string
 * @example replaceKeyFromValue('Hello {name}',{name:'Word'}) => Hello Word
 */
export const replaceKeyFromValue = (str: string, obj: object) => {
  let res = str;
  Object.keys(obj).forEach((v) => {
    res = res.replace(new RegExp(`{${v}}`, 'ig'), obj[v]);
  });
  return res;
};

/**
 * @description: 判断数据类型
 * @return {*}
 */
export const judgeType = (
  obj: any
):
  | 'boolean'
  | 'number'
  | 'string'
  | 'function'
  | 'array'
  | 'date'
  | 'regExp'
  | 'undefined'
  | 'null'
  | 'object' => {
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
  return map[Object.prototype.toString.call(obj)];
};

/**
 * @description: myName转化为my-name（https://github.com/vueComponent/ant-design-vue/blob/HEAD/antd-tools/generator-types/src/utils.ts）
 * @param {string} input
 * @return {*}
 */
export const toKebabCase = (input: string): string =>
  input.replace(
    /[A-Z]/g,
    (val, index) => (index === 0 ? '' : '-') + val.toLowerCase()
  );

/**
 * @description: my-name转化为myName
 * @param {string} input
 * @return {*}
 */
export const toCamel = (input: string): string =>
  input.replace(/\-(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });

/**
 * @description: 使用json进行深克隆
 * @param {*} obj
 * @return {*}
 */
export const deepCloneByJson = <T>(obj: T): T =>
  JSON.parse(JSON.stringify(obj));

/**
 * @description: 手写深拷贝，解决循环引用
 * @param {*} object
 * @return {*}
 */
export const deepClone = <T>(object: T): T => {
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
  return clone(object, undefined);
};

/**
 * @description: 获取[min,max]之间的随机整数。如：[10,30],[-21,32],[-100,-20]
 * @param {number} min
 * @param {number} max
 * @return {*}
 */
export const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * @description: 随机数组的一个元素
 * @param {any} arr
 * @return {*}
 */
export const getRandomOne = (arr: any[]) =>
  arr[Math.floor(Math.random() * arr.length)];

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
