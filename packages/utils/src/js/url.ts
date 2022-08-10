/**
 * @description 获取地址栏参数（注意：请提前对url进行decodeURI或decodeURIComponent解码）
 * @return {*}
 */
export const getUrlParams = () => {
  const url = window.location.href;
  const str = url.split('?')[1];
  const obj: any = {};
  if (str) {
    const keys = str.split('&');
    keys.forEach((item) => {
      const arr = item.split('=');
      obj[arr[0]] = arr[1];
    });
  }
  return obj;
};
