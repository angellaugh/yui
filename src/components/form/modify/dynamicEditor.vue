<template>
  <el-form-item class="dynamicEditor" :label="options.label">
    <div style="margin-bottom: 5px">
      <span class="label">显示标签</span>
      <el-switch
        style="margin-left: 10px;"
        v-model="value.showLabel"
        @change="handleChangeShowLabel"
      ></el-switch>
    </div>

    <el-radio-group v-model="value.isRemote">
      <el-radio-button :label="false">静态数据</el-radio-button>
      <el-radio-button label="api">动态数据</el-radio-button>
      <el-radio-button label="dict">数据字典</el-radio-button>
    </el-radio-group>

    <div v-show="!value.isRemote">
      <draggable
        style="margin-top: 10px"
        :list="value.list"
        v-bind="{
          group: { name: 'options' },
          ghostClass: 'ghost',
          handle: '.drag-item'
        }"
        handle=".drag-item"
      >
        <li
          class="dynamic-options"
          v-for="(item, index) in value.list"
          :key="index"
        >
          <el-input
            class="dynamic-options_item"
            size="mini"
            v-model="item.value"
            placeholder="值"
          ></el-input>
          <el-input
            v-if="value.showLabel"
            class="dynamic-options_item"
            size="mini"
            v-model="item.label"
            placeholder="选项名称"
          ></el-input>
          <div class="drag-item">
            <i class="el-icon-rank"></i>
          </div>
          <div>
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
        </li>
      </draggable>
      <div v-if="errorTip" class="error-tip">值必须唯一</div>
      <el-button
        @click="handleOptionsAdd"
        class="dynamic-options_add"
        type="text"
        size="small"
        >添加选项</el-button
      >
    </div>

    <div style="margin-top:10px" v-show="value.isRemote === 'api'">
      <el-select
        style="width:100%"
        v-model="value.apiType"
        placeholder="请选择"
      >
        <el-option
          v-for="item in apiRequestType"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input
        style="margin-top:10px"
        type="textarea"
        :rows="3"
        placeholder="请输入url地址,如/admin/system/dictType/findPage"
        v-model="value.apiUrl"
      ></el-input>
      <!-- v-model="value.apiData" -->
      <el-input
        style="margin-top:10px"
        type="textarea"
        :rows="3"
        placeholder="请输入api请求参数,该参数将会被JSON.parse解析,如失败将不会携带"
        v-model="value.apiData"
      ></el-input>

      <el-input
        type="textarea"
        v-model="value.apiPath"
        style="margin-top:10px"
        placeholder="请输入api请求后数据路径,如result.list，如不输入将使用 result "
      ></el-input>

      <div v-if="!value.apiUrl" class="error-tip">ApiUrl不能为空</div>
    </div>

    <div style="margin-top:10px" v-show="value.isRemote === 'dict'">
      <el-select
        style="width:100%"
        filterable
        v-model="value.dictType"
        placeholder="请选择"
      >
        <el-option
          v-for="item in dictTypeArr"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
  </el-form-item>
</template>

<script>
import draggable from "vuedraggable";

const type = "dynamicEditor"; // 组件名称

export default {
  name: type,
  enable: true,
  components: { draggable },
  computed: {
    errorTip() {
      const list = this.value.list.map(_ => _.value);
      let hash = {};
      for (let i in list) {
        if (hash[list[i]]) {
          return true;
        }
        hash[list[i]] = true;
      }
      return false;
    }
  },
  data() {
    return {
      dictTypeArr: [],
      apiRequestType: [
        {
          value: "GET",
          name: "GET请求"
        },
        {
          value: "POST",
          name: "POST请求"
        }
      ]
    };
  },
  props: {
    value: {}
  },
  created() {},
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
    handleChangeShowLabel() {
      this.$emit("input", {
        ...this.value,
        list: this.value.list.map(_ => ({ value: _.value, label: "" }))
      });
    },
    handleOptionsRemove(index) {
      let temp = JSON.parse(JSON.stringify(this.value.list));
      temp.splice(index, 1);
      this.$emit("input", { ...this.value, list: temp });
    },
    handleOptionsAdd() {
      let temp = JSON.parse(JSON.stringify(this.value.list));
      temp.push({
        label: `Option ${temp.length + 1}`,
        value: `Option ${temp.length + 1}`
      });
      this.$emit("input", { ...this.value, list: temp });
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
.dynamicEditor {
  .ghost {
    @include move-style();
  }
  .dynamic-options {
    @include flex-s-b(row);
    margin-top: 5px;
    &:first-child {
      margin-top: 0;
    }
  }
  .dynamic-options_item {
  }
  .drag-item {
    margin: 0 5px;
    font-size: 16px;
    color: $font-color-base;
    transition: color 0.2s;
    @include flex-c-c;
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
}
</style>
