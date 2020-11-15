<template>
  <el-row
    :style="options.style"
    style="z-index: 4"
    :type="options.useFlex ? 'flex' : undefined"
    :justify="options.justify"
    :align="options.align"
    :gutter="options.gutter"
  >
    <el-col
      :key="index"
      v-for="(item, index) in options.container"
      :span="!options.useResponsive ? item.col : undefined"
      :xs="options.useResponsive ? item.xs : undefined"
      :sm="options.useResponsive ? item.sm : undefined"
      :md="options.useResponsive ? item.md : undefined"
      :lg="options.useResponsive ? item.lg : undefined"
      :xl="options.useResponsive ? item.xl : undefined"
    >
      <draggable
        v-if="isPreview"
        class="widget-col-list"
        :list="item.children"
        group="formDesign"
        ghostClass="ghost"
        handle=".drag-move"
      >
        <transition-group
          :style="item.children.length === 0 ? 'min-height:100px' : ''"
          class="warp-drag-item"
          name="fade"
          tag="div"
        >
          <widget
            :isPreview="true"
            :key="ite.uuid"
            v-for="ite in item.children"
            :config="ite"
          ></widget>
        </transition-group>
      </draggable>

      <template v-else>
        <template v-for="ite in item.children">
          <et
            :is="`HirasawaYui_${ite.type}`"
            :config="ite"
            v-model="formData[ite.fieldName]"
            :formData="formData"
            :key="ite.uuid"
          ></et>
        </template>
      </template>
    </el-col>
  </el-row>
</template>

<script>
import mixin from "../mixin";
import draggable from "vuedraggable";
import widget from "@/modules/FormDesign/components/widget";
const type = "gridLayout"; // 组件名称

export default {
  name: type,
  enable: true, // 启用否
  components: {
    draggable,
    widget
  },
  props: {
    formData: {
      type: Object,
      defalut() {
        return {};
      }
    }
  },
  mixins: [mixin],
  data() {
    return {};
  },

  defaultConfig: {
    // 组件配置json 将有组件目录index自动注册
    index: 0,
    icon: "icon-fenlan",
    label: "栅格", // 并非组件配置的label
    options: {
      type: type,
      label: "栅格", // 对应editConfig ，如果不存在 便不可编辑
      gutter: 0, // 间隔
      useFlex: true, // 使用flex布局
      useResponsive: false, // 使用响应式设计
      justify: "start",
      align: "top",
      container: [
        {
          col: 12,
          children: []
        },
        { col: 12, children: [] }
      ]
    }
  },
  editConfig: {
    gutter: {
      type: "counterInput",
      label: "栅格间隔"
    },
    useFlex: {
      type: "switchInput",
      label: "使用Flex布局"
    },
    useResponsive: {
      type: "switchInput",
      label: "使用响应式布局"
    },
    container: {
      type: "dynamicColEditor",
      options: {}
    },
    justify: {
      type: "selectInput",
      label: "水平排列方式",
      options: {
        showLabel: true,
        isRemote: false,
        list: [
          { value: "start", label: "开始位置" },
          { value: "end", label: "结束位置" },
          { value: "center", label: "水平居中" },
          { value: "space-between", label: "两端分布" },
          { value: "space-around", label: "两端分布但有两端有间隔" }
        ]
      }
    },
    align: {
      type: "selectInput",
      label: "垂直排列方式",
      options: {
        showLabel: true,
        isRemote: false,
        list: [
          { value: "top", label: "顶部" },
          { value: "middle", label: "水平居中" },
          { value: "bottom", label: "底部" }
        ]
      }
    }
  }
};
</script>

<style scoped lang="scss">
.widget-col-list {
  border: $border-dashed-minor;
  padding: 3px;
  position: relative;
  margin: 1px 0;
}
.warp-drag-item {
  height: 100%;
}
</style>
