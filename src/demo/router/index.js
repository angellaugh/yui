import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
      title: "首页"
    },
    component: () =>
      import(
        /* webpackChunkName: "home" */
        "../views/Home.vue"
      )
  },
  {
    path: "/doc",
    name: "Doc",
    meta: {
      title: "文档"
    },
    component: () =>
      import(
        /* webpackChunkName: "doc" */
        "../views/Doc.vue"
      )
  },
  {
    path: "/form-design",
    name: "FormDesign",
    meta: {
      title: "表单"
    },
    component: () =>
      import(
        /* webpackChunkName: "form-design" */
        "../views/FormDesign.vue"
      )
  },
  {
    path: "/table-design",
    name: "TableDesign",
    meta: {
      title: "表格"
    },
    component: () =>
      import(
        /* webpackChunkName: "table-design" */
        "../views/TableDesign.vue"
      )
  }
];

const router = new VueRouter({
  routes
});

export default router;
