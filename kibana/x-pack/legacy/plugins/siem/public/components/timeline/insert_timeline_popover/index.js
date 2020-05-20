"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InsertTimelinePopover = exports.InsertTimelinePopoverComponent = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _reactRedux = require("react-redux");

var _selectable_timeline = require("../selectable_timeline");

var i18n = _interopRequireWildcard(require("../translations"));

var _timeline = require("../../../store/timeline");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var InsertTimelinePopoverComponent = function InsertTimelinePopoverComponent(_ref) {
  var isDisabled = _ref.isDisabled,
      _ref$hideUntitled = _ref.hideUntitled,
      hideUntitled = _ref$hideUntitled === void 0 ? false : _ref$hideUntitled,
      onTimelineChange = _ref.onTimelineChange;
  var dispatch = (0, _reactRedux.useDispatch)();

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isPopoverOpen = _useState2[0],
      setIsPopoverOpen = _useState2[1];

  var _useLocation = (0, _reactRouterDom.useLocation)(),
      state = _useLocation.state;

  var _useState3 = (0, _react.useState)(state !== null && state !== void 0 ? state : null),
      _useState4 = _slicedToArray(_useState3, 2),
      routerState = _useState4[0],
      setRouterState = _useState4[1];

  (0, _react.useEffect)(function () {
    if (routerState && routerState.insertTimeline) {
      dispatch(_timeline.timelineActions.showTimeline({
        id: routerState.insertTimeline.timelineId,
        show: false
      }));
      onTimelineChange(routerState.insertTimeline.timelineTitle, routerState.insertTimeline.timelineSavedObjectId);
      setRouterState(null);
    }
  }, [routerState]);
  var handleClosePopover = (0, _react.useCallback)(function () {
    setIsPopoverOpen(false);
  }, []);
  var handleOpenPopover = (0, _react.useCallback)(function () {
    setIsPopoverOpen(true);
  }, []);
  var insertTimelineButton = (0, _react.useMemo)(function () {
    return _react.default.createElement(_eui.EuiToolTip, {
      position: "top",
      content: _react.default.createElement("p", null, i18n.INSERT_TIMELINE)
    }, _react.default.createElement(_eui.EuiButtonIcon, {
      "aria-label": i18n.INSERT_TIMELINE,
      "data-test-subj": "insert-timeline-button",
      iconType: "timeline",
      isDisabled: isDisabled,
      onClick: handleOpenPopover
    }));
  }, [handleOpenPopover, isDisabled]);
  var handleGetSelectableOptions = (0, _react.useCallback)(function (_ref2) {
    var timelines = _ref2.timelines;
    return _toConsumableArray(timelines.map(function (t, index) {
      return {
        description: t.description,
        favorite: t.favorite,
        label: t.title,
        id: t.savedObjectId,
        key: "".concat(t.title, "-").concat(index),
        title: t.title,
        checked: undefined
      };
    }));
  }, []);
  return _react.default.createElement(_eui.EuiPopover, {
    "data-test-subj": "insert-timeline-popover",
    id: "searchTimelinePopover",
    button: insertTimelineButton,
    isOpen: isPopoverOpen,
    closePopover: handleClosePopover
  }, _react.default.createElement(_selectable_timeline.SelectableTimeline, {
    hideUntitled: hideUntitled,
    getSelectableOptions: handleGetSelectableOptions,
    onClosePopover: handleClosePopover,
    onTimelineChange: onTimelineChange
  }));
};

exports.InsertTimelinePopoverComponent = InsertTimelinePopoverComponent;
var InsertTimelinePopover = (0, _react.memo)(InsertTimelinePopoverComponent);
exports.InsertTimelinePopover = InsertTimelinePopover;