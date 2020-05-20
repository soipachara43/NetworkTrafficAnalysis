"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuggestionPanel = SuggestionPanel;

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _common = require("@kbn/interpreter/common");

var _i18n = require("@kbn/i18n");

var _classnames = _interopRequireDefault(require("classnames"));

var _suggestion_helpers = require("./suggestion_helpers");

var _expression_helpers = require("./expression_helpers");

var _debounced_component = require("../../debounced_component");

var _lens_ui_telemetry = require("../../lens_ui_telemetry");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MAX_SUGGESTIONS_DISPLAYED = 5; // TODO: Remove this <any> when upstream fix is merged https://github.com/elastic/eui/issues/2329
// eslint-disable-next-line

var EuiPanelFixed = _eui.EuiPanel;

var PreviewRenderer = function PreviewRenderer(_ref) {
  var withLabel = _ref.withLabel,
      ExpressionRendererComponent = _ref.ExpressionRendererComponent,
      expression = _ref.expression;
  return _react.default.createElement("div", {
    className: (0, _classnames.default)('lnsSuggestionPanel__chartWrapper', {
      'lnsSuggestionPanel__chartWrapper--withLabel': withLabel
    })
  }, _react.default.createElement(ExpressionRendererComponent, {
    className: "lnsSuggestionPanel__expressionRenderer",
    padding: "s",
    expression: expression,
    renderError: function renderError() {
      return _react.default.createElement("div", {
        className: "lnsSuggestionPanel__suggestionIcon"
      }, _react.default.createElement(_eui.EuiIconTip, {
        size: "xl",
        color: "danger",
        type: "alert",
        "aria-label": _i18n.i18n.translate('xpack.lens.editorFrame.previewErrorLabel', {
          defaultMessage: 'Preview rendering failed'
        }),
        content: _i18n.i18n.translate('xpack.lens.editorFrame.previewErrorLabel', {
          defaultMessage: 'Preview rendering failed'
        })
      }));
    }
  }));
};

var DebouncedPreviewRenderer = (0, _debounced_component.debouncedComponent)(PreviewRenderer, 2000);

var SuggestionPreview = function SuggestionPreview(_ref2) {
  var preview = _ref2.preview,
      ExpressionRendererComponent = _ref2.ExpressionRenderer,
      selected = _ref2.selected,
      onSelect = _ref2.onSelect,
      showTitleAsLabel = _ref2.showTitleAsLabel;
  return _react.default.createElement(_eui.EuiToolTip, {
    content: preview.title
  }, _react.default.createElement(EuiPanelFixed, {
    className: (0, _classnames.default)('lnsSuggestionPanel__button', {
      'lnsSuggestionPanel__button-isSelected': selected
    }),
    paddingSize: "none",
    "data-test-subj": "lnsSuggestion",
    onClick: onSelect
  }, preview.expression ? _react.default.createElement(DebouncedPreviewRenderer, {
    ExpressionRendererComponent: ExpressionRendererComponent,
    expression: (0, _common.toExpression)(preview.expression),
    withLabel: Boolean(showTitleAsLabel)
  }) : _react.default.createElement("span", {
    className: "lnsSuggestionPanel__suggestionIcon"
  }, _react.default.createElement(_eui.EuiIcon, {
    size: "xxl",
    type: preview.icon
  })), showTitleAsLabel && _react.default.createElement("span", {
    className: "lnsSuggestionPanel__buttonLabel"
  }, preview.title)));
};

function SuggestionPanel(_ref3) {
  var activeDatasourceId = _ref3.activeDatasourceId,
      datasourceMap = _ref3.datasourceMap,
      datasourceStates = _ref3.datasourceStates,
      activeVisualizationId = _ref3.activeVisualizationId,
      visualizationMap = _ref3.visualizationMap,
      visualizationState = _ref3.visualizationState,
      dispatch = _ref3.dispatch,
      frame = _ref3.frame,
      ExpressionRendererComponent = _ref3.ExpressionRenderer,
      stagedPreview = _ref3.stagedPreview;
  var currentDatasourceStates = stagedPreview ? stagedPreview.datasourceStates : datasourceStates;
  var currentVisualizationState = stagedPreview ? stagedPreview.visualization.state : visualizationState;
  var currentVisualizationId = stagedPreview ? stagedPreview.visualization.activeId : activeVisualizationId;

  var _useMemo = (0, _react.useMemo)(function () {
    var newSuggestions = (0, _suggestion_helpers.getSuggestions)({
      datasourceMap: datasourceMap,
      datasourceStates: currentDatasourceStates,
      visualizationMap: visualizationMap,
      activeVisualizationId: currentVisualizationId,
      visualizationState: currentVisualizationState
    }).map(function (suggestion) {
      return _objectSpread({}, suggestion, {
        previewExpression: preparePreviewExpression(suggestion, visualizationMap[suggestion.visualizationId], datasourceMap, currentDatasourceStates, frame)
      });
    }).filter(function (suggestion) {
      return !suggestion.hide;
    }).slice(0, MAX_SUGGESTIONS_DISPLAYED);
    var newStateExpression = currentVisualizationState && currentVisualizationId ? preparePreviewExpression({
      visualizationState: currentVisualizationState
    }, visualizationMap[currentVisualizationId], datasourceMap, currentDatasourceStates, frame) : undefined;
    return {
      suggestions: newSuggestions,
      currentStateExpression: newStateExpression
    };
  }, [currentDatasourceStates, currentVisualizationState, currentVisualizationId, datasourceMap, visualizationMap]),
      suggestions = _useMemo.suggestions,
      currentStateExpression = _useMemo.currentStateExpression;

  var _useState = (0, _react.useState)(-1),
      _useState2 = _slicedToArray(_useState, 2),
      lastSelectedSuggestion = _useState2[0],
      setLastSelectedSuggestion = _useState2[1];

  (0, _react.useEffect)(function () {
    // if the staged preview is overwritten by a suggestion,
    // reset the selected index to "current visualization" because
    // we are not in transient suggestion state anymore
    if (!stagedPreview && lastSelectedSuggestion !== -1) {
      setLastSelectedSuggestion(-1);
    }
  }, [stagedPreview]);

  if (!activeDatasourceId) {
    return null;
  }

  if (suggestions.length === 0) {
    return null;
  }

  function rollbackToCurrentVisualization() {
    if (lastSelectedSuggestion !== -1) {
      (0, _lens_ui_telemetry.trackSuggestionEvent)('back_to_current');
      setLastSelectedSuggestion(-1);
      dispatch({
        type: 'ROLLBACK_SUGGESTION'
      });
    }
  }

  var expressionContext = {
    query: frame.query,
    timeRange: {
      from: frame.dateRange.fromDate,
      to: frame.dateRange.toDate
    }
  };
  return _react.default.createElement("div", {
    className: "lnsSuggestionPanel"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiTitle, {
    className: "lnsSuggestionPanel__title",
    size: "xxs"
  }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.lens.editorFrame.suggestionPanelTitle",
    defaultMessage: "Suggestions"
  })))), stagedPreview && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiToolTip, {
    content: _i18n.i18n.translate('xpack.lens.suggestion.refreshSuggestionTooltip', {
      defaultMessage: 'Refresh the suggestions based on the selected visualization.'
    })
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    "data-test-subj": "lensSubmitSuggestion",
    size: "xs",
    iconType: "refresh",
    onClick: function onClick() {
      (0, _lens_ui_telemetry.trackUiEvent)('suggestion_confirmed');
      dispatch({
        type: 'SUBMIT_SUGGESTION'
      });
    }
  }, _i18n.i18n.translate('xpack.lens.sugegstion.refreshSuggestionLabel', {
    defaultMessage: 'Refresh'
  }))))), _react.default.createElement("div", {
    className: "lnsSuggestionPanel__suggestions"
  }, currentVisualizationId && _react.default.createElement(SuggestionPreview, {
    preview: {
      expression: currentStateExpression ? (0, _expression_helpers.prependKibanaContext)(currentStateExpression, expressionContext) : undefined,
      icon: visualizationMap[currentVisualizationId].getDescription(currentVisualizationState).icon || 'empty',
      title: _i18n.i18n.translate('xpack.lens.suggestions.currentVisLabel', {
        defaultMessage: 'Current'
      })
    },
    ExpressionRenderer: ExpressionRendererComponent,
    onSelect: rollbackToCurrentVisualization,
    selected: lastSelectedSuggestion === -1,
    showTitleAsLabel: true
  }), suggestions.map(function (suggestion, index) {
    return _react.default.createElement(SuggestionPreview, {
      preview: {
        expression: suggestion.previewExpression ? (0, _expression_helpers.prependKibanaContext)(suggestion.previewExpression, expressionContext) : undefined,
        icon: suggestion.previewIcon,
        title: suggestion.title
      },
      ExpressionRenderer: ExpressionRendererComponent,
      key: index,
      onSelect: function onSelect() {
        (0, _lens_ui_telemetry.trackUiEvent)('suggestion_clicked');

        if (lastSelectedSuggestion === index) {
          rollbackToCurrentVisualization();
        } else {
          (0, _lens_ui_telemetry.trackSuggestionEvent)("position_".concat(index, "_of_").concat(suggestions.length));
          setLastSelectedSuggestion(index);
          (0, _suggestion_helpers.switchToSuggestion)(dispatch, suggestion);
        }
      },
      selected: index === lastSelectedSuggestion
    });
  })));
}

function getPreviewExpression(visualizableState, visualization, datasources, frame) {
  if (!visualization.toPreviewExpression) {
    return null;
  }

  var suggestionFrameApi = _objectSpread({}, frame, {
    datasourceLayers: _objectSpread({}, frame.datasourceLayers)
  }); // use current frame api and patch apis for changed datasource layers


  if (visualizableState.keptLayerIds && visualizableState.datasourceId && visualizableState.datasourceState) {
    var datasource = datasources[visualizableState.datasourceId];
    var datasourceState = visualizableState.datasourceState;

    var updatedLayerApis = _lodash.default.pick(frame.datasourceLayers, visualizableState.keptLayerIds);

    var changedLayers = datasource.getLayers(visualizableState.datasourceState);
    changedLayers.forEach(function (layerId) {
      if (updatedLayerApis[layerId]) {
        updatedLayerApis[layerId] = datasource.getPublicAPI({
          layerId: layerId,
          dateRange: frame.dateRange,
          state: datasourceState
        });
      }
    });
  }

  return visualization.toPreviewExpression(visualizableState.visualizationState, suggestionFrameApi);
}

function preparePreviewExpression(visualizableState, visualization, datasourceMap, datasourceStates, framePublicAPI) {
  var suggestionDatasourceId = visualizableState.datasourceId;
  var suggestionDatasourceState = visualizableState.datasourceState;
  var expression = getPreviewExpression(visualizableState, visualization, datasourceMap, framePublicAPI);

  if (!expression) {
    return;
  }

  var expressionWithDatasource = (0, _expression_helpers.prependDatasourceExpression)(expression, datasourceMap, suggestionDatasourceId ? _objectSpread({}, datasourceStates, _defineProperty({}, suggestionDatasourceId, {
    isLoading: false,
    state: suggestionDatasourceState
  })) : datasourceStates);
  return expressionWithDatasource;
}