const images = require('@rollup/plugin-image');
const postcss = require('rollup-plugin-postcss');

module.exports = {
  rollup(config, options) {
    config.plugins = [
      images({ include: ['**/*.svg', '**/*.png', '**/*.jpg'] }),
      postcss({
        modules: true,
      }),
      ...config.plugins,
    ];

    return config;
  },
};
