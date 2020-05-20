"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useShowTimeline = void 0;

var _reactRouterDom = require("react-router-dom");

var _react = require("react");

var _types = require("../../pages/home/types");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var hideTimelineForRoutes = ["/".concat(_types.SiemPageName.case, "/configure")];

var useShowTimeline = function useShowTimeline() {
  var currentLocation = (0, _reactRouterDom.useLocation)();

  var _useState = (0, _react.useState)(!hideTimelineForRoutes.includes(currentLocation.pathname)),
      _useState2 = _slicedToArray(_useState, 2),
      showTimeline = _useState2[0],
      setShowTimeline = _useState2[1];

  (0, _react.useEffect)(function () {
    if (hideTimelineForRoutes.includes(currentLocation.pathname)) {
      if (showTimeline) {
        setShowTimeline(false);
      }
    } else if (!showTimeline) {
      setShowTimeline(true);
    }
  }, [currentLocation.pathname]);
  return [showTimeline];
};

exports.useShowTimeline = useShowTimeline;