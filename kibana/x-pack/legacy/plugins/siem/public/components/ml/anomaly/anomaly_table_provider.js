"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnomalyTableProvider = void 0;

var _react = _interopRequireDefault(require("react"));

var _use_anomalies_table_data = require("./use_anomalies_table_data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var AnomalyTableProvider = _react.default.memo(function (_ref) {
  var influencers = _ref.influencers,
      startDate = _ref.startDate,
      endDate = _ref.endDate,
      children = _ref.children,
      criteriaFields = _ref.criteriaFields,
      skip = _ref.skip;

  var _useAnomaliesTableDat = (0, _use_anomalies_table_data.useAnomaliesTableData)({
    criteriaFields: criteriaFields,
    influencers: influencers,
    startDate: startDate,
    endDate: endDate,
    skip: skip
  }),
      _useAnomaliesTableDat2 = _slicedToArray(_useAnomaliesTableDat, 2),
      isLoadingAnomaliesData = _useAnomaliesTableDat2[0],
      anomaliesData = _useAnomaliesTableDat2[1];

  return _react.default.createElement(_react.default.Fragment, null, children({
    isLoadingAnomaliesData: isLoadingAnomaliesData,
    anomaliesData: anomaliesData
  }));
});

exports.AnomalyTableProvider = AnomalyTableProvider;
AnomalyTableProvider.displayName = 'AnomalyTableProvider';