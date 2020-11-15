<script>
const type = "multiLineInput"; // 组件名称

export default {
  name: type,
  enable: true, // 启用否
  data() {
    return {};
  },

  defaultConfig: {
    index: 1,
    icon: "icon-duohangshurukuang",
    options: {
      type: type,
      label: "多行输入框", // 对应editConfig ，如果不存在 便不可编辑
      value: "",
      className: "",
      labelOptions: {
        enable: true,
        diyWidth: false,
        width: 100
      },
      placeholder: "",
      max: 300,
      rows: 2,
      attributes: [],
      rules: []
    }
  },
  editConfig: {
    max: {
      type: "counterInput",
      label: "最大可输入",
      max: 5000,
      min: 0
    },
    rows: {
      type: "counterInput",
      label: "输入框行数",
      max: 100,
      min: 1
    },
    label: {
      type: "singleLineInput",
      label: "标题",
      max: null
    },
    className: {
      type: "singleLineInput",
      label: "class名称"
    },
    labelOptions: {
      type: "labelOptionsEdit"
    },
    placeholder: {
      type: "singleLineInput",
      // 属性编辑器的配置,就是defalutConfig的data
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
          { value: "clearable", label: "清空按钮" },
          { value: "show-word-limit", label: "字数统计" }
        ]
      }
    },
    rules: {
      type: "rulseEditor",
      config: ["haveRequired", "havePreinstall"] //        haveRequired 必填, haveRegExp 正则, havePreinstall 预设
    }
  },
  render(h) {
    const { options, value, changeValue } = this;
    return (
      <FormItemWrap options={options}>
        <el-input
          type="textarea"
          disabled={options.attributes.includes("disabled")}
          readonly={options.attributes.includes("readonly")}
          show-password={options.attributes.includes("show-password")}
          clearable={options.attributes.includes("clearable")}
          show-word-limit={options.attributes.includes("show-word-limit")}
          rows={options.rows}
          value={value}
          maxlength={options.max}
          on-input={changeValue}
          placeholder={options.placeholder}
        ></el-input>
      </FormItemWrap>
    );
  }
};
</script>

<style scoped></style>
