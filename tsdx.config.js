const images = require('@rollup/plugin-image');
const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const path = require('path');

module.exports = {
  rollup(config, options) {
    config.plugins = [
      images({ include: ['**/*.svg', '**/*.png', '**/*.jpg'] }),
      postcss({
        plugins: [
          autoprefixer(),
          cssnano({
            preset: 'default',
          }),
        ],
        extract: path.resolve('dist/space-surveyors.css'),
      }),
      ...config.plugins,
    ];

    return config;
  },
};
