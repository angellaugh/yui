<script>
const type = "rateInput"; // 组件名称

export default {
  name: type,
  enable: true, // 启用否
  data() {
    return {};
  },
  props: {
    value: {}
  },
  defaultConfig: {
    // 组件配置json 将有组件目录index自动注册
    index: 6,
    icon: "icon-caozuo-pingxingline",
    options: {
      type: type,
      value: 0, // 如果没有props 使用此值作为默认值
      label: "评分输入框", // 对应editConfig ，如果不存在 便不可编辑
      className: "",
      labelOptions: {
        enable: true,
        diyWidth: false,
        width: 100
      },
      max: 5,
      attributes: ["controls"],
      rules: []
    }
  },
  editConfig: {
    max: {
      type: "counterInput",
      label: "最大可输入",
      step: 1,
      attributes: ["controls", "step-strictly"]
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
    attributes: {
      type: "checkboxGroup",
      label: "属性",
      options: {
        showLabel: true,
        isRemote: false,
        list: [
          { value: "disabled", label: "只读" },
          { value: "show-score", label: "显示分数" },
          { value: "allow-half", label: "允许半星" }
        ]
      }
    },
    rules: {
      type: "rulseEditor",
      config: ["haveRequired"]
    }
  },
  render(h) {
    const { options, value, changeValue } = this;
    return (
      <FormItemWrap options={options}>
        <el-rate
          style="line-height: 2;"
          max={parseInt(options.max)}
          disabled={options.attributes.includes("disabled")}
          show-score={options.attributes.includes("show-score")}
          allow-half={options.attributes.includes("allow-half")}
          value={value}
          on-input={changeValue}
        ></el-rate>
      </FormItemWrap>
    );
  }
};
</script>

<style scoped></style>
