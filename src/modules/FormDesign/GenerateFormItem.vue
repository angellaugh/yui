<template>
  <et
    v-if="
      componentNameList.includes(config.type) &&
        (config.judge ? config.judge() : true)
    "
    :key="config.uuid || config.fieldName"
    :is="`HirasawaYui_${config.type}`"
    :config="config"
    :value="value"
    @input="
      val => {
        $emit('input', val);
      }
    "
  ></et>
</template>
<script>
import { uuid } from "@/utils/uuid.js";
import { componentNameList } from "@/components/form";
export default {
  name: "GenerateFormItem",
  data() {
    return {
      uuid,
      componentNameList
    };
  },
  model: {
    prop: "value",
    event: "input"
  },
  props: {
    value: {},
    config: {
      type: Object
    }
  },

  methods: {}
};
</script>

<style scoped lang="scss"></style>
