<template>
  <div id="app">
    <div id="nav">
      <div class="nav-title">YUI</div>
      <router-link :class="{ action: isActive('/') }" class="nav-item" to="/"
        >首页</router-link
      >
      <router-link
        :class="{ action: isActive('/doc') }"
        class="nav-item"
        to="/doc"
        >文档</router-link
      >
      <router-link
        :class="{ action: isActive('/form-design') }"
        class="nav-item"
        to="/form-design"
        >表单可视化</router-link
      >
      <router-link
        :class="{ action: isActive('/table-design') }"
        class="nav-item"
        to="/table-design"
        >页面可视化</router-link
      >
    </div>
    <keep-alive>
      <router-view class="app-body" />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "demoApp",
  methods: {
    isActive(path) {
      return path === this.$route.fullPath;
    }
  },
  mounted() {
  }
};
</script>

<style lang="scss" scope>
#app {
  height: 100%;
  display: flex;
  flex-direction: column;
  #nav {
    flex-shrink: 0;
    height: 48px;
    background-image: url("~@/assets/image/bg.jpg");
    border-bottom: $border-box;
    background-position: center 45%;
    padding: 0 80px;
    line-height: 48px;
    font-size: $font-size-base;
    .nav-title {
      display: inline;
      font-size: $font-size-big;
      line-height: initial;
      color: #ffffff;
      margin-right: 50px;
    }
    .nav-item {
      padding: 0 24px;
      display: inline-block;
      color: #ffffff;
      text-decoration: initial;
      transition: all 0.4s ease;
      user-select: none;
      &:hover {
        background: #ffffff;
        color: $font-color-base;
      }
      &.action {
        background: #ffffff;
        color: $font-color-base;
      }
    }
  }
  .app-body {
    flex: 1;
    overflow: hidden;
  }
}
</style>

<style lang="scss">
html,
body {
  height: 100%;
}
</style>
