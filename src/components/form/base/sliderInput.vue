<script>
const type = "sliderInput"; // 组件名称

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
    index: 9,
    icon: "icon-jindutiao",
    options: {
      value: null, // 如果没有props 使用此值作为默认值
      type: type,
      label: "滑块", // 对应editConfig ，如果不存在 便不可编辑
      className: "",
      labelOptions: {
        enable: true,
        diyWidth: false,
        width: 100
      },
      max: 100,
      min: 0,
      step: 1,
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
    min: {
      type: "counterInput",
      label: "最小输入",
      step: 1,
      attributes: ["controls", "step-strictly"]
    },
    step: {
      type: "counterInput",
      label: "步长",
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
          { value: "disabled", label: "禁用" },
          { value: "show-stops", label: "显示间断点" },
          { value: "range", label: "范围选择" },
          { value: "vertical", label: "竖排" },
          { value: "show-tooltip", label: "显示 tooltip" }
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
        <el-slider
          min={options.min}
          max={options.max}
          step={options.step}
          disabled={options.attributes.includes("disabled")}
          show-stops={options.attributes.includes("show-stops")}
          range={options.attributes.includes("range")}
          show-tooltip={options.attributes.includes("show-tooltip")}
          value={
            value < options.min
              ? options.min
              : value > options.max
              ? options.max
              : value
          }
          on-input={changeValue}
        ></el-slider>
      </FormItemWrap>
    );
  }
};
</script>

<style scoped></style>
