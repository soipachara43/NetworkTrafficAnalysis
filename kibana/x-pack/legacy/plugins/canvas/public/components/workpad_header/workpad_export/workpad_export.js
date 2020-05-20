"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorkpadExport = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _eui = require("@elastic/eui");

var _popover = require("../../popover");

var _pdf_panel = require("./pdf_panel");

var _flyout = require("./flyout");

var _components = require("../../../../i18n/components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var strings = _components.ComponentStrings.WorkpadHeaderWorkpadExport;

/**
 * The Menu for Exporting a Workpad from Canvas.
 */
var WorkpadExport = function WorkpadExport(_ref) {
  var _onCopy = _ref.onCopy,
      _onExport = _ref.onExport,
      getExportUrl = _ref.getExportUrl;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      showFlyout = _useState2[0],
      setShowFlyout = _useState2[1];

  var onClose = function onClose() {
    setShowFlyout(false);
  }; // TODO: Fix all of this magic from EUI; this code is boilerplate from
  // EUI examples and isn't easily typed.


  var flattenPanelTree = function flattenPanelTree(tree) {
    var array = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    array.push(tree);

    if (tree.items) {
      tree.items.forEach(function (item) {
        var panel = item.panel;

        if (panel) {
          flattenPanelTree(panel, array);
          item.panel = panel.id;
        }
      });
    }

    return array;
  };

  var getPDFPanel = function getPDFPanel(closePopover) {
    return _react.default.createElement(_pdf_panel.PDFPanel, {
      pdfURL: getExportUrl('pdf'),
      onExport: function onExport() {
        _onExport('pdf');

        closePopover();
      },
      onCopy: function onCopy() {
        _onCopy('pdf');

        closePopover();
      }
    });
  };

  var getPanelTree = function getPanelTree(closePopover) {
    return {
      id: 0,
      title: strings.getShareWorkpadMessage(),
      items: [{
        name: strings.getShareDownloadJSONTitle(),
        icon: _react.default.createElement(_eui.EuiIcon, {
          type: "exportAction",
          size: "m"
        }),
        onClick: function onClick() {
          _onExport('json');

          closePopover();
        }
      }, {
        name: strings.getShareDownloadPDFTitle(),
        icon: 'document',
        panel: {
          id: 1,
          title: strings.getShareDownloadPDFTitle(),
          content: getPDFPanel(closePopover)
        }
      }, {
        name: strings.getShareWebsiteTitle(),
        icon: _react.default.createElement(_eui.EuiIcon, {
          type: "globe",
          size: "m"
        }),
        onClick: function onClick() {
          setShowFlyout(true);
          closePopover();
        }
      }]
    };
  };

  var exportControl = function exportControl(togglePopover) {
    return _react.default.createElement(_eui.EuiButtonIcon, {
      iconType: "share",
      "aria-label": strings.getShareWorkpadMessage(),
      onClick: togglePopover
    });
  };

  var flyout = showFlyout ? _react.default.createElement(_flyout.ShareWebsiteFlyout, {
    onClose: onClose
  }) : null;
  return _react.default.createElement("div", null, _react.default.createElement(_popover.Popover, {
    button: exportControl,
    panelPaddingSize: "none",
    tooltip: strings.getShareWorkpadMessage(),
    tooltipPosition: "bottom"
  }, function (_ref2) {
    var closePopover = _ref2.closePopover;
    return _react.default.createElement(_eui.EuiContextMenu, {
      initialPanelId: 0,
      panels: flattenPanelTree(getPanelTree(closePopover))
    });
  }), flyout);
};

exports.WorkpadExport = WorkpadExport;
WorkpadExport.propTypes = {
  onCopy: _propTypes.default.func.isRequired,
  onExport: _propTypes.default.func.isRequired,
  getExportUrl: _propTypes.default.func.isRequired
};