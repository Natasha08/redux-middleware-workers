import _ from 'lodash';
import redux from 'redux';
import errorCheck from './error_check';

const createWorker = (worker, type, actionHelper=_.identity) => {
  return ({dispatch, getState}) => {
    return (next) => {
      return (action) => {
        const {meta} = action;
        
        if (meta && meta.webworker && meta.type === type) {
          worker.addEventListener('message', ({data}) => dispatch(data), false);
          worker.postMessage(actionHelper(action, getState));
        }
        return next(action);
      };
    };
  };
};

export default function newWorkerMiddleware(worker, type, actionHelper) {
  const noArgumentErrors = errorCheck(worker, type, actionHelper);
  if (noArgumentErrors) return createWorker(worker, type, actionHelper);
}
