<script>
const type = "datePicker"; // 组件名称

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
      label: "日期选择器", // 对应editConfig ，如果不存在 便不可编辑
      selectType: "date",
      className: "",
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
      "value-format": "",
      rules: []
    }
  },
  editConfig: {
    selectType: {
      type: "selectInput",
      label: "类型",
      options: {
        showLabel: true,
        isRemote: false,
        list: [
          { value: "date", label: "日期" },
          { value: "week", label: "周" },
          { value: "month", label: "月" },
          { value: "year", label: "年" },
          { value: "dates", label: "多日期" },
          { value: "datetime", label: "日期时间" },
          { value: "datetimerange", label: "日期时间范围" },
          { value: "daterange", label: "日期范围" },
          { value: "monthrange", label: "月份范围" }
        ]
      }
    },
    label: {
      type: "singleLineInput",
      label: "标签名称"
    },
    className: {
      type: "singleLineInput",
      label: "class名称"
    },
    labelOptions: {
      type: "labelOptionsEdit"
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
    return (
      <FormItemWrap options={options}>
        <el-date-picker
          style="width:100%"
          disabled={options.attributes.includes("disabled")}
          readonly={options.attributes.includes("readonly")}
          editable={options.attributes.includes("editable")}
          clearable={options.attributes.includes("clearable")}
          value={value}
          on-input={changeValue}
          type={options.selectType}
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
        ></el-date-picker>
      </FormItemWrap>
    );
  }
};
</script>

<style scoped></style>
