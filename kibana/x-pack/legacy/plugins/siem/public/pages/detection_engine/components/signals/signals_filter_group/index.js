"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignalsTableFilterGroup = exports.FILTER_CLOSED = exports.FILTER_OPEN = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var i18n = _interopRequireWildcard(require("../translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var FILTER_OPEN = 'open';
exports.FILTER_OPEN = FILTER_OPEN;
var FILTER_CLOSED = 'closed';
exports.FILTER_CLOSED = FILTER_CLOSED;

var SignalsTableFilterGroupComponent = function SignalsTableFilterGroupComponent(_ref) {
  var onFilterGroupChanged = _ref.onFilterGroupChanged;

  var _useState = (0, _react.useState)(FILTER_OPEN),
      _useState2 = _slicedToArray(_useState, 2),
      filterGroup = _useState2[0],
      setFilterGroup = _useState2[1];

  var onClickOpenFilterCallback = (0, _react.useCallback)(function () {
    setFilterGroup(FILTER_OPEN);
    onFilterGroupChanged(FILTER_OPEN);
  }, [setFilterGroup, onFilterGroupChanged]);
  var onClickCloseFilterCallback = (0, _react.useCallback)(function () {
    setFilterGroup(FILTER_CLOSED);
    onFilterGroupChanged(FILTER_CLOSED);
  }, [setFilterGroup, onFilterGroupChanged]);
  return _react.default.createElement(_eui.EuiFilterGroup, null, _react.default.createElement(_eui.EuiFilterButton, {
    "data-test-subj": "openSignals",
    hasActiveFilters: filterGroup === FILTER_OPEN,
    onClick: onClickOpenFilterCallback,
    withNext: true
  }, i18n.OPEN_SIGNALS), _react.default.createElement(_eui.EuiFilterButton, {
    "data-test-subj": "closedSignals",
    hasActiveFilters: filterGroup === FILTER_CLOSED,
    onClick: onClickCloseFilterCallback
  }, i18n.CLOSED_SIGNALS));
};

var SignalsTableFilterGroup = _react.default.memo(SignalsTableFilterGroupComponent);

exports.SignalsTableFilterGroup = SignalsTableFilterGroup;