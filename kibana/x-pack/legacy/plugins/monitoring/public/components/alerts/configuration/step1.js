"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Step1 = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _kfetch = require("ui/kfetch");

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

var _common = require("../../../../../../../plugins/actions/common");

var _manage_email_action = require("../manage_email_action");

var _constants = require("../../../../common/constants");

var _configuration = require("./configuration");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Step1 = function Step1(props) {
  var _React$useState = _react.default.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      isTesting = _React$useState2[0],
      setIsTesting = _React$useState2[1];

  var _React$useState3 = _react.default.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      isDeleting = _React$useState4[0],
      setIsDeleting = _React$useState4[1];

  var _React$useState5 = _react.default.useState(null),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      testingStatus = _React$useState6[0],
      setTestingStatus = _React$useState6[1];

  var _React$useState7 = _react.default.useState(''),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      fullTestingError = _React$useState8[0],
      setFullTestingError = _React$useState8[1];

  function createEmailAction(_x) {
    return _createEmailAction.apply(this, arguments);
  }

  function _createEmailAction() {
    _createEmailAction = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(data) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!props.editAction) {
                _context3.next = 6;
                break;
              }

              _context3.next = 3;
              return (0, _kfetch.kfetch)({
                method: 'PUT',
                pathname: "".concat(_common.BASE_ACTION_API_PATH, "/").concat(props.editAction.id),
                body: JSON.stringify({
                  name: props.editAction.name,
                  config: (0, _lodash.omit)(data, ['user', 'password']),
                  secrets: (0, _lodash.pick)(data, ['user', 'password'])
                })
              });

            case 3:
              props.setEditAction(null);
              _context3.next = 8;
              break;

            case 6:
              _context3.next = 8;
              return (0, _kfetch.kfetch)({
                method: 'POST',
                pathname: _common.BASE_ACTION_API_PATH,
                body: JSON.stringify({
                  name: _i18n.i18n.translate('xpack.monitoring.alerts.configuration.emailAction.name', {
                    defaultMessage: 'Email action for Stack Monitoring alerts'
                  }),
                  actionTypeId: _constants.ALERT_ACTION_TYPE_EMAIL,
                  config: (0, _lodash.omit)(data, ['user', 'password']),
                  secrets: (0, _lodash.pick)(data, ['user', 'password'])
                })
              });

            case 8:
              _context3.next = 10;
              return props.onActionDone();

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return _createEmailAction.apply(this, arguments);
  }

  function deleteEmailAction(_x2) {
    return _deleteEmailAction.apply(this, arguments);
  }

  function _deleteEmailAction() {
    _deleteEmailAction = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(id) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              setIsDeleting(true);
              _context4.next = 3;
              return (0, _kfetch.kfetch)({
                method: 'DELETE',
                pathname: "".concat(_common.BASE_ACTION_API_PATH, "/").concat(id)
              });

            case 3:
              if (props.editAction && props.editAction.id === id) {
                props.setEditAction(null);
              }

              if (props.selectedEmailActionId === id) {
                props.setSelectedEmailActionId('');
              }

              _context4.next = 7;
              return props.onActionDone();

            case 7:
              setIsDeleting(false);
              setTestingStatus(null);

            case 9:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));
    return _deleteEmailAction.apply(this, arguments);
  }

  function testEmailAction() {
    return _testEmailAction.apply(this, arguments);
  }

  function _testEmailAction() {
    _testEmailAction = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var params, result;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              setIsTesting(true);
              setTestingStatus(null);
              params = {
                subject: 'Kibana alerting test configuration',
                message: "This is a test for the configured email action for Kibana alerting.",
                to: [props.emailAddress]
              };
              _context5.next = 5;
              return (0, _kfetch.kfetch)({
                method: 'POST',
                pathname: "".concat(_common.BASE_ACTION_API_PATH, "/").concat(props.selectedEmailActionId, "/_execute"),
                body: JSON.stringify({
                  params: params
                })
              });

            case 5:
              result = _context5.sent;

              if (result.status === 'ok') {
                setTestingStatus(true);
              } else {
                setTestingStatus(false);
                setFullTestingError(result.message);
              }

              setIsTesting(false);

            case 8:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));
    return _testEmailAction.apply(this, arguments);
  }

  function getTestButton() {
    var isTestingDisabled = !props.emailAddress || props.emailAddress.length === 0;

    var testBtn = _react.default.createElement(_eui.EuiButton, {
      size: "s",
      iconType: "play",
      onClick: testEmailAction,
      isLoading: isTesting,
      isDisabled: isTestingDisabled
    }, _i18n.i18n.translate('xpack.monitoring.alerts.configuration.testConfiguration.buttonText', {
      defaultMessage: 'Test'
    }));

    if (isTestingDisabled) {
      return _react.default.createElement(_eui.EuiToolTip, {
        position: "top",
        content: _i18n.i18n.translate('xpack.monitoring.alerts.configuration.testConfiguration.disabledTooltipText', {
          defaultMessage: 'Please configure an email address below to test this action.'
        })
      }, testBtn);
    }

    return testBtn;
  }

  if (props.editAction) {
    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiText, null, _react.default.createElement("p", null, _i18n.i18n.translate('xpack.monitoring.alerts.configuration.step1.editAction', {
      defaultMessage: 'Edit the action below.'
    }))), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_manage_email_action.ManageEmailAction, {
      createEmailAction:
      /*#__PURE__*/
      function () {
        var _ref = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(data) {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return createEmailAction(data);

                case 2:
                  return _context.abrupt("return", _context.sent);

                case 3:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x3) {
          return _ref.apply(this, arguments);
        };
      }(),
      cancel: function cancel() {
        return props.setEditAction(null);
      },
      isNew: false,
      action: props.editAction
    }));
  }

  var newAction = _react.default.createElement(_eui.EuiText, null, _i18n.i18n.translate('xpack.monitoring.alerts.configuration.newActionDropdownDisplay', {
    defaultMessage: 'Create new email action...'
  }));

  var options = [].concat(_toConsumableArray(props.emailActions.map(function (action) {
    var actionLabel = _i18n.i18n.translate('xpack.monitoring.alerts.configuration.selectAction.inputDisplay', {
      defaultMessage: 'From: {from}, Service: {service}',
      values: {
        service: action.config.service,
        from: action.config.from
      }
    });

    return {
      value: action.id,
      inputDisplay: _react.default.createElement(_eui.EuiText, null, actionLabel),
      dropdownDisplay: _react.default.createElement(_eui.EuiText, null, actionLabel)
    };
  })), [{
    value: _configuration.NEW_ACTION_ID,
    inputDisplay: newAction,
    dropdownDisplay: newAction
  }]);

  var selectBox = _react.default.createElement(_eui.EuiSuperSelect, {
    options: options,
    valueOfSelected: props.selectedEmailActionId,
    onChange: function onChange(id) {
      return props.setSelectedEmailActionId(id);
    },
    hasDividers: true
  });

  var createNew = null;

  if (props.selectedEmailActionId === _configuration.NEW_ACTION_ID) {
    createNew = _react.default.createElement(_eui.EuiPanel, null, _react.default.createElement(_manage_email_action.ManageEmailAction, {
      createEmailAction:
      /*#__PURE__*/
      function () {
        var _ref2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2(data) {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return createEmailAction(data);

                case 2:
                  return _context2.abrupt("return", _context2.sent);

                case 3:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x4) {
          return _ref2.apply(this, arguments);
        };
      }(),
      isNew: true
    })); // If there are no actions, do not show the select box as there are no choices

    if (props.emailActions.length === 0) {
      selectBox = null;
    } else {
      // Otherwise, add a spacer
      selectBox = _react.default.createElement(_react.Fragment, null, selectBox, _react.default.createElement(_eui.EuiSpacer, null));
    }
  }

  var manageConfiguration = null;
  var selectedEmailAction = props.emailActions.find(function (action) {
    return action.id === props.selectedEmailActionId;
  });

  if (props.selectedEmailActionId !== _configuration.NEW_ACTION_ID && props.selectedEmailActionId && selectedEmailAction) {
    var testingStatusUi = null;

    if (testingStatus === true) {
      testingStatusUi = _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiText, {
        color: "secondary"
      }, _react.default.createElement("p", null, _i18n.i18n.translate('xpack.monitoring.alerts.configuration.testConfiguration.success', {
        defaultMessage: 'Looks good on our end!'
      }))));
    } else if (testingStatus === false) {
      testingStatusUi = _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiCallOut, {
        title: _i18n.i18n.translate('xpack.monitoring.alerts.configuration.step1.testingError', {
          defaultMessage: 'Unable to send test email. Please double check your email configuration.'
        }),
        color: "danger",
        iconType: "alert"
      }, _react.default.createElement("p", null, fullTestingError)));
    }

    manageConfiguration = _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiButton, {
      size: "s",
      iconType: "pencil",
      onClick: function onClick() {
        var editAction = props.emailActions.find(function (action) {
          return action.id === props.selectedEmailActionId;
        }) || null;
        props.setEditAction(editAction);
      }
    }, _i18n.i18n.translate('xpack.monitoring.alerts.configuration.editConfiguration.buttonText', {
      defaultMessage: 'Edit'
    }))), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, getTestButton()), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiButton, {
      size: "s",
      color: "danger",
      iconType: "trash",
      onClick: function onClick() {
        return deleteEmailAction(props.selectedEmailActionId);
      },
      isLoading: isDeleting
    }, _i18n.i18n.translate('xpack.monitoring.alerts.configuration.deleteConfiguration.buttonText', {
      defaultMessage: 'Delete'
    })))), testingStatusUi);
  }

  return _react.default.createElement(_react.Fragment, null, selectBox, manageConfiguration, createNew);
};

exports.Step1 = Step1;