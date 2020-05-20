"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkedSearch = LinkedSearch;
exports.SidebarTitle = SidebarTitle;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function LinkedSearch(_ref) {
  var savedSearch = _ref.savedSearch,
      eventEmitter = _ref.eventEmitter;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      showPopover = _useState2[0],
      setShowPopover = _useState2[1];

  var closePopover = (0, _react.useCallback)(function () {
    return setShowPopover(false);
  }, []);
  var onClickButtonLink = (0, _react.useCallback)(function () {
    return setShowPopover(function (v) {
      return !v;
    });
  }, []);
  var onClickUnlikFromSavedSearch = (0, _react.useCallback)(function () {
    setShowPopover(false);
    eventEmitter.emit('unlinkFromSavedSearch');
  }, [eventEmitter]);

  var linkButtonAriaLabel = _i18n.i18n.translate('visDefaultEditor.sidebar.savedSearch.linkButtonAriaLabel', {
    defaultMessage: 'Link to saved search. Click to learn more or break link.'
  });

  return _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    className: "visEditorSidebar__titleContainer visEditorSidebar__linkedSearch",
    gutterSize: "xs",
    responsive: false
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiIcon, {
    type: "search"
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false,
    className: "eui-textTruncate"
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "xs",
    className: "eui-textTruncate"
  }, _react.default.createElement("h2", {
    title: _i18n.i18n.translate('visDefaultEditor.sidebar.savedSearch.titleAriaLabel', {
      defaultMessage: 'Saved search: {title}',
      values: {
        title: savedSearch.title
      }
    })
  }, savedSearch.title))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiPopover, {
    anchorPosition: "downRight",
    button: _react.default.createElement(_eui.EuiToolTip, {
      content: linkButtonAriaLabel
    }, _react.default.createElement(_eui.EuiButtonIcon, {
      "aria-label": linkButtonAriaLabel,
      "data-test-subj": "showUnlinkSavedSearchPopover",
      iconType: "link",
      onClick: onClickButtonLink
    })),
    isOpen: showPopover,
    closePopover: closePopover,
    panelPaddingSize: "s"
  }, _react.default.createElement(_eui.EuiPopoverTitle, null, _react.default.createElement(_react2.FormattedMessage, {
    id: "visDefaultEditor.sidebar.savedSearch.popoverTitle",
    defaultMessage: "Linked to saved search"
  })), _react.default.createElement("div", {
    style: {
      width: 260
    }
  }, _react.default.createElement(_eui.EuiText, {
    size: "s"
  }, _react.default.createElement("p", null, _react.default.createElement(_eui.EuiButtonEmpty, {
    flush: "left",
    href: "#/discover/".concat(savedSearch.id),
    size: "xs"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "visDefaultEditor.sidebar.savedSearch.goToDiscoverButtonText",
    defaultMessage: "View this search in Discover"
  }))), _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "visDefaultEditor.sidebar.savedSearch.popoverHelpText",
    defaultMessage: "Subsequent modifications to this saved search are reflected in the visualization. To disable automatic updates, remove the link."
  })), _react.default.createElement("p", null, _react.default.createElement(_eui.EuiButton, {
    color: "danger",
    "data-test-subj": "unlinkSavedSearch",
    fullWidth: true,
    onClick: onClickUnlikFromSavedSearch,
    size: "s"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "visDefaultEditor.sidebar.savedSearch.unlinkSavedSearchButtonText",
    defaultMessage: "Remove link to saved search"
  }))))))));
}

function SidebarTitle(_ref2) {
  var savedSearch = _ref2.savedSearch,
      vis = _ref2.vis,
      isLinkedSearch = _ref2.isLinkedSearch,
      eventEmitter = _ref2.eventEmitter;
  return isLinkedSearch && savedSearch ? _react.default.createElement(LinkedSearch, {
    savedSearch: savedSearch,
    eventEmitter: eventEmitter
  }) : vis.type.options.showIndexSelection ? _react.default.createElement(_eui.EuiTitle, {
    size: "xs",
    className: "visEditorSidebar__titleContainer eui-textTruncate"
  }, _react.default.createElement("h2", {
    title: _i18n.i18n.translate('visDefaultEditor.sidebar.indexPatternAriaLabel', {
      defaultMessage: 'Index pattern: {title}',
      values: {
        title: vis.data.indexPattern.title
      }
    })
  }, vis.data.indexPattern.title)) : _react.default.createElement("div", {
    className: "visEditorSidebar__indexPatternPlaceholder"
  });
}