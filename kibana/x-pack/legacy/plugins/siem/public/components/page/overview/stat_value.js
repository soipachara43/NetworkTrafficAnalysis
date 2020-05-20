"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatValue = void 0;

var _eui = require("@elastic/eui");

var _numeral = _interopRequireDefault(require("@elastic/numeral"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _constants = require("../../../../common/constants");

var _kibana = require("../../../lib/kibana");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ProgressContainer = _styledComponents.default.div.withConfig({
  displayName: "ProgressContainer",
  componentId: "xzh8q4-0"
})(["margin-left:8px;min-width:100px;"]);

var LoadingContent = (0, _styledComponents.default)(_eui.EuiLoadingContent).withConfig({
  displayName: "LoadingContent",
  componentId: "xzh8q4-1"
})([".euiLoadingContent__singleLine{margin-bottom:0px;}"]);

var StatValueComponent = function StatValueComponent(_ref) {
  var count = _ref.count,
      isGroupStat = _ref.isGroupStat,
      isLoading = _ref.isLoading,
      max = _ref.max;

  var _useUiSetting$ = (0, _kibana.useUiSetting$)(_constants.DEFAULT_NUMBER_FORMAT),
      _useUiSetting$2 = _slicedToArray(_useUiSetting$, 1),
      defaultNumberFormat = _useUiSetting$2[0];

  var _useState = (0, _react.useState)(true),
      _useState2 = _slicedToArray(_useState, 2),
      isInitialLoading = _useState2[0],
      setIsInitialLoading = _useState2[1];

  (0, _react.useEffect)(function () {
    if (isInitialLoading && !isLoading) {
      setIsInitialLoading(false);
    }
  }, [isLoading, isInitialLoading, setIsInitialLoading]);
  return _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "none"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, !isInitialLoading && _react.default.createElement(_eui.EuiText, {
    color: isGroupStat ? 'default' : 'subdued',
    size: isGroupStat ? 'm' : 's'
  }, (0, _numeral.default)(count).format(defaultNumberFormat))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: true
  }, _react.default.createElement(ProgressContainer, null, isLoading ? _react.default.createElement(LoadingContent, {
    "data-test-subj": "stat-value-loading-spinner",
    lines: 1
  }) : _react.default.createElement(_eui.EuiProgress, {
    color: isGroupStat ? 'primary' : 'subdued',
    max: max,
    size: "m",
    value: count
  }))));
};

StatValueComponent.displayName = 'StatValueComponent';

var StatValue = _react.default.memo(StatValueComponent);

exports.StatValue = StatValue;