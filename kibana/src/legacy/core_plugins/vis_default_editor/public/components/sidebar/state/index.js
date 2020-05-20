"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  useEditorReducer: true
};
exports.useEditorReducer = useEditorReducer;

var _react = require("react");

var _reducers = require("./reducers");

var _constants = require("./constants");

var _public = require("../../../../../../../plugins/kibana_react/public");

var _editor_form_state = require("./editor_form_state");

Object.keys(_editor_form_state).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _editor_form_state[key];
    }
  });
});

var _actions = require("./actions");

Object.keys(_actions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _actions[key];
    }
  });
});

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useEditorReducer(vis, eventEmitter) {
  var _useKibana = (0, _public.useKibana)(),
      services = _useKibana.services;

  var _useReducer = (0, _react.useReducer)((0, _reducers.createEditorStateReducer)(services.data.search), vis, _reducers.initEditorState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var wrappedDispatch = (0, _react.useCallback)(function (action) {
    dispatch(action);
    eventEmitter.emit('dirtyStateChange', {
      isDirty: action.type !== _constants.EditorStateActionTypes.DISCARD_CHANGES
    });
  }, [eventEmitter]);
  return [state, wrappedDispatch];
}