<template>
  <div ref="container" style="height: 360px; width: 100%"></div>
</template>

<script>
import * as monaco from "monaco-editor/esm/vs/editor/editor.main.js";
export default {
  data() {
    return {
      monacoEditor: {}
    };
  },
  mounted() {
    // 初始化编辑器，确保dom已经渲染，dialog中要写在opened中
    this.monacoEditor = monaco.editor.create(this.$refs.container, {
      value: "内容",
      language: "javascript",
      theme: "vs-dark"
    });
  },
  methods: {
    changeEditor(result) {
      // 更改editor内容
      this.monacoEditor.setValue(result.data);
      this.monacoEditor.getAction("editor.action.formatDocument")._run();
    },
    destroyEditor() {
      // 销毁编辑器
      this.monacoEditor.dispose();
    }
  }
};
</script>
