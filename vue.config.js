module.exports = {
  // disable pwa
  pwa: {
    serviceWorker: false,
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: './src/sw.js', /* Empty file. */
    },
  },
};
