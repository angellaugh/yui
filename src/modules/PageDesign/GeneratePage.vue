<template>
  <el-form
    class="generateForm"
    :label-position="json.config['label-position']"
    :label-width="`${json.config['label-width']}px`"
    :label-suffix="`${json.config['label-suffix']}`"
    :class="json.config.className"
    :size="json.config.size"
    :model="formData"
    :disabled="disabled"
    :status-icon="json.config['status-icon']"
    :show-message="json.config['show-message']"
    :inline-message="json.config['inline-message']"
    ref="generateForm"
  >
    <template v-for="config in json.list">
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
</template>

<script>
import { componentNameList } from "@/components/form";
export default {
  name: "GeneratePage",
  data() {
    return {
      componentNameList,
      formData: {}
    };
  },
  provide() {
    return {
      getSlot: this.getSlot
    };
  },
  props: {
    json: {
      type: Object
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.initJson(true);
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
        } else {
          element.fieldName && (temp[element.fieldName] = element.value);
        }
      });
      return temp;
    },
    initJson(init) {
      this.formData = this.getNameList(this.json.list);
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
