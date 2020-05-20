"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDelayedVisibility = useDelayedVisibility;

var _react = require("react");

var _Delayed = require("./Delayed");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useDelayedVisibility(visible, hideDelayMs, showDelayMs, minimumVisibleDuration) {
  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isVisible = _useState2[0],
      setIsVisible = _useState2[1];

  var delayedRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    var delayed = new _Delayed.Delayed({
      hideDelayMs: hideDelayMs,
      showDelayMs: showDelayMs,
      minimumVisibleDuration: minimumVisibleDuration
    });
    delayed.onChange(function (visibility) {
      setIsVisible(visibility);
    });
    delayedRef.current = delayed;
    return function () {
      delayed.destroy();
    };
  }, [hideDelayMs, showDelayMs, minimumVisibleDuration]);
  (0, _react.useEffect)(function () {
    if (!delayedRef.current) {
      return;
    }

    if (visible) {
      delayedRef.current.show();
    } else {
      delayedRef.current.hide();
    }
  }, [visible]);
  return isVisible;
}