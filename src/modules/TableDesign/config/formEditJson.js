export default {
  "label-width": {
    type: "counterInput",
    label: "表单标签宽度"
  },
  "label-position": {
    type: "radioGroup",
    label: "标签对齐方式",
    isButton: true,
    options: {
      showLabel: true,
      isRemote: false,
      list: [
        {
          value: "left",
          label: "左对齐"
        },
        {
          value: "right",
          label: "右对齐"
        },
        {
          value: "top",
          label: "顶部对齐"
        }
      ]
    }
  },
  size: {
    type: "radioGroup",
    label: "组件尺寸",
    isButton: true,
    options: {
      showLabel: false,
      isRemote: false,
      list: [
        {
          value: "mini"
        },
        {
          value: "small"
        },
        {
          value: "medium"
        }
      ]
    }
  },
  style: {
    type: "multiLineInput",
    label: "自定义样式"
  }
};
