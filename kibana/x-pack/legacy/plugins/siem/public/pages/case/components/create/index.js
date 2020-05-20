"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Create = exports.CommonUseField = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _reactRouterDom = require("react-router-dom");

var _shared_imports = require("../../../../shared_imports");

var _use_post_case = require("../../../../containers/case/use_post_case");

var _schema = require("./schema");

var _insert_timeline_popover = require("../../../../components/timeline/insert_timeline_popover");

var _use_insert_timeline = require("../../../../components/timeline/insert_timeline_popover/use_insert_timeline");

var i18n = _interopRequireWildcard(require("../../translations"));

var _types = require("../../../home/types");

var _form = require("../../../../components/markdown_editor/form");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var CommonUseField = (0, _shared_imports.getUseField)({
  component: _shared_imports.Field
});
exports.CommonUseField = CommonUseField;

var ContainerBig = _styledComponents.default.div.withConfig({
  displayName: "ContainerBig",
  componentId: "sc-1vp5jct-0"
})(["", ""], function (_ref) {
  var theme = _ref.theme;
  return (0, _styledComponents.css)(["margin-top:", ";"], theme.eui.euiSizeXL);
});

var Container = _styledComponents.default.div.withConfig({
  displayName: "Container",
  componentId: "sc-1vp5jct-1"
})(["", ""], function (_ref2) {
  var theme = _ref2.theme;
  return (0, _styledComponents.css)(["margin-top:", ";"], theme.eui.euiSize);
});

var MySpinner = (0, _styledComponents.default)(_eui.EuiLoadingSpinner).withConfig({
  displayName: "MySpinner",
  componentId: "sc-1vp5jct-2"
})(["position:absolute;top:50%;left:50%;z-index:99;"]);
var initialCaseValue = {
  description: '',
  tags: [],
  title: ''
};

var Create = _react.default.memo(function () {
  var _usePostCase = (0, _use_post_case.usePostCase)(),
      caseData = _usePostCase.caseData,
      isLoading = _usePostCase.isLoading,
      postCase = _usePostCase.postCase;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isCancel = _useState2[0],
      setIsCancel = _useState2[1];

  var _useForm = (0, _shared_imports.useForm)({
    defaultValue: initialCaseValue,
    options: {
      stripEmptyFields: false
    },
    schema: _schema.schema
  }),
      form = _useForm.form;

  var _useInsertTimeline = (0, _use_insert_timeline.useInsertTimeline)(form, 'description'),
      handleCursorChange = _useInsertTimeline.handleCursorChange,
      handleOnTimelineChange = _useInsertTimeline.handleOnTimelineChange;

  var onSubmit = (0, _react.useCallback)(
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

            if (!isValid) {
              _context.next = 8;
              break;
            }

            _context.next = 8;
            return postCase(data);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })), [form]);
  var handleSetIsCancel = (0, _react.useCallback)(function () {
    setIsCancel(true);
  }, [isCancel]);

  if (caseData != null && caseData.id) {
    return _react.default.createElement(_reactRouterDom.Redirect, {
      to: "/".concat(_types.SiemPageName.case, "/").concat(caseData.id)
    });
  }

  if (isCancel) {
    return _react.default.createElement(_reactRouterDom.Redirect, {
      to: "/".concat(_types.SiemPageName.case)
    });
  }

  return _react.default.createElement(_eui.EuiPanel, null, isLoading && _react.default.createElement(MySpinner, {
    size: "xl"
  }), _react.default.createElement(_shared_imports.Form, {
    form: form
  }, _react.default.createElement(CommonUseField, {
    path: "title",
    componentProps: {
      idAria: 'caseTitle',
      'data-test-subj': 'caseTitle',
      euiFieldProps: {
        fullWidth: false,
        disabled: isLoading
      }
    }
  }), _react.default.createElement(Container, null, _react.default.createElement(CommonUseField, {
    path: "tags",
    componentProps: {
      idAria: 'caseTags',
      'data-test-subj': 'caseTags',
      euiFieldProps: {
        fullWidth: true,
        placeholder: '',
        isDisabled: isLoading
      }
    }
  })), _react.default.createElement(ContainerBig, null, _react.default.createElement(_shared_imports.UseField, {
    path: "description",
    component: _form.MarkdownEditorForm,
    componentProps: {
      dataTestSubj: 'caseDescription',
      idAria: 'caseDescription',
      isDisabled: isLoading,
      onCursorPositionUpdate: handleCursorChange,
      topRightContent: _react.default.createElement(_insert_timeline_popover.InsertTimelinePopover, {
        hideUntitled: true,
        isDisabled: isLoading,
        onTimelineChange: handleOnTimelineChange
      })
    }
  }))), _react.default.createElement(Container, null, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    justifyContent: "flexEnd",
    gutterSize: "xs",
    responsive: false
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    "data-test-subj": "create-case-cancel",
    size: "s",
    onClick: handleSetIsCancel,
    iconType: "cross"
  }, i18n.CANCEL)), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    fill: true,
    iconType: "plusInCircle",
    isDisabled: isLoading,
    isLoading: isLoading,
    onClick: onSubmit
  }, i18n.CREATE_CASE)))));
});

exports.Create = Create;
Create.displayName = 'Create';