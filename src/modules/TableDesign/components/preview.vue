<template>
  <div class="preview__wrap">
    <div class="action-bar"></div>
    <div class="preview">
      <el-tabs class="tabs-widget" v-model="activeName">
        <el-tab-pane label="用户管理" name="first">
          <div class="search-widget">
            <el-form
              size="medium"
              :inline="true"
              :model="formInline"
              class="search-form"
            >
              <el-form-item label="审批人">
                <el-input
                  v-model="formInline.user"
                  placeholder="审批人"
                ></el-input>
              </el-form-item>
              <el-form-item label="活动区域">
                <el-select v-model="formInline.region" placeholder="活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "preview",
  components: {},
  computed: {},
  data() {
    return {
      activeName: "first",
      formInline: {
        user: "",
        region: ""
      },
      dialogPreviewJson: false,
      dialogPreviewForm: false,
      dialogGetJson: false,
      getJson: {}
    };
  },
  methods: {}
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

.tabs-widget ::v-deep {
  background: #fff;
  // 刚好下级就是header，并且和content分开了的，不会污染content中tabs的样式
  > .el-tabs__header {
    margin: 0;
    .el-tabs__nav {
      padding: 0 20px;
    }
    .el-tabs__active-bar {
      left: 20px;
    }
    .el-tabs__nav-wrap::after {
      height: 1px;
    }
    .el-tabs__item {
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      height: 48px;
      line-height: 48px;
    }
  }
}
.search-widget {
  background: #ffffff;
  box-shadow: $box-shadow-main;
  padding: 16px 20px;
  .el-form-item {
    margin-bottom: 0;
  }
}

.preview {
  flex: 1;
  background: #eeeeee;
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
