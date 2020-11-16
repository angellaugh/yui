/**
 * @description 模块下拆分出来的公共函数集
 */

import storage from "@/utils/storage";

function uploadHistory(list) {
  let point = storage.ss.get("historyPointer") + 1;
  const max = storage.ss.get("historyMax");
  if (!point) {
    point = 1;
  }
  storage.ss.set(`history_${point}`, list);
  storage.ss.set("historyPointer", point);
  storage.ss.set("historyMax", point);
  setTimeout(() => {
    let len = point + 1;
    while (len <= max) {
      storage.ss.remove(`history_${len}`);
      len++;
    }
  }, 0);
}

function deleteItem(json, uuid) {
  json.forEach((item, index) => {
    if (item.uuid === uuid) {
      json.splice(index, 1)[0];
    }
    if (item.group === "container") {
      item.options.list.forEach(_ => {
        deleteItem(_.list, uuid);
      });
    }
  });
}

function getCurEditItem(json, uuid) {
  for (const element of json) {
    if (element.uuid === uuid) return element;

    if (element.container) {
      for (const con of element.container) {
        const result = getCurEditItem(con.children, uuid);
        if (result) return result;
      }
    }
  }
  return null;
}

function setCurEditItem(json, uuid, { key, value }) {
  for (const element of json) {
    if (element.uuid === uuid) {
      element[key] = value;
      return;
    }

    if (element.container) {
      for (const con of element.container) {
        setCurEditItem(con.children, uuid, {
          key,
          value
        });
      }
    }
  }
}
/**
 * @name 遍历组件所有UUID对应字段名
 * @param {Array} json
 */
function getUUIDList(json) {
  let temp = {};
  json.forEach(element => {
    if (element.container) {
      element.container.forEach(ite => {
        temp = {
          ...temp,
          ...getUUIDList(ite.children)
        };
      });
    } else {
      temp[element.uuid] = element.fieldName;
    }
  });
  return temp;
}

export default {
  uploadHistory,
  deleteItem,
  getCurEditItem,
  setCurEditItem,
  getUUIDList
};
