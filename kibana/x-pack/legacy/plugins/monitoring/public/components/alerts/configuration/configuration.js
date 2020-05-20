"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertsConfiguration = exports.NEW_ACTION_ID = void 0;

var _react = _interopRequireDefault(require("react"));

var _kfetch = require("ui/kfetch");

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _constants = require("../../../../common/constants");

var _form_validation = require("../../../lib/form_validation");

var _step = require("./step1");

var _step2 = require("./step2");

var _step3 = require("./step3");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var NEW_ACTION_ID = '__new__';
exports.NEW_ACTION_ID = NEW_ACTION_ID;

var AlertsConfiguration = function AlertsConfiguration(props) {
  var onDone = props.onDone;

  var _React$useState = _react.default.useState([]),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      emailActions = _React$useState2[0],
      setEmailActions = _React$useState2[1];

  var _React$useState3 = _react.default.useState(''),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      selectedEmailActionId = _React$useState4[0],
      setSelectedEmailActionId = _React$useState4[1];

  var _React$useState5 = _react.default.useState(null),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      editAction = _React$useState6[0],
      setEditAction = _React$useState6[1];

  var _React$useState7 = _react.default.useState(props.emailAddress),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      emailAddress = _React$useState8[0],
      setEmailAddress = _React$useState8[1];

  var _React$useState9 = _react.default.useState({
    email: null
  }),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      formErrors = _React$useState10[0],
      setFormErrors = _React$useState10[1];

  var _React$useState11 = _react.default.useState(false),
      _React$useState12 = _slicedToArray(_React$useState11, 2),
      showFormErrors = _React$useState12[0],
      setShowFormErrors = _React$useState12[1];

  var _React$useState13 = _react.default.useState(false),
      _React$useState14 = _slicedToArray(_React$useState13, 2),
      isSaving = _React$useState14[0],
      setIsSaving = _React$useState14[1];

  var _React$useState15 = _react.default.useState(''),
      _React$useState16 = _slicedToArray(_React$useState15, 2),
      saveError = _React$useState16[0],
      setSaveError = _React$useState16[1];

  _react.default.useEffect(function () {
    function fetchData() {
      return _fetchData.apply(this, arguments);
    }

    function _fetchData() {
      _fetchData = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetchEmailActions();

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return _fetchData.apply(this, arguments);
    }

    fetchData();
  }, []);

  _react.default.useEffect(function () {
    setFormErrors((0, _form_validation.getMissingFieldErrors)({
      email: emailAddress
    }, {
      email: ''
    }));
  }, [emailAddress]);

  function fetchEmailActions() {
    return _fetchEmailActions.apply(this, arguments);
  }

  function _fetchEmailActions() {
    _fetchEmailActions = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var kibanaActions, actions;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return (0, _kfetch.kfetch)({
                method: 'GET',
                pathname: "/api/action/_find"
              });

            case 2:
              kibanaActions = _context3.sent;
              actions = kibanaActions.data.filter(function (action) {
                return action.actionTypeId === _constants.ALERT_ACTION_TYPE_EMAIL;
              });

              if (actions.length > 0) {
                setSelectedEmailActionId(actions[0].id);
              } else {
                setSelectedEmailActionId(NEW_ACTION_ID);
              }

              setEmailActions(actions);

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return _fetchEmailActions.apply(this, arguments);
  }

  function save() {
    return _save.apply(this, arguments);
  }

  function _save() {
    _save = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var _err$body;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!(emailAddress.length === 0)) {
                _context4.next = 3;
                break;
              }

              setShowFormErrors(true);
              return _context4.abrupt("return");

            case 3:
              setIsSaving(true);
              setShowFormErrors(false);
              _context4.prev = 5;
              _context4.next = 8;
              return (0, _kfetch.kfetch)({
                method: 'POST',
                pathname: "/api/monitoring/v1/alerts",
                body: JSON.stringify({
                  selectedEmailActionId: selectedEmailActionId,
                  emailAddress: emailAddress
                })
              });

            case 8:
              _context4.next = 15;
              break;

            case 10:
              _context4.prev = 10;
              _context4.t0 = _context4["catch"](5);
              setIsSaving(false);
              setSaveError((_context4.t0 === null || _context4.t0 === void 0 ? void 0 : (_err$body = _context4.t0.body) === null || _err$body === void 0 ? void 0 : _err$body.message) || _i18n.i18n.translate('xpack.monitoring.alerts.configuration.unknownError', {
                defaultMessage: 'Something went wrong. Please consult the server logs.'
              }));
              return _context4.abrupt("return");

            case 15:
              onDone();

            case 16:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[5, 10]]);
    }));
    return _save.apply(this, arguments);
  }

  function isStep2Disabled() {
    return isStep2AndStep3Disabled();
  }

  function isStep3Disabled() {
    return isStep2AndStep3Disabled() || !emailAddress || emailAddress.length === 0;
  }

  function isStep2AndStep3Disabled() {
    return !!editAction || !selectedEmailActionId || selectedEmailActionId === NEW_ACTION_ID;
  }

  function getStep2Status() {
    var isDisabled = isStep2AndStep3Disabled();

    if (isDisabled) {
      return 'disabled';
    }

    if (emailAddress && emailAddress.length) {
      return 'complete';
    }

    return 'incomplete';
  }

  function getStep1Status() {
    if (editAction) {
      return 'incomplete';
    }

    return selectedEmailActionId ? 'complete' : 'incomplete';
  }

  var steps = [{
    title: emailActions.length ? _i18n.i18n.translate('xpack.monitoring.alerts.configuration.selectEmailAction', {
      defaultMessage: 'Select email action'
    }) : _i18n.i18n.translate('xpack.monitoring.alerts.configuration.createEmailAction', {
      defaultMessage: 'Create email action'
    }),
    children: _react.default.createElement(_step.Step1, {
      onActionDone:
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return fetchEmailActions();

              case 2:
                return _context2.abrupt("return", _context2.sent);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      })),
      emailActions: emailActions,
      selectedEmailActionId: selectedEmailActionId,
      setSelectedEmailActionId: setSelectedEmailActionId,
      emailAddress: emailAddress,
      editAction: editAction,
      setEditAction: setEditAction
    }),
    status: getStep1Status()
  }, {
    title: _i18n.i18n.translate('xpack.monitoring.alerts.configuration.setEmailAddress', {
      defaultMessage: 'Set the email to receive alerts'
    }),
    status: getStep2Status(),
    children: _react.default.createElement(_step2.Step2, {
      emailAddress: emailAddress,
      setEmailAddress: setEmailAddress,
      showFormErrors: showFormErrors,
      formErrors: formErrors,
      isDisabled: isStep2Disabled()
    })
  }, {
    title: _i18n.i18n.translate('xpack.monitoring.alerts.configuration.confirm', {
      defaultMessage: 'Confirm and save'
    }),
    status: getStep2Status(),
    children: _react.default.createElement(_step3.Step3, {
      isSaving: isSaving,
      save: save,
      isDisabled: isStep3Disabled(),
      error: saveError
    })
  }];
  return _react.default.createElement("div", null, _react.default.createElement(_eui.EuiSteps, {
    steps: steps
  }));
};

exports.AlertsConfiguration = AlertsConfiguration;