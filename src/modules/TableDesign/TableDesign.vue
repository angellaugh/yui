<template>
  <div id="app">
    <div class="assembly"></div>
    <!-- <assembly></assembly> -->
    <preview ref="preview"></preview>
    <div class="modify"></div>
    <!-- <modify ref="modify"></modify> -->
  </div>
</template>
<script>
// components
import assembly from "./components/assembly";
import preview from "./components/preview";
import modify from "./components/modify";
// vuex
import store from "./store";
import { createNamespacedHelpers } from "vuex";
const {
  mapState,
  mapMutations,
  mapGetters,
  mapActions
} = createNamespacedHelpers("YUI_TableDesign");

export default {
  name: "TableDesign",
  components: {
    assembly,
    preview,
    modify
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {},
  destroyed() {},
  beforeCreate() {
    try {
      if (!this.$store.state["YUI_TableDesign"]) {
        this.$store.registerModule("YUI_TableDesign", store); // 注入store
      }
    } catch (e) {
      throw new Error("YUI 用到了vuex,请在项目中注册vuex");
    }
  }
};
</script>

<style scoped lang="scss">
#app {
  @include flex-s-b(row);
  height: 100%;
  .assembly {
    width: 300px;
    border-right: $border-box;
  }
  .modify {
    width: 300px;
    border-left: $border-box;
  }
}
</style>
