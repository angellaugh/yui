<script>
const type = "checkboxGroup"; // 组件名称

export default {
  name: type,
  enable: true, // 启用否
  data() {
    return {};
  },
  props: {
    value: {
      type: Array
    }
  },

  defaultConfig: {
    // 组件配置json 将有组件目录index自动注册
    index: 4,
    icon: "icon-duoxuan",
    options: {
      type: type,
      value: [], // 如果没有props 使用此值作为默认值
      label: "多选框组", // 对应editConfig ，如果不存在 便不可编辑
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
    isButton: {
      type: "radioGroup",
      label: "按钮样式",
      isButton: true,
      options: {
        showLabel: true,
        isRemote: false,
        list: [
          { value: false, label: "选框" },
          { value: true, label: "按钮" }
        ]
      }
    },
    rules: {
      type: "rulseEditor",
      config: ["haveRequired"]
    }
  },
  render(h) {
    const { options, tempOptions, value, changeValue } = this;
    return (
      <FormItemWrap options={options}>
        <el-checkbox-group value={value} on-input={changeValue}>
          {(options.options.isRemote ? tempOptions : options.options.list).map(
            item => (
              <el-checkbox
                key={item.value}
                label={item.value}
                is={options.isButton ? "el-checkbox-button" : "el-checkbox"}
              >
                {item.label ? item.label : item.value}
              </el-checkbox>
            )
          )}
        </el-checkbox-group>
      </FormItemWrap>
    );
  }
};
</script>

<style scoped></style>
