import { requireComponentFuc } from "./components/form";
import GenerateForm from "./modules/FormDesign/GenerateForm";
import FormDesign from "./modules/FormDesign/FormDesign";

import PageDesign from "./modules/PageDesign/PageDesign";
const install = function(Vue) {
  requireComponentFuc(Vue);
  // 注册Form
  Vue.component(FormDesign.name, FormDesign);
  Vue.component(GenerateForm.name, GenerateForm);
  // 注册Page
  Vue.component(PageDesign.name, PageDesign);
};

// 判断是否是直接引入文件
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

import "@/assets/iconfont/iconfont.css";

export default {
  install
};
