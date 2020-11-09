import FormItemWrap from "./FormItemWrap.vue";
export default {
  data() {
    return {
      options: {}
    };
  },
  components: {
    FormItemWrap
  },
  computed: {
    /**
     * @name 判断是否有预制规则
     */
    preinstall() {
      if (this.options.rules) {
        return this.options.rules.find(_ => _.type === "preinstall");
      } else {
        return null;
      }
    }
  },
  props: {
    config: {
      type: Object,
      required: true
    },
    name: {
      type: String
    },
    isPreview: {
      type: Boolean,
      required: false
    }
  },
  watch: {
    config: {
      handler(_) {
        this.options = {
          ...this.$options.defaultConfig.options,
          ..._
        };
      },
      immediate: true
    }
  },
  model: {
    prop: "value",
    event: "change"
  },
  methods: {
    changeValue(_) {
      if (this.preinstall) {
        switch (this.preinstall.rule) {
          case "float":
          case "integer":
          case "number":
            if (_[_.length - 1] === ".") {
              // 笨办法排除输入小数点
              this.$emit("change", _);
            } else {
              this.$emit("change", Number(_) ? parseFloat(_) : _);
            }
            break;
          default:
            this.$emit("change", _);
            break;
        }
      } else {
        this.$emit("change", _);
      }
    }
  }
};
