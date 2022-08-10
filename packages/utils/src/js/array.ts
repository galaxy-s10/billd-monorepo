/**
 * @description 数组去重，缺点不能去除{}
 * @param {Array} arr
 * @return {*} 不修改原数组，返回新数组
 */
export const arrayUnique = (arr: Array<any>) => {
  return [...new Set(arr)];
};

/**
 * @description 洗牌算法
 * @param {Array} arr
 * @return {*} 不修改原数组，返回新数组
 */
export const arrayShuffle = (arr: Array<any>) => {
  const result = [...arr];
  for (let i = result.length - 1; i >= 0; i -= 1) {
    // 随机下标
    const randomIndex = Math.floor(Math.random() * (i + 1));
    // 随机下标的值
    const randomVal = result[randomIndex];
    // 互换位置
    result[randomIndex] = result[i];
    result[i] = randomVal;
  }
  return result;
};
