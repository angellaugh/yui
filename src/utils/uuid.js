/**
 * @name 随机生成4位字符串
 */
function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

/**
 * @name 创建uuid
 */
function uuid() {
  return `${S4()}${S4()}-${S4()}${S4()}-${S4()}${S4()}-${S4()}${S4()}`;
}
/**
 * @name 给组件一个随机后缀
 * @param {String} name
 */
function getName(name) {
  return `${name}_${S4()}`;
}

export { uuid, getName };
