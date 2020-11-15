<script>
const type = "switchInput"; // 组件名称

export default {
  name: type,
  enable: true, // 启用否
  data() {
    return {};
  },

  defaultConfig: {
    // 组件配置json 将有组件目录index自动注册
    index: 6,
    icon: "icon-kaiguan",
    options: {
      type: type,
      value: 0, // 如果没有props 使用此值作为默认值
      label: "开关", // 对应editConfig ，如果不存在 便不可编辑
      className: "",
      labelOptions: {
        enable: true,
        diyWidth: false,
        width: 100
      },
      attributes: [],
      rules: [],
      "active-value": true,
      "inactive-value": false
    }
  },
  editConfig: {
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
      type: "labelOptionsEdit",
      options: {}
    },
    value: {
      // value 为组件value不是options里的，options不能使用该字段
      type: "switchInput",
      label: "默认值"
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
      config: ["haveRequired"] //        haveRequired 必填, haveRegExp 正则, havePreinstall 预设
    }
  },
  render(h) {
    const { options, value, changeValue } = this;
    return (
      <FormItemWrap options={options}>
        <el-switch
          style={options.style}
          active-value={options["active-value"]}
          inactive-value={options["inactive-value"]}
          value={value}
          disabled={options.attributes.includes("disabled")}
          on-input={changeValue}
        ></el-switch>
      </FormItemWrap>
    );
  }
};
</script>

<style scoped></style>
