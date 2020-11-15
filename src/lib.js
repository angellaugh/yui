import { requireComponentFuc } from "./components/form";
import GenerateForm from "./modules/FormDesign/GenerateForm";
import GenerateFormItem from "./modules/FormDesign/GenerateFormItem";
import GeneratePage from "./modules/TableDesign/GeneratePage";
const install = function(Vue) {
  requireComponentFuc(Vue);
  // 注册Form
  Vue.component(GenerateForm.name, GenerateForm);
  Vue.component(GenerateFormItem.name, GenerateFormItem);
  // 注册Table
  Vue.component(GeneratePage.name, GeneratePage);
};

// 判断是否是直接引入文件
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install
};
