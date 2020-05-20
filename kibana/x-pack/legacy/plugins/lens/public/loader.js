"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Loader = Loader;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Executes the specified load function any time loadDeps changes. Ensures the load
 * function is never run in parallel. Shows a loading indicator while loading.
 */
function Loader(props) {
  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isProcessing = _useState2[0],
      setIsProcessing = _useState2[1];

  var prevRequest = (0, _react.useRef)(undefined);
  var nextRequest = (0, _react.useRef)(undefined);
  (0, _react.useEffect)(function performLoad() {
    if (prevRequest.current) {
      nextRequest.current = performLoad;
      return;
    }

    setIsProcessing(true);
    prevRequest.current = props.load().catch(function () {}).then(function () {
      var reload = nextRequest.current;
      prevRequest.current = undefined;
      nextRequest.current = undefined;

      if (reload) {
        reload();
      } else {
        setIsProcessing(false);
      }
    });
  }, props.loadDeps);

  if (!isProcessing) {
    return null;
  }

  return _react.default.createElement(_eui.EuiProgress, {
    size: "xs",
    color: "accent",
    position: "absolute"
  });
}