import newWorkerMiddleware from '../src/index.js';
import _ from 'lodash';

describe('newWorkerMiddleware', () => {
  it('creates a new worker', () => {
    const newWorker = newWorkerMiddleware({postMessage: jest.fn()}, {type: 'foo'}, jest.fn());
    expect(typeof newWorker).toBe('function');
  });

  describe('error messaging', () => {
    it('errors when there are no arguments', () => {
      const errorMessage = 'newWorkerMiddleware expects at least two argments... a worker instance and an action type';
      expect(() => {
        newWorkerMiddleware();
      }).toThrow(errorMessage);
    });

    it('errors when the first argument is not a worker', () => {
      const errorMessage = 'The worker instance must be the first argument and have a postMessage method';
      expect(() => {
        newWorkerMiddleware({worker: 'fake'});
      }).toThrow(errorMessage);
    });

    it('errors when the postMessage of the worker is not a function', () => {
      const errorMessage = 'The postMessage method of the worker instance must be a function';
      expect(() => {
        newWorkerMiddleware({postMessage: 'fake'});
      }).toThrow(errorMessage);
    });

    it('errors when the action type is not defined', () => {
      const errorMessage = 'A type must be defined for the scope of the worker instance';
      expect(() => {
        newWorkerMiddleware({postMessage: jest.fn()});
      }).toThrow(errorMessage);
    });
    
    it('errors the actionHelper is supplied and is not a function', () => {
      const errorMessage = 'The third argument for newWorkerMiddleware must be a function';
      expect(() => {
        newWorkerMiddleware({postMessage: jest.fn()}, {type: 'foo'}, {actionHelper: 'bar'});
      }).toThrow(errorMessage);
    });
  });
});
