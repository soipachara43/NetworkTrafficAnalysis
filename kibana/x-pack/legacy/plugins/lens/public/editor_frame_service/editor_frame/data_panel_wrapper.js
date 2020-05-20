"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataPanelWrapper = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _native_renderer = require("../../native_renderer");

var _drag_drop = require("../../drag_drop");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DataPanelWrapper = (0, _react.memo)(function (props) {
  var setDatasourceState = (0, _react.useMemo)(function () {
    return function (updater) {
      props.dispatch({
        type: 'UPDATE_DATASOURCE_STATE',
        updater: updater,
        datasourceId: props.activeDatasource,
        clearStagedPreview: true
      });
    };
  }, [props.dispatch, props.activeDatasource]);
  var datasourceProps = {
    dragDropContext: (0, _react.useContext)(_drag_drop.DragContext),
    state: props.datasourceState,
    setState: setDatasourceState,
    core: props.core,
    query: props.query,
    dateRange: props.dateRange,
    filters: props.filters
  };

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      showDatasourceSwitcher = _useState2[0],
      setDatasourceSwitcher = _useState2[1];

  return _react.default.createElement(_react.default.Fragment, null, Object.keys(props.datasourceMap).length > 1 && _react.default.createElement(_eui.EuiPopover, {
    id: "datasource-switch",
    className: "lnsDataPanelWrapper__switchSource",
    button: _react.default.createElement(_eui.EuiButtonIcon, {
      "aria-label": _i18n.i18n.translate('xpack.lens.dataPanelWrapper.switchDatasource', {
        defaultMessage: 'Switch to datasource'
      }),
      title: _i18n.i18n.translate('xpack.lens.dataPanelWrapper.switchDatasource', {
        defaultMessage: 'Switch to datasource'
      }),
      "data-test-subj": "datasource-switch",
      onClick: function onClick() {
        return setDatasourceSwitcher(true);
      },
      iconType: "gear"
    }),
    isOpen: showDatasourceSwitcher,
    closePopover: function closePopover() {
      return setDatasourceSwitcher(false);
    },
    panelPaddingSize: "none",
    anchorPosition: "rightUp"
  }, _react.default.createElement(_eui.EuiContextMenuPanel, {
    title: _i18n.i18n.translate('xpack.lens.dataPanelWrapper.switchDatasource', {
      defaultMessage: 'Switch to datasource'
    }),
    items: Object.keys(props.datasourceMap).map(function (datasourceId) {
      return _react.default.createElement(_eui.EuiContextMenuItem, {
        key: datasourceId,
        "data-test-subj": "datasource-switch-".concat(datasourceId),
        icon: props.activeDatasource === datasourceId ? 'check' : 'empty',
        onClick: function onClick() {
          setDatasourceSwitcher(false);
          props.dispatch({
            type: 'SWITCH_DATASOURCE',
            newDatasourceId: datasourceId
          });
        }
      }, datasourceId);
    })
  })), props.activeDatasource && !props.datasourceIsLoading && _react.default.createElement(_native_renderer.NativeRenderer, {
    className: "lnsDataPanelWrapper",
    render: props.datasourceMap[props.activeDatasource].renderDataPanel,
    nativeProps: datasourceProps
  }));
});
exports.DataPanelWrapper = DataPanelWrapper;