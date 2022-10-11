/**
 * @description 删除对象中值为: null, undefined, NaN, ''的属性
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
 * @description 替换占位符
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
 * @description 判断数据类型
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
 * @description myName转化为my-name
 * @copy https://github.com/vueComponent/ant-design-vue/blob/HEAD/antd-tools/generator-types/src/utils.ts
 * @param {string} input
 * @return {*}
 */
export const toKebabCase = (input: string): string =>
  input.replace(
    /[A-Z]/g,
    (val, index) => (index === 0 ? '' : '-') + val.toLowerCase()
  );

/**
 * @description my-name转化为myName
 * @param {string} input
 * @return {*}
 */
export const toCamelCased = (input: string): string =>
  input.replace(/-(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });

/**
 * @description my-name转化为MyName
 * @param {string} input
 * @return {*}
 */
export const toPascalCase = (input: string): string => {
  input.replace(input[0], input[0].toUpperCase());
  return input.replace(/-(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
};

/**
 * @description 使用json进行深克隆
 * @param {*} obj
 * @return {*}
 */
export const deepCloneByJson = <T>(obj: T): T =>
  JSON.parse(JSON.stringify(obj));

/**
 * @description 手写深拷贝，解决循环引用
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
 * @description 防抖函数（Promise）
 * @param {Function} fn 函数
 * @param {number} delay 延迟时间
 * @param {boolean} leading 首次立即执行
 * @return {Promise}
 */
export const debounce = (fn: () => any, delay: number, leading = false) => {
  let timer;
  const debounceFn = function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    return new Promise((resolve) => {
      if (leading) {
        let isFirst = false;
        if (!timer) {
          // @ts-ignore
          resolve(fn.apply(this, args));
          isFirst = true;
        }
        timer = setTimeout(() => {
          timer = null;
          if (!isFirst) {
            // @ts-ignore
            resolve(fn.apply(this, args));
          }
        }, delay);
      } else {
        timer = setTimeout(() => {
          // @ts-ignore
          resolve(fn.apply(this, args));
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
 * @description 节流函数（Promise）
 * @param {Function} fn 函数
 * @param {number} interval 间隔
 * @param {boolean} trailing 最后一次执行
 * @return {Promise}
 */
export const throttle = (fn: () => any, interval: number, trailing = false) => {
  let lastTime = 0;
  let timer;
  return function (...args) {
    const newTime = new Date().getTime();
    if (timer) {
      clearTimeout(timer);
    }

    let result;
    return new Promise((resolve) => {
      if (newTime - lastTime > interval) {
        // @ts-ignore
        result = fn.apply(this, args);
        resolve(result);
        lastTime = newTime;
      } else if (trailing) {
        timer = setTimeout(() => {
          // @ts-ignore
          result = fn.apply(this, args);
          resolve(result);
        }, interval);
      }
    });
  };
};

/**
 * @description 生成uuid
 * @return {*}
 */
export const generateUuid = () => {
  const tempUrl = URL.createObjectURL(new Blob());
  const uuid = tempUrl.toString(); // blob:null/9d24f135-3e33-46b7-b51f-dc5b8121d60a
  URL.revokeObjectURL(tempUrl);
  return uuid.split('/')[1];
};
