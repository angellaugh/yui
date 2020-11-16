<template>
  <FormItemWrap :options="options">
    <draggable
      style="margin-top: 10px"
      :list="value"
      v-bind="{
        group: { name: 'options' },
        ghostClass: 'ghost',
        handle: '.drag-item'
      }"
    >
      <div class="dynamic-options" v-for="(item, index) in value" :key="index">
        <div class="dynamic-options_input" v-if="!curSelectItem.useResponsive">
          <el-input-number
            size="mini"
            controls-position="right"
            :max="24"
            :min="0"
            v-model="item.col"
            placeholder="栅格值"
          ></el-input-number>
        </div>
        <div v-else class="dynamic-options_input">
          <div style="display:inline-block">
            <span class="dynamic-options_input_label">xs:</span>
            <el-input-number
              size="mini"
              controls-position="right"
              :max="24"
              :min="0"
              v-model="item.xs"
              placeholder="xs"
            ></el-input-number>
          </div>

          <div style="display:inline-block">
            <span class="dynamic-options_input_label">sm:</span>
            <el-input-number
              size="mini"
              controls-position="right"
              :max="24"
              :min="0"
              v-model="item.sm"
              placeholder="sm"
            ></el-input-number>
          </div>
          <div style="display:inline-block">
            <span class="dynamic-options_input_label">md:</span>
            <el-input-number
              size="mini"
              controls-position="right"
              :max="24"
              :min="0"
              v-model="item.md"
              placeholder="md"
            ></el-input-number>
          </div>
          <div style="display:inline-block">
            <span class="dynamic-options_input_label">lg:</span>
            <el-input-number
              size="mini"
              controls-position="right"
              :max="24"
              :min="0"
              v-model="item.lg"
              placeholder="lg"
            ></el-input-number>
          </div>
          <div style="display:inline-block">
            <span class="dynamic-options_input_label">xl:</span>
            <el-input-number
              size="mini"
              controls-position="right"
              :max="24"
              :min="0"
              v-model="item.xl"
              placeholder="xl"
            ></el-input-number>
          </div>
        </div>

        <div class="drag-item"><i class="el-icon-rank "></i></div>
        <div style="display: inline-block">
          <el-button
            class="dynamic-options_item"
            @click="handleOptionsRemove(index)"
            circle
            plain
            type="danger"
            size="mini"
            icon="el-icon-minus"
          ></el-button>
        </div>
      </div>
    </draggable>
    <el-button
      @click="handleOptionsAdd"
      class="dynamic-options_add"
      type="text"
      size="small"
      >添加选项</el-button
    >
  </FormItemWrap>
</template>

<script>
// vuex
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("YUI_FormDesign");

import mixin from "../mixin";
import draggable from "vuedraggable";

const type = "dynamicColEditor"; // 组件名称

export default {
  name: type,
  enable: true,
  mixins: [mixin],
  components: { draggable },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["curSelectItem"])
  },
  watch: {
    "curSelectItem.useResponsive": function(_) {
      console.log(this.value);
      let list = [];
      if (_) {
        if (this.value.length > 0) {
          this.value.forEach(ele => {
            list.push({
              ...ele,
              xs: ele.col,
              sm: ele.col,
              md: ele.col,
              lg: ele.col,
              xl: ele.col
            });
          });
        } else {
          list.push({
            xs: 12,
            sm: 12,
            md: 12,
            lg: 12,
            xl: 12,
            children: []
          });
        }
      } else {
        if (this.value.length > 0) {
          this.value.forEach(ele => {
            list.push({ col: ele.lg, children: ele.children });
          });
        } else {
          list.push({ col: 12, children: [] });
        }
      }
      this.changeValue(list);
    }
  },
  props: {
    value: {}
  },
  defaultConfig: {
    index: 0,
    icon: "el-icon-edit",
    options: {
      type: type,
      label: "动态自定义编辑器", // 并非组件配置的label
      value: "" // 如果没有props 使用此值作为默认值
    }
  },
  editConfig: {},
  methods: {
    handleOptionsRemove(index) {
      let temp = JSON.parse(JSON.stringify(this.value));
      temp.splice(index, 1);
      this.$emit("input", temp);
    },
    handleOptionsAdd() {
      let temp = JSON.parse(JSON.stringify(this.value));
      temp.push({ col: 12, children: [] });
      this.$emit("input", temp);
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
@mixin inline-label {
  display: inline-block;
  line-height: 19px;
  font-size: 14px;
  color: rgb(96, 98, 102);
}
.label {
  @include inline-label;
}
.ghost {
  @include move-style();
}
.dynamic-options {
  border: $border-dashed-minor;
  padding: 2px 5px;
  margin-top: 5px;
  &:first-child {
    margin-top: 0;
  }
}
.dynamic-options_input {
  display: inline-block;
  width: 166px;
  vertical-align: top;
  .dynamic-options_input_label {
    width: 30px;
    @include inline-label();
  }
}
.drag-item {
  margin: 0 5px;
  font-size: 16px;
  color: $font-color-base;
  transition: color 0.2s;
  @include flex-c-c(row);
  display: inline-flex;
  &:hover {
    color: $font-color-select;
  }
}
.dynamic-options_add {
  margin-top: 5px;
}
.error-tip {
  font-size: $font-size-mini;
  color: red;
}
</style>
