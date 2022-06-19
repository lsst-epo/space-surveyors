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

## Dependency linking

For running the local development server several package links are required, [yarn links](https://classic.yarnpkg.com/en/docs/cli/link) can be used to set these up.

First, link the `space-surveyors` package to the example.

```bash
cd dist
yarn link space-surveyors
cd ..
cd example
yarn link "space-surveyors"
```

Then link `react` and `react-dom` in the library development folder to the example application to avoid having duplicate `react` packages.

```bash
cd example/node_modules/react
yarn link
cd ..
cd react-dom
yarn link
cd ../../..
yarn link "react"
yarn link "react-dom"
```

You may need to delete your library `yarn.lock` and node_modules folder after this then `yarn` again.
