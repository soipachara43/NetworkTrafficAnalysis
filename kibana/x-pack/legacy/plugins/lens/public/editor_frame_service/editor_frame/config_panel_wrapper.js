"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigPanelWrapper = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _native_renderer = require("../../native_renderer");

var _drag_drop = require("../../drag_drop");

var _chart_switch = require("./chart_switch");

var _lens_ui_telemetry = require("../../lens_ui_telemetry");

var _id_generator = require("../../id_generator");

var _layer_actions = require("./layer_actions");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var ConfigPanelWrapper = (0, _react.memo)(function ConfigPanelWrapper(props) {
  var activeVisualization = props.visualizationMap[props.activeVisualizationId || ''];
  var visualizationState = props.visualizationState;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_chart_switch.ChartSwitch, {
    "data-test-subj": "lnsChartSwitcher",
    visualizationMap: props.visualizationMap,
    visualizationId: props.activeVisualizationId,
    visualizationState: props.visualizationState,
    datasourceMap: props.datasourceMap,
    datasourceStates: props.datasourceStates,
    dispatch: props.dispatch,
    framePublicAPI: props.framePublicAPI
  }), activeVisualization && visualizationState && _react.default.createElement(LayerPanels, _extends({}, props, {
    activeVisualization: activeVisualization
  })));
});
exports.ConfigPanelWrapper = ConfigPanelWrapper;

function LayerPanels(props) {
  var framePublicAPI = props.framePublicAPI,
      activeVisualization = props.activeVisualization,
      visualizationState = props.visualizationState,
      dispatch = props.dispatch,
      activeDatasourceId = props.activeDatasourceId,
      datasourceMap = props.datasourceMap;
  var setVisualizationState = (0, _react.useMemo)(function () {
    return function (newState) {
      props.dispatch({
        type: 'UPDATE_VISUALIZATION_STATE',
        visualizationId: activeVisualization.id,
        newState: newState,
        clearStagedPreview: false
      });
    };
  }, [props.dispatch, activeVisualization]);
  var updateDatasource = (0, _react.useMemo)(function () {
    return function (datasourceId, newState) {
      props.dispatch({
        type: 'UPDATE_DATASOURCE_STATE',
        updater: function updater() {
          return newState;
        },
        datasourceId: datasourceId,
        clearStagedPreview: false
      });
    };
  }, [props.dispatch]);
  var updateAll = (0, _react.useMemo)(function () {
    return function (datasourceId, newDatasourceState, newVisualizationState) {
      props.dispatch({
        type: 'UPDATE_STATE',
        subType: 'UPDATE_ALL_STATES',
        updater: function updater(prevState) {
          return _objectSpread({}, prevState, {
            datasourceStates: _objectSpread({}, prevState.datasourceStates, _defineProperty({}, datasourceId, {
              state: newDatasourceState,
              isLoading: false
            })),
            visualization: _objectSpread({}, prevState.visualization, {
              state: newVisualizationState
            }),
            stagedPreview: undefined
          });
        }
      });
    };
  }, [props.dispatch]);
  var layerIds = activeVisualization.getLayerIds(visualizationState);
  return _react.default.createElement(_eui.EuiForm, {
    className: "lnsConfigPanel"
  }, layerIds.map(function (layerId) {
    return _react.default.createElement(LayerPanel, _extends({}, props, {
      key: layerId,
      layerId: layerId,
      activeVisualization: activeVisualization,
      visualizationState: visualizationState,
      updateVisualization: setVisualizationState,
      updateDatasource: updateDatasource,
      updateAll: updateAll,
      frame: framePublicAPI,
      isOnlyLayer: layerIds.length === 1,
      onRemoveLayer: function onRemoveLayer() {
        dispatch({
          type: 'UPDATE_STATE',
          subType: 'REMOVE_OR_CLEAR_LAYER',
          updater: function updater(state) {
            return (0, _layer_actions.removeLayer)({
              activeVisualization: activeVisualization,
              layerId: layerId,
              trackUiEvent: _lens_ui_telemetry.trackUiEvent,
              datasourceMap: datasourceMap,
              state: state
            });
          }
        });
      }
    }));
  }), activeVisualization.appendLayer && _react.default.createElement(_eui.EuiFlexItem, {
    grow: true
  }, _react.default.createElement(_eui.EuiToolTip, {
    className: "eui-fullWidth",
    content: _i18n.i18n.translate('xpack.lens.xyChart.addLayerTooltip', {
      defaultMessage: 'Use multiple layers to combine chart types or visualize different index patterns.'
    }),
    position: "bottom"
  }, _react.default.createElement(_eui.EuiButton, {
    className: "lnsConfigPanel__addLayerBtn",
    fullWidth: true,
    size: "s",
    "data-test-subj": "lnsXY_layer_add",
    "aria-label": _i18n.i18n.translate('xpack.lens.xyChart.addLayerButton', {
      defaultMessage: 'Add layer'
    }),
    title: _i18n.i18n.translate('xpack.lens.xyChart.addLayerButton', {
      defaultMessage: 'Add layer'
    }),
    onClick: function onClick() {
      dispatch({
        type: 'UPDATE_STATE',
        subType: 'ADD_LAYER',
        updater: function updater(state) {
          return (0, _layer_actions.appendLayer)({
            activeVisualization: activeVisualization,
            generateId: _id_generator.generateId,
            trackUiEvent: _lens_ui_telemetry.trackUiEvent,
            activeDatasource: datasourceMap[activeDatasourceId],
            state: state
          });
        }
      });
    },
    iconType: "plusInCircleFilled"
  }))));
}

function LayerPanel(props) {
  var dragDropContext = (0, _react.useContext)(_drag_drop.DragContext);
  var framePublicAPI = props.framePublicAPI,
      layerId = props.layerId,
      activeVisualization = props.activeVisualization,
      isOnlyLayer = props.isOnlyLayer,
      onRemoveLayer = props.onRemoveLayer;
  var datasourcePublicAPI = framePublicAPI.datasourceLayers[layerId];

  if (!datasourcePublicAPI) {
    return null;
  }

  var layerVisualizationConfigProps = {
    layerId: layerId,
    dragDropContext: dragDropContext,
    state: props.visualizationState,
    frame: props.framePublicAPI,
    dateRange: props.framePublicAPI.dateRange
  };
  var datasourceId = datasourcePublicAPI.datasourceId;
  var layerDatasourceState = props.datasourceStates[datasourceId].state;
  var layerDatasource = props.datasourceMap[datasourceId];
  var layerDatasourceDropProps = {
    layerId: layerId,
    dragDropContext: dragDropContext,
    state: layerDatasourceState,
    setState: function setState(newState) {
      props.updateDatasource(datasourceId, newState);
    }
  };

  var layerDatasourceConfigProps = _objectSpread({}, layerDatasourceDropProps, {
    frame: props.framePublicAPI,
    dateRange: props.framePublicAPI.dateRange
  });

  var _useState = (0, _react.useState)({
    isOpen: false,
    openId: null,
    addingToGroupId: null
  }),
      _useState2 = _slicedToArray(_useState, 2),
      popoverState = _useState2[0],
      setPopoverState = _useState2[1];

  var _activeVisualization$ = activeVisualization.getConfiguration(layerVisualizationConfigProps),
      groups = _activeVisualization$.groups;

  var isEmptyLayer = !groups.some(function (d) {
    return d.accessors.length > 0;
  });

  function wrapInPopover(id, groupId, trigger, panel) {
    var noMatch = popoverState.isOpen ? !groups.some(function (d) {
      return d.accessors.includes(id);
    }) : false;
    return _react.default.createElement(_eui.EuiPopover, {
      className: "lnsConfigPanel__popover",
      anchorClassName: "lnsConfigPanel__trigger",
      isOpen: popoverState.isOpen && (popoverState.openId === id || noMatch && popoverState.addingToGroupId === groupId),
      closePopover: function closePopover() {
        setPopoverState({
          isOpen: false,
          openId: null,
          addingToGroupId: null
        });
      },
      button: trigger,
      anchorPosition: "leftUp",
      withTitle: true,
      panelPaddingSize: "s"
    }, panel);
  }

  return _react.default.createElement(_drag_drop.ChildDragDropProvider, dragDropContext, _react.default.createElement(_eui.EuiPanel, {
    className: "lnsConfigPanel__panel",
    paddingSize: "s"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s",
    alignItems: "flexStart",
    responsive: false
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(LayerSettings, {
    layerId: layerId,
    layerConfigProps: _objectSpread({}, layerVisualizationConfigProps, {
      setState: props.updateVisualization
    }),
    activeVisualization: activeVisualization
  })), layerDatasource && _react.default.createElement(_eui.EuiFlexItem, {
    className: "eui-textTruncate"
  }, _react.default.createElement(_native_renderer.NativeRenderer, {
    render: layerDatasource.renderLayerPanel,
    nativeProps: {
      layerId: layerId,
      state: layerDatasourceState,
      setState: function setState(updater) {
        var newState = typeof updater === 'function' ? updater(layerDatasourceState) : updater; // Look for removed columns

        var nextPublicAPI = layerDatasource.getPublicAPI({
          state: newState,
          layerId: layerId,
          dateRange: props.framePublicAPI.dateRange
        });
        var nextTable = new Set(nextPublicAPI.getTableSpec().map(function (_ref) {
          var columnId = _ref.columnId;
          return columnId;
        }));
        var removed = datasourcePublicAPI.getTableSpec().map(function (_ref2) {
          var columnId = _ref2.columnId;
          return columnId;
        }).filter(function (columnId) {
          return !nextTable.has(columnId);
        });
        var nextVisState = props.visualizationState;
        removed.forEach(function (columnId) {
          nextVisState = activeVisualization.removeDimension({
            layerId: layerId,
            columnId: columnId,
            prevState: nextVisState
          });
        });
        props.updateAll(datasourceId, newState, nextVisState);
      }
    }
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), groups.map(function (group, index) {
    var newId = (0, _id_generator.generateId)();
    var isMissing = !isEmptyLayer && group.required && group.accessors.length === 0;
    return _react.default.createElement(_eui.EuiFormRow, {
      className: "lnsConfigPanel__row",
      label: group.groupLabel,
      key: index,
      isInvalid: isMissing,
      error: isMissing ? _i18n.i18n.translate('xpack.lens.editorFrame.requiredDimensionWarningLabel', {
        defaultMessage: 'Required dimension'
      }) : []
    }, _react.default.createElement(_react.default.Fragment, null, group.accessors.map(function (accessor) {
      return _react.default.createElement(_drag_drop.DragDrop, {
        key: accessor,
        className: "lnsConfigPanel__dimension",
        "data-test-subj": group.dataTestSubj,
        droppable: dragDropContext.dragging && layerDatasource.canHandleDrop(_objectSpread({}, layerDatasourceDropProps, {
          columnId: accessor,
          filterOperations: group.filterOperations
        })),
        onDrop: function onDrop(droppedItem) {
          layerDatasource.onDrop(_objectSpread({}, layerDatasourceDropProps, {
            droppedItem: droppedItem,
            columnId: accessor,
            filterOperations: group.filterOperations
          }));
        }
      }, wrapInPopover(accessor, group.groupId, _react.default.createElement(_native_renderer.NativeRenderer, {
        render: props.datasourceMap[datasourceId].renderDimensionTrigger,
        nativeProps: _objectSpread({}, layerDatasourceConfigProps, {
          columnId: accessor,
          filterOperations: group.filterOperations,
          suggestedPriority: group.suggestedPriority,
          togglePopover: function togglePopover() {
            if (popoverState.isOpen) {
              setPopoverState({
                isOpen: false,
                openId: null,
                addingToGroupId: null
              });
            } else {
              setPopoverState({
                isOpen: true,
                openId: accessor,
                addingToGroupId: null // not set for existing dimension

              });
            }
          }
        })
      }), _react.default.createElement(_native_renderer.NativeRenderer, {
        render: props.datasourceMap[datasourceId].renderDimensionEditor,
        nativeProps: _objectSpread({}, layerDatasourceConfigProps, {
          core: props.core,
          columnId: accessor,
          filterOperations: group.filterOperations
        })
      })), _react.default.createElement(_eui.EuiButtonIcon, {
        "data-test-subj": "indexPattern-dimensionPopover-remove",
        iconType: "cross",
        iconSize: "s",
        size: "s",
        color: "danger",
        "aria-label": _i18n.i18n.translate('xpack.lens.indexPattern.removeColumnLabel', {
          defaultMessage: 'Remove configuration'
        }),
        title: _i18n.i18n.translate('xpack.lens.indexPattern.removeColumnLabel', {
          defaultMessage: 'Remove configuration'
        }),
        onClick: function onClick() {
          (0, _lens_ui_telemetry.trackUiEvent)('indexpattern_dimension_removed');
          props.updateAll(datasourceId, layerDatasource.removeColumn({
            layerId: layerId,
            columnId: accessor,
            prevState: layerDatasourceState
          }), props.activeVisualization.removeDimension({
            layerId: layerId,
            columnId: accessor,
            prevState: props.visualizationState
          }));
        }
      }));
    }), group.supportsMoreColumns ? _react.default.createElement(_drag_drop.DragDrop, {
      className: "lnsConfigPanel__dimension",
      "data-test-subj": group.dataTestSubj,
      droppable: dragDropContext.dragging && layerDatasource.canHandleDrop(_objectSpread({}, layerDatasourceDropProps, {
        columnId: newId,
        filterOperations: group.filterOperations
      })),
      onDrop: function onDrop(droppedItem) {
        var dropSuccess = layerDatasource.onDrop(_objectSpread({}, layerDatasourceDropProps, {
          droppedItem: droppedItem,
          columnId: newId,
          filterOperations: group.filterOperations
        }));

        if (dropSuccess) {
          props.updateVisualization(activeVisualization.setDimension({
            layerId: layerId,
            groupId: group.groupId,
            columnId: newId,
            prevState: props.visualizationState
          }));
        }
      }
    }, wrapInPopover(newId, group.groupId, _react.default.createElement("div", {
      className: "lnsConfigPanel__triggerLink"
    }, _react.default.createElement(_eui.EuiButtonEmpty, {
      iconType: "plusInCircleFilled",
      "data-test-subj": "lns-empty-dimension",
      "aria-label": _i18n.i18n.translate('xpack.lens.configure.addConfig', {
        defaultMessage: 'Add a configuration'
      }),
      title: _i18n.i18n.translate('xpack.lens.configure.addConfig', {
        defaultMessage: 'Add a configuration'
      }),
      onClick: function onClick() {
        if (popoverState.isOpen) {
          setPopoverState({
            isOpen: false,
            openId: null,
            addingToGroupId: null
          });
        } else {
          setPopoverState({
            isOpen: true,
            openId: newId,
            addingToGroupId: group.groupId
          });
        }
      },
      size: "xs"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.lens.configure.emptyConfig",
      defaultMessage: "Drop a field here"
    }))), _react.default.createElement(_native_renderer.NativeRenderer, {
      render: props.datasourceMap[datasourceId].renderDimensionEditor,
      nativeProps: _objectSpread({}, layerDatasourceConfigProps, {
        core: props.core,
        columnId: newId,
        filterOperations: group.filterOperations,
        suggestedPriority: group.suggestedPriority,
        setState: function setState(newState) {
          props.updateAll(datasourceId, newState, activeVisualization.setDimension({
            layerId: layerId,
            groupId: group.groupId,
            columnId: newId,
            prevState: props.visualizationState
          }));
          setPopoverState({
            isOpen: true,
            openId: newId,
            addingToGroupId: null // clear now that dimension exists

          });
        }
      })
    }))) : null));
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    size: "xs",
    iconType: "trash",
    color: "danger",
    "data-test-subj": "lns_layer_remove",
    onClick: function onClick() {
      // If we don't blur the remove / clear button, it remains focused
      // which is a strange UX in this case. e.target.blur doesn't work
      // due to who knows what, but probably event re-writing. Additionally,
      // activeElement does not have blur so, we need to do some casting + safeguards.
      var el = document.activeElement;

      if (el === null || el === void 0 ? void 0 : el.blur) {
        el.blur();
      }

      onRemoveLayer();
    }
  }, isOnlyLayer ? _i18n.i18n.translate('xpack.lens.resetLayer', {
    defaultMessage: 'Reset layer'
  }) : _i18n.i18n.translate('xpack.lens.deleteLayer', {
    defaultMessage: 'Delete layer'
  }))))));
}

function LayerSettings(_ref3) {
  var _activeVisualization$2;

  var layerId = _ref3.layerId,
      activeVisualization = _ref3.activeVisualization,
      layerConfigProps = _ref3.layerConfigProps;

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isOpen = _useState4[0],
      setIsOpen = _useState4[1];

  if (!activeVisualization.renderLayerContextMenu) {
    return null;
  }

  return _react.default.createElement(_eui.EuiPopover, {
    id: "lnsLayerPopover_".concat(layerId),
    panelPaddingSize: "s",
    ownFocus: true,
    button: _react.default.createElement(_eui.EuiButtonIcon, {
      iconType: ((_activeVisualization$2 = activeVisualization.getLayerContextMenuIcon) === null || _activeVisualization$2 === void 0 ? void 0 : _activeVisualization$2.call(activeVisualization, layerConfigProps)) || 'gear',
      "aria-label": _i18n.i18n.translate('xpack.lens.editLayerSettings', {
        defaultMessage: 'Edit layer settings'
      }),
      onClick: function onClick() {
        return setIsOpen(!isOpen);
      },
      "data-test-subj": "lns_layer_settings"
    }),
    isOpen: isOpen,
    closePopover: function closePopover() {
      return setIsOpen(false);
    },
    anchorPosition: "leftUp"
  }, _react.default.createElement(_native_renderer.NativeRenderer, {
    render: activeVisualization.renderLayerContextMenu,
    nativeProps: layerConfigProps
  }));
}