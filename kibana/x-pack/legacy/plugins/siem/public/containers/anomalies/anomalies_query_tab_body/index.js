"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnomaliesQueryTabBody = void 0;

var _react = _interopRequireWildcard(require("react"));

var _utils = require("./utils");

var _use_siem_jobs = require("../../../components/ml_popover/hooks/use_siem_jobs");

var _kibana = require("../../../lib/kibana");

var _constants = require("../../../../common/constants");

var _matrix_histogram = require("../../../components/matrix_histogram");

var _histogram_configs = require("./histogram_configs");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ID = 'anomaliesOverTimeQuery';

var AnomaliesQueryTabBody = function AnomaliesQueryTabBody(_ref) {
  var deleteQuery = _ref.deleteQuery,
      endDate = _ref.endDate,
      setQuery = _ref.setQuery,
      skip = _ref.skip,
      startDate = _ref.startDate,
      type = _ref.type,
      narrowDateRange = _ref.narrowDateRange,
      filterQuery = _ref.filterQuery,
      anomaliesFilterQuery = _ref.anomaliesFilterQuery,
      AnomaliesTableComponent = _ref.AnomaliesTableComponent,
      flowTarget = _ref.flowTarget,
      ip = _ref.ip;
  (0, _react.useEffect)(function () {
    return function () {
      if (deleteQuery) {
        deleteQuery({
          id: ID
        });
      }
    };
  }, []);

  var _useSiemJobs = (0, _use_siem_jobs.useSiemJobs)(true),
      _useSiemJobs2 = _slicedToArray(_useSiemJobs, 2),
      siemJobs = _useSiemJobs2[1];

  var _useUiSetting$ = (0, _kibana.useUiSetting$)(_constants.DEFAULT_ANOMALY_SCORE),
      _useUiSetting$2 = _slicedToArray(_useUiSetting$, 1),
      anomalyScore = _useUiSetting$2[0];

  var mergedFilterQuery = (0, _utils.getAnomaliesFilterQuery)(filterQuery, anomaliesFilterQuery, siemJobs, anomalyScore, flowTarget, ip);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_matrix_histogram.MatrixHistogramContainer, _extends({
    endDate: endDate,
    filterQuery: mergedFilterQuery,
    id: ID,
    setQuery: setQuery,
    sourceId: "default",
    startDate: startDate,
    type: type
  }, _histogram_configs.histogramConfigs)), _react.default.createElement(AnomaliesTableComponent, {
    startDate: startDate,
    endDate: endDate,
    skip: skip,
    type: type,
    narrowDateRange: narrowDateRange,
    flowTarget: flowTarget,
    ip: ip
  }));
};

exports.AnomaliesQueryTabBody = AnomaliesQueryTabBody;
AnomaliesQueryTabBody.displayName = 'AnomaliesQueryTabBody';