<template>
  <el-form-item :label="options.label">
    <el-checkbox
      style=" display: block"
      :value="value.enable"
      @change="
        e => {
          $emit('input', { ...value, enable: e });
        }
      "
      >显示标题</el-checkbox
    >

    <el-checkbox
      v-if="value.enable"
      style="margin-right: 20px"
      :value="value.diyWidth"
      @change="
        e => {
          $emit('input', { ...value, diyWidth: e });
        }
      "
      >自定义</el-checkbox
    >
    <el-input-number
      v-if="value.enable"
      :value="value.width"
      @change="
        e => {
          $emit('input', { ...value, width: e });
        }
      "
      :disabled="!value.diyWidth"
      :min="options.min"
      :max="options.max"
      label="描述文字"
    ></el-input-number>
  </el-form-item>
</template>

<script>
import mixin from "../mixin";
const type = "labelOptionsEdit"; // 组件名称

export default {
  name: type,
  enable: true, // 启用否
  mixins: [mixin],
  data() {
    return {};
  },
  props: {
    value: {}
  },

  defaultConfig: {
    // 组件配置json 将有组件目录index自动注册
    index: 1,
    options: {
      type: type,
      value: {},
      label: "标题配置", // 对应editConfig ，如果不存在 便不可编辑
      min: 0,
      max: 300
    }
  },
  editConfig: {}
};
</script>

<style scoped></style>
