"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddComment = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _use_post_comment = require("../../../../containers/case/use_post_comment");

var _form = require("../../../../components/markdown_editor/form");

var _insert_timeline_popover = require("../../../../components/timeline/insert_timeline_popover");

var _use_insert_timeline = require("../../../../components/timeline/insert_timeline_popover/use_insert_timeline");

var _shared_imports = require("../../../../shared_imports");

var i18n = _interopRequireWildcard(require("../../translations"));

var _schema = require("./schema");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var MySpinner = (0, _styledComponents.default)(_eui.EuiLoadingSpinner).withConfig({
  displayName: "MySpinner",
  componentId: "sc-1q05dwc-0"
})(["position:absolute;top:50%;left:50%;"]);
var initialCommentValue = {
  comment: ''
};

var AddComment = _react.default.memo(function (_ref) {
  var caseId = _ref.caseId,
      disabled = _ref.disabled,
      insertQuote = _ref.insertQuote,
      _ref$showLoading = _ref.showLoading,
      showLoading = _ref$showLoading === void 0 ? true : _ref$showLoading,
      onCommentPosted = _ref.onCommentPosted,
      onCommentSaving = _ref.onCommentSaving;

  var _usePostComment = (0, _use_post_comment.usePostComment)(caseId),
      isLoading = _usePostComment.isLoading,
      postComment = _usePostComment.postComment;

  var _useForm = (0, _shared_imports.useForm)({
    defaultValue: initialCommentValue,
    options: {
      stripEmptyFields: false
    },
    schema: _schema.schema
  }),
      form = _useForm.form;

  var _useInsertTimeline = (0, _use_insert_timeline.useInsertTimeline)(form, 'comment'),
      handleCursorChange = _useInsertTimeline.handleCursorChange,
      handleOnTimelineChange = _useInsertTimeline.handleOnTimelineChange;

  (0, _react.useEffect)(function () {
    if (insertQuote !== null) {
      var _form$getFormData = form.getFormData(),
          comment = _form$getFormData.comment;

      form.setFieldValue('comment', "".concat(comment).concat(comment.length > 0 ? '\n\n' : '').concat(insertQuote));
    }
  }, [insertQuote]);
  var onSubmit = (0, _react.useCallback)(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var _ref3, isValid, data;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return form.submit();

          case 2:
            _ref3 = _context.sent;
            isValid = _ref3.isValid;
            data = _ref3.data;

            if (!isValid) {
              _context.next = 10;
              break;
            }

            if (onCommentSaving != null) {
              onCommentSaving();
            }

            _context.next = 9;
            return postComment(data, onCommentPosted);

          case 9:
            form.reset();

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })), [form, onCommentPosted, onCommentSaving]);
  return _react.default.createElement("span", {
    id: "add-comment-permLink"
  }, isLoading && showLoading && _react.default.createElement(MySpinner, {
    size: "xl"
  }), _react.default.createElement(_shared_imports.Form, {
    form: form
  }, _react.default.createElement(_shared_imports.UseField, {
    path: "comment",
    component: _form.MarkdownEditorForm,
    componentProps: {
      idAria: 'caseComment',
      isDisabled: isLoading,
      dataTestSubj: 'caseComment',
      placeholder: i18n.ADD_COMMENT_HELP_TEXT,
      onCursorPositionUpdate: handleCursorChange,
      bottomRightContent: _react.default.createElement(_eui.EuiButton, {
        iconType: "plusInCircle",
        isDisabled: isLoading || disabled,
        isLoading: isLoading,
        onClick: onSubmit,
        size: "s"
      }, i18n.ADD_COMMENT),
      topRightContent: _react.default.createElement(_insert_timeline_popover.InsertTimelinePopover, {
        hideUntitled: true,
        isDisabled: isLoading,
        onTimelineChange: handleOnTimelineChange
      })
    }
  })));
});

exports.AddComment = AddComment;
AddComment.displayName = 'AddComment';