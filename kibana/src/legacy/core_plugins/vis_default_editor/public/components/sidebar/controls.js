"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultEditorControls = DefaultEditorControls;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _reactUse = require("react-use");

var _state = require("./state");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function DefaultEditorControls(_ref) {
  var applyChanges = _ref.applyChanges,
      isDirty = _ref.isDirty,
      isInvalid = _ref.isInvalid,
      isTouched = _ref.isTouched,
      dispatch = _ref.dispatch,
      vis = _ref.vis;
  var enableAutoApply = vis.type.editorConfig.enableAutoApply;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      autoApplyEnabled = _useState2[0],
      setAutoApplyEnabled = _useState2[1];

  var toggleAutoApply = (0, _react.useCallback)(function (e) {
    return setAutoApplyEnabled(e.target.checked);
  }, []);
  var onClickDiscard = (0, _react.useCallback)(function () {
    return dispatch((0, _state.discardChanges)(vis));
  }, [dispatch, vis]);
  (0, _reactUse.useDebounce)(function () {
    if (autoApplyEnabled && isDirty) {
      applyChanges();
    }
  }, 300, [isDirty, autoApplyEnabled, applyChanges]);
  return _react.default.createElement("div", {
    className: "visEditorSidebar__controls"
  }, !autoApplyEnabled && _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween",
    gutterSize: "none",
    responsive: false
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    "data-test-subj": "visualizeEditorResetButton",
    disabled: !isDirty,
    iconType: "cross",
    onClick: onClickDiscard,
    size: "s"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "visDefaultEditor.sidebar.discardChangesButtonLabel",
    defaultMessage: "Discard"
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, isInvalid && isTouched ? _react.default.createElement(_eui.EuiToolTip, {
    content: _i18n.i18n.translate('visDefaultEditor.sidebar.errorButtonTooltip', {
      defaultMessage: 'Errors in the highlighted fields need to be resolved.'
    })
  }, _react.default.createElement(_eui.EuiButton, {
    color: "danger",
    iconType: "alert",
    size: "s",
    disabled: true
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "visDefaultEditor.sidebar.updateChartButtonLabel",
    defaultMessage: "Update"
  }))) : _react.default.createElement(_eui.EuiButton, {
    "data-test-subj": "visualizeEditorRenderButton",
    disabled: !isDirty,
    fill: true,
    iconType: "play",
    onClick: applyChanges,
    size: "s"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "visDefaultEditor.sidebar.updateChartButtonLabel",
    defaultMessage: "Update"
  })))), enableAutoApply && _react.default.createElement(_eui.EuiToolTip, {
    title: autoApplyEnabled ? _i18n.i18n.translate('visDefaultEditor.sidebar.autoApplyChangesOnLabel', {
      defaultMessage: 'Auto apply is on'
    }) : _i18n.i18n.translate('visDefaultEditor.sidebar.autoApplyChangesOffLabel', {
      defaultMessage: 'Auto apply is off'
    }),
    content: _i18n.i18n.translate('visDefaultEditor.sidebar.autoApplyChangesTooltip', {
      defaultMessage: 'Auto updates the visualization on every change.'
    })
  }, _react.default.createElement(_eui.EuiButtonToggle, {
    label: _i18n.i18n.translate('visDefaultEditor.sidebar.autoApplyChangesAriaLabel', {
      defaultMessage: 'Auto apply editor changes'
    }),
    className: "visEditorSidebar__autoApplyButton",
    "data-test-subj": "visualizeEditorAutoButton",
    fill: autoApplyEnabled,
    iconType: "refresh",
    isSelected: autoApplyEnabled,
    onChange: toggleAutoApply,
    size: "s",
    isIconOnly: true
  })));
}