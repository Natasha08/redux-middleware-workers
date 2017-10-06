'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (worker, type, actionHelper) {
  if (!worker) throw new Error('newWorkerMiddleware expects at least two argments... a worker instance and an action type');
  if (!worker.postMessage) throw new Error('The worker instance must be the first argument and have a postMessage method');
  if (!_lodash2.default.isFunction(worker.postMessage)) throw new Error('The postMessage method of the worker instance must be a function');
  if (!type) throw new Error('A type must be defined for the scope of the worker instance');
  if (actionHelper && !_lodash2.default.isFunction(actionHelper)) throw new Error('The third argument for newWorkerMiddleware must be a function');
  return true;
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }