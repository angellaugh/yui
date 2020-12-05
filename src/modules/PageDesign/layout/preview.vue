<template>
  <div class="preview__wrap">
    <div class="action-bar">
      <el-button @click="backAction" icon="el-icon-back" type="info" size="mini"
        >撤销</el-button
      >
      <el-button
        @click="redoAction"
        icon="el-icon-right"
        type="info"
        size="mini"
        >重做</el-button
      >
      <el-button type="primary" @click="generateHtml" size="mini"
        >生成代码</el-button
      >

      <el-button
        type="success"
        @click="dialogPreviewJson = !dialogPreviewJson"
        size="mini"
        >JSON</el-button
      >
      <el-button
        type="info"
        style="background: rgba(40, 173, 204, 0.9);border-color: rgba(40, 173, 204, 0.9)"
        @click="handlePreviewForm"
        size="mini"
        >预览</el-button
      >
      <el-button type="danger" @click="clearData()" size="mini">清空</el-button>
    </div>
    <div class="preview">
      <el-form
        class="preview-form"
        ref="form"
        :label-width="`${String(formConfig['label-width'])}px`"
        :size="formConfig['size']"
        :class="formConfig.className"
        :label-position="formConfig['label-position']"
        :label-suffix="`${formConfig['label-suffix']}`"
        :status-icon="formConfig['status-icon']"
        :show-message="formConfig['show-message']"
        :inline-message="formConfig['inline-message']"
      >
        <draggable
          class="drag-area"
          :list="formList"
          group="formDesign"
          ghostClass="ghost"
          :animation="200"
          handle=".drag-move"
        >
          <transition-group class="warp-drag-item" name="fade" tag="div">
            <widget
              :key="item.uuid"
              v-for="item in formList"
              :config="item"
            ></widget>
          </transition-group>
        </draggable>
      </el-form>
    </div>

    <el-dialog
      append-to-body
      title="JSON预览"
      :visible.sync="dialogPreviewJson"
    >
      <el-tabs>
        <el-tab-pane label="完整">
          <json-viewer
            boxed
            copyable
            :expand-depth="3"
            :value="{ config: formConfig, list: formList }"
          ></json-viewer
        ></el-tab-pane>
        <el-tab-pane label="选择项" v-if="curSelectItem">
          <json-viewer
            boxed
            copyable
            :expand-depth="3"
            :value="curSelectItem"
          ></json-viewer>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

    <el-dialog append-to-body title="JSON预览" :visible.sync="dialogGetJson">
      <json-viewer
        boxed
        copyable
        :expand-depth="3"
        :value="getJson"
      ></json-viewer>
    </el-dialog>

    <el-dialog
      append-to-body
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      title="表单生成预览"
      :visible.sync="dialogPreviewForm"
    >
      <GenerateForm
        v-if="dialogPreviewForm"
        ref="generateForm"
        :json="{ config: formConfig, list: formList }"
      >
      </GenerateForm>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClickResetForm">重置表单</el-button>
        <el-button type="primary" @click="handleClickPush"
          >获取填写数据</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
// compoennt
import draggable from "vuedraggable";
import JsonViewer from "vue-json-viewer";
import widget from "../components/widget";
// vuex
import { createNamespacedHelpers } from "vuex";
const { mapState, mapGetters, mapActions } = createNamespacedHelpers(
  "YUI_FormDesign"
);
export default {
  name: "preview",
  components: {
    draggable,
    JsonViewer,
    widget
  },
  computed: {
    ...mapState(["formList", "formConfig"]),
    ...mapGetters(["curSelectItem", "errFormListByRepeat", "errFormListByNull"])
  },
  data() {
    return {
      dialogPreviewJson: false,
      dialogPreviewForm: false,
      dialogGetJson: false,
      getJson: {}
    };
  },
  methods: {
    ...mapActions(["clearData", "backAction", "redoAction"]),
    generateHtml() {},
    handlePreviewForm() {
      if (
        this.errFormListByNull.length > 0 ||
        this.errFormListByRepeat.length > 0
      ) {
        this.$message.error("表单数据错误，请修改红框内容后重新点击预览。");
      } else {
        this.dialogPreviewForm = !this.dialogPreviewForm;
      }
    },
    handleClickResetForm() {
      this.$refs["generateForm"].initJson();
    },
    handleClickPush() {
      this.$refs["generateForm"].getData().then(_ => {
        this.dialogGetJson = true;
        this.getJson = _;
      });
    },
  }
};
</script>

<style scoped lang="scss">
.preview ::v-deep {
  .w-e-menu {
    z-index: 1 !important;
  }
  .w-e-text-container {
    z-index: 1 !important;
  }
  .el-slider__button-wrapper {
    z-index: 1 !important;
  }
  .disabled-enter-active,
  .disabled-leave-active {
    transition: none !important;
  }
}

.warp-drag-item {
  flex: 1;
}
.preview__wrap {
  --action-bar-height: 39px; //操作栏高度;
  height: 100%;
  position: relative;
  flex: 1;
  background: #fff;
  @include flex-col;
}

.action-bar {
  height: var(--action-bar-height);
  border-bottom: $border-box;
  text-align: right;
  padding-right: 20px;
  flex-shrink: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.preview {
  flex: 1;
  background: #fff;
  box-sizing: border-box;
  padding: 10px;
  overflow-y: auto;
  //@include hide-scrollbar;
  .preview-form {
    height: 100%;
  }

  .drag-area {
    display: flex;
    border: $border-dashed-base;
    background: #fff;
    padding: 5px;
    box-sizing: border-box;
    min-height: 100%;
    margin-bottom: 10px;
    .ghost {
      @include move-style();
    }
  }
}
</style>
