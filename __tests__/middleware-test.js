import newWorkerMiddleware from '../src/index.js';

describe('newWorkerMiddleware', () => {
  it('creates a new worker', () => {
    const worker = {postMessage: jest.fn()};
    const type = 'foo';
    const actionHelper = jest.fn();

    const newWorker = newWorkerMiddleware({worker, type, actionHelper});
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
        newWorkerMiddleware({worker: {postMessage: 'fake'}});
      }).toThrow('The postMessage method of the worker instance must be a function');
    });

    it('errors when the action type is not defined', () => {
      expect(() => {
        newWorkerMiddleware({worker: {postMessage: jest.fn()}});
      }).toThrow('A type must be defined for the scope of the worker instance');
    });

    it('errors if the actionHelper is supplied and is not a function', () => {
      const worker = {postMessage: jest.fn()};
      const type = 'foo';
      const actionHelper = 'bar';

      expect(() => {
        newWorkerMiddleware({worker, type, actionHelper});
      }).toThrow('The third argument for newWorkerMiddleware must be a function');
    });
  });
});
