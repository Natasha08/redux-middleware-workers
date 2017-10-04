import newWorkerMiddleware from '../src/index.js';

describe('newWorkerMiddleware', () => {
  it('creates a new worker', () => {
    const newWorker = newWorkerMiddleware({postMessage: jest.fn()}, {type: 'foo'}, jest.fn());
    expect(typeof newWorker).toBe('function');
  });

  describe('error messaging', () => {
    it('errors when there are no arguments', () => {
      expect(() => {
        newWorkerMiddleware();
      }).toThrow('newWorkerMiddleware expects at least two argments... a worker instance and an action type');
    });

    it('errors when the first argument is not a worker', () => {
      expect(() => {
        newWorkerMiddleware({worker: 'fake'});
      }).toThrow('The worker instance must be the first argument and have a postMessage method');
    });

    it('errors when the postMessage of the worker is not a function', () => {
      expect(() => {
        newWorkerMiddleware({postMessage: 'fake'});
      }).toThrow('The postMessage method of the worker instance must be a function');
    });

    it('errors when the action type is not defined', () => {
      expect(() => {
        newWorkerMiddleware({postMessage: jest.fn()});
      }).toThrow('A type must be defined for the scope of the worker instance');
    });

    it('errors the actionHelper is supplied and is not a function', () => {
      expect(() => {
        newWorkerMiddleware({postMessage: jest.fn()}, {type: 'foo'}, {actionHelper: 'bar'});
      }).toThrow('The third argument for newWorkerMiddleware must be a function');
    });
  });
});
