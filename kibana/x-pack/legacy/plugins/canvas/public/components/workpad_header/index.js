"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorkpadHeader = void 0;

var _reactRedux = require("react-redux");

var _app = require("../../state/selectors/app");

var _workpad = require("../../state/selectors/workpad");

var _workpad2 = require("../../state/actions/workpad");

var _workpad_header = require("./workpad_header");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mapStateToProps = function mapStateToProps(state) {
  return {
    isWriteable: (0, _workpad.isWriteable)(state) && (0, _app.canUserWrite)(state),
    canUserWrite: (0, _app.canUserWrite)(state),
    selectedPage: (0, _workpad.getSelectedPage)(state)
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setWriteable: function setWriteable(isWorkpadWriteable) {
      return dispatch((0, _workpad2.setWriteable)(isWorkpadWriteable));
    }
  };
};

var mergeProps = function mergeProps(stateProps, dispatchProps, ownProps) {
  return _objectSpread({}, stateProps, {}, dispatchProps, {}, ownProps, {
    toggleWriteable: function toggleWriteable() {
      return dispatchProps.setWriteable(!stateProps.isWriteable);
    }
  });
};

var WorkpadHeader = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps, mergeProps)(_workpad_header.WorkpadHeader);
exports.WorkpadHeader = WorkpadHeader;