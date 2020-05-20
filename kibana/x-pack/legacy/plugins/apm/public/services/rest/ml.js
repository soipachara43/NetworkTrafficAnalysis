"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startMLJob = startMLJob;
exports.getHasMLJob = getHasMLJob;

var _elasticsearch_fieldnames = require("../../../../../../plugins/apm/common/elasticsearch_fieldnames");

var _ml_job_constants = require("../../../../../../plugins/apm/common/ml_job_constants");

var _callApi = require("./callApi");

var _createCallApmApi = require("./createCallApmApi");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getTransactionIndices(_x) {
  return _getTransactionIndices.apply(this, arguments);
}

function _getTransactionIndices() {
  _getTransactionIndices = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(http) {
    var indices;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _createCallApmApi.callApmApi)({
              method: 'GET',
              pathname: "/api/apm/settings/apm-indices"
            });

          case 2:
            indices = _context.sent;
            return _context.abrupt("return", indices['apm_oss.transactionIndices']);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getTransactionIndices.apply(this, arguments);
}

function startMLJob(_x2) {
  return _startMLJob.apply(this, arguments);
} // https://www.elastic.co/guide/en/elasticsearch/reference/6.5/ml-get-job.html


function _startMLJob() {
  _startMLJob = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(_ref) {
    var serviceName, transactionType, http, transactionIndices, groups, filter;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            serviceName = _ref.serviceName, transactionType = _ref.transactionType, http = _ref.http;
            _context2.next = 3;
            return getTransactionIndices(http);

          case 3:
            transactionIndices = _context2.sent;
            groups = ['apm', serviceName.toLowerCase()];
            filter = [{
              term: _defineProperty({}, _elasticsearch_fieldnames.SERVICE_NAME, serviceName)
            }, {
              term: _defineProperty({}, _elasticsearch_fieldnames.PROCESSOR_EVENT, 'transaction')
            }, {
              term: _defineProperty({}, _elasticsearch_fieldnames.TRANSACTION_TYPE, transactionType)
            }];
            groups.push(transactionType.toLowerCase());
            return _context2.abrupt("return", (0, _callApi.callApi)(http, {
              method: 'POST',
              pathname: "/api/ml/modules/setup/apm_transaction",
              body: {
                prefix: (0, _ml_job_constants.getMlPrefix)(serviceName, transactionType),
                groups: groups,
                indexPatternName: transactionIndices,
                startDatafeed: true,
                query: {
                  bool: {
                    filter: filter
                  }
                }
              }
            }));

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _startMLJob.apply(this, arguments);
}

function getHasMLJob(_x3) {
  return _getHasMLJob.apply(this, arguments);
}

function _getHasMLJob() {
  _getHasMLJob = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(_ref2) {
    var serviceName, transactionType, http;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            serviceName = _ref2.serviceName, transactionType = _ref2.transactionType, http = _ref2.http;
            _context3.prev = 1;
            _context3.next = 4;
            return (0, _callApi.callApi)(http, {
              method: 'GET',
              pathname: "/api/ml/anomaly_detectors/".concat((0, _ml_job_constants.getMlJobId)(serviceName, transactionType))
            });

          case 4:
            return _context3.abrupt("return", true);

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](1);
            return _context3.abrupt("return", false);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 7]]);
  }));
  return _getHasMLJob.apply(this, arguments);
}