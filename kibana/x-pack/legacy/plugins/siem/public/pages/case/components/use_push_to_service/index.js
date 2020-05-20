"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePushToService = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _use_configure = require("../../../../containers/case/configure/use_configure");

var _use_get_action_license = require("../../../../containers/case/use_get_action_license");

var _use_post_push_to_service = require("../../../../containers/case/use_post_push_to_service");

var _link_to = require("../../../../components/link_to");

var _use_get_url_search = require("../../../../components/navigation/use_get_url_search");

var _home_navigations = require("../../../home/home_navigations");

var _callout = require("../callout");

var _helpers = require("./helpers");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var usePushToService = function usePushToService(_ref) {
  var caseId = _ref.caseId,
      caseStatus = _ref.caseStatus,
      isNew = _ref.isNew,
      updateCase = _ref.updateCase,
      userCanCrud = _ref.userCanCrud;
  var urlSearch = (0, _use_get_url_search.useGetUrlSearch)(_home_navigations.navTabs.case);

  var _useState = (0, _react2.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      connector = _useState2[0],
      setConnector = _useState2[1];

  var _usePostPushToService = (0, _use_post_push_to_service.usePostPushToService)(),
      isLoading = _usePostPushToService.isLoading,
      postPushToService = _usePostPushToService.postPushToService;

  var handleSetConnector = (0, _react2.useCallback)(function (connectorId, connectorName) {
    setConnector({
      connectorId: connectorId,
      connectorName: connectorName !== null && connectorName !== void 0 ? connectorName : ''
    });
  }, []);

  var _useCaseConfigure = (0, _use_configure.useCaseConfigure)({
    setConnector: handleSetConnector
  }),
      loadingCaseConfigure = _useCaseConfigure.loading;

  var _useGetActionLicense = (0, _use_get_action_license.useGetActionLicense)(),
      loadingLicense = _useGetActionLicense.isLoading,
      actionLicense = _useGetActionLicense.actionLicense;

  var handlePushToService = (0, _react2.useCallback)(function () {
    if (connector != null) {
      postPushToService(_objectSpread({
        caseId: caseId
      }, connector, {
        updateCase: updateCase
      }));
    }
  }, [caseId, connector, postPushToService, updateCase]);
  var errorsMsg = (0, _react2.useMemo)(function () {
    var errors = [];

    if (actionLicense != null && !actionLicense.enabledInLicense) {
      errors = [].concat(_toConsumableArray(errors), [(0, _helpers.getLicenseError)()]);
    }

    if ((connector == null || connector != null && connector.connectorId === 'none') && !loadingCaseConfigure && !loadingLicense) {
      errors = [].concat(_toConsumableArray(errors), [{
        title: i18n.PUSH_DISABLE_BY_NO_CASE_CONFIG_TITLE,
        description: _react2.default.createElement(_react.FormattedMessage, {
          defaultMessage: "To open and update cases in external systems, you must configure a {link}.",
          id: "xpack.siem.case.caseView.pushToServiceDisableByNoCaseConfigDescription",
          values: {
            link: _react2.default.createElement(_eui.EuiLink, {
              href: (0, _link_to.getConfigureCasesUrl)(urlSearch),
              target: "_blank"
            }, i18n.LINK_CONNECTOR_CONFIGURE)
          }
        })
      }]);
    }

    if (caseStatus === 'closed') {
      errors = [].concat(_toConsumableArray(errors), [{
        title: i18n.PUSH_DISABLE_BECAUSE_CASE_CLOSED_TITLE,
        description: _react2.default.createElement(_react.FormattedMessage, {
          defaultMessage: "Closed cases cannot be sent to external systems. Reopen the case if you want to open or update it in an external system.",
          id: "xpack.siem.case.caseView.pushToServiceDisableBecauseCaseClosedDescription"
        })
      }]);
    }

    if (actionLicense != null && !actionLicense.enabledInConfig) {
      errors = [].concat(_toConsumableArray(errors), [(0, _helpers.getKibanaConfigError)()]);
    }

    return errors;
  }, [actionLicense, caseStatus, connector, loadingCaseConfigure, loadingLicense, urlSearch]);
  var pushToServiceButton = (0, _react2.useMemo)(function () {
    return _react2.default.createElement(_eui.EuiButton, {
      fill: true,
      iconType: "importAction",
      onClick: handlePushToService,
      disabled: isLoading || loadingLicense || loadingCaseConfigure || errorsMsg.length > 0 || !userCanCrud,
      isLoading: isLoading
    }, isNew ? i18n.PUSH_SERVICENOW : i18n.UPDATE_PUSH_SERVICENOW);
  }, [isNew, handlePushToService, isLoading, loadingLicense, loadingCaseConfigure, errorsMsg, userCanCrud]);
  var objToReturn = (0, _react2.useMemo)(function () {
    return {
      pushButton: errorsMsg.length > 0 ? _react2.default.createElement(_eui.EuiToolTip, {
        position: "top",
        title: errorsMsg[0].title,
        content: _react2.default.createElement("p", null, errorsMsg[0].description)
      }, pushToServiceButton) : _react2.default.createElement(_react2.default.Fragment, null, pushToServiceButton),
      pushCallouts: errorsMsg.length > 0 ? _react2.default.createElement(_callout.CaseCallOut, {
        title: i18n.ERROR_PUSH_SERVICE_CALLOUT_TITLE,
        messages: errorsMsg
      }) : null
    };
  }, [errorsMsg, pushToServiceButton]);
  return objToReturn;
};

exports.usePushToService = usePushToService;