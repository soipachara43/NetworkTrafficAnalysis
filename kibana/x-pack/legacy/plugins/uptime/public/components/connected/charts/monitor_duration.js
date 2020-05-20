"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DurationChart = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _hooks = require("../../../hooks");

var _actions = require("../../../state/actions");

var _charts = require("../../functional/charts");

var _selectors = require("../../../state/selectors");

var _contexts = require("../../../contexts");

var _ml_anomaly = require("../../../state/api/ml_anomaly");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DurationChart = function DurationChart(_ref) {
  var _ref2;

  var monitorId = _ref.monitorId;

  var _useUrlParams = (0, _hooks.useUrlParams)(),
      _useUrlParams2 = _slicedToArray(_useUrlParams, 1),
      getUrlParams = _useUrlParams2[0];

  var _getUrlParams = getUrlParams(),
      dateRangeStart = _getUrlParams.dateRangeStart,
      dateRangeEnd = _getUrlParams.dateRangeEnd,
      absoluteDateRangeStart = _getUrlParams.absoluteDateRangeStart,
      absoluteDateRangeEnd = _getUrlParams.absoluteDateRangeEnd;

  var _useSelector = (0, _reactRedux.useSelector)(_selectors.selectDurationLines),
      durationLines = _useSelector.durationLines,
      loading = _useSelector.loading;

  var isMLAvailable = (0, _reactRedux.useSelector)(_selectors.hasMLFeatureAvailable);

  var _useSelector2 = (0, _reactRedux.useSelector)(_selectors.hasMLJobSelector),
      mlJobs = _useSelector2.data,
      jobsLoading = _useSelector2.loading;

  var hasMLJob = !!(mlJobs === null || mlJobs === void 0 ? void 0 : mlJobs.jobsExist) && !!mlJobs.jobs.find(function (job) {
    return job.id === (0, _ml_anomaly.getMLJobId)(monitorId);
  });
  var anomalies = (0, _reactRedux.useSelector)(_selectors.anomaliesSelector);
  var dispatch = (0, _reactRedux.useDispatch)();

  var _useContext = (0, _react.useContext)(_contexts.UptimeRefreshContext),
      lastRefresh = _useContext.lastRefresh;

  (0, _react.useEffect)(function () {
    if (isMLAvailable) {
      var anomalyParams = {
        listOfMonitorIds: [monitorId],
        dateStart: absoluteDateRangeStart,
        dateEnd: absoluteDateRangeEnd
      };
      dispatch(_actions.getAnomalyRecordsAction.get(anomalyParams));
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [dateRangeStart, dateRangeEnd, dispatch, lastRefresh, monitorId, isMLAvailable]);
  (0, _react.useEffect)(function () {
    var params = {
      monitorId: monitorId,
      dateStart: dateRangeStart,
      dateEnd: dateRangeEnd
    };
    dispatch((0, _actions.getMonitorDurationAction)(params));
  }, [dateRangeStart, dateRangeEnd, dispatch, lastRefresh, monitorId]);
  (0, _react.useEffect)(function () {
    dispatch(_actions.getMLCapabilitiesAction.get());
  }, [dispatch]);
  return _react.default.createElement(_charts.DurationChartComponent, {
    anomalies: anomalies,
    hasMLJob: hasMLJob,
    loading: loading || jobsLoading,
    locationDurationLines: (_ref2 = durationLines === null || durationLines === void 0 ? void 0 : durationLines.locationDurationLines) !== null && _ref2 !== void 0 ? _ref2 : []
  });
};

exports.DurationChart = DurationChart;