"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debouncedComponent = debouncedComponent;

var _react = _interopRequireWildcard(require("react"));

var _lodash = require("lodash");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * debouncedComponent wraps the specified React component, returning a component which
 * only renders once there is a pause in props changes for at least `delay` milliseconds.
 * During the debounce phase, it will return the previously rendered value.
 */
function debouncedComponent(component) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 256;
  var MemoizedComponent = (0, _react.memo)(component);
  return function (props) {
    var _useState = (0, _react.useState)(props),
        _useState2 = _slicedToArray(_useState, 2),
        cachedProps = _useState2[0],
        setCachedProps = _useState2[1];

    var delayRender = (0, _react.useMemo)(function () {
      return (0, _lodash.debounce)(setCachedProps, delay);
    }, []);
    delayRender(props);
    return _react.default.createElement(MemoizedComponent, cachedProps);
  };
}