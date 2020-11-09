import { requireComponentFuc } from "./components/form";
import GenerateForm from "./modules/FormDesign/GenerateForm";
import GenerateTable from "./modules/TableDesign/GenerateTable";
const install = function(Vue) {
  requireComponentFuc(Vue);
  // 注册Form
  Vue.component(GenerateForm.name, GenerateForm);
  // 注册Table
  Vue.component(GenerateTable.name, GenerateForm);
};

// 判断是否是直接引入文件
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install
};
