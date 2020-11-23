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
      value: "",
      noField: true, // 没有字段
      label: "插槽块",
      labelOptions: {
        enable: true,
        diyWidth: false,
        width: 100
      },
      slotName: "slotBlock",
      className: ""
    }
  },
  editConfig: {
    label: {
      type: "singleLineInput",
      label: "标签名称"
    },
    labelOptions: {
      type: "labelOptionsEdit"
    },
    slotName: {
      type: "singleLineInput",
      label: "插槽名称"
    },
    className: {
      type: "singleLineInput",
      label: "class名称"
    }
  },
  methods: {},
  mounted() {},
  render(h) {
    const { value, options, getSlot, changeValue, isPreview } = this;
    const { slotName } = options;
    const slot = getSlot()[slotName];
    return (
      <FormItemWrap options={options}>
        {!isPreview ? (
          <div>{slot ? slot(value, changeValue, options) : undefined}</div>
        ) : (
          <div class="default-slot-class"></div>
        )}
      </FormItemWrap>
    );
  }
};
</script>

<style lang="scss" scoped>
.default-slot-class {
  width: 100%;
  height: 50px;
  background: #eeeeee;
}
</style>
