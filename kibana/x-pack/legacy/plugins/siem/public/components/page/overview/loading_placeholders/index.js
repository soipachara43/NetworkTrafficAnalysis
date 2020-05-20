"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingPlaceholders = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var LoadingPlaceholdersComponent = function LoadingPlaceholdersComponent(_ref) {
  var lines = _ref.lines,
      placeholders = _ref.placeholders;
  return _react.default.createElement(_react.default.Fragment, null, _toConsumableArray(Array(placeholders).keys()).map(function (_, i) {
    return _react.default.createElement(_react.default.Fragment, {
      key: i
    }, _react.default.createElement(_eui.EuiLoadingContent, {
      lines: lines
    }), i !== placeholders - 1 && _react.default.createElement(_eui.EuiSpacer, {
      size: "l"
    }));
  }));
};

LoadingPlaceholdersComponent.displayName = 'LoadingPlaceholdersComponent';

var LoadingPlaceholders = _react.default.memo(LoadingPlaceholdersComponent);

exports.LoadingPlaceholders = LoadingPlaceholders;