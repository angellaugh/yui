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

    <div class="assembly-component_warp">
      <div
        class="assembly-components"
        v-for="item in filterComponentList"
        :key="item.label"
      >
        <h3 class="assembly-title">
          {{
            groupDict[item.label] && groupDict[item.label].name
              ? groupDict[item.label].name
              : item.label
          }}
        </h3>
        <draggable
          class="drag-list"
          :list="item.list"
          :group="{ name: 'formDesign', pull: 'clone', put: false }"
          :sort="false"
          :clone="formMoveClone"
          :move="handleMove"
        >
          <div
            class="drag-list-item"
            @click.stop="copyItemToFormListJson(ite)"
            v-for="ite in item.list"
            :key="ite.type"
          >
            <i class="drag-list-item__icon iconfont" :class="ite.icon"></i>
            <div class="drag-list-item__label">{{ ite.options.label }}</div>
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { componentList } from "@/components/form";
import { uuid, getName } from "@/utils/uuid.js";

import groupDict from "@/components/form/groupDict";
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
      groupDict,
      componentList
    };
  },

  props: {},
  computed: {
    filterComponentList() {
      const tempList = JSON.parse(JSON.stringify(componentList));
      let arr = [];
      for (let key in tempList) {
        const filterList = tempList[key].filter(_ =>
          _.options.label.includes(this.searchText)
        );
        filterList.length > 0 && key !== "modify"
          ? arr.push({
              label: key,
              list: filterList
            })
          : delete tempList[key];
      }
      arr.sort((x, y) => {
        const labelX = groupDict[x.label];
        const labelY = groupDict[y.label];
        if (!labelX || !labelY) {
          return false;
        }
        return labelX.index - labelY.index;
      });
      return arr;
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
  flex: 1;
  @include diy-scrollbar;
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
  padding: 15px;
  box-sizing: border-box;
  color: $font-color-base;
  .assembly-components {
    margin-top: 10px;
    &:first-of-type {
      margin-top: 20px;
    }
  }
  .assembly-title {
    font-size: $font-size-base;
    user-select: none;
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
      width: calc(100% / 2 - 5px); // assembly 的padding占了40px,间隙设置10px
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
