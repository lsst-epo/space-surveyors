# Space Surveyors

Space Surveyors is built as library package using `Vite` with a built-in example application

## Commands

Vite scaffolds the package inside `/src`, and also sets up a playground for it inside `/example`.

The recommended workflow is to build the library in one terminal:

```bash
yarn build
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

Then run the example inside another:

```bash
cd example

yarn # install dependencies
yarn start # or yarn start
```

The example imports and live reloads whatever is in `/dist`, so if you are seeing an out of date component, make sure Vite is running in `--watch` mode. The library is imported into the example using Vite's `resolve.alias` so no additional aliasing is required.

To do a one-off build, use `npm run build` or `yarn build`.

## Deployment

Space Surveyors is deployed using [gh-pages](https://github.com/tschaub/gh-pages) and lives at [https://lsst-epo.github.io/space-surveyors/](https://lsst-epo.github.io/space-surveyors/). To deploy a branch to Github Pages:

```bash
yarn build
```

A `predeploy` script will build the TSDX library and then the Parcel example and `gh-pages` will push the Parcel `example/dist` directory to the `gh-pages` branch.
