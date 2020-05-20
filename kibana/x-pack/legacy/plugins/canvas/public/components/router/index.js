"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Router = void 0;

var _reactRedux = require("react-redux");

var _transient = require("../../state/actions/transient");

var _workpad = require("../../state/actions/workpad");

var _router = require("./router");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mapDispatchToProps = {
  enableAutoplay: _workpad.enableAutoplay,
  setAutoplayInterval: _workpad.setAutoplayInterval,
  setFullscreen: _transient.setFullscreen,
  setRefreshInterval: _workpad.setRefreshInterval
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    refreshInterval: state.transient.refresh.interval,
    autoplayInterval: state.transient.autoplay.interval,
    autoplay: state.transient.autoplay.enabled,
    fullscreen: state.transient.fullScreen
  };
};

var Router = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps, function (stateProps, dispatchProps, ownProps) {
  return _objectSpread({}, ownProps, {}, dispatchProps, {
    setRefreshInterval: function setRefreshInterval(interval) {
      if (interval !== stateProps.refreshInterval) {
        dispatchProps.setRefreshInterval(interval);
      }
    },
    setAutoplayInterval: function setAutoplayInterval(interval) {
      if (interval !== stateProps.autoplayInterval) {
        dispatchProps.setRefreshInterval(interval);
      }
    },
    enableAutoplay: function enableAutoplay(autoplay) {
      if (autoplay !== stateProps.autoplay) {
        dispatchProps.enableAutoplay(autoplay);
      }
    },
    setFullscreen: function setFullscreen(fullscreen) {
      if (fullscreen !== stateProps.fullscreen) {
        dispatchProps.setFullscreen(fullscreen);
      }
    }
  });
})(_router.Router);
exports.Router = Router;