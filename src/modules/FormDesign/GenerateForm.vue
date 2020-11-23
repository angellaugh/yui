<template>
  <temp
    :is="formJson.config.useDialog ? 'el-dialog' : 'div'"
    :visible="visible"
    v-bind="dialogOptions"
    v-loading="loading"
    @close="
      () => {
        $emit('closeDialog');
      }
    "
    append-to-body
  >
    <el-form
      class="generateForm"
      :label-position="formJson.config['label-position']"
      :label-width="`${formJson.config['label-width']}px`"
      :label-suffix="`${formJson.config['label-suffix']}`"
      :class="formJson.config.className"
      :size="formJson.config.size"
      :model="formData"
      :disabled="disabled"
      :status-icon="formJson.config['status-icon']"
      :show-message="formJson.config['show-message']"
      :inline-message="formJson.config['inline-message']"
      ref="ruleForm"
    >
      <template v-for="config in formJson.list">
        <template v-if="componentNameList.includes(config.type)">
          <et
            v-if="config.judge ? config.judge(formData) : true"
            :key="config.uuid"
            :is="`HirasawaYui_${config.type}`"
            :config="config"
            :formData="formData"
            v-model="formData[config.fieldName]"
          >
          </et>
        </template>

        <div v-else :key="config.uuid" class="form-item error">该组件无效</div>
      </template>
    </el-form>

    <span v-if="formJson.config.useDialog" slot="footer" class="dialog-footer">
      <slot name="dialog-footer">
        <el-button
          @click="
            () => {
              $emit('closeDialog');
            }
          "
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="
            () => {
              $emit('pushDialog');
            }
          "
          >确 定</el-button
        >
      </slot>
    </span>
  </temp>
</template>

<script>
import { componentNameList } from "@/components/form";
import objUtil from "@/utils/objUtil.js";
export default {
  name: "GenerateForm",
  data() {
    return {
      componentNameList,
      formData: {},
      formJson: { config: {}, list: [] }
    };
  },
  provide() {
    return {
      getSlot: this.getSlot,
      formConfig: this.formJson.config
    };
  },
  props: {
    json: {
      type: [String, Object],
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      required: false,
      default: false
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    "dialog-options": {
      type: Object,
      default() {
        return {
          title: "弹窗"
        };
      }
    }
  },
  watch: {
    json: {
      handler(data) {
        if (objUtil.isObject(data)) {
          this.formJson = JSON.parse(JSON.stringify(data));
        } else {
          try {
            this.formJson = JSON.parse(data);
          } catch {
            console.error("yui：JSON parse Error!");
          }
        }
      },
      immediate: true
    }
  },
  created() {
    this.initFormJson(true);
  },

  methods: {
    getSlot() {
      return this.$scopedSlots;
    },
    getNameList(json) {
      let temp = {};
      json.forEach(element => {
        if (element.container) {
          element.container.forEach(ite => {
            temp = { ...temp, ...this.getNameList(ite.children) };
          });
        }
        element.fieldName && (temp[element.fieldName] = element.value);
      });
      return temp;
    },
    initFormJson(init) {
      this.formData = this.getNameList(this.formJson.list);
      !init && this.$refs["ruleForm"].clearValidate();
    },
    getData() {
      return new Promise((resolve, reject) => {
        this.$refs["ruleForm"].validate(valid => {
          if (valid) {
            resolve(JSON.parse(JSON.stringify(this.formData)));
          } else {
            reject();
          }
        });
      });
    }
  }
};
</script>

<style scoped lang="scss"></style>
