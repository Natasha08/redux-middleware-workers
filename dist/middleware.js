'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = newWorkerMiddleware;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _error_check = require('./error_check');

var _error_check2 = _interopRequireDefault(_error_check);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createWorker = function createWorker(worker, type) {
  var actionHelper = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _lodash2.default.identity;

  var scopedDispatch = _lodash2.default.noop;

  worker.addEventListener('message', function (_ref) {
    var data = _ref.data;
    return scopedDispatch(data);
  }, false);

  return function (_ref2) {
    var dispatch = _ref2.dispatch,
        getState = _ref2.getState;

    scopedDispatch = dispatch;

    return function (next) {
      return function (action) {
        var meta = action.meta;

        if (meta && meta.webworker && meta.type === type) {
          worker.postMessage(actionHelper(action, getState));
        }
        return next(action);
      };
    };
  };
};

function newWorkerMiddleware(worker, type, actionHelper) {
  var noArgumentErrors = (0, _error_check2.default)(worker, type, actionHelper);
  if (noArgumentErrors) return createWorker(worker, type, actionHelper);
}