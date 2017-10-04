import _ from 'lodash';

export default function() {
  const worker = arguments[0];
  const type = arguments[1];
  const actionHelper = arguments[2];

  if (!arguments.length) throw new Error('newWorkerMiddleware expects at least two argments... a worker instance and an action type');
  if (!worker.postMessage) throw new Error('The worker instance must be the first argument and have a postMessage method');
  if (!_.isFunction(worker.postMessage)) throw new Error('The postMessage method of the worker instance must be a function');
  if (!type) throw new Error('A type must be defined for the scope of the worker instance');
  if (actionHelper && !_.isFunction(actionHelper)) throw new Error('The third argument for newWorkerMiddleware must be a function');
  return true;
}
