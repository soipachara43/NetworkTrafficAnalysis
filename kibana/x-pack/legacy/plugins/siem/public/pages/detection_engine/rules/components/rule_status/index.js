"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RuleStatus = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _rules = require("../../../../../containers/detection_engine/rules");

var _formatted_date = require("../../../../../components/formatted_date");

var _empty_value = require("../../../../../components/empty_value");

var _helpers = require("./helpers");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var RuleStatusComponent = function RuleStatusComponent(_ref) {
  var _ref2, _ref4, _ref5;

  var ruleId = _ref.ruleId,
      ruleEnabled = _ref.ruleEnabled;

  var _useRuleStatus = (0, _rules.useRuleStatus)(ruleId),
      _useRuleStatus2 = _slicedToArray(_useRuleStatus, 3),
      loading = _useRuleStatus2[0],
      ruleStatus = _useRuleStatus2[1],
      fetchRuleStatus = _useRuleStatus2[2];

  var _useState = (0, _react.useState)(ruleEnabled !== null && ruleEnabled !== void 0 ? ruleEnabled : null),
      _useState2 = _slicedToArray(_useState, 2),
      myRuleEnabled = _useState2[0],
      setMyRuleEnabled = _useState2[1];

  var _useState3 = (0, _react.useState)((_ref2 = ruleStatus === null || ruleStatus === void 0 ? void 0 : ruleStatus.current_status) !== null && _ref2 !== void 0 ? _ref2 : null),
      _useState4 = _slicedToArray(_useState3, 2),
      currentStatus = _useState4[0],
      setCurrentStatus = _useState4[1];

  (0, _react.useEffect)(function () {
    if (myRuleEnabled !== ruleEnabled && fetchRuleStatus != null && ruleId != null) {
      fetchRuleStatus(ruleId);

      if (myRuleEnabled !== ruleEnabled) {
        setMyRuleEnabled(ruleEnabled !== null && ruleEnabled !== void 0 ? ruleEnabled : null);
      }
    }
  }, [fetchRuleStatus, myRuleEnabled, ruleId, ruleEnabled, setMyRuleEnabled]);
  (0, _react.useEffect)(function () {
    if (!(0, _fastDeepEqual.default)(currentStatus, ruleStatus === null || ruleStatus === void 0 ? void 0 : ruleStatus.current_status)) {
      var _ref3;

      setCurrentStatus((_ref3 = ruleStatus === null || ruleStatus === void 0 ? void 0 : ruleStatus.current_status) !== null && _ref3 !== void 0 ? _ref3 : null);
    }
  }, [currentStatus, ruleStatus, setCurrentStatus]);
  var handleRefresh = (0, _react.useCallback)(function () {
    if (fetchRuleStatus != null && ruleId != null) {
      fetchRuleStatus(ruleId);
    }
  }, [fetchRuleStatus, ruleId]);
  return _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "xs",
    alignItems: "center",
    justifyContent: "flexStart"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, i18n.STATUS, ':'), loading && _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiLoadingSpinner, {
    size: "m",
    "data-test-subj": "rule-status-loader"
  })), !loading && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiHealth, {
    color: (0, _helpers.getStatusColor)((_ref4 = currentStatus === null || currentStatus === void 0 ? void 0 : currentStatus.status) !== null && _ref4 !== void 0 ? _ref4 : null)
  }, _react.default.createElement(_eui.EuiText, {
    size: "xs"
  }, (_ref5 = currentStatus === null || currentStatus === void 0 ? void 0 : currentStatus.status) !== null && _ref5 !== void 0 ? _ref5 : (0, _empty_value.getEmptyTagValue)()))), (currentStatus === null || currentStatus === void 0 ? void 0 : currentStatus.status_date) != null && (currentStatus === null || currentStatus === void 0 ? void 0 : currentStatus.status) != null && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_react.default.Fragment, null, i18n.STATUS_AT)), _react.default.createElement(_eui.EuiFlexItem, {
    grow: true
  }, _react.default.createElement(_formatted_date.FormattedDate, {
    value: currentStatus === null || currentStatus === void 0 ? void 0 : currentStatus.status_date,
    fieldName: i18n.STATUS_DATE
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonIcon, {
    color: "primary",
    onClick: handleRefresh,
    iconType: "refresh",
    "aria-label": i18n.REFRESH
  }))));
};

var RuleStatus = (0, _react.memo)(RuleStatusComponent);
exports.RuleStatus = RuleStatus;