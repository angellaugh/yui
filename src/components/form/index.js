// 自动化加载组件
// author: ekxs
// date: 2020年5月17日22点00分

// 组件

let inited = false;

let componentInstanceList = []; // 组件列表
let componentNameList = []; //用于判断组件是否存在
let componentList = {}; // 组件列表
let componentEditList = {}; // 组件编辑器数据列表

import mixin from "./mixin";

const regexp = new RegExp("(?<=/).*?(?=/)");
if (!inited) {
  inited = true;
  // 获取所有当前目录以及下级的所有vue文件
  const requireComponent = require.context("./", true, /\.(vue)$/);
  requireComponent.keys().forEach(fileName => {
    // 匹配文件夹，便于注册
    const groupReg = regexp.exec(fileName);
    if (!groupReg) return;

    const componentConfig = requireComponent(fileName);
    const ctrl = componentConfig.default || componentConfig;
    // 如果vue文件里没有enable属性便跳过
    if (!ctrl.enable) return;
    componentInstanceList.push({
      ...ctrl,
      mixins: ctrl.mixins ? [...ctrl.mixins, mixin] : [mixin]
    });
    !componentList[groupReg[0]] && (componentList[groupReg[0]] = []);
    componentList[groupReg[0]].push(ctrl.defaultConfig);
    componentNameList.push(ctrl.name);
    !componentEditList[`HirasawaYui_${ctrl.name}`]
      ? (componentEditList[`HirasawaYui_${ctrl.name}`] = ctrl.editConfig)
      : console.error(`组件 HirasawaYui_${ctrl.name} 重复，请修改`);
  });
  // 使用index 重新排序
  for (const key in componentList) {
    componentList[key].sort((x, y) => x.index - y.index);
  }
}

const requireComponentFuc = Vue => {
  componentInstanceList.forEach(ctrl => {
    Vue.component(`HirasawaYui_${ctrl.name}`, ctrl); // K-ON 的平泽唯的罗马音。用于防止业务中组件名称冲突
  });
};

export {
  componentEditList,
  componentNameList,
  componentList,
  requireComponentFuc
};
