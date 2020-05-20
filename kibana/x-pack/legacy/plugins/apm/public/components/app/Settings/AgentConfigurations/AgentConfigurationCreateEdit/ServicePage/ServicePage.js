"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServicePage = ServicePage;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

var _all_option = require("../../../../../../../../../../plugins/apm/common/agent_configuration/all_option");

var _useFetcher4 = require("../../../../../../hooks/useFetcher");

var _FormRowSelect = require("./FormRowSelect");

var _APMLink = require("../../../../../shared/Links/apm/APMLink");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ServicePage(_ref) {
  var newConfig = _ref.newConfig,
      setNewConfig = _ref.setNewConfig,
      onClickNext = _ref.onClickNext;

  var _useFetcher = (0, _useFetcher4.useFetcher)(function (callApmApi) {
    return callApmApi({
      pathname: '/api/apm/settings/agent-configuration/services',
      isCachable: true
    });
  }, [], {
    preservePreviousData: false
  }),
      _useFetcher$data = _useFetcher.data,
      serviceNames = _useFetcher$data === void 0 ? [] : _useFetcher$data,
      serviceNamesStatus = _useFetcher.status;

  var _useFetcher2 = (0, _useFetcher4.useFetcher)(function (callApmApi) {
    if (newConfig.service.name) {
      return callApmApi({
        pathname: '/api/apm/settings/agent-configuration/environments',
        params: {
          query: {
            serviceName: (0, _all_option.omitAllOption)(newConfig.service.name)
          }
        }
      });
    }
  }, [newConfig.service.name], {
    preservePreviousData: false
  }),
      _useFetcher2$data = _useFetcher2.data,
      environments = _useFetcher2$data === void 0 ? [] : _useFetcher2$data,
      environmentStatus = _useFetcher2.status;

  var _useFetcher3 = (0, _useFetcher4.useFetcher)(
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(callApmApi) {
      var serviceName, _ref3, agentName;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              serviceName = newConfig.service.name;

              if (!(!(0, _lodash.isString)(serviceName) || serviceName.length === 0)) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return");

            case 3:
              _context.next = 5;
              return callApmApi({
                pathname: '/api/apm/settings/agent-configuration/agent_name',
                params: {
                  query: {
                    serviceName: serviceName
                  }
                }
              });

            case 5:
              _ref3 = _context.sent;
              agentName = _ref3.agentName;
              setNewConfig(function (prev) {
                return _objectSpread({}, prev, {
                  agent_name: agentName
                });
              });

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }(), [newConfig.service.name, setNewConfig]),
      agentNameStatus = _useFetcher3.status;

  var ALREADY_CONFIGURED_TRANSLATED = _i18n.i18n.translate('xpack.apm.agentConfig.servicePage.alreadyConfiguredOption', {
    defaultMessage: 'already configured'
  });

  var serviceNameOptions = serviceNames.map(function (name) {
    return {
      text: (0, _all_option.getOptionLabel)(name),
      value: name
    };
  });
  var environmentOptions = environments.map(function (_ref4) {
    var name = _ref4.name,
        alreadyConfigured = _ref4.alreadyConfigured;
    return {
      disabled: alreadyConfigured,
      text: "".concat((0, _all_option.getOptionLabel)(name), " ").concat(alreadyConfigured ? "(".concat(ALREADY_CONFIGURED_TRANSLATED, ")") : ''),
      value: name
    };
  });
  return _react.default.createElement(_eui.EuiPanel, {
    paddingSize: "m"
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("h3", null, _i18n.i18n.translate('xpack.apm.agentConfig.servicePage.title', {
    defaultMessage: 'Choose service'
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_FormRowSelect.FormRowSelect, {
    title: _i18n.i18n.translate('xpack.apm.agentConfig.servicePage.service.title', {
      defaultMessage: 'Service'
    }),
    description: _i18n.i18n.translate('xpack.apm.agentConfig.servicePage.service.description', {
      defaultMessage: 'Choose the service you want to configure.'
    }),
    fieldLabel: _i18n.i18n.translate('xpack.apm.agentConfig.servicePage.service.fieldLabel', {
      defaultMessage: 'Service name'
    }),
    isLoading: serviceNamesStatus === _useFetcher4.FETCH_STATUS.LOADING,
    options: serviceNameOptions,
    value: newConfig.service.name,
    disabled: serviceNamesStatus === _useFetcher4.FETCH_STATUS.LOADING,
    onChange: function onChange(e) {
      e.preventDefault();
      var name = e.target.value;
      setNewConfig(function (prev) {
        return _objectSpread({}, prev, {
          service: {
            name: name,
            environment: ''
          }
        });
      });
    }
  }), _react.default.createElement(_FormRowSelect.FormRowSelect, {
    title: _i18n.i18n.translate('xpack.apm.agentConfig.servicePage.environment.title', {
      defaultMessage: 'Environment'
    }),
    description: _i18n.i18n.translate('xpack.apm.agentConfig.servicePage.environment.description', {
      defaultMessage: 'Only a single environment per configuration is supported.'
    }),
    fieldLabel: _i18n.i18n.translate('xpack.apm.agentConfig.servicePage.environment.fieldLabel', {
      defaultMessage: 'Service environment'
    }),
    isLoading: environmentStatus === _useFetcher4.FETCH_STATUS.LOADING,
    options: environmentOptions,
    value: newConfig.service.environment,
    disabled: !newConfig.service.name || environmentStatus === _useFetcher4.FETCH_STATUS.LOADING,
    onChange: function onChange(e) {
      e.preventDefault();
      var environment = e.target.value;
      setNewConfig(function (prev) {
        return _objectSpread({}, prev, {
          service: {
            name: prev.service.name,
            environment: environment
          }
        });
      });
    }
  }), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "flexEnd"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_APMLink.APMLink, {
    path: "/settings/agent-configuration"
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    color: "primary"
  }, _i18n.i18n.translate('xpack.apm.agentConfig.servicePage.cancelButton', {
    defaultMessage: 'Cancel'
  })))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    type: "submit",
    fill: true,
    onClick: onClickNext,
    isLoading: agentNameStatus === _useFetcher4.FETCH_STATUS.LOADING,
    isDisabled: !newConfig.service.name || !newConfig.service.environment || agentNameStatus === _useFetcher4.FETCH_STATUS.LOADING
  }, _i18n.i18n.translate('xpack.apm.agentConfig.saveConfigurationButtonLabel', {
    defaultMessage: 'Next step'
  })))));
}