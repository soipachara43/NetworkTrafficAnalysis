"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchAnomalyRecords = exports.deleteMLJob = exports.createMLJob = exports.getExistingJobs = exports.getMLCapabilities = exports.getMLJobId = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _utils = require("./utils");

var _constants = require("../../../common/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getJobPrefix = function getJobPrefix(monitorId) {
  // ML App doesn't support upper case characters in job name
  // Also Spaces and the characters / ? , " < > | * are not allowed
  // so we will replace all special chars with _
  var prefix = monitorId.replace(/[^A-Z0-9]+/gi, '_').toLowerCase(); // ML Job ID can't be greater than 64 length, so will be substring it, and hope
  // At such big length, there is minimum chance of having duplicate monitor id
  // Subtracting ML_JOB_ID constant as well

  var postfix = '_' + _constants.ML_JOB_ID;

  if ((prefix + postfix).length > 64) {
    return prefix.substring(0, 64 - postfix.length) + '_';
  }

  return prefix + '_';
};

var getMLJobId = function getMLJobId(monitorId) {
  return "".concat(getJobPrefix(monitorId)).concat(_constants.ML_JOB_ID);
};

exports.getMLJobId = getMLJobId;

var getMLCapabilities =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _utils.apiService.get(_constants.API_URLS.ML_CAPABILITIES);

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getMLCapabilities() {
    return _ref.apply(this, arguments);
  };
}();

exports.getMLCapabilities = getMLCapabilities;

var getExistingJobs =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _utils.apiService.get(_constants.API_URLS.ML_MODULE_JOBS + _constants.ML_MODULE_ID);

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getExistingJobs() {
    return _ref2.apply(this, arguments);
  };
}();

exports.getExistingJobs = getExistingJobs;

var createMLJob =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(_ref4) {
    var _response$jobs, _response$jobs$;

    var monitorId, heartbeatIndices, url, data, response, jobResponse, error;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            monitorId = _ref4.monitorId, heartbeatIndices = _ref4.heartbeatIndices;
            url = _constants.API_URLS.ML_SETUP_MODULE + _constants.ML_MODULE_ID;
            data = {
              prefix: "".concat(getJobPrefix(monitorId)),
              useDedicatedIndex: false,
              startDatafeed: true,
              start: (0, _moment.default)().subtract(24, 'h').valueOf(),
              indexPatternName: heartbeatIndices,
              query: {
                bool: {
                  filter: [{
                    term: {
                      'monitor.id': monitorId
                    }
                  }, {
                    range: {
                      'monitor.duration.us': {
                        gt: 0
                      }
                    }
                  }]
                }
              }
            };
            _context3.next = 5;
            return _utils.apiService.post(url, data);

          case 5:
            response = _context3.sent;

            if (!((response === null || response === void 0 ? void 0 : (_response$jobs = response.jobs) === null || _response$jobs === void 0 ? void 0 : (_response$jobs$ = _response$jobs[0]) === null || _response$jobs$ === void 0 ? void 0 : _response$jobs$.id) === getMLJobId(monitorId))) {
              _context3.next = 16;
              break;
            }

            jobResponse = response.jobs[0];

            if (!jobResponse.success) {
              _context3.next = 12;
              break;
            }

            return _context3.abrupt("return", {
              count: 1,
              jobId: jobResponse.id
            });

          case 12:
            error = jobResponse.error;
            throw new Error(error === null || error === void 0 ? void 0 : error.msg);

          case 14:
            _context3.next = 17;
            break;

          case 16:
            return _context3.abrupt("return", null);

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function createMLJob(_x) {
    return _ref3.apply(this, arguments);
  };
}();

exports.createMLJob = createMLJob;

var deleteMLJob =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(_ref6) {
    var monitorId, data;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            monitorId = _ref6.monitorId;
            data = {
              jobIds: [getMLJobId(monitorId)]
            };
            _context4.next = 4;
            return _utils.apiService.post(_constants.API_URLS.ML_DELETE_JOB, data);

          case 4:
            return _context4.abrupt("return", _context4.sent);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function deleteMLJob(_x2) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteMLJob = deleteMLJob;

var fetchAnomalyRecords =
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(_ref8) {
    var dateStart, dateEnd, listOfMonitorIds, anomalyThreshold, data;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            dateStart = _ref8.dateStart, dateEnd = _ref8.dateEnd, listOfMonitorIds = _ref8.listOfMonitorIds, anomalyThreshold = _ref8.anomalyThreshold;
            data = {
              jobIds: listOfMonitorIds.map(function (monitorId) {
                return getMLJobId(monitorId);
              }),
              criteriaFields: [],
              influencers: [],
              aggregationInterval: 'auto',
              threshold: anomalyThreshold !== null && anomalyThreshold !== void 0 ? anomalyThreshold : 25,
              earliestMs: dateStart,
              latestMs: dateEnd,
              dateFormatTz: Intl.DateTimeFormat().resolvedOptions().timeZone,
              maxRecords: 500,
              maxExamples: 10
            };
            return _context5.abrupt("return", _utils.apiService.post(_constants.API_URLS.ML_ANOMALIES_RESULT, data));

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function fetchAnomalyRecords(_x3) {
    return _ref7.apply(this, arguments);
  };
}();

exports.fetchAnomalyRecords = fetchAnomalyRecords;