"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useInsertTimeline = void 0;

var _react = require("react");

var _kibana = require("../../../lib/kibana");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useInsertTimeline = function useInsertTimeline(form, fieldName) {
  var basePath = window.location.origin + (0, _kibana.useBasePath)();

  var _useState = (0, _react.useState)({
    start: 0,
    end: 0
  }),
      _useState2 = _slicedToArray(_useState, 2),
      cursorPosition = _useState2[0],
      setCursorPosition = _useState2[1];

  var handleOnTimelineChange = (0, _react.useCallback)(function (title, id) {
    var builtLink = "".concat(basePath, "/app/siem#/timelines?timeline=(id:'").concat(id, "',isOpen:!t)");
    var currentValue = form.getFormData()[fieldName];
    var newValue = [currentValue.slice(0, cursorPosition.start), cursorPosition.start === cursorPosition.end ? "[".concat(title, "](").concat(builtLink, ")") : "[".concat(currentValue.slice(cursorPosition.start, cursorPosition.end), "](").concat(builtLink, ")"), currentValue.slice(cursorPosition.end)].join('');
    form.setFieldValue(fieldName, newValue);
  }, [form]);
  var handleCursorChange = (0, _react.useCallback)(function (cp) {
    setCursorPosition(cp);
  }, [cursorPosition]);
  return {
    cursorPosition: cursorPosition,
    handleCursorChange: handleCursorChange,
    handleOnTimelineChange: handleOnTimelineChange
  };
};

exports.useInsertTimeline = useInsertTimeline;