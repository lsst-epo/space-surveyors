# Space Surveyors

Space Surveyors is built as library package using `tsdx` with a `create-react-app` example.

## Commands

TSDX scaffolds the package inside `/src`, and also sets up a [create-react-app](https://create-react-app.dev/) playground for it inside `/example`.

The recommended workflow is to run TSDX in one terminal:

```bash
yarn start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

Then run the example inside another:

```bash
cd example
yarn
yarn start
```

The example imports whatever is in `/dist`, so if you are seeing an out of date component, make sure TSDX is running in watch mode like we recommend above.

To do a one-off build, use `yarn build`.

To run tests, use `yarn test`.
