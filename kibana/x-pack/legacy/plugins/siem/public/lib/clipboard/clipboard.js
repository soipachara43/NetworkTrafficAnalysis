"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Clipboard = void 0;

var _eui = require("@elastic/eui");

var _copyToClipboard = _interopRequireDefault(require("copy-to-clipboard"));

var _react = _interopRequireDefault(require("react"));

var _uuid = _interopRequireDefault(require("uuid"));

var i18n = _interopRequireWildcard(require("./translations"));

var _toasters = require("../../components/toasters");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getSuccessToast = function getSuccessToast(_ref) {
  var titleSummary = _ref.titleSummary;
  return {
    id: "copy-success-".concat(_uuid.default.v4()),
    color: 'success',
    iconType: 'copyClipboard',
    title: "".concat(i18n.COPIED, " ").concat(titleSummary, " ").concat(i18n.TO_THE_CLIPBOARD)
  };
};

var Clipboard = function Clipboard(_ref2) {
  var children = _ref2.children,
      content = _ref2.content,
      onCopy = _ref2.onCopy,
      titleSummary = _ref2.titleSummary,
      toastLifeTimeMs = _ref2.toastLifeTimeMs;
  var dispatchToaster = (0, _toasters.useStateToaster)()[1];

  var onClick = function onClick(event) {
    event.preventDefault();
    event.stopPropagation();
    var isSuccess = (0, _copyToClipboard.default)("".concat(content), {
      debug: true
    });

    if (onCopy != null) {
      onCopy({
        content: content,
        isSuccess: isSuccess
      });
    }

    if (isSuccess) {
      dispatchToaster({
        type: 'addToaster',
        toast: _objectSpread({
          toastLifeTimeMs: toastLifeTimeMs
        }, getSuccessToast({
          titleSummary: titleSummary
        }))
      });
    }
  };

  return _react.default.createElement(_eui.EuiButtonIcon, {
    "aria-label": i18n.COPY_TO_THE_CLIPBOARD,
    color: "text",
    "data-test-subj": "clipboard",
    iconType: "copyClipboard",
    onClick: onClick
  }, children);
};

exports.Clipboard = Clipboard;