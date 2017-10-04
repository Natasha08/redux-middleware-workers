import newWorkerMiddleware from '../src/index.js';
import _ from 'lodash';

describe('newWorkerMiddleware', () => {
  it('creates a new worker', () => {
    const newWorker = newWorkerMiddleware({postMessage: _.noop}, {type: 'foo'}, _.noop);
  });
});
