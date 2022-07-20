/**
 * @description: 获取dom元素的样式值，注意：如果获取的样式值没有显示的声明，
 * 会获取到它的默认值，比如position没有设置值，获取它的position就会返回static
 * @param {Element} ele
 * @param {*} styleName
 * @return {*}
 */
export const getStyle = (ele: Element, styleName: string) => {
  if (window.getComputedStyle) {
    return window.getComputedStyle(ele, null)[styleName];
  } else {
    // 兼容ie
    // @ts-ignore
    return ele.currentStyle[styleName];
  }
};

export const getStyle2 = (ele: Element, styleName: string) => {
  if (window.getComputedStyle) {
    return window.getComputedStyle(ele, null)[styleName];
  } else {
    // 兼容ie
    // @ts-ignore
    return ele.currentStyle[styleName];
  }
};
