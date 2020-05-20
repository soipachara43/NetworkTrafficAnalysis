"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SidebarHeader = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _eui = require("@elastic/eui");

var _popover = require("../popover");

var _custom_element_modal = require("../custom_element_modal");

var _tool_tip_shortcut = require("../tool_tip_shortcut/");

var _components = require("../../../i18n/components");

var _shortcuts = require("../../../i18n/shortcuts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var topBorderClassName = 'canvasContextMenu--topBorder';
var strings = _components.ComponentStrings.SidebarHeader;

var shortcutHelp = _shortcuts.ShortcutStrings.getShortcutHelp();

var contextMenuButton = function contextMenuButton(handleClick) {
  return _react.default.createElement(_eui.EuiButtonIcon, {
    color: "text",
    iconType: "boxesVertical",
    onClick: handleClick,
    "aria-label": strings.getContextMenuTitle()
  });
};

var SidebarHeader =
/*#__PURE__*/
function (_Component) {
  _inherits(SidebarHeader, _Component);

  function SidebarHeader() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SidebarHeader);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SidebarHeader)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isModalVisible: false
    });

    _defineProperty(_assertThisInitialized(_this), "_isMounted", false);

    _defineProperty(_assertThisInitialized(_this), "_showModal", function () {
      return _this._isMounted && _this.setState({
        isModalVisible: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_hideModal", function () {
      return _this._isMounted && _this.setState({
        isModalVisible: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_renderLayoutControls", function () {
      var _this$props = _this.props,
          bringToFront = _this$props.bringToFront,
          bringForward = _this$props.bringForward,
          sendBackward = _this$props.sendBackward,
          sendToBack = _this$props.sendToBack;
      return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiToolTip, {
        position: "bottom",
        content: _react.default.createElement("span", null, shortcutHelp.BRING_TO_FRONT, _react.default.createElement(_tool_tip_shortcut.ToolTipShortcut, {
          namespace: "ELEMENT",
          action: "BRING_TO_FRONT"
        }))
      }, _react.default.createElement(_eui.EuiButtonIcon, {
        color: "text",
        iconType: "sortUp",
        onClick: bringToFront,
        "aria-label": strings.getBringToFrontAriaLabel()
      }))), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiToolTip, {
        position: "bottom",
        content: _react.default.createElement("span", null, shortcutHelp.BRING_FORWARD, _react.default.createElement(_tool_tip_shortcut.ToolTipShortcut, {
          namespace: "ELEMENT",
          action: "BRING_FORWARD"
        }))
      }, _react.default.createElement(_eui.EuiButtonIcon, {
        color: "text",
        iconType: "arrowUp",
        onClick: bringForward,
        "aria-label": strings.getBringForwardAriaLabel()
      }))), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiToolTip, {
        position: "bottom",
        content: _react.default.createElement("span", null, shortcutHelp.SEND_BACKWARD, _react.default.createElement(_tool_tip_shortcut.ToolTipShortcut, {
          namespace: "ELEMENT",
          action: "SEND_BACKWARD"
        }))
      }, _react.default.createElement(_eui.EuiButtonIcon, {
        color: "text",
        iconType: "arrowDown",
        onClick: sendBackward,
        "aria-label": strings.getSendBackwardAriaLabel()
      }))), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiToolTip, {
        position: "bottom",
        content: _react.default.createElement("span", null, shortcutHelp.SEND_TO_BACK, _react.default.createElement(_tool_tip_shortcut.ToolTipShortcut, {
          namespace: "ELEMENT",
          action: "SEND_TO_BACK"
        }))
      }, _react.default.createElement(_eui.EuiButtonIcon, {
        color: "text",
        iconType: "sortDown",
        onClick: sendToBack,
        "aria-label": strings.getSendToBackAriaLabel()
      }))));
    });

    _defineProperty(_assertThisInitialized(_this), "_getLayerMenuItems", function () {
      var _this$props2 = _this.props,
          bringToFront = _this$props2.bringToFront,
          bringForward = _this$props2.bringForward,
          sendBackward = _this$props2.sendBackward,
          sendToBack = _this$props2.sendToBack;
      return {
        menuItem: {
          name: strings.getOrderMenuItemLabel(),
          className: topBorderClassName,
          panel: 1
        },
        panel: {
          id: 1,
          title: strings.getOrderMenuItemLabel(),
          items: [{
            name: shortcutHelp.BRING_TO_FRONT,
            // TODO: check against current element position and disable if already top layer
            icon: 'sortUp',
            onClick: bringToFront
          }, {
            name: shortcutHelp.BRING_TO_FRONT,
            // TODO: same as above
            icon: 'arrowUp',
            onClick: bringForward
          }, {
            name: shortcutHelp.SEND_BACKWARD,
            // TODO: check against current element position and disable if already bottom layer
            icon: 'arrowDown',
            onClick: sendBackward
          }, {
            name: shortcutHelp.SEND_TO_BACK,
            // TODO: same as above
            icon: 'sortDown',
            onClick: sendToBack
          }]
        }
      };
    });

    _defineProperty(_assertThisInitialized(_this), "_getAlignmentMenuItems", function (close) {
      var _this$props3 = _this.props,
          alignLeft = _this$props3.alignLeft,
          alignCenter = _this$props3.alignCenter,
          alignRight = _this$props3.alignRight,
          alignTop = _this$props3.alignTop,
          alignMiddle = _this$props3.alignMiddle,
          alignBottom = _this$props3.alignBottom;
      return {
        menuItem: {
          name: strings.getAlignmentMenuItemLabel(),
          className: 'canvasContextMenu',
          panel: 2
        },
        panel: {
          id: 2,
          title: strings.getAlignmentMenuItemLabel(),
          items: [{
            name: strings.getLeftAlignMenuItemLabel(),
            icon: 'editorItemAlignLeft',
            onClick: close(alignLeft)
          }, {
            name: strings.getCenterAlignMenuItemLabel(),
            icon: 'editorItemAlignCenter',
            onClick: close(alignCenter)
          }, {
            name: strings.getRightAlignMenuItemLabel(),
            icon: 'editorItemAlignRight',
            onClick: close(alignRight)
          }, {
            name: strings.getTopAlignMenuItemLabel(),
            icon: 'editorItemAlignTop',
            onClick: close(alignTop)
          }, {
            name: strings.getMiddleAlignMenuItemLabel(),
            icon: 'editorItemAlignMiddle',
            onClick: close(alignMiddle)
          }, {
            name: strings.getBottomAlignMenuItemLabel(),
            icon: 'editorItemAlignBottom',
            onClick: close(alignBottom)
          }]
        }
      };
    });

    _defineProperty(_assertThisInitialized(_this), "_getDistributionMenuItems", function (close) {
      var _this$props4 = _this.props,
          distributeHorizontally = _this$props4.distributeHorizontally,
          distributeVertically = _this$props4.distributeVertically;
      return {
        menuItem: {
          name: strings.getDistributionMenuItemLabel(),
          className: 'canvasContextMenu',
          panel: 3
        },
        panel: {
          id: 3,
          title: strings.getDistributionMenuItemLabel(),
          items: [{
            name: strings.getHorizontalDistributionMenuItemLabel(),
            icon: 'editorDistributeHorizontal',
            onClick: close(distributeHorizontally)
          }, {
            name: strings.getVerticalDistributionMenuItemLabel(),
            icon: 'editorDistributeVertical',
            onClick: close(distributeVertically)
          }]
        }
      };
    });

    _defineProperty(_assertThisInitialized(_this), "_getGroupMenuItems", function (close) {
      var _this$props5 = _this.props,
          groupIsSelected = _this$props5.groupIsSelected,
          ungroupNodes = _this$props5.ungroupNodes,
          groupNodes = _this$props5.groupNodes,
          selectedNodes = _this$props5.selectedNodes;
      return groupIsSelected ? [{
        name: strings.getUngroupMenuItemLabel(),
        className: topBorderClassName,
        onClick: close(ungroupNodes)
      }] : selectedNodes.length > 1 ? [{
        name: strings.getGroupMenuItemLabel(),
        className: topBorderClassName,
        onClick: close(groupNodes)
      }] : [];
    });

    _defineProperty(_assertThisInitialized(_this), "_getPanels", function (closePopover) {
      var _this$props6 = _this.props,
          showLayerControls = _this$props6.showLayerControls,
          cutNodes = _this$props6.cutNodes,
          copyNodes = _this$props6.copyNodes,
          pasteNodes = _this$props6.pasteNodes,
          deleteNodes = _this$props6.deleteNodes,
          cloneNodes = _this$props6.cloneNodes; // closes popover after invoking fn

      var close = function close(fn) {
        return function () {
          fn();
          closePopover();
        };
      };

      var items = [{
        name: shortcutHelp.CUT,
        icon: 'cut',
        onClick: close(cutNodes)
      }, {
        name: shortcutHelp.COPY,
        icon: 'copy',
        onClick: copyNodes
      }, {
        name: shortcutHelp.PASTE,
        // TODO: can this be disabled if clipboard is empty?
        icon: 'copyClipboard',
        onClick: close(pasteNodes)
      }, {
        name: shortcutHelp.DELETE,
        icon: 'trash',
        onClick: close(deleteNodes)
      }, {
        name: shortcutHelp.CLONE,
        onClick: close(cloneNodes)
      }].concat(_toConsumableArray(_this._getGroupMenuItems(close)));
      var panels = [{
        id: 0,
        title: strings.getContextMenuTitle(),
        items: items
      }];

      var fillMenu = function fillMenu(_ref) {
        var menuItem = _ref.menuItem,
            panel = _ref.panel;
        items.push(menuItem); // add Order menu item to first panel

        panels.push(panel); // add nested panel for layers controls
      };

      if (showLayerControls) {
        fillMenu(_this._getLayerMenuItems());
      }

      if (_this.props.selectedNodes.length > 1) {
        fillMenu(_this._getAlignmentMenuItems(close));
      }

      if (_this.props.selectedNodes.length > 2) {
        fillMenu(_this._getDistributionMenuItems(close));
      }

      items.push({
        name: strings.getSaveElementMenuItemLabel(),
        icon: 'indexOpen',
        className: topBorderClassName,
        onClick: _this._showModal
      });
      return panels;
    });

    _defineProperty(_assertThisInitialized(_this), "_renderContextMenu", function () {
      return _react.default.createElement(_popover.Popover, {
        id: "sidebar-context-menu-popover",
        className: "canvasContextMenu",
        button: contextMenuButton,
        panelPaddingSize: "none",
        tooltip: strings.getContextMenuTitle(),
        tooltipPosition: "bottom"
      }, function (_ref2) {
        var closePopover = _ref2.closePopover;
        return _react.default.createElement(_eui.EuiContextMenu, {
          initialPanelId: 0,
          panels: _this._getPanels(closePopover)
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_handleSave", function (name, description, image) {
      var createCustomElement = _this.props.createCustomElement;
      createCustomElement(name, description, image);

      _this._hideModal();
    });

    return _this;
  }

  _createClass(SidebarHeader, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._isMounted = true;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._isMounted = false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props7 = this.props,
          title = _this$props7.title,
          showLayerControls = _this$props7.showLayerControls;
      var isModalVisible = this.state.isModalVisible;
      return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
        className: "canvasLayout__sidebarHeader",
        gutterSize: "none",
        alignItems: "center",
        justifyContent: "spaceBetween"
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiTitle, {
        size: "xs"
      }, _react.default.createElement("h3", null, title))), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiFlexGroup, {
        alignItems: "center",
        gutterSize: "none"
      }, showLayerControls ? this._renderLayoutControls() : null, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiToolTip, {
        position: "bottom",
        content: strings.getSaveElementMenuItemLabel()
      }, _react.default.createElement(_eui.EuiButtonIcon, {
        color: "text",
        iconType: "indexOpen",
        onClick: this._showModal,
        "aria-label": strings.getSaveElementMenuItemLabel()
      }))), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, this._renderContextMenu())))), isModalVisible ? _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_custom_element_modal.CustomElementModal, {
        title: strings.getCreateElementModalTitle(),
        onSave: this._handleSave,
        onCancel: this._hideModal
      })) : null);
    }
  }]);

  return SidebarHeader;
}(_react.Component);

exports.SidebarHeader = SidebarHeader;

_defineProperty(SidebarHeader, "propTypes", {
  title: _propTypes.default.string.isRequired,
  showLayerControls: _propTypes.default.bool,
  // TODO: remove when we support relayering multiple elements
  cutNodes: _propTypes.default.func.isRequired,
  copyNodes: _propTypes.default.func.isRequired,
  pasteNodes: _propTypes.default.func.isRequired,
  cloneNodes: _propTypes.default.func.isRequired,
  deleteNodes: _propTypes.default.func.isRequired,
  bringToFront: _propTypes.default.func.isRequired,
  bringForward: _propTypes.default.func.isRequired,
  sendBackward: _propTypes.default.func.isRequired,
  sendToBack: _propTypes.default.func.isRequired,
  createCustomElement: _propTypes.default.func.isRequired,
  groupIsSelected: _propTypes.default.bool,
  selectedNodes: _propTypes.default.array,
  groupNodes: _propTypes.default.func.isRequired,
  ungroupNodes: _propTypes.default.func.isRequired,
  alignLeft: _propTypes.default.func.isRequired,
  alignCenter: _propTypes.default.func.isRequired,
  alignRight: _propTypes.default.func.isRequired,
  alignTop: _propTypes.default.func.isRequired,
  alignMiddle: _propTypes.default.func.isRequired,
  alignBottom: _propTypes.default.func.isRequired,
  distributeHorizontally: _propTypes.default.func.isRequired,
  distributeVertically: _propTypes.default.func.isRequired
});

_defineProperty(SidebarHeader, "defaultProps", {
  groupIsSelected: false,
  showLayerControls: false,
  selectedNodes: []
});