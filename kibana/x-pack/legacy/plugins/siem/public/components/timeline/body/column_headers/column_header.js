"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnHeader = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactBeautifulDnd = require("react-beautiful-dnd");

var _reResizable = require("re-resizable");

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _helpers = require("../../../drag_and_drop/helpers");

var _styles = require("../../styles");

var _header = require("./header");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var RESIZABLE_ENABLE = {
  right: true
};

var ColumnHeaderComponent = function ColumnHeaderComponent(_ref) {
  var draggableIndex = _ref.draggableIndex,
      header = _ref.header,
      timelineId = _ref.timelineId,
      isDragging = _ref.isDragging,
      onColumnRemoved = _ref.onColumnRemoved,
      onColumnResized = _ref.onColumnResized,
      onColumnSorted = _ref.onColumnSorted,
      onFilterChange = _ref.onFilterChange,
      sort = _ref.sort;
  var resizableSize = (0, _react.useMemo)(function () {
    return {
      width: header.width,
      height: 'auto'
    };
  }, [header.width]);
  var resizableStyle = (0, _react.useMemo)(function () {
    return {
      position: isDragging ? 'absolute' : 'relative'
    };
  }, [isDragging]);
  var resizableHandleComponent = (0, _react.useMemo)(function () {
    return {
      right: _react.default.createElement(_styles.EventsHeadingHandle, null)
    };
  }, []);
  var handleResizeStop = (0, _react.useCallback)(function (e, direction, ref, delta) {
    onColumnResized({
      columnId: header.id,
      delta: delta.width
    });
  }, [header.id, onColumnResized]);
  var draggableId = (0, _react.useMemo)(function () {
    return (0, _helpers.getDraggableFieldId)({
      contextId: "timeline-column-headers-".concat(timelineId),
      fieldId: header.id
    });
  }, [timelineId, header.id]);
  return _react.default.createElement(_reResizable.Resizable, {
    enable: RESIZABLE_ENABLE,
    size: resizableSize,
    style: resizableStyle,
    handleComponent: resizableHandleComponent,
    onResizeStop: handleResizeStop
  }, _react.default.createElement(_reactBeautifulDnd.Draggable, {
    "data-test-subj": "draggable" // Required for drag events while hovering the sort button to work: https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/draggable.md#interactive-child-elements-within-a-draggable-
    ,
    disableInteractiveElementBlocking: true,
    draggableId: draggableId,
    index: draggableIndex,
    key: header.id
  }, function (dragProvided) {
    return _react.default.createElement(_styles.EventsTh, _extends({
      "data-test-subj": "draggable-header"
    }, dragProvided.draggableProps, dragProvided.dragHandleProps, {
      ref: dragProvided.innerRef
    }), _react.default.createElement(_styles.EventsThContent, null, _react.default.createElement(_header.Header, {
      timelineId: timelineId,
      header: header,
      onColumnRemoved: onColumnRemoved,
      onColumnSorted: onColumnSorted,
      onFilterChange: onFilterChange,
      sort: sort
    })));
  }));
};

var ColumnHeader = _react.default.memo(ColumnHeaderComponent, function (prevProps, nextProps) {
  return prevProps.draggableIndex === nextProps.draggableIndex && prevProps.timelineId === nextProps.timelineId && prevProps.isDragging === nextProps.isDragging && prevProps.onColumnRemoved === nextProps.onColumnRemoved && prevProps.onColumnResized === nextProps.onColumnResized && prevProps.onColumnSorted === nextProps.onColumnSorted && prevProps.onFilterChange === nextProps.onFilterChange && prevProps.sort === nextProps.sort && (0, _fastDeepEqual.default)(prevProps.header, nextProps.header);
});

exports.ColumnHeader = ColumnHeader;