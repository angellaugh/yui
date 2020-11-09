<template>
  <el-form
    :style="json.config.style"
    class="generateForm"
    :label-position="json.config['label-position']"
    :label-width="`${json.config['label-width']}px`"
    :size="json.config.size"
    :model="formData"
    :disabled="disabled"
    ref="ruleForm"
  >
    <template v-for="item in json.list">
      <et
        v-if="componentNameList.indexOf(item.type) > -1"
        :key="item.uuid"
        :is="`HirasawaYui_${item.type}`"
        :config="item"
        :formData="formData"
        v-model="formData[item.fieldName]"
      ></et>
      <div v-else :key="item.uuid" class="form-item error">该组件无效</div>
    </template>
  </el-form>
</template>

<script>
import { componentList, componentNameList } from "@/components/form";
export default {
  name: "GenerateTable",
  data() {
    return {
      componentNameList,
      formData: {}
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
    getNameList(json) {
      let temp = {};
      json.forEach(element => {
        if (element.container) {
          element.container.forEach(ite => {
            temp = { ...temp, ...this.getNameList(ite.children) };
          });
        } else {
          temp[element.fieldName] = element.value;
        }
      });
      return temp;
    },
    initJson(init) {
      this.formData = this.getNameList(this.json.list);
      console.log(this.formData);
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
