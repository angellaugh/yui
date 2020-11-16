<script>
const type = "radioGroup"; // 组件名称

export default {
  name: type,
  enable: true, // 启用否
  data() {
    return {};
  },
  props: {
    value: {}
  },
  methods: {},
  defaultConfig: {
    // 组件配置json 将有组件目录index自动注册
    index: 3,
    icon: "icon-danxuan",
    options: {
      type: type,
      value: "", // 如果没有props 使用此值作为默认值
      label: "单选框组", // 对应editConfig ，如果不存在 便不可编辑
      isButton: false,
      className: "",
      labelOptions: {
        enable: true,
        diyWidth: false,
        width: 100
      },
      options: {
        showLabel: true,
        isRemote: false,
        list: [
          { value: "Option 1", label: "Option 1" },
          { value: "Option 2", label: "Option 2" },
          { value: "Option 3", label: "Option 3" }
        ]
      },
      attributes: [],
      rules: []
    }
  },
  editConfig: {
    options: {
      type: "dynamicEditor"
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
    isButton: {
      type: "radioGroup",
      label: "按钮样式",
      isButton: true,
      options: {
        showLabel: true,
        isRemote: false,
        list: [
          { value: false, label: "圆点" },
          { value: true, label: "按钮" }
        ]
      }
    },
    attributes: {
      type: "checkboxGroup",
      label: "属性",
      options: {
        showLabel: true,
        isRemote: false,
        list: [{ value: "disabled", label: "禁用" }]
      }
    },
    rules: {
      type: "rulseEditor",
      config: ["haveRequired"]
    }
  },
  render(h) {
    const { value, options } = this;
    return (
      <FormItemWrap options={options}>
        <el-radio-group
          value={value}
          disabled={options.attributes.includes("disabled")}
          on-input={_ => {
            this.$emit("input", _);
          }}
        >
          {options.options.list.map(item => {
            return options.isButton ? (
              <el-radio-button key={item.value} label={item.value}>
                {options.options.showLabel ? item.label : item.value}
              </el-radio-button>
            ) : (
              <el-radio key={item.value} label={item.value}>
                {options.options.showLabel ? item.label : item.value}
              </el-radio>
            );
          })}
        </el-radio-group>
      </FormItemWrap>
    );
  }
};
</script>

<style scoped></style>
