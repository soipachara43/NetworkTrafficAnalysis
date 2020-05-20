"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnHeaders = exports.ColumnHeadersComponent = exports.DraggableContainer = void 0;

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _react = _interopRequireWildcard(require("react"));

var _reactBeautifulDnd = require("react-beautiful-dnd");

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _draggable_wrapper = require("../../../drag_and_drop/draggable_wrapper");

var _field_badge = require("../../../draggables/field_badge");

var _helpers = require("../../../drag_and_drop/helpers");

var _fields_browser = require("../../../fields_browser");

var _helpers2 = require("../../../fields_browser/helpers");

var _styles = require("../../styles");

var _events_select = require("./events_select");

var _column_header = require("./column_header");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DraggableContainer = _react.default.memo(function (_ref) {
  var children = _ref.children,
      onMount = _ref.onMount,
      onUnmount = _ref.onUnmount;
  (0, _react.useEffect)(function () {
    onMount();
    return function () {
      return onUnmount();
    };
  }, [onMount, onUnmount]);
  return _react.default.createElement(_react.default.Fragment, null, children);
});

exports.DraggableContainer = DraggableContainer;
DraggableContainer.displayName = 'DraggableContainer';
/** Renders the timeline header columns */

var ColumnHeadersComponent = function ColumnHeadersComponent(_ref2) {
  var actionsColumnWidth = _ref2.actionsColumnWidth,
      browserFields = _ref2.browserFields,
      columnHeaders = _ref2.columnHeaders,
      _ref2$isEventViewer = _ref2.isEventViewer,
      isEventViewer = _ref2$isEventViewer === void 0 ? false : _ref2$isEventViewer,
      isSelectAllChecked = _ref2.isSelectAllChecked,
      onColumnRemoved = _ref2.onColumnRemoved,
      onColumnResized = _ref2.onColumnResized,
      onColumnSorted = _ref2.onColumnSorted,
      onSelectAll = _ref2.onSelectAll,
      onUpdateColumns = _ref2.onUpdateColumns,
      _ref2$onFilterChange = _ref2.onFilterChange,
      onFilterChange = _ref2$onFilterChange === void 0 ? _fp.noop : _ref2$onFilterChange,
      showEventsSelect = _ref2.showEventsSelect,
      showSelectAllCheckbox = _ref2.showSelectAllCheckbox,
      sort = _ref2.sort,
      timelineId = _ref2.timelineId,
      toggleColumn = _ref2.toggleColumn;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      draggingIndex = _useState2[0],
      setDraggingIndex = _useState2[1];

  var handleSelectAllChange = (0, _react.useCallback)(function (event) {
    onSelectAll({
      isSelected: event.currentTarget.checked
    });
  }, [onSelectAll]);
  var renderClone = (0, _react.useCallback)(function (dragProvided, dragSnapshot, rubric) {
    // TODO: Remove after github.com/DefinitelyTyped/DefinitelyTyped/pull/43057 is merged
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var index = rubric.source.index;
    var header = columnHeaders[index];

    var onMount = function onMount() {
      return setDraggingIndex(index);
    };

    var onUnmount = function onUnmount() {
      return setDraggingIndex(null);
    };

    return _react.default.createElement(_styles.EventsTh, _extends({
      "data-test-subj": "draggable-header"
    }, dragProvided.draggableProps, dragProvided.dragHandleProps, {
      ref: dragProvided.innerRef
    }), _react.default.createElement(DraggableContainer, {
      onMount: onMount,
      onUnmount: onUnmount
    }, _react.default.createElement(_draggable_wrapper.DragEffects, null, _react.default.createElement(_field_badge.DraggableFieldBadge, {
      fieldId: header.id,
      fieldWidth: header.width
    }))));
  }, [columnHeaders, setDraggingIndex]);
  var ColumnHeaderList = (0, _react.useMemo)(function () {
    return columnHeaders.map(function (header, draggableIndex) {
      return _react.default.createElement(_column_header.ColumnHeader, {
        key: header.id,
        draggableIndex: draggableIndex,
        timelineId: timelineId,
        header: header,
        isDragging: draggingIndex === draggableIndex,
        onColumnRemoved: onColumnRemoved,
        onColumnSorted: onColumnSorted,
        onFilterChange: onFilterChange,
        onColumnResized: onColumnResized,
        sort: sort
      });
    });
  }, [columnHeaders, timelineId, draggingIndex, onColumnRemoved, onFilterChange, onColumnResized, sort]);
  return _react.default.createElement(_styles.EventsThead, {
    "data-test-subj": "column-headers"
  }, _react.default.createElement(_styles.EventsTrHeader, null, _react.default.createElement(_styles.EventsThGroupActions, {
    actionsColumnWidth: actionsColumnWidth,
    justifyContent: showSelectAllCheckbox ? 'flexStart' : 'space-between',
    "data-test-subj": "actions-container"
  }, showEventsSelect && _react.default.createElement(_styles.EventsTh, null, _react.default.createElement(_styles.EventsThContent, {
    textAlign: "center"
  }, _react.default.createElement(_events_select.EventsSelect, {
    checkState: "unchecked",
    timelineId: timelineId
  }))), showSelectAllCheckbox && _react.default.createElement(_styles.EventsTh, null, _react.default.createElement(_styles.EventsThContent, {
    textAlign: "center"
  }, _react.default.createElement(_eui.EuiCheckbox, {
    "data-test-subj": "select-all-events",
    id: 'select-all-events',
    checked: isSelectAllChecked,
    onChange: handleSelectAllChange
  }))), _react.default.createElement(_styles.EventsTh, null, _react.default.createElement(_styles.EventsThContent, {
    textAlign: showSelectAllCheckbox ? 'left' : 'center'
  }, _react.default.createElement(_fields_browser.StatefulFieldsBrowser, {
    browserFields: browserFields,
    columnHeaders: columnHeaders,
    "data-test-subj": "field-browser",
    height: _helpers2.FIELD_BROWSER_HEIGHT,
    isEventViewer: isEventViewer,
    onUpdateColumns: onUpdateColumns,
    timelineId: timelineId,
    toggleColumn: toggleColumn,
    width: _helpers2.FIELD_BROWSER_WIDTH
  })))), _react.default.createElement(_reactBeautifulDnd.Droppable, {
    direction: 'horizontal',
    droppableId: "".concat(_helpers.droppableTimelineColumnsPrefix).concat(timelineId),
    isDropDisabled: false,
    type: _helpers.DRAG_TYPE_FIELD,
    renderClone: renderClone
  }, function (dropProvided, snapshot) {
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_styles.EventsThGroupData, _extends({
      "data-test-subj": "headers-group",
      ref: dropProvided.innerRef,
      isDragging: snapshot.isDraggingOver
    }, dropProvided.droppableProps), ColumnHeaderList));
  })));
};

exports.ColumnHeadersComponent = ColumnHeadersComponent;

var ColumnHeaders = _react.default.memo(ColumnHeadersComponent, function (prevProps, nextProps) {
  return prevProps.actionsColumnWidth === nextProps.actionsColumnWidth && prevProps.isEventViewer === nextProps.isEventViewer && prevProps.isSelectAllChecked === nextProps.isSelectAllChecked && prevProps.onColumnRemoved === nextProps.onColumnRemoved && prevProps.onColumnResized === nextProps.onColumnResized && prevProps.onColumnSorted === nextProps.onColumnSorted && prevProps.onSelectAll === nextProps.onSelectAll && prevProps.onUpdateColumns === nextProps.onUpdateColumns && prevProps.onFilterChange === nextProps.onFilterChange && prevProps.showEventsSelect === nextProps.showEventsSelect && prevProps.showSelectAllCheckbox === nextProps.showSelectAllCheckbox && prevProps.sort === nextProps.sort && prevProps.timelineId === nextProps.timelineId && prevProps.toggleColumn === nextProps.toggleColumn && (0, _fastDeepEqual.default)(prevProps.columnHeaders, nextProps.columnHeaders) && (0, _fastDeepEqual.default)(prevProps.browserFields, nextProps.browserFields);
});

exports.ColumnHeaders = ColumnHeaders;