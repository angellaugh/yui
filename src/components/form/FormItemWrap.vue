<template>
  <el-form-item
    :style="options.style"
    :label="options.label"
    :label-width="
      options.labelWidth.checked ? `${options.labelWidth.width}px` : null
    "
    :rules="rules"
    :prop="options.fieldName"
  >
    <slot />
  </el-form-item>
</template>

<script>
import rulesDict from "./rulesConfig.js";
export default {
  name: "FormItemWrap",
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  computed: {
    rules() {
      let tempList = [];
      if (this.options.rules) {
        this.options.rules.forEach(element => {
          switch (element.type) {
            case "required":
              tempList.push({
                required: true,
                message: element.msg ? element.msg : "该字段必填"
              });
              break;
            case "preinstall":
              tempList.push({
                required: false,
                type: element.rule,
                message: element.msg
                  ? element.msg
                  : `该字段必须为${
                      rulesDict.find(_ => _.value === element.rule).label
                    }`
              });
              break;
            default:
              break;
          }
        });
      }
      return tempList;
    }
  }
};
</script>

<style></style>
