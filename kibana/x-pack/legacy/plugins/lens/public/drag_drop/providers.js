"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RootDragDropProvider = RootDragDropProvider;
exports.ChildDragDropProvider = ChildDragDropProvider;
exports.DragContext = void 0;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * The drag / drop context singleton, used like so:
 *
 * const { dragging, setDragging } = useContext(DragContext);
 */
var DragContext = _react.default.createContext({
  dragging: undefined,
  setDragging: function setDragging() {}
});
/**
 * The argument to DragDropProvider.
 */


exports.DragContext = DragContext;

/**
 * A React provider that tracks the dragging state. This should
 * be placed at the root of any React application that supports
 * drag / drop.
 *
 * @param props
 */
function RootDragDropProvider(_ref) {
  var children = _ref.children;

  var _useState = (0, _react.useState)({
    dragging: undefined
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var setDragging = (0, _react.useMemo)(function () {
    return function (dragging) {
      return setState({
        dragging: dragging
      });
    };
  }, [setState]);
  return _react.default.createElement(ChildDragDropProvider, {
    dragging: state.dragging,
    setDragging: setDragging
  }, children);
}
/**
 * A React drag / drop provider that derives its state from a RootDragDropProvider. If
 * part of a React application is rendered separately from the root, this provider can
 * be used to enable drag / drop functionality within the disconnected part.
 *
 * @param props
 */


function ChildDragDropProvider(_ref2) {
  var dragging = _ref2.dragging,
      setDragging = _ref2.setDragging,
      children = _ref2.children;
  var value = (0, _react.useMemo)(function () {
    return {
      dragging: dragging,
      setDragging: setDragging
    };
  }, [setDragging, dragging]);
  return _react.default.createElement(DragContext.Provider, {
    value: value
  }, children);
}