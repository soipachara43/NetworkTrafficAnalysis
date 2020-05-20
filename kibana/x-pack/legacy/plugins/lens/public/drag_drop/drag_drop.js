"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DragDrop = DragDrop;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _providers = require("./providers");

var _lens_ui_telemetry = require("../lens_ui_telemetry");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * A draggable / droppable item. Items can be both draggable and droppable at
 * the same time.
 *
 * @param props
 */
function DragDrop(props) {
  var _useContext = (0, _react.useContext)(_providers.DragContext),
      dragging = _useContext.dragging,
      setDragging = _useContext.setDragging;

  var _useState = (0, _react.useState)({
    isActive: false
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var className = props.className,
      onDrop = props.onDrop,
      value = props.value,
      children = props.children,
      droppable = props.droppable,
      draggable = props.draggable;
  var isDragging = draggable && value === dragging;
  var classes = (0, _classnames.default)('lnsDragDrop', className, {
    'lnsDragDrop-isDropTarget': droppable,
    'lnsDragDrop-isActiveDropTarget': droppable && state.isActive,
    'lnsDragDrop-isDragging': isDragging
  });

  var dragStart = function dragStart(e) {
    // Setting stopPropgagation causes Chrome failures, so
    // we are manually checking if we've already handled this
    // in a nested child, and doing nothing if so...
    if (e.dataTransfer.getData('text')) {
      return;
    } // We only can reach the dragStart method if the element is draggable,
    // so we know we have DraggableProps if we reach this code.


    e.dataTransfer.setData('text', props.label); // Chrome causes issues if you try to render from within a
    // dragStart event, so we drop a setTimeout to avoid that.

    setTimeout(function () {
      return setDragging(value);
    });
  };

  var dragEnd = function dragEnd(e) {
    e.stopPropagation();
    setDragging(undefined);
  };

  var dragOver = function dragOver(e) {
    if (!droppable) {
      return;
    }

    e.preventDefault(); // An optimization to prevent a bunch of React churn.

    if (!state.isActive) {
      setState(_objectSpread({}, state, {
        isActive: true
      }));
    }
  };

  var dragLeave = function dragLeave() {
    setState(_objectSpread({}, state, {
      isActive: false
    }));
  };

  var drop = function drop(e) {
    e.preventDefault();
    e.stopPropagation();
    setState(_objectSpread({}, state, {
      isActive: false
    }));
    setDragging(undefined);

    if (onDrop && droppable) {
      (0, _lens_ui_telemetry.trackUiEvent)('drop_total');
      onDrop(dragging);
    }
  };

  return _react.default.createElement("div", {
    "data-test-subj": props['data-test-subj'] || 'lnsDragDrop',
    className: classes,
    onDragOver: dragOver,
    onDragLeave: dragLeave,
    onDrop: drop,
    draggable: draggable,
    onDragEnd: dragEnd,
    onDragStart: dragStart
  }, children);
}