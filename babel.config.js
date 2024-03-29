module.exports = {
  presets: [
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
  ],
  // ..
  plugins: [
    ['babel-plugin-styled-components', { namespace: 'space-surveyors' }],
    [
      // npm i -D babel-plugin-module-resolver
      // Alias resolver for `tsconfig.paths`
      // If you edit `tsconfig.json` paths you have to edit also here.
      'module-resolver',
      {
        extensions: ['.ts', '.tsx'], // not sure if you really need this
        root: './',
        alias: {
          // similar declaration as tsconfig.json but it's actually different !!
          '@assets': './src/assets',
          '@components': './src/components',
          '@constants': './src/constants',
          '@contexts': './src/contexts',
          '@entities': './src/entities',
          '@modules': './src/modules',
          '@shapes': './src/shapes',
          '@styles': './src/styles',
          '@systems': './src/systems',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
