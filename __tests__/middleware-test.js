import configureStore from 'redux-mock-store';
import newWorkerMiddleware from '../src/index.js';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('newWorkerMiddleware', () => {
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

    it('errors if the actionHelper is supplied and is not a function', () => {
      const worker = {postMessage: jest.fn()};
      const type = 'foo';
      const actionHelper = 'bar';

      expect(() => {
        newWorkerMiddleware(worker, type, actionHelper);
      }).toThrow('The third argument for newWorkerMiddleware must be a function');
    });
  });

  describe('behavior', () => {
    const store = mockStore({});
    const workerData = 'Whatever I want to pass to the worker';

    it('creates a new worker', () => {
      const worker = {postMessage: jest.fn()};
      const type = 'foo';
      const actionHelper = jest.fn();

      const newWorker = newWorkerMiddleware(worker, type, actionHelper);
      expect(typeof newWorker).toBe('function');
    });

    it('calls methods when a new instance of worker is created', function() {
      const fakeNext = jest.fn();
      const fakeWorker = {addEventListener: jest.fn(), postMessage: jest.fn()};
      const actionHelper = jest.fn();

      const action = {
        type: 'I_SHOULD_BE_CALLED',
        workerData,
        meta: { webworker: true, type: 'SEARCH_WORKER' }
      };
      const middleware = newWorkerMiddleware(fakeWorker, 'SEARCH_WORKER', actionHelper)(store)(fakeNext)(action);

      expect(fakeNext).toHaveBeenCalledWith(action);
      expect(fakeWorker.addEventListener).toHaveBeenCalled();
      expect(fakeWorker.postMessage).toHaveBeenCalled();
      expect(actionHelper).toHaveBeenCalled();
    });

    it('does not call methods when webworker is false', function() {
      const fakeNext = jest.fn();
      const fakeWorker = {addEventListener: jest.fn(), postMessage: jest.fn()};
      const actionHelper = jest.fn();

      const action = {
        type: 'I_SHOULD_BE_CALLED',
        workerData,
        meta: { webworker: false, type: 'FAKE_WORKER' }
      };
      const middleware = newWorkerMiddleware(fakeWorker, 'SEARCH_WORKER', actionHelper)(store)(fakeNext)(action);

      expect(fakeNext).toHaveBeenCalledWith(action);
      expect(fakeWorker.addEventListener).not.toHaveBeenCalled();
      expect(fakeWorker.postMessage).not.toHaveBeenCalled();
      expect(actionHelper).not.toHaveBeenCalled();
    });

    it('does not call methods when it\'s the wrong type of webworker', function() {
      const fakeNext = jest.fn();
      const fakeWorker = {addEventListener: jest.fn(), postMessage: jest.fn()};
      const actionHelper = jest.fn();
      
      const action = {
        type: 'I_SHOULD_BE_CALLED',
        workerData,
        meta: { webworker: false, type: 'SEARCH_WORKER' }
      };
      const middleware = newWorkerMiddleware(
        fakeWorker,
        'A_DIFFERENT_WEBWORKER',
        actionHelper
      )(store)(fakeNext)(action);

      expect(fakeNext).toHaveBeenCalledWith(action);
      expect(fakeWorker.addEventListener).not.toHaveBeenCalled();
      expect(fakeWorker.postMessage).not.toHaveBeenCalled();
      expect(actionHelper).not.toHaveBeenCalled();
    });
  });
});
