<script>
const type = "selectInput"; // 组件名称

export default {
  name: type,
  enable: true, // 启用否
  data() {
    return {};
  },

  defaultConfig: {
    // 组件配置json 将有组件目录index自动注册
    index: 5,
    icon: "icon-xiala",
    options: {
      type: type,
      value: "",
      label: "下拉选择器", // 对应editConfig ，如果不存在 便不可编辑
      className: "",
      labelOptions: {
        enable: true,
        diyWidth: false,
        width: 100
      },
      options: {
        showLabel: true,
        isRemote: false,
        apiUrl: "",
        apiType: "GET",
        apiData: "",
        apiPath: "",
        dictType: "",
        list: [
          { value: "Option 1", label: "Option 1" },
          { value: "Option 2", label: "Option 2" },
          { value: "Option 3", label: "Option 3" }
        ]
      },
      placeholder: "",
      attributes: [],
      rules: []
    }
  },
  editConfig: {
    options: {
      type: "dynamicEditor"
    },
    className: {
      type: "singleLineInput",
      label: "class名称"
    },
    labelOptions: {
      type: "labelOptionsEdit"
    },
    label: {
      type: "singleLineInput",
      // 属性编辑器的配置,就是defalutConfig的data
      label: "标题",
      max: null
    },
    placeholder: {
      type: "singleLineInput",
      // 属性编辑器的配置,就是defalutConfig的data
      label: "占位文本"
    },
    attributes: {
      type: "checkboxGroup",
      label: "属性",
      options: {
        showLabel: true,
        isRemote: false,
        list: [
          { value: "disabled", label: "禁用" },
          { value: "multiple", label: "多选" },
          { value: "filterable", label: "是否可搜索" },
          { value: "clearable", label: "清空按钮" }
        ]
      }
    },
    rules: {
      type: "rulseEditor",
      config: ["haveRequired"] //        haveRequired 必填, haveRegExp 正则, havePreinstall 预设
    }
  },
  render(h) {
    const { options, value, changeValue, tempOptions } = this;
    return (
      <FormItemWrap options={options}>
        <el-select
          style="width:100%"
          disabled={options.attributes.includes("disabled")}
          multiple={options.attributes.includes("multiple")}
          filterable={options.attributes.includes("filterable")}
          clearable={options.attributes.includes("clearable")}
          placeholder={options.placeholder}
          value={value}
          on-input={changeValue}
        >
          {(options.options.isRemote ? tempOptions : options.options.list).map(
            item => (
              <el-option
                key={item.value}
                label={item.label || item.value}
                value={item.value}
                value-key={item.value}
              ></el-option>
            )
          )}
        </el-select>
      </FormItemWrap>
    );
  }
};
</script>

<style scoped></style>
