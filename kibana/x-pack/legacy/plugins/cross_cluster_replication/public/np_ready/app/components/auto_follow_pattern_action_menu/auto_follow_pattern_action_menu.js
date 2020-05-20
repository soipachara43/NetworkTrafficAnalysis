"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoFollowPatternActionMenu = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _auto_follow_pattern_delete_provider = require("../auto_follow_pattern_delete_provider");

var _routing = _interopRequireDefault(require("../../services/routing"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var actionsAriaLabel = _i18n.i18n.translate('xpack.crossClusterReplication.autoFollowActionMenu.autoFollowPatternActionMenuButtonAriaLabel', {
  defaultMessage: 'Auto-follow pattern options'
});

var allValuesSame = function allValuesSame(values) {
  if (!values.length) {
    return false;
  }

  var _values = _toArray(values),
      firstValue = _values[0],
      restValues = _values.slice(1);

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = restValues[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var value = _step.value;

      if (firstValue !== value) {
        return false;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return true;
};

var AutoFollowPatternActionMenuUI = function AutoFollowPatternActionMenuUI(_ref) {
  var patterns = _ref.patterns,
      deleteAutoFollowPattern = _ref.deleteAutoFollowPattern,
      pauseAutoFollowPattern = _ref.pauseAutoFollowPattern,
      resumeAutoFollowPattern = _ref.resumeAutoFollowPattern,
      arrowDirection = _ref.arrowDirection,
      edit = _ref.edit;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      showPopover = _useState2[0],
      setShowPopover = _useState2[1];

  var allActiveValuesSame = allValuesSame(patterns.filter(Boolean).map(function (_ref2) {
    var active = _ref2.active;
    return active;
  }));

  var closePopoverViaAction = function closePopoverViaAction() {
    setShowPopover(false);
  };

  var panelItems = [
  /**
   * Resume or pause pattern
   */
  allActiveValuesSame ? patterns[0].active ? {
    name: _i18n.i18n.translate('xpack.crossClusterReplication.pauseAutoFollowPatternsLabel', {
      defaultMessage: 'Pause {total, plural, one {replication} other {replications}}',
      values: {
        total: patterns.length
      }
    }),
    icon: _react.default.createElement(_eui.EuiIcon, {
      type: "pause"
    }),
    onClick: function onClick() {
      pauseAutoFollowPattern(patterns.map(function (_ref3) {
        var name = _ref3.name;
        return name;
      }));
      closePopoverViaAction();
    }
  } : {
    name: _i18n.i18n.translate('xpack.crossClusterReplication.resumeAutoFollowPatternsLabel', {
      defaultMessage: 'Resume {total, plural, one {replication} other {replications}}',
      values: {
        total: patterns.length
      }
    }),
    icon: _react.default.createElement(_eui.EuiIcon, {
      type: "play"
    }),
    onClick: function onClick() {
      resumeAutoFollowPattern(patterns.map(function (_ref4) {
        var name = _ref4.name;
        return name;
      }));
      closePopoverViaAction();
    }
  } : null,
  /**
   * Navigate to edit a pattern
   */
  edit && patterns.length === 1 ? {
    name: _i18n.i18n.translate('xpack.crossClusterReplication.editAutoFollowPatternButtonLabel', {
      defaultMessage: 'Edit pattern'
    }),
    icon: _react.default.createElement(_eui.EuiIcon, {
      type: "pencil"
    }),
    onClick: function onClick() {
      window.location.hash = _routing.default.getAutoFollowPatternPath(patterns[0].name);
    }
  } : null,
  /**
   * Delete a pattern
   */
  {
    name: _i18n.i18n.translate('xpack.crossClusterReplication.deleteAutoFollowPatternButtonLabel', {
      defaultMessage: 'Delete {total, plural, one {pattern} other {patterns}}',
      values: {
        total: patterns.length
      }
    }),
    icon: _react.default.createElement(_eui.EuiIcon, {
      type: "trash"
    }),
    onClick: function onClick() {
      deleteAutoFollowPattern(patterns.map(function (_ref5) {
        var name = _ref5.name;
        return name;
      }));
      closePopoverViaAction();
    }
  }].filter(Boolean);

  var button = _react.default.createElement(_eui.EuiButton, {
    "data-test-subj": "autoFollowPatternActionMenuButton",
    "aria-label": actionsAriaLabel,
    onClick: function onClick() {
      return setShowPopover(!showPopover);
    },
    iconType: arrowDirection === 'up' ? 'arrowUp' : 'arrowDown',
    iconSide: "right",
    fill: true
  }, _i18n.i18n.translate('xpack.crossClusterReplication.autoFollowPatternActionMenu.buttonLabel', {
    defaultMessage: 'Manage {patterns, plural, one {pattern} other {patterns}}',
    values: {
      patterns: patterns.length
    }
  }));

  return _react.default.createElement(_eui.EuiPopover, {
    isOpen: showPopover,
    closePopover: function closePopover() {
      return setShowPopover(false);
    },
    button: button,
    panelPaddingSize: "none",
    withTitle: true,
    repositionOnScroll: true
  }, _react.default.createElement(_eui.EuiContextMenu, {
    initialPanelId: 0,
    "data-test-subj": "autoFollowPatternActionContextMenu",
    panels: [{
      id: 0,
      title: _i18n.i18n.translate('xpack.crossClusterReplication.autoFollowPatternActionMenu.panelTitle', {
        defaultMessage: 'Pattern options'
      }),
      items: panelItems
    }]
  }));
};

var AutoFollowPatternActionMenu = function AutoFollowPatternActionMenu(props) {
  return _react.default.createElement(_auto_follow_pattern_delete_provider.AutoFollowPatternDeleteProvider, null, function (deleteAutoFollowPattern) {
    return _react.default.createElement(AutoFollowPatternActionMenuUI, _extends({
      deleteAutoFollowPattern: deleteAutoFollowPattern
    }, props));
  });
};

exports.AutoFollowPatternActionMenu = AutoFollowPatternActionMenu;