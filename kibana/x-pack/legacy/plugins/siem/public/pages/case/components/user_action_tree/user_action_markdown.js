"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserActionMarkdown = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var i18n = _interopRequireWildcard(require("../case_view/translations"));

var _markdown = require("../../../../components/markdown");

var _shared_imports = require("../../../../shared_imports");

var _schema = require("./schema");

var _insert_timeline_popover = require("../../../../components/timeline/insert_timeline_popover");

var _use_insert_timeline = require("../../../../components/timeline/insert_timeline_popover/use_insert_timeline");

var _form = require("../../../../components/markdown_editor/form");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ContentWrapper = _styledComponents.default.div.withConfig({
  displayName: "ContentWrapper",
  componentId: "sc-5wkr89-0"
})(["", ""], function (_ref) {
  var theme = _ref.theme;
  return (0, _styledComponents.css)(["padding:", " ", ";"], theme.eui.euiSizeM, theme.eui.euiSizeL);
});

var UserActionMarkdown = function UserActionMarkdown(_ref2) {
  var id = _ref2.id,
      content = _ref2.content,
      isEditable = _ref2.isEditable,
      onChangeEditable = _ref2.onChangeEditable,
      onSaveContent = _ref2.onSaveContent;

  var _useForm = (0, _shared_imports.useForm)({
    defaultValue: {
      content: content
    },
    options: {
      stripEmptyFields: false
    },
    schema: _schema.schema
  }),
      form = _useForm.form;

  var _useInsertTimeline = (0, _use_insert_timeline.useInsertTimeline)(form, 'content'),
      handleCursorChange = _useInsertTimeline.handleCursorChange,
      handleOnTimelineChange = _useInsertTimeline.handleOnTimelineChange;

  var handleCancelAction = (0, _react.useCallback)(function () {
    onChangeEditable(id);
  }, [id, onChangeEditable]);
  var handleSaveAction = (0, _react.useCallback)(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var _ref4, isValid, data;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return form.submit();

          case 2:
            _ref4 = _context.sent;
            isValid = _ref4.isValid;
            data = _ref4.data;

            if (isValid) {
              onSaveContent(data.content);
            }

            onChangeEditable(id);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })), [form, id, onChangeEditable, onSaveContent]);
  var renderButtons = (0, _react.useCallback)(function (_ref5) {
    var cancelAction = _ref5.cancelAction,
        saveAction = _ref5.saveAction;
    return _react.default.createElement(_eui.EuiFlexGroup, {
      gutterSize: "s",
      alignItems: "center"
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiButtonEmpty, {
      size: "s",
      onClick: cancelAction,
      iconType: "cross"
    }, i18n.CANCEL)), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiButton, {
      color: "secondary",
      fill: true,
      iconType: "save",
      onClick: saveAction,
      size: "s"
    }, i18n.SAVE)));
  }, [handleCancelAction, handleSaveAction]);
  return isEditable ? _react.default.createElement(_shared_imports.Form, {
    form: form
  }, _react.default.createElement(_shared_imports.UseField, {
    path: "content",
    component: _form.MarkdownEditorForm,
    componentProps: {
      bottomRightContent: renderButtons({
        cancelAction: handleCancelAction,
        saveAction: handleSaveAction
      }),
      onCursorPositionUpdate: handleCursorChange,
      topRightContent: _react.default.createElement(_insert_timeline_popover.InsertTimelinePopover, {
        hideUntitled: true,
        isDisabled: false,
        onTimelineChange: handleOnTimelineChange
      })
    }
  })) : _react.default.createElement(ContentWrapper, null, _react.default.createElement(_markdown.Markdown, {
    raw: content,
    "data-test-subj": "case-view-description"
  }));
};

exports.UserActionMarkdown = UserActionMarkdown;