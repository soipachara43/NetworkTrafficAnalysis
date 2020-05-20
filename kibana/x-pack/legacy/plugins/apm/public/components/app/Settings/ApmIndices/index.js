"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApmIndices = ApmIndices;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _useFetcher2 = require("../../../../hooks/useFetcher");

var _createCallApmApi = require("../../../../services/rest/createCallApmApi");

var _callApi = require("../../../../services/rest/callApi");

var _useApmPluginContext = require("../../../../hooks/useApmPluginContext");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var APM_INDEX_LABELS = [{
  configurationName: 'apm_oss.sourcemapIndices',
  label: _i18n.i18n.translate('xpack.apm.settings.apmIndices.sourcemapIndicesLabel', {
    defaultMessage: 'Sourcemap Indices'
  })
}, {
  configurationName: 'apm_oss.errorIndices',
  label: _i18n.i18n.translate('xpack.apm.settings.apmIndices.errorIndicesLabel', {
    defaultMessage: 'Error Indices'
  })
}, {
  configurationName: 'apm_oss.onboardingIndices',
  label: _i18n.i18n.translate('xpack.apm.settings.apmIndices.onboardingIndicesLabel', {
    defaultMessage: 'Onboarding Indices'
  })
}, {
  configurationName: 'apm_oss.spanIndices',
  label: _i18n.i18n.translate('xpack.apm.settings.apmIndices.spanIndicesLabel', {
    defaultMessage: 'Span Indices'
  })
}, {
  configurationName: 'apm_oss.transactionIndices',
  label: _i18n.i18n.translate('xpack.apm.settings.apmIndices.transactionIndicesLabel', {
    defaultMessage: 'Transaction Indices'
  })
}, {
  configurationName: 'apm_oss.metricsIndices',
  label: _i18n.i18n.translate('xpack.apm.settings.apmIndices.metricsIndicesLabel', {
    defaultMessage: 'Metrics Indices'
  })
}];

function saveApmIndices(_x) {
  return _saveApmIndices.apply(this, arguments);
} // avoid infinite loop by initializing the state outside the component


function _saveApmIndices() {
  _saveApmIndices = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(_ref6) {
    var apmIndices;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            apmIndices = _ref6.apmIndices;
            _context3.next = 3;
            return (0, _createCallApmApi.callApmApi)({
              method: 'POST',
              pathname: '/api/apm/settings/apm-indices/save',
              params: {
                body: apmIndices
              }
            });

          case 3:
            (0, _callApi.clearCache)();

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _saveApmIndices.apply(this, arguments);
}

var INITIAL_STATE = [];

function ApmIndices() {
  var toasts = (0, _useApmPluginContext.useApmPluginContext)().core.notifications.toasts;

  var _useState = (0, _react.useState)({}),
      _useState2 = _slicedToArray(_useState, 2),
      apmIndices = _useState2[0],
      setApmIndices = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isSaving = _useState4[0],
      setIsSaving = _useState4[1];

  var _useFetcher = (0, _useFetcher2.useFetcher)(function (_callApmApi) {
    return _callApmApi({
      pathname: "/api/apm/settings/apm-index-settings"
    });
  }, []),
      _useFetcher$data = _useFetcher.data,
      data = _useFetcher$data === void 0 ? INITIAL_STATE : _useFetcher$data,
      status = _useFetcher.status,
      refetch = _useFetcher.refetch;

  (0, _react.useEffect)(function () {
    setApmIndices(data.reduce(function (acc, _ref) {
      var configurationName = _ref.configurationName,
          savedValue = _ref.savedValue;
      return _objectSpread({}, acc, _defineProperty({}, configurationName, savedValue));
    }, {}));
  }, [data]);

  var handleApplyChangesEvent =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(event) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              event.preventDefault();
              setIsSaving(true);
              _context.prev = 2;
              _context.next = 5;
              return saveApmIndices({
                apmIndices: apmIndices
              });

            case 5:
              toasts.addSuccess({
                title: _i18n.i18n.translate('xpack.apm.settings.apmIndices.applyChanges.succeeded.title', {
                  defaultMessage: 'Indices applied'
                }),
                text: _i18n.i18n.translate('xpack.apm.settings.apmIndices.applyChanges.succeeded.text', {
                  defaultMessage: 'The indices changes were successfully applied. These changes are reflected immediately in the APM UI'
                })
              });
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](2);
              toasts.addDanger({
                title: _i18n.i18n.translate('xpack.apm.settings.apmIndices.applyChanges.failed.title', {
                  defaultMessage: 'Indices could not be applied.'
                }),
                text: _i18n.i18n.translate('xpack.apm.settings.apmIndices.applyChanges.failed.text', {
                  defaultMessage: 'Something went wrong when applying indices. Error: {errorMessage}',
                  values: {
                    errorMessage: _context.t0.message
                  }
                })
              });

            case 11:
              setIsSaving(false);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 8]]);
    }));

    return function handleApplyChangesEvent(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  var handleChangeIndexConfigurationEvent =
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(event) {
      var _event$target, name, value;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _event$target = event.target, name = _event$target.name, value = _event$target.value;
              setApmIndices(_objectSpread({}, apmIndices, _defineProperty({}, name, value)));

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function handleChangeIndexConfigurationEvent(_x3) {
      return _ref3.apply(this, arguments);
    };
  }();

  return _react.default.createElement(_eui.EuiPanel, null, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiTitle, null, _react.default.createElement("h2", null, _i18n.i18n.translate('xpack.apm.settings.apmIndices.title', {
    defaultMessage: 'Indices'
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiText, {
    size: "s",
    grow: false
  }, _react.default.createElement("p", null, _i18n.i18n.translate('xpack.apm.settings.apmIndices.description', {
    defaultMessage: "The APM UI uses index patterns to query your APM indices. If you've customized the index names that APM Server writes events to, you may need to update these patterns for the APM UI to work. Settings here take precedence over those set in kibana.yml."
  })), _react.default.createElement(_eui.EuiForm, null, APM_INDEX_LABELS.map(function (_ref4) {
    var configurationName = _ref4.configurationName,
        label = _ref4.label;
    var matchedConfiguration = data.find(function (_ref5) {
      var configName = _ref5.configurationName;
      return configName === configurationName;
    });
    var defaultValue = matchedConfiguration ? matchedConfiguration.defaultValue : '';
    var savedUiIndexValue = apmIndices[configurationName] || '';
    return _react.default.createElement(_eui.EuiFormRow, {
      key: configurationName,
      label: label,
      helpText: _i18n.i18n.translate('xpack.apm.settings.apmIndices.helpText', {
        defaultMessage: 'Overrides {configurationName}: {defaultValue}',
        values: {
          configurationName: configurationName,
          defaultValue: defaultValue
        }
      }),
      fullWidth: true
    }, _react.default.createElement(_eui.EuiFieldText, {
      fullWidth: true,
      name: configurationName,
      placeholder: defaultValue,
      value: savedUiIndexValue,
      onChange: handleChangeIndexConfigurationEvent
    }));
  }), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "flexEnd"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    onClick: refetch
  }, _i18n.i18n.translate('xpack.apm.settings.apmIndices.cancelButton', {
    defaultMessage: 'Cancel'
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    fill: true,
    onClick: handleApplyChangesEvent,
    isLoading: isSaving,
    disabled: status !== 'success'
  }, _i18n.i18n.translate('xpack.apm.settings.apmIndices.applyButton', {
    defaultMessage: 'Apply changes'
  })))))))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }));
}