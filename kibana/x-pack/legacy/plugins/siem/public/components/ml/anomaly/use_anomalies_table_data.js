"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAnomaliesTableData = exports.getThreshold = exports.influencersOrCriteriaToString = void 0;

var _react = require("react");

var _anomalies_table_data = require("../api/anomalies_table_data");

var _has_ml_user_permissions = require("../permissions/has_ml_user_permissions");

var _use_siem_jobs = require("../../ml_popover/hooks/use_siem_jobs");

var _use_ml_capabilities = require("../../ml_popover/hooks/use_ml_capabilities");

var _toasters = require("../../toasters");

var i18n = _interopRequireWildcard(require("./translations"));

var _kibana = require("../../../lib/kibana");

var _constants = require("../../../../common/constants");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var influencersOrCriteriaToString = function influencersOrCriteriaToString(influencers) {
  return influencers == null ? '' : influencers.reduce(function (accum, item) {
    return "".concat(accum).concat(item.fieldName, ":").concat(item.fieldValue);
  }, '');
};

exports.influencersOrCriteriaToString = influencersOrCriteriaToString;

var getThreshold = function getThreshold(anomalyScore, threshold) {
  if (threshold !== -1) {
    return threshold;
  } else if (anomalyScore == null) {
    return 50;
  } else if (anomalyScore < 0) {
    return 0;
  } else if (anomalyScore > 100) {
    return 100;
  } else {
    return Math.floor(anomalyScore);
  }
};

exports.getThreshold = getThreshold;

var useAnomaliesTableData = function useAnomaliesTableData(_ref) {
  var _ref$criteriaFields = _ref.criteriaFields,
      criteriaFields = _ref$criteriaFields === void 0 ? [] : _ref$criteriaFields,
      _ref$influencers = _ref.influencers,
      influencers = _ref$influencers === void 0 ? [] : _ref$influencers,
      startDate = _ref.startDate,
      endDate = _ref.endDate,
      _ref$threshold = _ref.threshold,
      threshold = _ref$threshold === void 0 ? -1 : _ref$threshold,
      _ref$skip = _ref.skip,
      skip = _ref$skip === void 0 ? false : _ref$skip;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      tableData = _useState2[0],
      setTableData = _useState2[1];

  var _useSiemJobs = (0, _use_siem_jobs.useSiemJobs)(true),
      _useSiemJobs2 = _slicedToArray(_useSiemJobs, 2),
      siemJobs = _useSiemJobs2[1];

  var _useState3 = (0, _react.useState)(true),
      _useState4 = _slicedToArray(_useState3, 2),
      loading = _useState4[0],
      setLoading = _useState4[1];

  var capabilities = (0, _use_ml_capabilities.useMlCapabilities)();
  var userPermissions = (0, _has_ml_user_permissions.hasMlUserPermissions)(capabilities);

  var _useStateToaster = (0, _toasters.useStateToaster)(),
      _useStateToaster2 = _slicedToArray(_useStateToaster, 2),
      dispatchToaster = _useStateToaster2[1];

  var timeZone = (0, _kibana.useTimeZone)();

  var _useUiSetting$ = (0, _kibana.useUiSetting$)(_constants.DEFAULT_ANOMALY_SCORE),
      _useUiSetting$2 = _slicedToArray(_useUiSetting$, 1),
      anomalyScore = _useUiSetting$2[0];

  var siemJobIds = siemJobs.filter(function (job) {
    return job.isInstalled;
  }).map(function (job) {
    return job.id;
  });
  (0, _react.useEffect)(function () {
    var isSubscribed = true;
    var abortCtrl = new AbortController();
    setLoading(true);

    function fetchAnomaliesTableData(_x, _x2, _x3, _x4) {
      return _fetchAnomaliesTableData.apply(this, arguments);
    }

    function _fetchAnomaliesTableData() {
      _fetchAnomaliesTableData = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(influencersInput, criteriaFieldsInput, earliestMs, latestMs) {
        var data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(userPermissions && !skip && siemJobIds.length > 0)) {
                  _context.next = 13;
                  break;
                }

                _context.prev = 1;
                _context.next = 4;
                return (0, _anomalies_table_data.anomaliesTableData)({
                  jobIds: siemJobIds,
                  criteriaFields: criteriaFieldsInput,
                  aggregationInterval: 'auto',
                  threshold: getThreshold(anomalyScore, threshold),
                  earliestMs: earliestMs,
                  latestMs: latestMs,
                  influencers: influencersInput,
                  dateFormatTz: timeZone,
                  maxRecords: 500,
                  maxExamples: 10
                }, abortCtrl.signal);

              case 4:
                data = _context.sent;

                if (isSubscribed) {
                  setTableData(data);
                  setLoading(false);
                }

                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](1);

                if (isSubscribed) {
                  (0, _toasters.errorToToaster)({
                    title: i18n.SIEM_TABLE_FETCH_FAILURE,
                    error: _context.t0,
                    dispatchToaster: dispatchToaster
                  });
                  setLoading(false);
                }

              case 11:
                _context.next = 14;
                break;

              case 13:
                if (!userPermissions && isSubscribed) {
                  setLoading(false);
                } else if (siemJobIds.length === 0 && isSubscribed) {
                  setLoading(false);
                } else if (isSubscribed) {
                  setTableData(null);
                  setLoading(true);
                }

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 8]]);
      }));
      return _fetchAnomaliesTableData.apply(this, arguments);
    }

    fetchAnomaliesTableData(influencers, criteriaFields, startDate, endDate);
    return function () {
      isSubscribed = false;
      abortCtrl.abort();
    };
  }, [influencersOrCriteriaToString(influencers), influencersOrCriteriaToString(criteriaFields), startDate, endDate, skip, userPermissions, siemJobIds.sort().join()]);
  return [loading, tableData];
};

exports.useAnomaliesTableData = useAnomaliesTableData;