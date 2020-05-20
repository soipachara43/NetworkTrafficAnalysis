"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultEditor = DefaultEditor;

var _react = _interopRequireWildcard(require("react"));

var _public = require("../../../../plugins/kibana_react/public");

require("./vis_type_agg_filter");

var _sidebar = require("./components/sidebar");

var _editor_size = require("./editor_size");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function DefaultEditor(_ref) {
  var vis = _ref.vis,
      uiState = _ref.uiState,
      timeRange = _ref.timeRange,
      filters = _ref.filters,
      optionTabs = _ref.optionTabs,
      query = _ref.query,
      embeddableHandler = _ref.embeddableHandler,
      eventEmitter = _ref.eventEmitter,
      linked = _ref.linked,
      savedSearch = _ref.savedSearch;
  var visRef = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isCollapsed = _useState2[0],
      setIsCollapsed = _useState2[1];

  var onClickCollapse = (0, _react.useCallback)(function () {
    setIsCollapsed(function (value) {
      return !value;
    });
  }, []);
  (0, _react.useEffect)(function () {
    if (!visRef.current) {
      return;
    }

    embeddableHandler.render(visRef.current);
    setTimeout(function () {
      eventEmitter.emit('apply');
    });
    return function () {
      return embeddableHandler.destroy();
    };
  }, [embeddableHandler, eventEmitter]);
  (0, _react.useEffect)(function () {
    embeddableHandler.updateInput({
      timeRange: timeRange,
      filters: filters,
      query: query
    });
  }, [embeddableHandler, timeRange, filters, query]);
  var editorInitialWidth = (0, _editor_size.getInitialWidth)(vis.type.editorConfig.defaultSize);
  return _react.default.createElement(_public.PanelsContainer, {
    className: "visEditor--default",
    resizerClassName: "visEditor__resizer ".concat(isCollapsed ? 'visEditor__resizer-isHidden' : '')
  }, _react.default.createElement(_public.Panel, {
    className: "visEditor__visualization",
    initialWidth: 100 - editorInitialWidth
  }, _react.default.createElement("div", {
    className: "visEditor__canvas",
    ref: visRef,
    "data-shared-items-container": true
  })), _react.default.createElement(_public.Panel, {
    className: "visEditor__collapsibleSidebar ".concat(isCollapsed ? 'visEditor__collapsibleSidebar-isClosed' : ''),
    initialWidth: editorInitialWidth
  }, _react.default.createElement(_sidebar.DefaultEditorSideBar, {
    isCollapsed: isCollapsed,
    onClickCollapse: onClickCollapse,
    optionTabs: optionTabs,
    vis: vis,
    uiState: uiState,
    isLinkedSearch: linked,
    savedSearch: savedSearch,
    eventEmitter: eventEmitter
  })));
}