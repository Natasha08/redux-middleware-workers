import _ from 'lodash';
import errorCheck from './error_check';

const createWorker = (worker, type, actionHelper=_.identity) => {
  let scopedDispatch = _.noop;

  worker.addEventListener('message', ({ data }) => scopedDispatch(data), false);

  return ({dispatch, getState}) => {
    scopedDispatch = dispatch;

    return (next) => {
      return (action) => {
        const {meta} = action;
        if (meta && meta.webworker && meta.type === type) {
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
