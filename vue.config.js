module.exports = {
  // disable pwa
  pwa: {
    serviceWorker: false,
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: './src/sw.js', /* Empty file. */
    },
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3030',
        changeOrigin: true,
      },
    },
  },
};
