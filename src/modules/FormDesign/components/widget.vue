<template>
  <div
    class="drag-item"
    :class="
      curSelectItemUUID && curSelectItemUUID === config.uuid
        ? 'action'
        : getErrorInfo
        ? 'error'
        : ''
    "
    :data-err="getErrorInfo"
    @click.stop="
      () => {
        SetCurSelectItemUUID(config.uuid);
      }
    "
  >
    <co
      :is="`HirasawaYui_${config.type}`"
      :isPreview="true"
      :config="config"
      :value="config.value"
      :errFormListByNull="errFormListByNull"
      :errFormListByRepeat="errFormListByRepeat"
      @updateCurSelectItem="
        ite => {
          SetCurSelectItemUUID(ite.uuid);
        }
      "
      @handleDeleteItem="
        uuid => {
          handleDeleteItem(uuid);
        }
      "
    ></co>
    <div
      class="drag-item_action"
      v-show="curSelectItemUUID && curSelectItemUUID === config.uuid"
    >
      <div class="drag-move">
        <img src="~@/assets/image/move.png" alt="" />
      </div>
      <div
        class="item-delete"
        @click.stop="
          () => {
            handleDeleteItem(config.uuid);
          }
        "
      >
        <img src="~@/assets/image/delete.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
// vuex
import { createNamespacedHelpers } from "vuex";
const {
  mapState,
  mapMutations,
  mapGetters,
  mapActions
} = createNamespacedHelpers("YUI_FormDesign");
export default {
  name: "widget",
  props: {
    config: {
      type: Object,
      requied: true
    }
  },
  computed: {
    ...mapState(["curSelectItemUUID"]),
    ...mapGetters(["errFormListByRepeat", "errFormListByNull"]),
    getErrorInfo() {
      if (this.errFormListByNull.indexOf(this.config.uuid) > -1) {
        return "字段为空";
      } else if (this.errFormListByRepeat.indexOf(this.config.uuid) > -1) {
        return `${this.config.fieldName} 字段重复`;
      } else {
        return false;
      }
    }
  },
  methods: {
    ...mapMutations(["SetCurSelectItemUUID"]),
    ...mapActions(["handleDeleteItem"])
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.drag-item {
  border: $border-dashed-minor;
  background: $background-color-gery;
  padding: 3px;
  position: relative;
  margin: 1px 0;
  &:hover {
    border: $border-select-hover;
    background: $background-color-select;
  }
  &.action {
    border: $border-select-hover;
  }
  &.error {
    border: $border-error;
  }
  &::after {
    content: attr(data-err);
    position: absolute;
    z-index: 5;
    text-align: right;
    top: 3px;
    right: 3px;
    background: rgba(64, 158, 255, 0.01);
    font-size: $font-size-mini;
    color: $error-color;
  }
  &::before {
    content: " ";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 3;
  }
  .drag-item_action {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border: $border-select;

    box-sizing: border-box;
    .drag-move {
      cursor: move;
      height: 26px;
      width: 26px;
      z-index: 5;
      position: absolute;
      top: -2px;
      left: -2px;
      background: $font-color-select;
      > img {
        width: 20px;
        height: 20px;
      }
      @include flex-c-c;
    }
    .item-delete {
      height: 24px;
      width: 24px;
      cursor: pointer;
      z-index: 5;
      position: absolute;
      bottom: -2px;
      right: -2px;
      background: $font-color-select;
      > img {
        width: 18px;
        height: 18px;
      }
      @include flex-c-c;
    }
  }
}

.drag-item__move {
  height: inherit !important;
}
</style>
