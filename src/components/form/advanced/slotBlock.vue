<script>
const type = "slotBlock";
export default {
  name: type,
  enable: true,
  data() {
    return {};
  },

  defaultConfig: {
    index: 2,
    icon: "icon-shuzishurukuang",
    options: {
      type,
      value: 100,
      hasLabel: true,
      label: "插槽块",
      labelWidth: {
        checked: false,
        width: 100
      },
      slotName: "slotBlock"
    }
  },
  editConfig: {
    label: {
      type: "singleLineInput",
      label: "标签名称"
    },
    labelWidth: {
      type: "labelWidthEdit"
    },
    slotName: {
      type: "singleLineInput",
      label: "插槽名称"
    }
  },
  methods: {},
  mounted() {},
  render(h) {
    const { value, options, getSlot, changeValue } = this;
    const { slotName } = options;
    const slot = getSlot()[slotName];
    return <div>{slot ? slot(value, changeValue, options) : undefined}</div>;
  }
};
</script>
