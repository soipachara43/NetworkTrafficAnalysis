"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChartSwitch = ChartSwitch;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

var _suggestion_helpers = require("./suggestion_helpers");

var _lens_ui_telemetry = require("../../lens_ui_telemetry");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function VisualizationSummary(props) {
  var visualization = props.visualizationMap[props.visualizationId || ''];

  if (!visualization) {
    return _react.default.createElement(_react.default.Fragment, null, _i18n.i18n.translate('xpack.lens.configPanel.selectVisualization', {
      defaultMessage: 'Select a visualization'
    }));
  }

  var description = visualization.getDescription(props.visualizationState);
  return _react.default.createElement(_react.default.Fragment, null, description.icon && _react.default.createElement(_eui.EuiIcon, {
    size: "xl",
    className: "lnsChartSwitch__summaryIcon",
    type: description.icon
  }), description.label);
}

function ChartSwitch(props) {
  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      flyoutOpen = _useState2[0],
      setFlyoutOpen = _useState2[1];

  var commitSelection = function commitSelection(selection) {
    setFlyoutOpen(false);
    (0, _lens_ui_telemetry.trackUiEvent)("chart_switch");
    (0, _suggestion_helpers.switchToSuggestion)(props.dispatch, _objectSpread({}, selection, {
      visualizationState: selection.getVisualizationState()
    }), 'SWITCH_VISUALIZATION');

    if (!selection.datasourceId && !selection.sameDatasources || selection.dataLoss === 'everything') {
      props.framePublicAPI.removeLayers(Object.keys(props.framePublicAPI.datasourceLayers));
    }
  };

  function getSelection(visualizationId, subVisualizationId) {
    var newVisualization = props.visualizationMap[visualizationId];

    var switchVisType = props.visualizationMap[visualizationId].switchVisualizationType || function (_type, initialState) {
      return initialState;
    };

    if (props.visualizationId === visualizationId) {
      return {
        visualizationId: visualizationId,
        subVisualizationId: subVisualizationId,
        dataLoss: 'nothing',
        keptLayerIds: Object.keys(props.framePublicAPI.datasourceLayers),
        getVisualizationState: function getVisualizationState() {
          return switchVisType(subVisualizationId, props.visualizationState);
        },
        sameDatasources: true
      };
    }

    var layers = Object.entries(props.framePublicAPI.datasourceLayers);
    var containsData = layers.some(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          _layerId = _ref2[0],
          datasource = _ref2[1];

      return datasource.getTableSpec().length > 0;
    });
    var topSuggestion = getTopSuggestion(props, visualizationId, newVisualization);
    var dataLoss;

    if (!containsData) {
      dataLoss = 'nothing';
    } else if (!topSuggestion) {
      dataLoss = 'everything';
    } else if (layers.length > 1) {
      dataLoss = 'layers';
    } else if (topSuggestion.columns !== layers[0][1].getTableSpec().length) {
      dataLoss = 'columns';
    } else {
      dataLoss = 'nothing';
    }

    return {
      visualizationId: visualizationId,
      subVisualizationId: subVisualizationId,
      dataLoss: dataLoss,
      getVisualizationState: topSuggestion ? function () {
        return switchVisType(subVisualizationId, newVisualization.initialize(props.framePublicAPI, topSuggestion.visualizationState));
      } : function () {
        return switchVisType(subVisualizationId, newVisualization.initialize(props.framePublicAPI));
      },
      keptLayerIds: topSuggestion ? topSuggestion.keptLayerIds : [],
      datasourceState: topSuggestion ? topSuggestion.datasourceState : undefined,
      datasourceId: topSuggestion ? topSuggestion.datasourceId : undefined
    };
  }

  var visualizationTypes = (0, _react.useMemo)(function () {
    return flyoutOpen && (0, _lodash.flatten)(Object.values(props.visualizationMap).map(function (v) {
      return v.visualizationTypes.map(function (t) {
        return _objectSpread({
          visualizationId: v.id
        }, t, {
          icon: t.largeIcon || t.icon
        });
      });
    })).map(function (visualizationType) {
      return _objectSpread({}, visualizationType, {
        selection: getSelection(visualizationType.visualizationId, visualizationType.id)
      });
    });
  }, [flyoutOpen, props.visualizationMap, props.framePublicAPI, props.visualizationId, props.visualizationState]);

  var popover = _react.default.createElement(_eui.EuiPopover, {
    id: "lnsChartSwitchPopover",
    ownFocus: true,
    initialFocus: ".lnsChartSwitch__popoverPanel",
    panelClassName: "lnsChartSwitch__popoverPanel",
    anchorClassName: "eui-textTruncate",
    panelPaddingSize: "s",
    button: _react.default.createElement(_eui.EuiButtonEmpty, {
      className: "lnsChartSwitch__triggerButton",
      onClick: function onClick() {
        return setFlyoutOpen(!flyoutOpen);
      },
      "data-test-subj": "lnsChartSwitchPopover",
      flush: "left",
      iconSide: "right",
      iconType: "arrowDown",
      color: "text"
    }, _react.default.createElement(VisualizationSummary, props)),
    isOpen: flyoutOpen,
    closePopover: function closePopover() {
      return setFlyoutOpen(false);
    },
    anchorPosition: "downLeft"
  }, _react.default.createElement(_eui.EuiPopoverTitle, null, _i18n.i18n.translate('xpack.lens.configPanel.selectVisualization', {
    defaultMessage: 'Select a visualization'
  })), _react.default.createElement(_eui.EuiKeyPadMenu, null, (visualizationTypes || []).map(function (v) {
    return _react.default.createElement(_eui.EuiKeyPadMenuItemButton, {
      key: "".concat(v.visualizationId, ":").concat(v.id),
      label: _react.default.createElement("span", {
        "data-test-subj": "visTypeTitle"
      }, v.label),
      role: "menuitem",
      "data-test-subj": "lnsChartSwitchPopover_".concat(v.id),
      onClick: function onClick() {
        return commitSelection(v.selection);
      },
      betaBadgeLabel: v.selection.dataLoss !== 'nothing' ? _i18n.i18n.translate('xpack.lens.chartSwitch.dataLossLabel', {
        defaultMessage: 'Data loss'
      }) : undefined,
      betaBadgeTooltipContent: v.selection.dataLoss !== 'nothing' ? _i18n.i18n.translate('xpack.lens.chartSwitch.dataLossDescription', {
        defaultMessage: 'Switching to this chart will lose some of the configuration'
      }) : undefined,
      betaBadgeIconType: v.selection.dataLoss !== 'nothing' ? 'alert' : undefined
    }, _react.default.createElement(_eui.EuiIcon, {
      className: "lnsChartSwitch__chartIcon",
      type: v.icon || 'empty',
      size: "l"
    }));
  })));

  return _react.default.createElement("div", {
    className: "lnsChartSwitch__header"
  }, popover);
}

function getTopSuggestion(props, visualizationId, newVisualization) {
  var suggestions = (0, _suggestion_helpers.getSuggestions)({
    datasourceMap: props.datasourceMap,
    datasourceStates: props.datasourceStates,
    visualizationMap: _defineProperty({}, visualizationId, newVisualization),
    activeVisualizationId: props.visualizationId,
    visualizationState: props.visualizationState
  }).filter(function (suggestion) {
    // don't use extended versions of current data table on switching between visualizations
    // to avoid confusing the user.
    return suggestion.changeType !== 'extended';
  }); // We prefer unchanged or reduced suggestions when switching
  // charts since that allows you to switch from A to B and back
  // to A with the greatest chance of preserving your original state.

  return suggestions.find(function (s) {
    return s.changeType === 'unchanged';
  }) || suggestions.find(function (s) {
    return s.changeType === 'reduced';
  }) || suggestions[0];
}