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

/** 判断字符串的开头和结尾是否有空格，有空格就返回true，否则返回false */
export const judgeStringSpace = (value: string): boolean => {
  const reg1 = /^\s+/g; // 匹配开头空格
  const reg2 = /\s+$/g; // 匹配结尾空格
  if (reg1.test(value) || reg2.test(value)) {
    return true;
  }
  return false;
};

/**
 * 获取[min,max]之间的随机整数
 * 例如：[10,30],[-21,32],[-100,-20]
 */
export const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/** 获取随机字符串 */
export const randomString = (length: number): string => {
  const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let res = '';
  for (let i = 0; i < length; i += 1) {
    res += str.charAt(getRandomInt(0, str.length - 1));
  }
  return res;
};

/**
 * 时间戳转换成日期
 * 将new Date()或时间戳转换为："2020-10-01 12:24:03"
 * 不能传"2020-10-01",会转成"2020-10-01 08:00:00"
 */
export const formatTime = (v: string | number) => {
  const date = new Date(v);
  const y = date.getFullYear();
  let m: any = date.getMonth() + 1;
  m = m < 10 ? `0${m}` : m;
  let d: any = date.getDate();
  d = d < 10 ? `0${d}` : d;
  let h: any = date.getHours();
  h = h < 10 ? `0${h}` : h;
  let minute: any = date.getMinutes();
  let second: any = date.getSeconds();
  minute = minute < 10 ? `0${minute}` : minute;
  second = second < 10 ? `0${second}` : second;
  return `${y}-${m}-${d} ${h}:${minute}:${second}`;
};

/** 将内容复制到剪切板 */
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
