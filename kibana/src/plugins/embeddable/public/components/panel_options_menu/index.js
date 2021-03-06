"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelOptionsMenu = void 0;

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var PanelOptionsMenu = function PanelOptionsMenu(_ref) {
  var panelDescriptor = _ref.panelDescriptor,
      close = _ref.close,
      isViewMode = _ref.isViewMode,
      title = _ref.title;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      open = _useState2[0],
      setOpen = _useState2[1];

  (0, _react.useEffect)(function () {
    if (!close) setOpen(false);
  }, [close]);

  var handleContextMenuClick = function handleContextMenuClick() {
    setOpen(function (isOpen) {
      return !isOpen;
    });
  };

  var handlePopoverClose = function handlePopoverClose() {
    setOpen(false);
  };

  var enhancedAriaLabel = _i18n.i18n.translate('embeddableApi.panel.optionsMenu.panelOptionsButtonEnhancedAriaLabel', {
    defaultMessage: 'Panel options for {title}',
    values: {
      title: title
    }
  });

  var ariaLabelWithoutTitle = _i18n.i18n.translate('embeddableApi.panel.optionsMenu.panelOptionsButtonAriaLabel', {
    defaultMessage: 'Panel options'
  });

  var button = _react.default.createElement(_eui.EuiButtonIcon, {
    iconType: isViewMode ? 'boxesHorizontal' : 'gear',
    color: "text",
    className: "embPanel__optionsMenuButton",
    "aria-label": title ? enhancedAriaLabel : ariaLabelWithoutTitle,
    "data-test-subj": "embeddablePanelToggleMenuIcon",
    onClick: handleContextMenuClick
  });

  return _react.default.createElement(_eui.EuiPopover, {
    button: button,
    isOpen: open,
    closePopover: handlePopoverClose,
    panelPaddingSize: "none",
    anchorPosition: "downRight",
    "data-test-subj": open ? 'embeddablePanelContextMenuOpen' : 'embeddablePanelContextMenuClosed',
    withTitle: true
  }, _react.default.createElement(_eui.EuiContextMenu, {
    initialPanelId: "mainMenu",
    panels: panelDescriptor ? [panelDescriptor] : []
  }));
};

exports.PanelOptionsMenu = PanelOptionsMenu;