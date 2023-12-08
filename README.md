# Space Surveyors

Space Surveyors is built as library package using `Vite` with a built-in example application

## Commands

Vite scaffolds the package inside `/src`, and also sets up a playground for it inside `/example`.

The recommended workflow is to build the library in one terminal:

```bash
yarn start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

Then run the example inside another:

```bash
cd example

yarn # install dependencies
yarn start # or yarn start
```

The example installs the package built into `/dist` as a module. For live development, build the library using `yarn start` and `yarn link` to create a symlink between the library and example.

To do a one-off build of the library package, use `npm run prepare` or `yarn prepare`.

## Deployment

Space Surveyors is deployed using [gh-pages](https://github.com/tschaub/gh-pages) and lives at [https://lsst-epo.github.io/space-surveyors/](https://lsst-epo.github.io/space-surveyors/). To deploy a branch to Github Pages:

```bash
yarn deploy
```

A `predeploy` script will build the library and then the example and `gh-pages` will push the Parcel `example/dist` directory to the `gh-pages` branch.
