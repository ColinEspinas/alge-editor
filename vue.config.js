module.exports = {
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },
  transpileDependencies: [
    'quasar'
  ],
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "src/styles/quasar.variables.scss";`
      }
    }
  }
}
