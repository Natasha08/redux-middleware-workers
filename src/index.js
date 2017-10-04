import _ from 'lodash';
import errorCheck from './error_check';

const createWorker = ({worker, type, actionHelper=_.identity}) => {
  return ({ dispatch, getState }) => {
    return (next) => {
      return (action) => {
        const { meta } = action;

        if (meta && meta.webworker && meta.type === type) {
          worker.addEventListener('message', ({ data }) => dispatch(data), false);
          worker.postMessage(actionHelper(action, getState));
        }
        return next(action);
      };
    };
  };
};

export default function newWorkerMiddleware() {
  const noArgumentErrors = errorCheck(...arguments);
  if (noArgumentErrors) return createWorker(...arguments);
}
