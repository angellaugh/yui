<script>
import rulesDict from "../rulesConfig.js";

const type = "rulseEditor"; // 组件名称

export default {
  name: type,
  enable: true,
  computed: {
    requiredx() {
      return this.value.find(_ => _.type === "required");
    },
    preinstallx() {
      return this.value.find(_ => _.type === "preinstall");
    }
  },
  data() {
    return {
      a: null,
      opt: rulesDict
    };
  },
  props: {
    value: {}
  },
  defaultConfig: {
    type: type,
    index: 1,
    scope: "edit", // 可用范围 通用组件 common  表单组件 form  编辑器组件  edit  这个type在注册的时候分辨类型
    icon: "el-icon-edit",
    label: "校验", // 并非组件配置的label
    group: "advanced", // 基础组件 base 高级组件 advanced 容器组件 container
    value: "", // 如果没有props 使用此值作为默认值
    options: {
      label: "校验",
      config: ["haveRequired", "havePreinstall", "haveRegExp"]
    }
  },
  editConfig: {},
  methods: {
    inputValue(value, type, _ = "msg") {
      const index = this.value.findIndex(_ => _.type === type);
      this.value[index][_] = value;
      this.$forceUpdate();
    },
    changeChecked(value, type) {
      if (value) {
        let temp = this.value.find(_ => _.type === type);
        if (temp) {
          temp.value = value;
        } else {
          if (type === "preinstall") {
            this.value.push({ type: type, msg: "", rule: "number" });
          } else {
            this.value.push({ type: type, msg: "" });
          }
        }
      } else {
        let temp = this.value.findIndex(_ => _.type === type);
        this.value.splice(temp, 1);
      }
    },
    handleOptionsRemove(index) {
      let temp = JSON.parse(JSON.stringify(this.value.list));
      temp.splice(index, 1);
      this.$emit("change", { ...this.value, list: temp });
    },
    handleOptionsAdd() {
      let temp = JSON.parse(JSON.stringify(this.value.list));
      temp.push({
        label: `Option ${temp.length + 1}`,
        value: `Option ${temp.length + 1}`
      });
      this.$emit("change", { ...this.value, list: temp });
    }
  },
  mounted() {},
  render(h) {
    const {
      opt,
      options,
      requiredx,
      preinstallx,
      changeChecked,
      inputValue
    } = this;
    return (
      <el-form-item class="rulseEditor" size="mini" label={options.label}>
        {options.config.includes("haveRequired") && (
          <div class="rulse-box">
            <el-checkbox
              style="display:block"
              value={!!requiredx}
              on-input={value => changeChecked(value, "required")}
            >
              必填
            </el-checkbox>
            {!!requiredx && (
              <el-input
                style="margin-left:24px;margin-top:5px;width:calc( 100% - 24px );"
                value={requiredx.msg}
                on-input={value => inputValue(value, "required")}
                placeholder="请输入提示内容"
              ></el-input>
            )}
          </div>
        )}

        {options.config.includes("havePreinstall") && (
          <div class="rulse-box">
            <el-checkbox
              value={!!preinstallx}
              on-input={value => changeChecked(value, "preinstall")}
            ></el-checkbox>

            <el-select
              disabled={!preinstallx}
              style="margin-left:10px;"
              value={preinstallx ? preinstallx.rule : "number"}
              on-input={value => inputValue(value, "preinstall", "rule")}
              placeholder="请选择"
            >
              {opt.map(item => (
                <el-option
                  key={item.value}
                  label={item.label}
                  value={item.value}
                ></el-option>
              ))}
            </el-select>
            {!!preinstallx && (
              <el-input
                style="margin-left:24px;margin-top:5px;calc( 100% - 24px)"
                value={preinstallx.msg}
                on-input={value => inputValue(value, "preinstall")}
                placeholder="请输入提示内容"
              ></el-input>
            )}
          </div>
        )}
      </el-form-item>
    );
  }
};
</script>

<style scoped lang="scss">
.rulse-box + .rulse-box {
  margin-top: 10px;
}
</style>
