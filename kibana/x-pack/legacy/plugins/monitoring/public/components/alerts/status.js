"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertsStatus = void 0;

var _react = _interopRequireWildcard(require("react"));

var _kfetch = require("ui/kfetch");

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _documentation_links = require("ui/documentation_links");

var _common = require("../../../../../../plugins/alerting/common");

var _setup_mode = require("../../lib/setup_mode");

var _constants = require("../../../common/constants");

var _configuration = require("./configuration");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var AlertsStatus = function AlertsStatus(props) {
  var emailAddress = props.emailAddress;

  var _React$useState = _react.default.useState((0, _setup_mode.getSetupModeState)().enabled),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      setupModeEnabled = _React$useState2[0],
      setSetupModeEnabled = _React$useState2[1];

  var _React$useState3 = _react.default.useState([]),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      kibanaAlerts = _React$useState4[0],
      setKibanaAlerts = _React$useState4[1];

  var _React$useState5 = _react.default.useState(false),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      showMigrationFlyout = _React$useState6[0],
      setShowMigrationFlyout = _React$useState6[1];

  var _React$useState7 = _react.default.useState(false),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      isSecurityConfigured = _React$useState8[0],
      setIsSecurityConfigured = _React$useState8[1];

  _react.default.useEffect(function () {
    function fetchAlertsStatus() {
      return _fetchAlertsStatus.apply(this, arguments);
    }

    function _fetchAlertsStatus() {
      _fetchAlertsStatus = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var alerts, monitoringAlerts;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _kfetch.kfetch)({
                  method: 'GET',
                  pathname: "".concat(_common.BASE_ALERT_API_PATH, "/_find")
                });

              case 2:
                alerts = _context.sent;
                monitoringAlerts = alerts.data.filter(function (alert) {
                  return alert.alertTypeId.startsWith(_constants.ALERT_TYPE_PREFIX);
                });
                setKibanaAlerts(monitoringAlerts);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return _fetchAlertsStatus.apply(this, arguments);
    }

    fetchAlertsStatus();
    fetchSecurityConfigured();
  }, [setupModeEnabled, showMigrationFlyout]);

  _react.default.useEffect(function () {
    if (!setupModeEnabled && showMigrationFlyout) {
      setShowMigrationFlyout(false);
    }
  }, [setupModeEnabled, showMigrationFlyout]);

  function fetchSecurityConfigured() {
    return _fetchSecurityConfigured.apply(this, arguments);
  }

  function _fetchSecurityConfigured() {
    _fetchSecurityConfigured = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var response;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _kfetch.kfetch)({
                pathname: '/internal/security/api_key/privileges'
              });

            case 2:
              response = _context2.sent;
              setIsSecurityConfigured(response.areApiKeysEnabled);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return _fetchSecurityConfigured.apply(this, arguments);
  }

  (0, _setup_mode.addSetupModeCallback)(function () {
    return setSetupModeEnabled((0, _setup_mode.getSetupModeState)().enabled);
  });

  function enterSetupModeAndOpenFlyout() {
    (0, _setup_mode.toggleSetupMode)(true);
    setShowMigrationFlyout(true);
  }

  function getSecurityConfigurationErrorUi() {
    if (isSecurityConfigured) {
      return null;
    }

    var link = "".concat(_documentation_links.ELASTIC_WEBSITE_URL, "guide/en/elasticsearch/reference/").concat(_documentation_links.DOC_LINK_VERSION, "/security-settings.html#api-key-service-settings");
    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiCallOut, {
      title: _i18n.i18n.translate('xpack.monitoring.alerts.configuration.securityConfigurationErrorTitle', {
        defaultMessage: 'API keys are not enabled in Elasticsearch'
      }),
      color: "danger",
      iconType: "alert"
    }, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.monitoring.alerts.configuration.securityConfigurationErrorMessage",
      defaultMessage: "Refer to the {link} to enable API keys.",
      values: {
        link: _react.default.createElement(_eui.EuiLink, {
          href: link,
          target: "_blank"
        }, _i18n.i18n.translate('xpack.monitoring.alerts.configuration.securityConfigurationError.docsLinkLabel', {
          defaultMessage: 'docs'
        }))
      }
    }))));
  }

  function renderContent() {
    var flyout = null;

    if (showMigrationFlyout) {
      flyout = _react.default.createElement(_eui.EuiFlyout, {
        onClose: function onClose() {
          return setShowMigrationFlyout(false);
        },
        "aria-labelledby": "flyoutTitle"
      }, _react.default.createElement(_eui.EuiFlyoutHeader, {
        hasBorder: true
      }, _react.default.createElement(_eui.EuiTitle, {
        size: "m"
      }, _react.default.createElement("h2", null, _i18n.i18n.translate('xpack.monitoring.alerts.status.flyoutTitle', {
        defaultMessage: 'Monitoring alerts'
      }))), _react.default.createElement(_eui.EuiText, null, _react.default.createElement("p", null, _i18n.i18n.translate('xpack.monitoring.alerts.status.flyoutSubtitle', {
        defaultMessage: 'Configure an email server and email address to receive alerts.'
      }))), getSecurityConfigurationErrorUi()), _react.default.createElement(_eui.EuiFlyoutBody, null, _react.default.createElement(_configuration.AlertsConfiguration, {
        emailAddress: emailAddress,
        onDone: function onDone() {
          return setShowMigrationFlyout(false);
        }
      })));
    }

    var allMigrated = kibanaAlerts.length === _constants.NUMBER_OF_MIGRATED_ALERTS;

    if (allMigrated) {
      if (setupModeEnabled) {
        return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiCallOut, {
          color: "success",
          title: _i18n.i18n.translate('xpack.monitoring.alerts.status.upToDate', {
            defaultMessage: 'Kibana alerting is up to date!'
          }),
          iconType: "flag"
        }, _react.default.createElement("p", null, _react.default.createElement(_eui.EuiLink, {
          onClick: enterSetupModeAndOpenFlyout
        }, _i18n.i18n.translate('xpack.monitoring.alerts.status.manage', {
          defaultMessage: 'Want to make changes? Click here.'
        })))), flyout);
      }
    } else {
      return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiCallOut, {
        color: "warning",
        title: _i18n.i18n.translate('xpack.monitoring.alerts.status.needToMigrateTitle', {
          defaultMessage: 'Hey! We made alerting better!'
        })
      }, _react.default.createElement("p", null, _react.default.createElement(_eui.EuiLink, {
        onClick: enterSetupModeAndOpenFlyout
      }, _i18n.i18n.translate('xpack.monitoring.alerts.status.needToMigrate', {
        defaultMessage: 'Migrate cluster alerts to our new alerting platform.'
      })))), flyout);
    }
  }

  var content = renderContent();

  if (content) {
    return _react.default.createElement(_react.Fragment, null, content, _react.default.createElement(_eui.EuiSpacer, null));
  }

  return null;
};

exports.AlertsStatus = AlertsStatus;