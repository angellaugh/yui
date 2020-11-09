<template>
  <div class="assembly">
    <el-input
      class="searchBar"
      size="small"
      placeholder="搜索资源名称"
      v-model="searchText"
      clearable
    >
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>

    <div
      class="assembly-component_warp"
      v-for="(array, label) in filterComponentList"
      :key="label"
    >
      <h3 class="assembly-title">{{ labelDict[label] }}</h3>
      <draggable
        class="drag-list"
        :list="array"
        :group="{ name: 'formDesign', pull: 'clone', put: false }"
        :sort="false"
        :clone="formMoveClone"
        :move="handleMove"
      >
        <div
          class="drag-list-item"
          @click.stop="copyItemToFormListJson(item)"
          v-for="item in array"
          :key="item.type"
        >
          <i class="drag-list-item__icon iconfont" :class="item.icon"></i>
          <div class="drag-list-item__label">{{ item.options.label }}</div>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { componentList } from "@/components/form";
import { uuid, getName } from "@/utils/uuid.js";
// vuex
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("YUI_FormDesign");

export default {
  name: "assembly",
  components: {
    draggable
  },
  data() {
    return {
      searchText: "",
      labelDict: {
        base: "基础组件",
        container: "容器组件"
      },
      componentList
    };
  },

  props: {},
  computed: {
    filterComponentList() {
      const tempList = JSON.parse(JSON.stringify(componentList));
      for (let key in tempList) {
        const filterList = tempList[key].filter(_ =>
          _.options.label.includes(this.searchText)
        );
        filterList.length > 0 && key !== "modify"
          ? (tempList[key] = filterList)
          : delete tempList[key];
      }
      return tempList;
    }
  },

  methods: {
    ...mapActions(["pushItemToList"]),
    handleMove() {
      return true;
    },
    copyItemToFormListJson(item) {
      let data;
      if (item.group !== "container") {
        data = {
          ...JSON.parse(JSON.stringify(item.options)),
          uuid: uuid(),
          fieldName: getName(item.options.type)
        };
      } else {
        data = {
          ...JSON.parse(JSON.stringify(item.options)),
          uuid: uuid()
        };
      }
      this.pushItemToList(data);
    },

    formMoveClone(item) {
      if (item.group !== "container") {
        return {
          ...JSON.parse(JSON.stringify(item.options)),
          uuid: uuid(),
          fieldName: getName(item.options.type)
        };
      } else {
        return {
          ...JSON.parse(JSON.stringify(item.options)),
          uuid: uuid()
        };
      }
    }
  }
};
</script>

<style scoped lang="scss">
.assembly-component_warp {
  overflow-y: auto;
  @include hide-scrollbar;
}
.ghost {
  @include move-style;
}
.assembly {
  --assembly-width: 280px; // 组件库宽度
  display: flex;
  flex-direction: column;

  height: 100%;
  width: var(--assembly-width);
  background: #fff;
  border-right: $border-box;
  padding: 20px;
  box-sizing: border-box;
  color: $font-color-base;
  .assembly-title {
    margin-top: 10px;
    font-size: $font-size-base;
    user-select: none;
    &:first-of-type {
      margin-top: 20px;
    }
  }

  .drag-list {
    margin-top: 10px;
    @include flex-s-b(row, wrap);

    .drag-list-item {
      @include flex-c-c(row);
      justify-content: flex-start;
      height: 30px;
      margin-bottom: 10px;
      padding: 0 10px;
      box-sizing: border-box;
      font-size: $font-size-small;
      background: #fff;
      border: 1px solid $background-color-label;
      cursor: move;
      transition: color 0.2s;
      user-select: none;
      width: calc(
        var(--assembly-width) / 2 - 25px
      ); // assembly 的padding占了40px,间隙设置10px
      &:hover {
        border: $border-dashed-label;
        color: #409eff;
      }
      &.sortable-chosen {
        border: $border-dashed-label;
        color: #409eff;
      }
      .drag-list-item__icon {
        margin-right: 5px;
        font-size: 18px;
        vertical-align: auto;
      }

      .drag-list-item__label {
        @include line-overflow;
      }
    }
  }
}
</style>
