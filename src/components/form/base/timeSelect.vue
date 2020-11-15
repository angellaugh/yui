<script>
const type = "timeSelect"; // 组件名称

export default {
  name: type,
  enable: true, // 启用否
  data() {
    return {};
  },

  defaultConfig: {
    // 组件配置json 将有组件目录index自动注册
    index: 8,
    icon: "icon-riqi",
    options: {
      type: type,
      value: "",
      label: "固定时间选择器", // 对应editConfig ，如果不存在 便不可编辑
      labelOptions: {
        enable: true,
        diyWidth: false,
        width: 100
      },
      placeholder: "",
      attributes: [],
      "start-placeholder": "",
      "end-placeholder": "",
      "range-separator": "",
      "value-format": "HH:mm:ss",
      rules: [],
      "picker-options_start": null,
      "picker-options_end": null,
      "picker-options_step": null
    }
  },
  editConfig: {
    "picker-options_start": {
      type: "timePicker",
      label: "起始时间",
      "value-format": "HH:mm"
    },
    "picker-options_end": {
      type: "timePicker",
      label: "结束时间",
      "value-format": "HH:mm"
    },
    "picker-options_step": {
      type: "timePicker",
      label: "步长",
      "value-format": "HH:mm"
    },
    label: {
      type: "singleLineInput",
      label: "标签名称"
    },
    labelWidth: {
      type: "labelWidthEdit"
    },
    "value-format": {
      type: "singleLineInput",
      label: "数据格式化"
    },
    placeholder: {
      type: "singleLineInput",
      label: "占位文本",
      judge({ type }) {
        return !["datetimerange", "daterange", "monthrange"].includes(type);
      }
    },
    "start-placeholder": {
      type: "singleLineInput",
      label: "开始日期的占位内容",
      judge({ type }) {
        return ["datetimerange", "daterange", "monthrange"].includes(type);
      }
    },
    "end-placeholder": {
      type: "singleLineInput",
      label: "结束日期的占位内容",
      judge({ type }) {
        return ["datetimerange", "daterange", "monthrange"].includes(type);
      }
    },
    "range-separator": {
      type: "singleLineInput",
      label: "分隔符",
      max: 2,
      judge({ type }) {
        return ["datetimerange", "daterange", "monthrange"].includes(type);
      }
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
          { value: "editable", label: "文本框可输入" },
          { value: "clearable", label: "清空按钮" },
          { value: "unlink-panels", label: "范围选择器取消联动" }
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
    let tempOptions = {};
    options["picker-options_start"] &&
      (tempOptions["start"] = options["picker-options_start"]);
    options["picker-options_end"] &&
      (tempOptions["end"] = options["picker-options_end"]);
    options["picker-options_step"] &&
      (tempOptions["step"] = options["picker-options_step"]);

    return (
      <FormItemWrap options={options}>
        <el-time-select
          picker-options={tempOptions}
          disabled={options.attributes.includes("disabled")}
          readonly={options.attributes.includes("readonly")}
          editable={options.attributes.includes("editable")}
          clearable={options.attributes.includes("clearable")}
          value={value}
          on-input={changeValue}
          value-format={options["value-format"]}
          placeholder={options.placeholder}
          start-placeholder={
            options["start-placeholder"]
              ? options["start-placeholder"]
              : undefined
          }
          end-placeholder={
            options["end-placeholder"] ? options["end-placeholder"] : undefined
          }
          range-separator={
            options["range-separator"] ? options["range-separator"] : undefined
          }
        ></el-time-select>
      </FormItemWrap>
    );
  }
};
</script>

<style scoped></style>
