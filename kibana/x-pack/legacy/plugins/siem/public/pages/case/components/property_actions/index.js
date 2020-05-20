"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PropertyActions = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ComponentId = 'property-actions';

var PropertyActionButton = _react.default.memo(function (_ref) {
  var _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled,
      onClick = _ref.onClick,
      iconType = _ref.iconType,
      label = _ref.label;
  return _react.default.createElement(_eui.EuiButtonEmpty, {
    "data-test-subj": "".concat(ComponentId, "-").concat(iconType),
    "aria-label": label,
    color: "text",
    iconSide: "left",
    iconType: iconType,
    isDisabled: disabled,
    onClick: onClick
  }, label);
});

PropertyActionButton.displayName = 'PropertyActionButton';

var PropertyActions = _react.default.memo(function (_ref2) {
  var propertyActions = _ref2.propertyActions;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      showActions = _useState2[0],
      setShowActions = _useState2[1];

  var onButtonClick = (0, _react.useCallback)(function () {
    setShowActions(!showActions);
  }, [showActions]);
  var onClosePopover = (0, _react.useCallback)(function (cb) {
    setShowActions(false);

    if (cb != null) {
      cb();
    }
  }, []);
  return _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "flexStart",
    "data-test-subj": ComponentId,
    gutterSize: "none"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiPopover, {
    anchorPosition: "downRight",
    ownFocus: true,
    button: _react.default.createElement(_eui.EuiButtonIcon, {
      "data-test-subj": "".concat(ComponentId, "-ellipses"),
      "aria-label": i18n.ACTIONS_ARIA,
      iconType: "boxesHorizontal",
      onClick: onButtonClick
    }),
    id: "settingsPopover",
    isOpen: showActions,
    closePopover: onClosePopover
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "flexStart",
    "data-test-subj": "".concat(ComponentId, "-group"),
    direction: "column",
    gutterSize: "none"
  }, propertyActions.map(function (action, key) {
    return _react.default.createElement(_eui.EuiFlexItem, {
      grow: false,
      key: "".concat(action.label).concat(key)
    }, _react.default.createElement(PropertyActionButton, {
      disabled: action.disabled,
      iconType: action.iconType,
      label: action.label,
      onClick: function onClick() {
        return onClosePopover(action.onClick);
      }
    }));
  })))));
});

exports.PropertyActions = PropertyActions;
PropertyActions.displayName = 'PropertyActions';