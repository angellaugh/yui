export default {
  useDialog: {
    type: "switchInput",
    label: "使用模态框"
  },
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
  "inline-message": {
    type: "switchInput",
    label: "行内显示校验结果"
  },
  "show-message": {
    type: "switchInput",
    label: "是否显示校验错误信息"
  },
  "status-icon": {
    type: "switchInput",
    label: "显示校验反馈图标"
  },
  className: {
    type: "singleLineInput",
    label: "class名称"
  },
  "label-suffix": {
    type: "singleLineInput",
    label: "标签的后缀"
  }
};
