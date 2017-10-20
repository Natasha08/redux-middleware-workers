# redux-middleware-workers

[![CircleCI](https://circleci.com/gh/Natasha08/redux-middleware-workers.svg?style=shield)](https://circleci.com/gh/Natasha08/redux-middleware-workers)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
![7.10.0](https://img.shields.io/npm/v/@cycle/core.svg)

## Recommended Technologies
[webpack](https://github.com/webpack/webpack)  
[worker-loader](https://github.com/webpack-contrib/worker-loader)

### Install package
`npm i -save redux-middleware-workers`  
`yarn add redux-middleware-workers`

### Example

```
// middleware.js

// worker loader is a webpack package that loads the worker for you.

import firstWorker from 'worker-loader?inline!./first_worker.js';
import secondWorker from 'worker-loader?inline!./second_worker.js';
import newWorkerMiddleware from 'redux-middleware-workers';

const injectObjects = (action, getState) => {
  const objects = _.get(getState(), 'objects', []);
  return { ...action, objects };
};

const injectStore = (action, getState) => {
  const store = getState();
  return { ...action, store };
};

const firstWorkerMiddleware = newWorkerMiddleware(new firstWorker(), 'FIRST_WORKER', injectObjects);
const secondWorkerMiddleware = newWorkerMiddleware(new appStorage(), 'SECOND_WORKER', injectStore);

export default [firstWorkerMiddleware, secondWorkerMiddleware];
```

```
// store.js

import { createStore, applyMiddleware } from 'redux';
import workerMiddleware from './workers/middleware';
import rootReducer from './reducers/index';

const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(...workerMiddleware)
);

export default store;
```

[Here](https://github.com/Natasha08/redux-middleware-workers-example) is a working example using multiple webworkers.

## Testing
`yarn test`  
`npm test`

## Want to contribute?

#### [Review our process docs](./PROCESS.md)
