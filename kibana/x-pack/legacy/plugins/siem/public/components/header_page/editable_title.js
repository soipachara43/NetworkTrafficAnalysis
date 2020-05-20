"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditableTitle = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _eui = require("@elastic/eui");

var i18n = _interopRequireWildcard(require("./translations"));

var _title = require("./title");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MyEuiButtonIcon = (0, _styledComponents.default)(_eui.EuiButtonIcon).withConfig({
  displayName: "MyEuiButtonIcon",
  componentId: "awlgno-0"
})(["", ""], function (_ref) {
  var theme = _ref.theme;
  return (0, _styledComponents.css)(["margin-left:", ";"], theme.eui.euiSize);
});
var MySpinner = (0, _styledComponents.default)(_eui.EuiLoadingSpinner).withConfig({
  displayName: "MySpinner",
  componentId: "awlgno-1"
})(["", ""], function (_ref2) {
  var theme = _ref2.theme;
  return (0, _styledComponents.css)(["margin-left:", ";"], theme.eui.euiSize);
});

var EditableTitleComponent = function EditableTitleComponent(_ref3) {
  var _ref3$disabled = _ref3.disabled,
      disabled = _ref3$disabled === void 0 ? false : _ref3$disabled,
      onSubmit = _ref3.onSubmit,
      isLoading = _ref3.isLoading,
      title = _ref3.title;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      editMode = _useState2[0],
      setEditMode = _useState2[1];

  var _useState3 = (0, _react.useState)(typeof title === 'string' ? title : ''),
      _useState4 = _slicedToArray(_useState3, 2),
      changedTitle = _useState4[0],
      onTitleChange = _useState4[1];

  var onCancel = (0, _react.useCallback)(function () {
    return setEditMode(false);
  }, []);
  var onClickEditIcon = (0, _react.useCallback)(function () {
    return setEditMode(true);
  }, []);
  var onClickSubmit = (0, _react.useCallback)(function () {
    if (changedTitle !== title) {
      onSubmit(changedTitle);
    }

    setEditMode(false);
  }, [changedTitle, title]);
  var handleOnChange = (0, _react.useCallback)(function (e) {
    onTitleChange(e.target.value);
  }, [onTitleChange]);
  return editMode ? _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "m",
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFieldText, {
    onChange: handleOnChange,
    value: "".concat(changedTitle),
    "data-test-subj": "editable-title-input-field"
  })), _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "none",
    responsive: false,
    wrap: true
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    color: "secondary",
    "data-test-subj": "editable-title-submit-btn",
    fill: true,
    iconType: "save",
    onClick: onClickSubmit,
    size: "s"
  }, i18n.SAVE)), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    "data-test-subj": "editable-title-cancel-btn",
    iconType: "cross",
    onClick: onCancel,
    size: "s"
  }, i18n.CANCEL))), _react.default.createElement(_eui.EuiFlexItem, null)) : _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "none"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_title.Title, {
    title: title
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, isLoading && _react.default.createElement(MySpinner, null), !isLoading && _react.default.createElement(MyEuiButtonIcon, {
    isDisabled: disabled,
    "aria-label": i18n.EDIT_TITLE_ARIA(title),
    iconType: "pencil",
    onClick: onClickEditIcon,
    "data-test-subj": "editable-title-edit-icon"
  })));
};

var EditableTitle = _react.default.memo(EditableTitleComponent);

exports.EditableTitle = EditableTitle;