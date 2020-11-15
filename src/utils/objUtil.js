/**
 * @name 让两个对象融合
 * @des 如果第二个对象有第一个对象的属性，替换第一个对象的属性值。
 * @param {object} o1
 * @param {object} o2
 */
function objectIntersection(o1, o2) {
  const obj1 = JSON.parse(JSON.stringify(o1));
  const obj2 = JSON.parse(JSON.stringify(o2));
  Object.keys(obj1).map(function(key) {
    obj2[key] && (obj1[key] = obj2[key]);
  });

  return obj1;
}
/**
 * @name 判断是否为对象
 * @param {*} item
 */
function isObject(item) {
  return Object.prototype.toString.call(item) === "[object Object]";
}

/**
 * @name 下划线转驼峰
 * @param {String} string
 */
function toHump(string) {
  return string.replace(/\_(\w)/g, function(all, letter) {
    return letter.toUpperCase();
  });
}

/**
 * @name 驼峰转下划线
 * @param {String} string
 */
function toLine(name) {
  return name.replace(/([A-Z])/g, "_$1").toLowerCase();
}

/**
 * @name 深拷贝
 * @param {obj} target
 */
function deepClone(target, map = new WeakMap()) {
  let cloneTarget;
  if (
    target !== null &&
    (typeof target === "object" || Array.isArray(target))
  ) {
    cloneTarget = Array.isArray(target) ? [] : {};
    const keys = Object.keys(target);
    if (map.has(target)) {
      return map.get(target);
    }
    for (let key of keys) {
      cloneTarget[key] = deepClone(target[key], map);
    }
    map.set(target, cloneTarget);
  } else {
    cloneTarget = target;
  }

  return cloneTarget;
}

export default {
  objectIntersection,
  isObject,
  toHump,
  toLine,
  deepClone
};
