"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLongQueryNotification = getLongQueryNotification;
exports.LongQueryNotification = LongQueryNotification;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

var _public = require("../../../kibana_react/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getLongQueryNotification(props) {
  return (0, _public.toMountPoint)(_react2.default.createElement(LongQueryNotification, {
    application: props.application
  }));
}

function LongQueryNotification(props) {
  return _react2.default.createElement("div", null, _react2.default.createElement(_react.FormattedMessage, {
    id: "data.query.queryBar.longQueryMessage",
    defaultMessage: "With an upgraded license, you can ensure requests have enough time to complete."
  }), _react2.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react2.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "flexEnd",
    gutterSize: "s"
  }, _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(_eui.EuiButton, {
    size: "s",
    onClick:
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return props.application.navigateToApp('kibana#/management/elasticsearch/license_management');

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))
  }, _react2.default.createElement(_react.FormattedMessage, {
    id: "data.query.queryBar.licenseOptions",
    defaultMessage: "Go to license options"
  })))));
}