<template>
  <FormItemWrap :options="options">
    <el-input
      :disabled="options.attributes.includes('disabled')"
      :readonly="options.attributes.includes('readonly')"
      :show-password="options.attributes.includes('show-password')"
      :clearable="options.attributes.includes('clearable')"
      :show-word-limit="options.attributes.includes('show-word-limit')"
      :value="value"
      :maxlength="options.max"
      @input="changeValue"
      :placeholder="options.placeholder"
    ></el-input>
  </FormItemWrap>
</template>
<script>
const type = "singleLineInput"; // 组件名称
import mixin from "../mixin";
export default {
  name: type,
  enable: true, // 启用否
  mixins: [mixin],
  data() {
    return {};
  },
  props: {
    value: {}
  },
  methods: {},
  defaultConfig: {
    // 组件配置jso
    index: 0, // 排序
    icon: "icon-danhangshurukuang",
    options: {
      type: type, //组件名称
      value: "", //值
      label: "单行输入框", // 对应editConfig ，如果不存在 便不可编辑
      labelWidth: {
        checked: false,
        width: 100
      },
      placeholder: "",
      max: 50,
      style: "",
      attributes: [],
      rules: []
    }
  },
  editConfig: {
    // 编辑器配置
    max: {
      type: "counterInput",
      label: "最大可输入"
    },
    label: {
      type: "singleLineInput",
      label: "标题",
      max: null
    },
    labelWidth: {
      type: "labelWidthEdit"
    },
    placeholder: {
      type: "singleLineInput",
      label: "占位文本"
    },
    value: {
      // value 为组件value不是options里的，options不能使用该字段
      type: "singleLineInput",
      label: "默认文本"
    },
    attributes: {
      type: "checkboxGroup",
      label: "属性",
      options: {
        showLabel: true,
        isRemote: false,
        list: [
          { value: "disabled", label: "禁用" },
          { value: "readonly", label: "只读" },
          { value: "show-password", label: "密码" },
          { value: "clearable", label: "清空按钮" },
          { value: "show-word-limit", label: "字数统计" }
        ]
      }
    },
    rules: {
      type: "rulseEditor",
      config: ["haveRequired", "havePreinstall"] //        haveRequired 必填, haveRegExp 正则, havePreinstall 预设
    },
    style: {
      type: "multiLineInput",
      label: "自定义样式"
    }
  }
};
</script>

<style scoped></style>
