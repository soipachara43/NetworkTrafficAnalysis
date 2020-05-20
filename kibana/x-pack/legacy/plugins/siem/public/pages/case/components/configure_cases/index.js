"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigureCases = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _kibana = require("../../../../lib/kibana");

var _use_connectors = require("../../../../containers/case/configure/use_connectors");

var _use_configure = require("../../../../containers/case/configure/use_configure");

var _public = require("../../../../../../../../plugins/triggers_actions_ui/public");

var _link_to = require("../../../../components/link_to");

var _use_get_url_search = require("../../../../components/navigation/use_get_url_search");

var _connectors = require("../configure_cases/connectors");

var _closure_options = require("../configure_cases/closure_options");

var _mapping = require("../configure_cases/mapping");

var _wrappers = require("../wrappers");

var _home_navigations = require("../../../../pages/home/home_navigations");

var _reducer = require("./reducer");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var FormWrapper = _styledComponents.default.div.withConfig({
  displayName: "FormWrapper",
  componentId: "sc-4p7i17-0"
})(["", ""], function (_ref) {
  var theme = _ref.theme;
  return (0, _styledComponents.css)(["& > *{margin-top 40px;}& >:first-child{margin-top:0;}padding-top:", ";padding-bottom:", ";"], theme.eui.paddingSizes.xl, theme.eui.paddingSizes.xl);
});

var initialState = {
  connectorId: 'none',
  closureType: 'close-by-user',
  mapping: null,
  currentConfiguration: {
    connectorId: 'none',
    closureType: 'close-by-user'
  }
};
var actionTypes = [{
  id: '.servicenow',
  name: 'ServiceNow',
  enabled: true,
  enabledInConfig: true,
  enabledInLicense: true,
  minimumLicenseRequired: 'platinum'
}];

var ConfigureCasesComponent = function ConfigureCasesComponent(_ref2) {
  var userCanCrud = _ref2.userCanCrud;
  var search = (0, _use_get_url_search.useGetUrlSearch)(_home_navigations.navTabs.case);
  var _useKibana$services = (0, _kibana.useKibana)().services,
      http = _useKibana$services.http,
      triggers_actions_ui = _useKibana$services.triggers_actions_ui,
      notifications = _useKibana$services.notifications,
      application = _useKibana$services.application;

  var _useState = (0, _react.useState)(true),
      _useState2 = _slicedToArray(_useState, 2),
      connectorIsValid = _useState2[0],
      setConnectorIsValid = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      addFlyoutVisible = _useState4[0],
      setAddFlyoutVisibility = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      editFlyoutVisible = _useState6[0],
      setEditFlyoutVisibility = _useState6[1];

  var _useState7 = (0, _react.useState)(null),
      _useState8 = _slicedToArray(_useState7, 2),
      editedConnectorItem = _useState8[0],
      setEditedConnectorItem = _useState8[1];

  var _useState9 = (0, _react.useState)(false),
      _useState10 = _slicedToArray(_useState9, 2),
      actionBarVisible = _useState10[0],
      setActionBarVisible = _useState10[1];

  var _useState11 = (0, _react.useState)(0),
      _useState12 = _slicedToArray(_useState11, 2),
      totalConfigurationChanges = _useState12[0],
      setTotalConfigurationChanges = _useState12[1];

  var _useReducer = (0, _react.useReducer)((0, _reducer.configureCasesReducer)(), initialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      _useReducer2$ = _useReducer2[0],
      connectorId = _useReducer2$.connectorId,
      closureType = _useReducer2$.closureType,
      mapping = _useReducer2$.mapping,
      currentConfiguration = _useReducer2$.currentConfiguration,
      dispatch = _useReducer2[1];

  var setCurrentConfiguration = (0, _react.useCallback)(function (configuration) {
    dispatch({
      type: 'setCurrentConfiguration',
      currentConfiguration: _objectSpread({}, configuration)
    });
  }, []);
  var setConnectorId = (0, _react.useCallback)(function (newConnectorId) {
    dispatch({
      type: 'setConnectorId',
      connectorId: newConnectorId
    });
  }, []);
  var setClosureType = (0, _react.useCallback)(function (newClosureType) {
    dispatch({
      type: 'setClosureType',
      closureType: newClosureType
    });
  }, []);
  var setMapping = (0, _react.useCallback)(function (newMapping) {
    dispatch({
      type: 'setMapping',
      mapping: newMapping
    });
  }, []);

  var _useCaseConfigure = (0, _use_configure.useCaseConfigure)({
    setConnector: setConnectorId,
    setClosureType: setClosureType,
    setCurrentConfiguration: setCurrentConfiguration
  }),
      loadingCaseConfigure = _useCaseConfigure.loading,
      persistLoading = _useCaseConfigure.persistLoading,
      persistCaseConfigure = _useCaseConfigure.persistCaseConfigure;

  var _useConnectors = (0, _use_connectors.useConnectors)(),
      isLoadingConnectors = _useConnectors.loading,
      connectors = _useConnectors.connectors,
      refetchConnectors = _useConnectors.refetchConnectors; // ActionsConnectorsContextProvider reloadConnectors prop expects a Promise<void>.
  // TODO: Fix it if reloadConnectors type change.


  var reloadConnectors = (0, _react.useCallback)(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", refetchConnectors());

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })), []);
  var isLoadingAny = isLoadingConnectors || persistLoading || loadingCaseConfigure;
  var updateConnectorDisabled = isLoadingAny || !connectorIsValid || connectorId === 'none';
  var handleSubmit = (0, _react.useCallback)( // TO DO give a warning/error to user when field are not mapped so they have chance to do it
  function () {
    var _ref4, _connectors$find;

    setActionBarVisible(false);
    persistCaseConfigure({
      connectorId: connectorId,
      connectorName: (_ref4 = (_connectors$find = connectors.find(function (c) {
        return c.id === connectorId;
      })) === null || _connectors$find === void 0 ? void 0 : _connectors$find.name) !== null && _ref4 !== void 0 ? _ref4 : '',
      closureType: closureType
    });
  }, [connectorId, connectors, closureType, mapping]);
  var onClickAddConnector = (0, _react.useCallback)(function () {
    setActionBarVisible(false);
    setAddFlyoutVisibility(true);
  }, []);
  var onClickUpdateConnector = (0, _react.useCallback)(function () {
    setActionBarVisible(false);
    setEditFlyoutVisibility(true);
  }, []);
  var handleActionBar = (0, _react.useCallback)(function () {
    var unsavedChanges = (0, _fp.difference)(Object.values(currentConfiguration), [connectorId, closureType]).length;

    if (unsavedChanges === 0) {
      setActionBarVisible(false);
    } else {
      setActionBarVisible(true);
    }

    setTotalConfigurationChanges(unsavedChanges);
  }, [currentConfiguration, connectorId, closureType]);
  var handleSetAddFlyoutVisibility = (0, _react.useCallback)(function (isVisible) {
    handleActionBar();
    setAddFlyoutVisibility(isVisible);
  }, [currentConfiguration, connectorId, closureType]);
  var handleSetEditFlyoutVisibility = (0, _react.useCallback)(function (isVisible) {
    handleActionBar();
    setEditFlyoutVisibility(isVisible);
  }, [currentConfiguration, connectorId, closureType]);
  (0, _react.useEffect)(function () {
    if (!(0, _fp.isEmpty)(connectors) && connectorId !== 'none' && connectors.some(function (c) {
      return c.id === connectorId;
    })) {
      var _ref5, _myConnector$config, _myConnector$config$c;

      var myConnector = connectors.find(function (c) {
        return c.id === connectorId;
      });
      var myMapping = (_ref5 = myConnector === null || myConnector === void 0 ? void 0 : (_myConnector$config = myConnector.config) === null || _myConnector$config === void 0 ? void 0 : (_myConnector$config$c = _myConnector$config.casesConfiguration) === null || _myConnector$config$c === void 0 ? void 0 : _myConnector$config$c.mapping) !== null && _ref5 !== void 0 ? _ref5 : [];
      setMapping(myMapping.map(function (m) {
        var _m$action_type;

        return {
          source: m.source,
          target: m.target,
          actionType: (_m$action_type = m.action_type) !== null && _m$action_type !== void 0 ? _m$action_type : m.actionType
        };
      }));
    }
  }, [connectors, connectorId]);
  (0, _react.useEffect)(function () {
    if (!isLoadingConnectors && connectorId !== 'none' && !connectors.some(function (c) {
      return c.id === connectorId;
    })) {
      setConnectorIsValid(false);
    } else if (!isLoadingConnectors && (connectorId === 'none' || connectors.some(function (c) {
      return c.id === connectorId;
    }))) {
      setConnectorIsValid(true);
    }
  }, [connectors, connectorId]);
  (0, _react.useEffect)(function () {
    if (!isLoadingConnectors && connectorId !== 'none') {
      setEditedConnectorItem(connectors.find(function (c) {
        return c.id === connectorId;
      }));
    }
  }, [connectors, connectorId]);
  (0, _react.useEffect)(function () {
    handleActionBar();
  }, [connectors, connectorId, closureType, currentConfiguration]);
  return _react.default.createElement(FormWrapper, null, !connectorIsValid && _react.default.createElement(_wrappers.SectionWrapper, {
    style: {
      marginTop: 0
    }
  }, _react.default.createElement(_eui.EuiCallOut, {
    title: i18n.WARNING_NO_CONNECTOR_TITLE,
    color: "warning",
    iconType: "help",
    "data-test-subj": "configure-cases-warning-callout"
  }, i18n.WARNING_NO_CONNECTOR_MESSAGE)), _react.default.createElement(_wrappers.SectionWrapper, null, _react.default.createElement(_connectors.Connectors, {
    connectors: connectors !== null && connectors !== void 0 ? connectors : [],
    disabled: persistLoading || isLoadingConnectors || !userCanCrud,
    isLoading: isLoadingConnectors,
    onChangeConnector: setConnectorId,
    handleShowAddFlyout: onClickAddConnector,
    selectedConnector: connectorId
  })), _react.default.createElement(_wrappers.SectionWrapper, null, _react.default.createElement(_closure_options.ClosureOptions, {
    closureTypeSelected: closureType,
    disabled: persistLoading || isLoadingConnectors || connectorId === 'none' || !userCanCrud,
    onChangeClosureType: setClosureType
  })), _react.default.createElement(_wrappers.SectionWrapper, null, _react.default.createElement(_mapping.Mapping, {
    disabled: true,
    updateConnectorDisabled: updateConnectorDisabled || !userCanCrud,
    mapping: mapping,
    onChangeMapping: setMapping,
    setEditFlyoutVisibility: onClickUpdateConnector
  })), actionBarVisible && _react.default.createElement(_eui.EuiBottomBar, {
    "data-test-subj": "case-configure-action-bottom-bar"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween",
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiText, {
    "data-test-subj": "case-configure-action-bottom-bar-total-changes"
  }, i18n.UNSAVED_CHANGES(totalConfigurationChanges)))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    color: "ghost",
    iconType: "cross",
    isDisabled: isLoadingAny,
    isLoading: persistLoading,
    "aria-label": i18n.CANCEL,
    href: (0, _link_to.getCaseUrl)(search),
    "data-test-subj": "case-configure-action-bottom-bar-cancel-button"
  }, i18n.CANCEL)), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    fill: true,
    color: "secondary",
    iconType: "save",
    "aria-label": i18n.SAVE_CHANGES,
    isDisabled: isLoadingAny,
    isLoading: persistLoading,
    onClick: handleSubmit,
    "data-test-subj": "case-configure-action-bottom-bar-save-button"
  }, i18n.SAVE_CHANGES)))))), _react.default.createElement(_public.ActionsConnectorsContextProvider, {
    value: {
      http: http,
      actionTypeRegistry: triggers_actions_ui.actionTypeRegistry,
      toastNotifications: notifications.toasts,
      capabilities: application.capabilities,
      reloadConnectors: reloadConnectors
    }
  }, _react.default.createElement(_public.ConnectorAddFlyout, {
    addFlyoutVisible: addFlyoutVisible,
    setAddFlyoutVisibility: handleSetAddFlyoutVisibility,
    actionTypes: actionTypes
  }), editedConnectorItem && _react.default.createElement(_public.ConnectorEditFlyout, {
    key: editedConnectorItem.id,
    initialConnector: editedConnectorItem,
    editFlyoutVisible: editFlyoutVisible,
    setEditFlyoutVisibility: handleSetEditFlyoutVisibility
  })));
};

var ConfigureCases = _react.default.memo(ConfigureCasesComponent);

exports.ConfigureCases = ConfigureCases;