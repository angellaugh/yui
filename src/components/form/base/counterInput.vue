<template>
  <FormItemWrap :options="options">
    <el-input-number
      :style="options.style"
      v-bind="{
        disabled: true
      }"
      :step-strictly="options.attributes.includes('step-strictly')"
      :min="options.min"
      :max="options.max"
      :step="options.step"
      :controls-position="options['controls-position']"
      :value="value"
      :placeholder="options.placeholder"
      @input="changeValue"
    ></el-input-number>
  </FormItemWrap>
</template>

<script>
import mixin from "../mixin";
const type = "counterInput";
export default {
  name: type,
  enable: true,
  mixins: [mixin],
  data() {
    return {};
  },
  props: {
    value: {},
  },
  defaultConfig: {
    index: 2,
    icon: "icon-shuzishurukuang",
    label: "计数器",
    options: {
      type,
      value: 100,
      label: "计数器",
      labelWidth: {
        checked: false,
        width: 100
      },
      "controls-position": undefined,
      placeholder: "",
      max: 200,
      min: 0,
      step: 1,
      style: "",
      attributes: ["controls"],
      rules: []
    }
  },
  editConfig: {
    label: {
      type: "singleLineInput",
      label: "标签名称"
    },
    max: {
      type: "counterInput",
      label: "最大值",
      max: 500,
      min: -500
    },
    min: {
      type: "counterInput",
      label: "最小值",
      max: 500,
      min: -500
    },
    step: {
      type: "counterInput",
      label: "步长",
      max: 500,
      min: -500
    },
    value: {
      type: "counterInput",
      label: "默认值"
    },
    placeholder: {
      type: "singleLineInput",
      label: "占位文本"
    },
    labelWidth: {
      type: "labelWidthEdit"
    },
    attributes: {
      type: "checkboxGroup",
      label: "属性",
      options: {
        showLabel: true,
        isRemote: false,
        list: [
          { value: "disabled", label: "禁用" },
          { value: "controls", label: "显示控制按钮" },
          { value: "step-strictly", label: "限制输入为步长步数" }
        ]
      }
    },
    rules: {
      type: "rulseEditor",
      config: ["haveRequired"] //        haveRequired 必填, haveRegExp 正则, havePreinstall 预设
    },
    style: {
      type: "multiLineInput",
      label: "自定义样式"
    }
  }
};
</script>

<style scoped></style>
