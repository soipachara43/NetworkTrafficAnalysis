"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MostRecentError = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _moment = _interopRequireDefault(require("moment"));

var _i18n = require("@kbn/i18n");

var _monitor_page_link = require("../monitor_page_link");

var _hooks = require("../../../../hooks");

var _stringify_url_params = require("../../../../lib/helper/stringify_url_params");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MostRecentError = function MostRecentError(_ref) {
  var error = _ref.error,
      monitorId = _ref.monitorId,
      timestamp = _ref.timestamp;

  var _useUrlParams = (0, _hooks.useUrlParams)(),
      _useUrlParams2 = _slicedToArray(_useUrlParams, 1),
      getUrlParams = _useUrlParams2[0];

  var _getUrlParams = getUrlParams(),
      absoluteDateRangeStart = _getUrlParams.absoluteDateRangeStart,
      absoluteDateRangeEnd = _getUrlParams.absoluteDateRangeEnd,
      params = _objectWithoutProperties(_getUrlParams, ["absoluteDateRangeStart", "absoluteDateRangeEnd"]);

  params.selectedPingStatus = 'down';
  var linkParameters = (0, _stringify_url_params.stringifyUrlParams)(params, true);
  var timestampStr = timestamp ? (0, _moment.default)(new Date(timestamp).valueOf()).fromNow() : '';
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiText, {
    size: "xs"
  }, _react.default.createElement("h3", null, _i18n.i18n.translate('xpack.uptime.monitorList.mostRecentError.title', {
    defaultMessage: 'Most recent error ({timestamp})',
    values: {
      timestamp: timestampStr
    },
    description: 'Most Recent Error title in Monitor List Expanded row'
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_monitor_page_link.MonitorPageLink, {
    monitorId: monitorId,
    linkParameters: linkParameters
  }, error === null || error === void 0 ? void 0 : error.message));
};

exports.MostRecentError = MostRecentError;