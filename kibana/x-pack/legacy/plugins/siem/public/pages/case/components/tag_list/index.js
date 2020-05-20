"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TagList = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var i18n = _interopRequireWildcard(require("./translations"));

var _shared_imports = require("../../../../shared_imports");

var _schema = require("./schema");

var _create = require("../create");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MyFlexGroup = (0, _styledComponents.default)(_eui.EuiFlexGroup).withConfig({
  displayName: "MyFlexGroup",
  componentId: "sc-1lzn1nb-0"
})(["", ""], function (_ref) {
  var theme = _ref.theme;
  return (0, _styledComponents.css)(["margin-top:", ";p{font-size:", ";}"], theme.eui.euiSizeM, theme.eui.euiSizeM);
});

var TagList = _react.default.memo(function (_ref2) {
  var _ref2$disabled = _ref2.disabled,
      disabled = _ref2$disabled === void 0 ? false : _ref2$disabled,
      isLoading = _ref2.isLoading,
      onSubmit = _ref2.onSubmit,
      tags = _ref2.tags;

  var _useForm = (0, _shared_imports.useForm)({
    defaultValue: {
      tags: tags
    },
    options: {
      stripEmptyFields: false
    },
    schema: _schema.schema
  }),
      form = _useForm.form;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isEditTags = _useState2[0],
      setIsEditTags = _useState2[1];

  var onSubmitTags = (0, _react.useCallback)(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var _ref4, isValid, newData;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return form.submit();

          case 2:
            _ref4 = _context.sent;
            isValid = _ref4.isValid;
            newData = _ref4.data;

            if (isValid && newData.tags) {
              onSubmit(newData.tags);
              setIsEditTags(false);
            }

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })), [form, onSubmit]);
  return _react.default.createElement(_eui.EuiText, null, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "xs",
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement("h4", null, i18n.TAGS)), isLoading && _react.default.createElement(_eui.EuiLoadingSpinner, null), !isLoading && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonIcon, {
    isDisabled: disabled,
    "aria-label": i18n.EDIT_TAGS_ARIA,
    iconType: 'pencil',
    onClick: setIsEditTags.bind(null, true)
  }))), _react.default.createElement(_eui.EuiHorizontalRule, {
    margin: "xs"
  }), _react.default.createElement(MyFlexGroup, {
    gutterSize: "xs"
  }, tags.length === 0 && !isEditTags && _react.default.createElement("p", null, i18n.NO_TAGS), tags.length > 0 && !isEditTags && tags.map(function (tag, key) {
    return _react.default.createElement(_eui.EuiFlexItem, {
      grow: false,
      key: "".concat(tag).concat(key)
    }, _react.default.createElement(_eui.EuiBadge, {
      color: "hollow"
    }, tag));
  }), isEditTags && _react.default.createElement(_eui.EuiFlexGroup, {
    direction: "column"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_shared_imports.Form, {
    form: form
  }, _react.default.createElement(_create.CommonUseField, {
    path: "tags",
    componentProps: {
      idAria: 'caseTags',
      'data-test-subj': 'caseTags',
      euiFieldProps: {
        fullWidth: true,
        placeholder: ''
      }
    }
  }))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s",
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    color: "secondary",
    fill: true,
    iconType: "save",
    onClick: onSubmitTags,
    size: "s"
  }, i18n.SAVE)), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    iconType: "cross",
    onClick: setIsEditTags.bind(null, false),
    size: "s"
  }, i18n.CANCEL)))))));
});

exports.TagList = TagList;
TagList.displayName = 'TagList';