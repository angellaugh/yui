<template>
  <el-tabs class="modify " v-model="activeName" stretch>
    <el-tab-pane label="组件属性" name="one">
      <el-form
        class="modify-form"
        label-position="top"
        size="small"
        ref="itemform"
        v-if="curSelectItem"
      >
        <nameEdit
          v-if="curSelectItem.group !== 'container'"
          class="modify-item"
          is="HirasawaYui_singleLineInput"
          v-model="curSelectItem.fieldName"
          :config="{ label: '字段名称' }"
        >
        </nameEdit>
        <template
          v-for="(item, key) in componentEditList[
            `HirasawaYui_${curSelectItem.type}`
          ]"
        >
          <et
            v-if="componentNameList.indexOf(item.type) > -1"
            class="modify-item"
            :key="key"
            :is="`HirasawaYui_${item.type}`"
            :config="item"
            :value="curSelectItem[key]"
            @change="
              value => {
                ChangeCurSelectItemOption({ key, value });
              }
            "
          ></et>
          <div v-else :key="key" class="modify-item error">
            该属性编辑组件无效
          </div>
        </template>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="表单属性" name="two">
      <el-form
        :model="formConfig"
        class="modify-form"
        label-position="top"
        size="small"
        ref="form"
      >
        <template v-for="(item, key) in formEditJson">
          <et
            v-if="componentNameList.indexOf(item.type) > -1"
            class="modify-item"
            :key="key"
            :is="`HirasawaYui_${item.type}`"
            :config="item"
            :value="formConfig[key]"
            @change="
              value => {
                ChangeFormConfigItem({ key, value });
              }
            "
          ></et>
          <div v-else :key="key" class="modify-item error">
            该属性编辑组件无效
          </div>
        </template>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { componentEditList, componentNameList } from "@/components/form";
import formEditJson from "../config/formEditJson";
// vuex
import { createNamespacedHelpers } from "vuex";
const {
  mapState,
  mapMutations,
  mapGetters,
  mapActions
} = createNamespacedHelpers("YUI_FormDesign");

export default {
  name: "modify",
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "label"
      },
      activeName: "one",
      componentNameList,
      componentEditList,
      formEditJson
    };
  },
  props: {},
  computed: {
    ...mapState(["formConfig"]),
    ...mapGetters(["curSelectItem"])
  },
  methods: {
    ...mapMutations(["ChangeFormConfigItem", "ChangeCurSelectItemOption"])
  }
};
</script>

<style lang="scss" scoped>
.tips {
  font-size: $font-size-small;
  color: $font-color-label;
  padding: 20px 15px;
  border-bottom: $border-box;
}

.modify ::v-deep {
  --modify-width: 300px;
  width: var(--modify-width);
  height: 100%;
  border-left: $border-box;
  box-sizing: border-box;
  .el-tabs__header {
    margin: 0 !important;
  }
  .el-tabs__content {
    height: calc(100% - 40px);
    .el-tab-pane {
      height: 100%;
      overflow-y: auto;
      @include diy-scrollbar;
    }
  }
  .modify-item {
    padding: 20px;
    box-sizing: border-box;
    border-bottom: $border-box;
    &.error {
      color: red;
      font-size: $font-size-base;
    }
  }
  .el-form--label-top .el-form-item__label {
    padding-bottom: 2px;
  }
  .el-form-item--mini.el-form-item,
  .el-form-item--small.el-form-item {
    margin-bottom: 0;
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .modify-form {
  }
}
</style>
