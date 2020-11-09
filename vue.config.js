module.exports = {
  pages: {
    index: {
      entry: "src/demo/main.js",
      template: "public/index.html",
      filename: "index.html"
    }
  },
  lintOnSave: false,
  productionSourceMap: false,
  publicPath: "./",
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "./src/assets/scss/variables.scss";`
      }
    }
  },

  chainWebpack: config => {
    config.optimization.splitChunks({
      cacheGroups: {
        vendors: {
          name: "chunk-vendors",
          minChunks: 4,
          test: /node_modules/,
          priority: -10,
          chunks: "initial"
        },
        common: {}
      }
    });
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap(options => Object.assign(options, { limit: 10240 }));
  }
};
