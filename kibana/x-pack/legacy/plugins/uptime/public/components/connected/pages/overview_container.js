"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OverviewPage = void 0;

var _reactRedux = require("react-redux");

var _overview = require("../../../pages/overview");

var _selectors = require("../../../state/selectors");

var _actions = require("../../../state/actions");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setEsKueryFilters: function setEsKueryFilters(esFilters) {
      return dispatch((0, _actions.setEsKueryString)(esFilters));
    }
  };
};

var mapStateToProps = function mapStateToProps(state) {
  return _objectSpread({}, (0, _selectors.selectIndexPattern)(state));
};

var OverviewPage = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_overview.OverviewPageComponent);
exports.OverviewPage = OverviewPage;