"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LastUpdatedAt = exports.Updated = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Updated = _react2.default.memo(function (_ref) {
  var date = _ref.date,
      prefix = _ref.prefix,
      updatedAt = _ref.updatedAt;
  return _react2.default.createElement(_react2.default.Fragment, null, prefix, _react2.default.createElement(_react.FormattedRelative, {
    "data-test-subj": "last-updated-at-date",
    key: "formatedRelative-".concat(date),
    value: new Date(updatedAt)
  }));
});

exports.Updated = Updated;
Updated.displayName = 'Updated';
var prefix = " ".concat(i18n.UPDATED, " ");

var LastUpdatedAt = _react2.default.memo(function (_ref2) {
  var _ref2$compact = _ref2.compact,
      compact = _ref2$compact === void 0 ? false : _ref2$compact,
      updatedAt = _ref2.updatedAt;

  var _useState = (0, _react2.useState)(Date.now()),
      _useState2 = _slicedToArray(_useState, 2),
      date = _useState2[0],
      setDate = _useState2[1];

  function tick() {
    setDate(Date.now());
  }

  (0, _react2.useEffect)(function () {
    var timerID = setInterval(function () {
      return tick();
    }, 10000);
    return function () {
      clearInterval(timerID);
    };
  }, []);
  return _react2.default.createElement(_eui.EuiToolTip, {
    "data-test-subj": "timeline-stream-tool-tip",
    content: _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(Updated, {
      date: date,
      prefix: prefix,
      updatedAt: updatedAt
    }))
  }, _react2.default.createElement(_eui.EuiText, {
    size: "s"
  }, _react2.default.createElement(_eui.EuiIcon, {
    "data-test-subj": "last-updated-at-clock-icon",
    type: "clock"
  }), !compact ? _react2.default.createElement(Updated, {
    date: date,
    prefix: prefix,
    updatedAt: updatedAt
  }) : null));
});

exports.LastUpdatedAt = LastUpdatedAt;
LastUpdatedAt.displayName = 'LastUpdatedAt';