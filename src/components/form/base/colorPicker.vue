<script>
const type = "colorPicker"; // 组件名称

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
    icon: "icon-kaiguan",
    options: {
      type: type,
      label: "颜色选择器", // 对应editConfig ，如果不存在 便不可编辑
      value: null, // 如果没有props 使用此值作为默认值
      labelOptions: {
        enable: true,
        diyWidth: false,
        width: 100
      },
      attributes: [],
      rules: []
    }
  },
  editConfig: {
    label: {
      type: "singleLineInput",
      // 属性编辑器的配置,就是defalutConfig的data
      label: "标题",
      max: null
    },
    labelOptions: {
      type: "labelOptionsEdit"
    },
    value: {
      // value 为组件value不是options里的，options不能使用该字段
      type: "colorPicker",
      label: "默认值"
    },
    attributes: {
      type: "checkboxGroup",
      label: "属性",
      options: {
        showLabel: true,
        isRemote: false,
        list: [
          { value: "disabled", label: "禁用" },
          { value: "show-alpha", label: "支持透明度" }
        ]
      }
    },
    rules: {
      type: "rulseEditor",
      config: ["haveRequired"] //        haveRequired 必填, haveRegExp 正则, havePreinstall 预设
    }
  },
  render(h) {
    const { options, value, changeValue } = this;
    return (
      <FormItemWrap options={options}>
        <el-color-picker
          value={value}
          show-alpha={options.attributes.includes("show-alpha")}
          disabled={options.attributes.includes("disabled")}
          on-input={changeValue}
        ></el-color-picker>
      </FormItemWrap>
    );
  }
};
</script>
