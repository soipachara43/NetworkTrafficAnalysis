"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RuleActionsField = void 0;

var _react = _interopRequireWildcard(require("react"));

var _deepmerge = _interopRequireDefault(require("deepmerge"));

var _action_connector_api = require("../../../../../../../../../plugins/triggers_actions_ui/public/application/lib/action_connector_api");

var _public = require("../../../../../../../../../plugins/triggers_actions_ui/public");

var _kibana = require("../../../../../lib/kibana");

var _constants = require("../../../../../../common/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DEFAULT_ACTION_GROUP_ID = 'default';
var DEFAULT_ACTION_MESSAGE = 'Rule {{context.rule.name}} generated {{state.signals_count}} signals';

var RuleActionsField = function RuleActionsField(_ref) {
  var field = _ref.field,
      messageVariables = _ref.messageVariables;

  var _useState = (0, _react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      supportedActionTypes = _useState2[0],
      setSupportedActionTypes = _useState2[1];

  var _useKibana$services = (0, _kibana.useKibana)().services,
      http = _useKibana$services.http,
      actionTypeRegistry = _useKibana$services.triggers_actions_ui.actionTypeRegistry,
      notifications = _useKibana$services.notifications;
  var setActionIdByIndex = (0, _react.useCallback)(function (id, index) {
    var updatedActions = _toConsumableArray(field.value);

    updatedActions[index] = (0, _deepmerge.default)(updatedActions[index], {
      id: id
    });
    field.setValue(updatedActions);
  }, [field]);
  var setAlertProperty = (0, _react.useCallback)(function (updatedActions) {
    return field.setValue(updatedActions);
  }, [field]);
  var setActionParamsProperty = (0, _react.useCallback)( // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function (key, value, index) {
    var updatedActions = _toConsumableArray(field.value);

    updatedActions[index].params[key] = value;
    field.setValue(updatedActions);
  }, [field]);
  (0, _react.useEffect)(function () {
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var actionTypes, supportedTypes;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _action_connector_api.loadActionTypes)({
                http: http
              });

            case 2:
              actionTypes = _context.sent;
              supportedTypes = actionTypes.filter(function (actionType) {
                return _constants.NOTIFICATION_SUPPORTED_ACTION_TYPES_IDS.includes(actionType.id);
              });
              setSupportedActionTypes(supportedTypes);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  }, []);
  if (!supportedActionTypes) return _react.default.createElement(_react.default.Fragment, null);
  return _react.default.createElement(_public.ActionForm, {
    actions: field.value,
    messageVariables: messageVariables,
    defaultActionGroupId: DEFAULT_ACTION_GROUP_ID,
    setActionIdByIndex: setActionIdByIndex,
    setAlertProperty: setAlertProperty,
    setActionParamsProperty: setActionParamsProperty,
    http: http,
    actionTypeRegistry: actionTypeRegistry,
    actionTypes: supportedActionTypes,
    defaultActionMessage: DEFAULT_ACTION_MESSAGE,
    toastNotifications: notifications.toasts
  });
};

exports.RuleActionsField = RuleActionsField;