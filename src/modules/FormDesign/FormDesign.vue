<template>
  <div id="app">
    <assembly></assembly>
    <preview ref="preview"></preview>
    <modify ref="modify"></modify>
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
} = createNamespacedHelpers("YUI_FormDesign");

export default {
  name: "FormDesign",
  components: {
    assembly,
    preview,
    modify
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["formList", "formConfig", "curSelectItem"]),
    ...mapGetters([]),
    ...mapActions(["handleDeleteItem", "clearData"])
  },
  methods: {
    save() {
      if (
        this.errFormListByNull.length > 0 ||
        this.errFormListByRepeat.length > 0
      ) {
        this.$message.error("表单数据错误，请修改红框内容后重新保存。");
      } else {
        this.$emit("save", {
          config: this.formConfig,
          list: this.formList
        });
      }
    },

    updateFormJsonItem(data) {
      const { key, value } = data;
      this.formJson[key] = value;
    },
    changeCurSelectItemChild(data) {
      const { key, value } = data;
      if (key === "value") {
        this.curSelectItem.value = value;
      } else {
        this.curSelectItem["options"] = {
          ...this.curSelectItem["options"],
          [key]: value
        };
      }
    }
  },
  mounted() {
    document.onkeydown = e => {
      switch (e.key) {
        case "Delete":
          this.curSelectItem &&
            !this.$refs["preview"].dialogPreviewForm &&
            !this.$refs["preview"].dialogPreviewJson &&
            this.handleDeleteItem(this.curSelectItem.uuid);
          break;
        default:
          break;
      }
    };
  },
  destroyed() {
    this.clearData();
    document.onkeydown = null;
  },
  beforeCreate() {
    try {
      if (!this.$store.state["YUI_FormDesign"]) {
        this.$store.registerModule("YUI_FormDesign", store); // 注入store
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
}
</style>
