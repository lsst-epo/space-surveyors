# Space Surveyors

Space Surveyors is built as library package using `tsdx` with a `Parcel` example.

## Commands

TSDX scaffolds the package inside `/src`, and also sets up a [Parcel](https://parceljs.org) playground for it inside `/example`.

The recommended workflow is to run TSDX in one terminal:

```bash
yarn start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

Then run the example inside another:

```bash
cd example

npm i # or yarn to install dependencies
npm start # or yarn start
```

The default example imports and live reloads whatever is in `/dist`, so if you are seeing an out of date component, make sure TSDX is running in watch mode like we recommend above. **No symlinking required**, we use [Parcel's aliasing](https://parceljs.org/module_resolution.html#aliases).

To do a one-off build, use `npm run build` or `yarn build`.

To run tests, use `npm test` or `yarn test`.

## Deployment

Space Surveyors is deployed using [gh-pages](https://github.com/tschaub/gh-pages) and lives at [https://lsst-epo.github.io/space-surveyors/](https://lsst-epo.github.io/space-surveyors/). To deploy a branch to Github Pages:

```bash
yarn build
```

A `predeploy` script will build the TSDX library and then the Parcel example and `gh-pages` will push the Parcel `example/dist` directory to the `gh-pages` branch.
