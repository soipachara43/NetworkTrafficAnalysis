"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getJobsSummary = exports.stopDatafeeds = exports.startDatafeeds = exports.setupMlJob = exports.getModules = exports.checkRecognizer = void 0;

var _throw_if_not_ok = require("../ml/api/throw_if_not_ok");

var _kibana = require("../../lib/kibana");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Checks the ML Recognizer API to see if a given indexPattern has any compatible modules
 *
 * @param indexPatternName ES index pattern to check for compatible modules
 * @param signal to cancel request
 *
 * @throws An error if response is not OK
 */
var checkRecognizer =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref2) {
    var indexPatternName, signal;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            indexPatternName = _ref2.indexPatternName, signal = _ref2.signal;
            return _context.abrupt("return", _kibana.KibanaServices.get().http.fetch("/api/ml/modules/recognize/".concat(indexPatternName), {
              method: 'GET',
              asSystemRequest: true,
              signal: signal
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function checkRecognizer(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Returns ML Module for given moduleId. Returns all modules if no moduleId specified
 *
 * @param moduleId id of the module to retrieve
 * @param signal to cancel request
 *
 * @throws An error if response is not OK
 */


exports.checkRecognizer = checkRecognizer;

var getModules =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(_ref4) {
    var _ref4$moduleId, moduleId, signal;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _ref4$moduleId = _ref4.moduleId, moduleId = _ref4$moduleId === void 0 ? '' : _ref4$moduleId, signal = _ref4.signal;
            return _context2.abrupt("return", _kibana.KibanaServices.get().http.fetch("/api/ml/modules/get_module/".concat(moduleId), {
              method: 'GET',
              asSystemRequest: true,
              signal: signal
            }));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getModules(_x2) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * Creates ML Jobs + Datafeeds for the given configTemplate + indexPatternName
 *
 * @param configTemplate - name of configTemplate to setup
 * @param indexPatternName - default index pattern configTemplate should be installed with
 * @param jobIdErrorFilter - if provided, filters all errors except for given jobIds
 * @param groups - list of groups to add to jobs being installed
 * @param prefix - prefix to be added to job name
 *
 * @throws An error if response is not OK
 */


exports.getModules = getModules;

var setupMlJob =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(_ref6) {
    var configTemplate, _ref6$indexPatternNam, indexPatternName, _ref6$jobIdErrorFilte, jobIdErrorFilter, _ref6$groups, groups, _ref6$prefix, prefix, response;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            configTemplate = _ref6.configTemplate, _ref6$indexPatternNam = _ref6.indexPatternName, indexPatternName = _ref6$indexPatternNam === void 0 ? 'auditbeat-*' : _ref6$indexPatternNam, _ref6$jobIdErrorFilte = _ref6.jobIdErrorFilter, jobIdErrorFilter = _ref6$jobIdErrorFilte === void 0 ? [] : _ref6$jobIdErrorFilte, _ref6$groups = _ref6.groups, groups = _ref6$groups === void 0 ? ['siem'] : _ref6$groups, _ref6$prefix = _ref6.prefix, prefix = _ref6$prefix === void 0 ? '' : _ref6$prefix;
            _context3.next = 3;
            return _kibana.KibanaServices.get().http.fetch("/api/ml/modules/setup/".concat(configTemplate), {
              method: 'POST',
              body: JSON.stringify({
                prefix: prefix,
                groups: groups,
                indexPatternName: indexPatternName,
                startDatafeed: false,
                useDedicatedIndex: true
              }),
              asSystemRequest: true
            });

          case 3:
            response = _context3.sent;
            (0, _throw_if_not_ok.throwIfErrorAttachedToSetup)(response, jobIdErrorFilter);
            return _context3.abrupt("return", response);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function setupMlJob(_x3) {
    return _ref5.apply(this, arguments);
  };
}();
/**
 * Starts the given dataFeedIds
 *
 * @param datafeedIds
 * @param start
 *
 * @throws An error if response is not OK
 */


exports.setupMlJob = setupMlJob;

var startDatafeeds =
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(_ref8) {
    var datafeedIds, _ref8$start, start, response;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            datafeedIds = _ref8.datafeedIds, _ref8$start = _ref8.start, start = _ref8$start === void 0 ? 0 : _ref8$start;
            _context4.next = 3;
            return _kibana.KibanaServices.get().http.fetch('/api/ml/jobs/force_start_datafeeds', {
              method: 'POST',
              body: JSON.stringify(_objectSpread({
                datafeedIds: datafeedIds
              }, start !== 0 && {
                start: start
              })),
              asSystemRequest: true
            });

          case 3:
            response = _context4.sent;
            (0, _throw_if_not_ok.throwIfErrorAttached)(response, datafeedIds);
            return _context4.abrupt("return", response);

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function startDatafeeds(_x4) {
    return _ref7.apply(this, arguments);
  };
}();
/**
 * Stops the given dataFeedIds and sets the corresponding Job's jobState to closed
 *
 * @param datafeedIds
 *
 * @throws An error if response is not OK
 */


exports.startDatafeeds = startDatafeeds;

var stopDatafeeds =
/*#__PURE__*/
function () {
  var _ref9 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(_ref10) {
    var datafeedIds, stopDatafeedsResponse, datafeedPrefix, closeJobsResponse;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            datafeedIds = _ref10.datafeedIds;
            _context5.next = 3;
            return _kibana.KibanaServices.get().http.fetch('/api/ml/jobs/stop_datafeeds', {
              method: 'POST',
              body: JSON.stringify({
                datafeedIds: datafeedIds
              }),
              asSystemRequest: true
            });

          case 3:
            stopDatafeedsResponse = _context5.sent;
            datafeedPrefix = 'datafeed-';
            _context5.next = 7;
            return _kibana.KibanaServices.get().http.fetch('/api/ml/jobs/close_jobs', {
              method: 'POST',
              body: JSON.stringify({
                jobIds: datafeedIds.map(function (dataFeedId) {
                  return dataFeedId.startsWith(datafeedPrefix) ? dataFeedId.substring(datafeedPrefix.length) : dataFeedId;
                })
              }),
              asSystemRequest: true
            });

          case 7:
            closeJobsResponse = _context5.sent;
            return _context5.abrupt("return", [stopDatafeedsResponse, closeJobsResponse]);

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function stopDatafeeds(_x5) {
    return _ref9.apply(this, arguments);
  };
}();
/**
 * Fetches a summary of all ML jobs currently installed
 *
 * NOTE: If not sending jobIds in the body, you must at least send an empty body or the server will
 * return a 500
 *
 * @param signal to cancel request
 *
 * @throws An error if response is not OK
 */


exports.stopDatafeeds = stopDatafeeds;

var getJobsSummary =
/*#__PURE__*/
function () {
  var _ref11 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(signal) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt("return", _kibana.KibanaServices.get().http.fetch('/api/ml/jobs/jobs_summary', {
              method: 'POST',
              body: JSON.stringify({}),
              asSystemRequest: true,
              signal: signal
            }));

          case 1:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function getJobsSummary(_x6) {
    return _ref11.apply(this, arguments);
  };
}();

exports.getJobsSummary = getJobsSummary;