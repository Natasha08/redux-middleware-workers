import newWorkerMiddleware from '../src/index.js';
import _ from 'lodash';

describe('newWorkerMiddleware', () => {
  it('creates a new worker', () => {
    const newWorker = newWorkerMiddleware({postMessage: jest.fn()}, {type: 'foo'}, jest.fn());
    expect(typeof newWorker).toBe('function');
  });
});
