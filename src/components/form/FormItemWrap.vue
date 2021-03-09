<template>
  <el-form-item
    :class="
      `${options.className} ${
        formConfig['show-message'] ? '' : 'hide-error-message'
      }`
    "
    :label="
      options.labelOptions && options.labelOptions.enable
        ? options.label
        : undefined
    "
    :label-width="
      options.labelOptions && options.labelOptions.enable
        ? options.labelOptions && options.labelOptions.diyWidth
          ? `${options.labelOptions.width}px`
          : null
        : '0px'
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
  inject: {
    formConfig: {
      form: "formConfig"
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
            case "regexp":
              tempList.push({
                pattern: element.rule,
                message: element.msg
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
