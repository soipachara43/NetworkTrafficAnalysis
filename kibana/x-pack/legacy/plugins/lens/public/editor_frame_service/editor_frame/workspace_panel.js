"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InnerWorkspacePanel = InnerWorkspacePanel;
exports.WorkspacePanel = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _drag_drop = require("../../drag_drop");

var _suggestion_helpers = require("./suggestion_helpers");

var _expression_helpers = require("./expression_helpers");

var _debounced_component = require("../../debounced_component");

var _lens_ui_telemetry = require("../../lens_ui_telemetry");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var WorkspacePanel = (0, _debounced_component.debouncedComponent)(InnerWorkspacePanel); // Exported for testing purposes only.

exports.WorkspacePanel = WorkspacePanel;

function InnerWorkspacePanel(_ref) {
  var activeDatasourceId = _ref.activeDatasourceId,
      activeVisualizationId = _ref.activeVisualizationId,
      visualizationMap = _ref.visualizationMap,
      visualizationState = _ref.visualizationState,
      datasourceMap = _ref.datasourceMap,
      datasourceStates = _ref.datasourceStates,
      framePublicAPI = _ref.framePublicAPI,
      dispatch = _ref.dispatch,
      core = _ref.core,
      ExpressionRendererComponent = _ref.ExpressionRenderer;
  var IS_DARK_THEME = core.uiSettings.get('theme:darkMode');
  var emptyStateGraphicURL = IS_DARK_THEME ? '/plugins/lens/assets/lens_app_graphic_dark_2x.png' : '/plugins/lens/assets/lens_app_graphic_light_2x.png';
  var dragDropContext = (0, _react.useContext)(_drag_drop.DragContext);
  var suggestionForDraggedField = (0, _react.useMemo)(function () {
    if (!dragDropContext.dragging || !activeDatasourceId) {
      return;
    }

    var hasData = Object.values(framePublicAPI.datasourceLayers).some(function (datasource) {
      return datasource.getTableSpec().length > 0;
    });
    var suggestions = (0, _suggestion_helpers.getSuggestions)({
      datasourceMap: _defineProperty({}, activeDatasourceId, datasourceMap[activeDatasourceId]),
      datasourceStates: datasourceStates,
      visualizationMap: hasData && activeVisualizationId ? _defineProperty({}, activeVisualizationId, visualizationMap[activeVisualizationId]) : visualizationMap,
      activeVisualizationId: activeVisualizationId,
      visualizationState: visualizationState,
      field: dragDropContext.dragging
    });
    return suggestions.find(function (s) {
      return s.visualizationId === activeVisualizationId;
    }) || suggestions[0];
  }, [dragDropContext.dragging]);

  var _useState = (0, _react.useState)({
    expressionBuildError: undefined,
    expandError: false
  }),
      _useState2 = _slicedToArray(_useState, 2),
      localState = _useState2[0],
      setLocalState = _useState2[1];

  var activeVisualization = activeVisualizationId ? visualizationMap[activeVisualizationId] : null;
  var expression = (0, _react.useMemo)(function () {
    try {
      return (0, _expression_helpers.buildExpression)({
        visualization: activeVisualization,
        visualizationState: visualizationState,
        datasourceMap: datasourceMap,
        datasourceStates: datasourceStates,
        framePublicAPI: framePublicAPI
      });
    } catch (e) {
      // Most likely an error in the expression provided by a datasource or visualization
      setLocalState(function (s) {
        return _objectSpread({}, s, {
          expressionBuildError: e.toString()
        });
      });
    }
  }, [activeVisualization, visualizationState, datasourceMap, datasourceStates, framePublicAPI.dateRange, framePublicAPI.query, framePublicAPI.filters]);

  function onDrop() {
    if (suggestionForDraggedField) {
      (0, _lens_ui_telemetry.trackUiEvent)('drop_onto_workspace');
      (0, _lens_ui_telemetry.trackUiEvent)(expression ? 'drop_non_empty' : 'drop_empty');
      (0, _suggestion_helpers.switchToSuggestion)(dispatch, suggestionForDraggedField, 'SWITCH_VISUALIZATION');
    }
  }

  function renderEmptyWorkspace() {
    var tooltipContent = _i18n.i18n.translate('xpack.lens.editorFrame.tooltipContent', {
      defaultMessage: 'Lens is in beta and is subject to change.  The design and code is less mature than official GA features and is being provided as-is with no warranties. Beta features are not subject to the support SLA of official GA features'
    });

    return _react.default.createElement("div", {
      className: "eui-textCenter"
    }, _react.default.createElement(_eui.EuiText, {
      textAlign: "center",
      grow: false,
      color: "subdued",
      "data-test-subj": "empty-workspace"
    }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.lens.editorFrame.emptyWorkspace",
      defaultMessage: "Drop some fields here to start"
    })), _react.default.createElement(_eui.EuiImage, {
      style: {
        width: 360
      },
      url: core.http.basePath.prepend(emptyStateGraphicURL),
      alt: ""
    }), _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.lens.editorFrame.emptyWorkspaceHeading",
      defaultMessage: "Lens is a new tool for creating visualizations"
    }), ' ', _react.default.createElement(_eui.EuiBetaBadge, {
      label: "Beta",
      tooltipContent: tooltipContent
    })), _react.default.createElement(_eui.EuiButtonEmpty, {
      href: "https://www.elastic.co/products/kibana/feedback",
      iconType: "popout",
      iconSide: "right",
      size: "xs",
      target: "_blank"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.lens.editorFrame.goToForums",
      defaultMessage: "Make requests and give feedback"
    }))));
  }

  function renderVisualization() {
    (0, _react.useEffect)(function () {
      // reset expression error if component attempts to run it again
      if (expression && localState.expressionBuildError) {
        setLocalState(function (s) {
          return _objectSpread({}, s, {
            expressionBuildError: undefined
          });
        });
      }
    }, [expression]);

    if (expression === null) {
      return renderEmptyWorkspace();
    }

    if (localState.expressionBuildError) {
      return _react.default.createElement(_eui.EuiFlexGroup, {
        direction: "column",
        alignItems: "center"
      }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiIcon, {
        type: "alert",
        size: "xl",
        color: "danger"
      })), _react.default.createElement(_eui.EuiFlexItem, {
        "data-test-subj": "expression-failure"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.lens.editorFrame.expressionFailure",
        defaultMessage: "An error occurred in the expression"
      })), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, localState.expressionBuildError));
    }

    return _react.default.createElement("div", {
      className: "lnsExpressionRenderer"
    }, _react.default.createElement(ExpressionRendererComponent, {
      className: "lnsExpressionRenderer__component",
      padding: "m",
      expression: expression,
      renderError: function renderError(errorMessage) {
        return _react.default.createElement(_eui.EuiFlexGroup, {
          direction: "column",
          alignItems: "center"
        }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiIcon, {
          type: "alert",
          size: "xl",
          color: "danger"
        })), _react.default.createElement(_eui.EuiFlexItem, {
          "data-test-subj": "expression-failure"
        }, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.lens.editorFrame.dataFailure",
          defaultMessage: "An error occurred when loading data."
        })), errorMessage ? _react.default.createElement(_eui.EuiFlexItem, {
          className: "eui-textBreakAll",
          grow: false
        }, _react.default.createElement(_eui.EuiButtonEmpty, {
          onClick: function onClick() {
            setLocalState(function (prevState) {
              return _objectSpread({}, prevState, {
                expandError: !prevState.expandError
              });
            });
          }
        }, _i18n.i18n.translate('xpack.lens.editorFrame.expandRenderingErrorButton', {
          defaultMessage: 'Show details of error'
        })), localState.expandError ? errorMessage : null) : null);
      }
    }));
  }

  return _react.default.createElement(_drag_drop.DragDrop, {
    "data-test-subj": "lnsWorkspace",
    draggable: false,
    droppable: Boolean(suggestionForDraggedField),
    onDrop: onDrop
  }, renderVisualization());
}