"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertsView = void 0;

var _react = _interopRequireWildcard(require("react"));

var _numeral = _interopRequireDefault(require("@elastic/numeral"));

var _alerts_table = require("./alerts_table");

var i18n = _interopRequireWildcard(require("./translations"));

var _kibana = require("../../lib/kibana");

var _constants = require("../../../common/constants");

var _matrix_histogram = require("../matrix_histogram");

var _histogram_configs = require("./histogram_configs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ID = 'alertsOverTimeQuery';

var AlertsView = function AlertsView(_ref) {
  var deleteQuery = _ref.deleteQuery,
      endDate = _ref.endDate,
      filterQuery = _ref.filterQuery,
      pageFilters = _ref.pageFilters,
      setQuery = _ref.setQuery,
      startDate = _ref.startDate,
      type = _ref.type;

  var _useUiSetting$ = (0, _kibana.useUiSetting$)(_constants.DEFAULT_NUMBER_FORMAT),
      _useUiSetting$2 = _slicedToArray(_useUiSetting$, 1),
      defaultNumberFormat = _useUiSetting$2[0];

  var getSubtitle = (0, _react.useCallback)(function (totalCount) {
    return "".concat(i18n.SHOWING, ": ").concat((0, _numeral.default)(totalCount).format(defaultNumberFormat), " ").concat(i18n.UNIT(totalCount));
  }, []);
  var alertsHistogramConfigs = (0, _react.useMemo)(function () {
    return _objectSpread({}, _histogram_configs.histogramConfigs, {
      subtitle: getSubtitle
    });
  }, [getSubtitle]);
  (0, _react.useEffect)(function () {
    return function () {
      if (deleteQuery) {
        deleteQuery({
          id: ID
        });
      }
    };
  }, [deleteQuery]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_matrix_histogram.MatrixHistogramContainer, _extends({
    endDate: endDate,
    filterQuery: filterQuery,
    id: ID,
    setQuery: setQuery,
    sourceId: "default",
    startDate: startDate,
    type: type
  }, alertsHistogramConfigs)), _react.default.createElement(_alerts_table.AlertsTable, {
    endDate: endDate,
    startDate: startDate,
    pageFilters: pageFilters
  }));
};

exports.AlertsView = AlertsView;
AlertsView.displayName = 'AlertsView';