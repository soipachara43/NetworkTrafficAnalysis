"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeyboardShortcutsDoc = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _eui = require("@elastic/eui");

var _keymap = require("../../lib/keymap");

var _get_client_platform = require("../../lib/get_client_platform");

var _get_id = require("../../lib/get_id");

var _get_pretty_shortcut = require("../../lib/get_pretty_shortcut");

var _components = require("../../../i18n/components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var strings = _components.ComponentStrings.KeyboardShortcutsDoc;
var os = (0, _get_client_platform.getClientPlatform)();

var getDescriptionListItems = function getDescriptionListItems(shortcuts) {
  return shortcuts.map(function (shortcutKeyMap) {
    var osShortcuts = shortcutKeyMap[os];
    return {
      title: shortcutKeyMap.help,
      description: osShortcuts.reduce(function (acc, shortcut, i) {
        // replace +'s with spaces so we can display the plus symbol for the plus key
        shortcut = shortcut.replace(/\+/g, ' ');

        if (i !== 0) {
          acc.push(_react.default.createElement("span", {
            key: (0, _get_id.getId)('span')
          }, " ", strings.getShortcutSeparator(), " "));
        }

        acc.push(_react.default.createElement("span", {
          key: (0, _get_id.getId)('span')
        }, (0, _get_pretty_shortcut.getPrettyShortcut)(shortcut).split(/( )/g).map(function (key) {
          return key === ' ' ? key : _react.default.createElement(_eui.EuiCode, {
            key: (0, _get_id.getId)('shortcut')
          }, key);
        })));
        return acc;
      }, [])
    };
  });
};

var KeyboardShortcutsDoc = function KeyboardShortcutsDoc(_ref) {
  var onClose = _ref.onClose;
  return _react.default.createElement(_eui.EuiFlyout, {
    closeButtonAriaLabel: strings.getFlyoutCloseButtonAriaLabel(),
    size: "s",
    onClose: onClose
  }, _react.default.createElement(_eui.EuiFlyoutHeader, {
    hasBorder: true
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement("h2", null, strings.getTitle()))), _react.default.createElement(_eui.EuiFlyoutBody, null, Object.values(_keymap.keymap).map(function (namespace) {
    var displayName = namespace.displayName,
        shortcuts = _objectWithoutProperties(namespace, ["displayName"]);

    return _react.default.createElement("div", {
      key: (0, _get_id.getId)('shortcuts'),
      className: "canvasKeyboardShortcut"
    }, _react.default.createElement(_eui.EuiTitle, {
      size: "xs"
    }, _react.default.createElement("h4", null, displayName)), _react.default.createElement(_eui.EuiHorizontalRule, {
      margin: "s"
    }), _react.default.createElement(_eui.EuiDescriptionList, {
      textStyle: "reverse",
      type: "column",
      listItems: getDescriptionListItems(Object.values(shortcuts)),
      compressed: true
    }), _react.default.createElement(_eui.EuiSpacer, null));
  })));
};

exports.KeyboardShortcutsDoc = KeyboardShortcutsDoc;
KeyboardShortcutsDoc.propTypes = {
  onClose: _propTypes.default.func.isRequired
};