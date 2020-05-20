"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Editor = void 0;

var _react = _interopRequireWildcard(require("react"));

var _lodash = require("lodash");

var _eui = require("@elastic/eui");

var _components = require("../../components");

var _public = require("../../../../../kibana_react/public");

var _console_editor = require("./legacy/console_editor");

var _services = require("../../../services");

var _contexts = require("../../contexts");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var INITIAL_PANEL_WIDTH = 50;
var PANEL_MIN_WIDTH = '100px';
var Editor = (0, _react.memo)(function (_ref) {
  var loading = _ref.loading;

  var _useServicesContext = (0, _contexts.useServicesContext)(),
      storage = _useServicesContext.services.storage;

  var _useEditorReadContext = (0, _contexts.useEditorReadContext)(),
      currentTextObject = _useEditorReadContext.currentTextObject;

  var _useRequestReadContex = (0, _contexts.useRequestReadContext)(),
      requestInFlight = _useRequestReadContex.requestInFlight;

  var _storage$get = storage.get(_services.StorageKeys.WIDTH, [INITIAL_PANEL_WIDTH, INITIAL_PANEL_WIDTH]),
      _storage$get2 = _slicedToArray(_storage$get, 2),
      firstPanelWidth = _storage$get2[0],
      secondPanelWidth = _storage$get2[1];

  var onPanelWidthChange = (0, _react.useCallback)((0, _lodash.debounce)(function (widths) {
    storage.set(_services.StorageKeys.WIDTH, widths);
  }, 300), []);
  if (!currentTextObject) return null;
  return _react.default.createElement(_react.default.Fragment, null, requestInFlight ? _react.default.createElement("div", {
    className: "conApp__requestProgressBarContainer"
  }, _react.default.createElement(_eui.EuiProgress, {
    size: "xs",
    color: "accent",
    position: "absolute"
  })) : null, _react.default.createElement(_public.PanelsContainer, {
    onPanelWidthChange: onPanelWidthChange,
    resizerClassName: "conApp__resizer"
  }, _react.default.createElement(_public.Panel, {
    style: {
      height: '100%',
      position: 'relative',
      minWidth: PANEL_MIN_WIDTH
    },
    initialWidth: firstPanelWidth
  }, loading ? _react.default.createElement(_components.EditorContentSpinner, null) : _react.default.createElement(_console_editor.Editor, {
    initialTextValue: currentTextObject.text
  })), _react.default.createElement(_public.Panel, {
    style: {
      height: '100%',
      position: 'relative',
      minWidth: PANEL_MIN_WIDTH
    },
    initialWidth: secondPanelWidth
  }, loading ? _react.default.createElement(_components.EditorContentSpinner, null) : _react.default.createElement(_console_editor.EditorOutput, null))));
});
exports.Editor = Editor;