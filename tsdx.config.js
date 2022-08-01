const images = require('@rollup/plugin-image');
const url = require('@rollup/plugin-url');

module.exports = {
  rollup(config, options) {
    config.plugins = [
      url({
        include: [
          '**/*.woff',
          '**/*.woff2',
          '**/*.mp3',
          '**/*.wav',
          '**/*.webm',
        ],
        destDir: 'dist/assets',
        publicPath: 'assets/',
      }),
      images({ include: ['**/*.svg', '**/*.png', '**/*.jpg'] }),
      ...config.plugins,
    ];

    return config;
  },
};
