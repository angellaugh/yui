import { requireComponentFuc } from "./components/form";
import { GenerateForm, FormDesign } from "./modules/FormDesign";
import { GenerateTable, TableDesign } from "./modules/TableDesign";
const install = function(Vue) {
  requireComponentFuc(Vue);
  // 注册Form
  Vue.component(FormDesign.name, FormDesign);
  Vue.component(GenerateForm.name, GenerateForm);
  // 注册Table
  Vue.component(TableDesign.name, TableDesign);
  Vue.component(GenerateTable.name, GenerateForm);
};

// 判断是否是直接引入文件
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

import "@/assets/iconfont/iconfont.css";

export default {
  install
};
