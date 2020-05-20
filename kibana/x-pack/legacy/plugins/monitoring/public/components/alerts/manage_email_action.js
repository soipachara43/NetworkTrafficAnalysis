"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManageEmailAction = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _form_validation = require("../../lib/form_validation");

var _constants = require("../../../common/constants");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DEFAULT_DATA = {
  service: '',
  host: '',
  port: 0,
  secure: false,
  from: '',
  user: '',
  password: ''
};

var CREATE_LABEL = _i18n.i18n.translate('xpack.monitoring.alerts.migrate.manageAction.createLabel', {
  defaultMessage: 'Create email action'
});

var SAVE_LABEL = _i18n.i18n.translate('xpack.monitoring.alerts.migrate.manageAction.saveLabel', {
  defaultMessage: 'Save email action'
});

var CANCEL_LABEL = _i18n.i18n.translate('xpack.monitoring.alerts.migrate.manageAction.cancelLabel', {
  defaultMessage: 'Cancel'
});

var NEW_SERVICE_ID = '__new__';

var ManageEmailAction = function ManageEmailAction(props) {
  var createEmailAction = props.createEmailAction,
      cancel = props.cancel,
      isNew = props.isNew,
      action = props.action;
  var defaultData = Object.assign({}, DEFAULT_DATA, action ? action.config : {});

  var _React$useState = _react.default.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      isSaving = _React$useState2[0],
      setIsSaving = _React$useState2[1];

  var _React$useState3 = _react.default.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      showErrors = _React$useState4[0],
      setShowErrors = _React$useState4[1];

  var _React$useState5 = _react.default.useState((0, _form_validation.getMissingFieldErrors)(defaultData, DEFAULT_DATA)),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      errors = _React$useState6[0],
      setErrors = _React$useState6[1];

  var _React$useState7 = _react.default.useState(defaultData),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      data = _React$useState8[0],
      setData = _React$useState8[1];

  var _React$useState9 = _react.default.useState(false),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      createNewService = _React$useState10[0],
      setCreateNewService = _React$useState10[1];

  var _React$useState11 = _react.default.useState(''),
      _React$useState12 = _slicedToArray(_React$useState11, 2),
      newService = _React$useState12[0],
      setNewService = _React$useState12[1];

  _react.default.useEffect(function () {
    var missingFieldErrors = (0, _form_validation.getMissingFieldErrors)(data, DEFAULT_DATA);

    if (!missingFieldErrors.service) {
      if (data.service === NEW_SERVICE_ID && !newService) {
        missingFieldErrors.service = (0, _form_validation.getRequiredFieldError)('service');
      }
    }

    setErrors(missingFieldErrors);
  }, [data, newService]);

  function saveEmailAction() {
    return _saveEmailAction.apply(this, arguments);
  }

  function _saveEmailAction() {
    _saveEmailAction = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var mergedData;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setShowErrors(true);

              if ((0, _form_validation.hasErrors)(errors)) {
                _context.next = 13;
                break;
              }

              setShowErrors(false);
              setIsSaving(true);
              mergedData = _objectSpread({}, data, {
                service: data.service === NEW_SERVICE_ID ? newService : data.service
              });
              _context.prev = 5;
              _context.next = 8;
              return createEmailAction(mergedData);

            case 8:
              _context.next = 13;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](5);
              setErrors({
                general: _context.t0.body.message
              });

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[5, 10]]);
    }));
    return _saveEmailAction.apply(this, arguments);
  }

  var serviceOptions = _constants.ALERT_EMAIL_SERVICES.map(function (service) {
    return {
      value: service,
      inputDisplay: _react.default.createElement(_eui.EuiText, null, service),
      dropdownDisplay: _react.default.createElement(_eui.EuiText, null, service)
    };
  });

  serviceOptions.push({
    value: NEW_SERVICE_ID,
    inputDisplay: _react.default.createElement(_eui.EuiText, null, _i18n.i18n.translate('xpack.monitoring.alerts.migrate.manageAction.addingNewServiceText', {
      defaultMessage: 'Adding new service...'
    })),
    dropdownDisplay: _react.default.createElement(_eui.EuiText, null, _i18n.i18n.translate('xpack.monitoring.alerts.migrate.manageAction.addNewServiceText', {
      defaultMessage: 'Add new service...'
    }))
  });
  var addNewServiceUi = null;

  if (createNewService) {
    addNewServiceUi = _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiFieldText, {
      value: newService,
      onChange: function onChange(e) {
        return setNewService(e.target.value);
      },
      isInvalid: showErrors
    }));
  }

  return _react.default.createElement(_eui.EuiForm, {
    isInvalid: showErrors,
    error: Object.values(errors)
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.monitoring.alerts.migrate.manageAction.serviceText', {
      defaultMessage: 'Service'
    }),
    helpText: _react.default.createElement(_eui.EuiLink, {
      external: true,
      target: "_blank",
      href: "https://nodemailer.com/smtp/well-known/"
    }, _i18n.i18n.translate('xpack.monitoring.alerts.migrate.manageAction.serviceHelpText', {
      defaultMessage: 'Find out more'
    })),
    error: errors.service,
    isInvalid: showErrors && !!errors.service
  }, _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSuperSelect, {
    options: serviceOptions,
    valueOfSelected: data.service,
    onChange: function onChange(id) {
      if (id === NEW_SERVICE_ID) {
        setCreateNewService(true);
        setData(_objectSpread({}, data, {
          service: NEW_SERVICE_ID
        }));
      } else {
        setCreateNewService(false);
        setData(_objectSpread({}, data, {
          service: id
        }));
      }
    },
    hasDividers: true,
    isInvalid: showErrors && !!errors.service
  }), addNewServiceUi)), _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.monitoring.alerts.migrate.manageAction.hostText', {
      defaultMessage: 'Host'
    }),
    helpText: _i18n.i18n.translate('xpack.monitoring.alerts.migrate.manageAction.hostHelpText', {
      defaultMessage: 'Host name of the service provider'
    }),
    error: errors.host,
    isInvalid: showErrors && !!errors.host
  }, _react.default.createElement(_eui.EuiFieldText, {
    value: data.host,
    onChange: function onChange(e) {
      return setData(_objectSpread({}, data, {
        host: e.target.value
      }));
    },
    isInvalid: showErrors && !!errors.host
  })), _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.monitoring.alerts.migrate.manageAction.portText', {
      defaultMessage: 'Port'
    }),
    helpText: _i18n.i18n.translate('xpack.monitoring.alerts.migrate.manageAction.portHelpText', {
      defaultMessage: 'Port number of the service provider'
    }),
    error: errors.port,
    isInvalid: showErrors && !!errors.port
  }, _react.default.createElement(_eui.EuiFieldNumber, {
    value: data.port,
    onChange: function onChange(e) {
      return setData(_objectSpread({}, data, {
        port: parseInt(e.target.value, 10)
      }));
    },
    isInvalid: showErrors && !!errors.port
  })), _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.monitoring.alerts.migrate.manageAction.secureText', {
      defaultMessage: 'Secure'
    }),
    helpText: _i18n.i18n.translate('xpack.monitoring.alerts.migrate.manageAction.secureHelpText', {
      defaultMessage: 'Whether to use TLS with the service provider'
    })
  }, _react.default.createElement(_eui.EuiSwitch, {
    label: "",
    checked: data.secure,
    onChange: function onChange(e) {
      return setData(_objectSpread({}, data, {
        secure: e.target.checked
      }));
    }
  })), _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.monitoring.alerts.migrate.manageAction.fromText', {
      defaultMessage: 'From'
    }),
    helpText: _i18n.i18n.translate('xpack.monitoring.alerts.migrate.manageAction.fromHelpText', {
      defaultMessage: 'The from email address for alerts'
    }),
    error: errors.from,
    isInvalid: showErrors && !!errors.from
  }, _react.default.createElement(_eui.EuiFieldText, {
    value: data.from,
    onChange: function onChange(e) {
      return setData(_objectSpread({}, data, {
        from: e.target.value
      }));
    },
    isInvalid: showErrors && !!errors.from
  })), _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.monitoring.alerts.migrate.manageAction.userText', {
      defaultMessage: 'User'
    }),
    helpText: _i18n.i18n.translate('xpack.monitoring.alerts.migrate.manageAction.userHelpText', {
      defaultMessage: 'The user to use with the service provider'
    }),
    error: errors.user,
    isInvalid: showErrors && !!errors.user
  }, _react.default.createElement(_eui.EuiFieldText, {
    value: data.user,
    onChange: function onChange(e) {
      return setData(_objectSpread({}, data, {
        user: e.target.value
      }));
    },
    isInvalid: showErrors && !!errors.user
  })), _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.monitoring.alerts.migrate.manageAction.passwordText', {
      defaultMessage: 'Password'
    }),
    helpText: _i18n.i18n.translate('xpack.monitoring.alerts.migrate.manageAction.passwordHelpText', {
      defaultMessage: 'The password to use with the service provider'
    }),
    error: errors.password,
    isInvalid: showErrors && !!errors.password
  }, _react.default.createElement(_eui.EuiFieldPassword, {
    value: data.password,
    onChange: function onChange(e) {
      return setData(_objectSpread({}, data, {
        password: e.target.value
      }));
    },
    isInvalid: showErrors && !!errors.password
  })), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    type: "submit",
    fill: true,
    onClick: saveEmailAction,
    isLoading: isSaving
  }, isNew ? CREATE_LABEL : SAVE_LABEL)), !action || isNew ? null : _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    onClick: cancel
  }, CANCEL_LABEL))));
};

exports.ManageEmailAction = ManageEmailAction;