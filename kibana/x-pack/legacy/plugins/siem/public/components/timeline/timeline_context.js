"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManageTimelineContext = exports.useTimelineTypeContext = exports.TimelineTypeContext = exports.useTimelineContext = exports.TimelineContext = void 0;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var initTimelineContext = false;
var TimelineContext = (0, _react.createContext)(initTimelineContext);
exports.TimelineContext = TimelineContext;

var useTimelineContext = function useTimelineContext() {
  return (0, _react.useContext)(TimelineContext);
};

exports.useTimelineContext = useTimelineContext;
var initTimelineType = {
  documentType: undefined,
  footerText: undefined,
  loadingText: undefined,
  queryFields: [],
  selectAll: false,
  timelineActions: [],
  title: undefined,
  unit: undefined
};
var TimelineTypeContext = (0, _react.createContext)(initTimelineType);
exports.TimelineTypeContext = TimelineTypeContext;

var useTimelineTypeContext = function useTimelineTypeContext() {
  return (0, _react.useContext)(TimelineTypeContext);
};

exports.useTimelineTypeContext = useTimelineTypeContext;

// todo we need to refactor this as more complex context/reducer with useReducer
// to avoid so many Context, at least the separation of code is there now
var ManageTimelineContextComponent = function ManageTimelineContextComponent(_ref) {
  var children = _ref.children,
      loading = _ref.loading,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? initTimelineType : _ref$type;

  var _useState = (0, _react.useState)(initTimelineContext),
      _useState2 = _slicedToArray(_useState, 2),
      myLoading = _useState2[0],
      setLoading = _useState2[1];

  var _useState3 = (0, _react.useState)(initTimelineType),
      _useState4 = _slicedToArray(_useState3, 2),
      myType = _useState4[0],
      setType = _useState4[1];

  (0, _react.useEffect)(function () {
    setLoading(loading);
  }, [loading]);
  (0, _react.useEffect)(function () {
    setType(type);
  }, [type]);
  return _react.default.createElement(TimelineContext.Provider, {
    value: myLoading
  }, _react.default.createElement(TimelineTypeContext.Provider, {
    value: myType
  }, children));
};

var ManageTimelineContext = (0, _react.memo)(ManageTimelineContextComponent);
exports.ManageTimelineContext = ManageTimelineContext;