"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enableRulesAction = exports.deleteRulesAction = exports.exportRulesAction = exports.duplicateRulesAction = exports.editRuleAction = void 0;

var _redirect_to_detection_engine = require("../../../../components/link_to/redirect_to_detection_engine");

var _rules = require("../../../../containers/detection_engine/rules");

var _toasters = require("../../../../components/toasters");

var _telemetry = require("../../../../lib/telemetry");

var i18n = _interopRequireWildcard(require("../translations"));

var _helpers = require("./helpers");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var editRuleAction = function editRuleAction(rule, history) {
  history.push("/".concat(_redirect_to_detection_engine.DETECTION_ENGINE_PAGE_NAME, "/rules/id/").concat(rule.id, "/edit"));
};

exports.editRuleAction = editRuleAction;

var duplicateRulesAction =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(rules, ruleIds, dispatch, dispatchToaster) {
    var response, _bucketRulesResponse, errors;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            dispatch({
              type: 'loadingRuleIds',
              ids: ruleIds,
              actionType: 'duplicate'
            });
            _context.next = 4;
            return (0, _rules.duplicateRules)({
              rules: rules
            });

          case 4:
            response = _context.sent;
            _bucketRulesResponse = (0, _helpers.bucketRulesResponse)(response), errors = _bucketRulesResponse.errors;

            if (errors.length > 0) {
              (0, _toasters.displayErrorToast)(i18n.DUPLICATE_RULE_ERROR, errors.map(function (e) {
                return e.error.message;
              }), dispatchToaster);
            } else {
              (0, _toasters.displaySuccessToast)(i18n.SUCCESSFULLY_DUPLICATED_RULES(ruleIds.length), dispatchToaster);
            }

            dispatch({
              type: 'loadingRuleIds',
              ids: [],
              actionType: null
            });
            _context.next = 14;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            dispatch({
              type: 'loadingRuleIds',
              ids: [],
              actionType: null
            });
            (0, _toasters.errorToToaster)({
              title: i18n.DUPLICATE_RULE_ERROR,
              error: _context.t0,
              dispatchToaster: dispatchToaster
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));

  return function duplicateRulesAction(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.duplicateRulesAction = duplicateRulesAction;

var exportRulesAction = function exportRulesAction(exportRuleId, dispatch) {
  dispatch({
    type: 'exportRuleIds',
    ids: exportRuleId
  });
};

exports.exportRulesAction = exportRulesAction;

var deleteRulesAction =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(ruleIds, dispatch, dispatchToaster, onRuleDeleted) {
    var response, _bucketRulesResponse2, errors;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            dispatch({
              type: 'loadingRuleIds',
              ids: ruleIds,
              actionType: 'delete'
            });
            _context2.next = 4;
            return (0, _rules.deleteRules)({
              ids: ruleIds
            });

          case 4:
            response = _context2.sent;
            _bucketRulesResponse2 = (0, _helpers.bucketRulesResponse)(response), errors = _bucketRulesResponse2.errors;
            dispatch({
              type: 'loadingRuleIds',
              ids: [],
              actionType: null
            });

            if (errors.length > 0) {
              (0, _toasters.displayErrorToast)(i18n.BATCH_ACTION_DELETE_SELECTED_ERROR(ruleIds.length), errors.map(function (e) {
                return e.error.message;
              }), dispatchToaster);
            } else if (onRuleDeleted) {
              onRuleDeleted();
            }

            _context2.next = 14;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            dispatch({
              type: 'loadingRuleIds',
              ids: [],
              actionType: null
            });
            (0, _toasters.errorToToaster)({
              title: i18n.BATCH_ACTION_DELETE_SELECTED_ERROR(ruleIds.length),
              error: _context2.t0,
              dispatchToaster: dispatchToaster
            });

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));

  return function deleteRulesAction(_x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();

exports.deleteRulesAction = deleteRulesAction;

var enableRulesAction =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(ids, enabled, dispatch, dispatchToaster) {
    var errorTitle, response, _bucketRulesResponse3, rules, errors;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            errorTitle = enabled ? i18n.BATCH_ACTION_ACTIVATE_SELECTED_ERROR(ids.length) : i18n.BATCH_ACTION_DEACTIVATE_SELECTED_ERROR(ids.length);
            _context3.prev = 1;
            dispatch({
              type: 'loadingRuleIds',
              ids: ids,
              actionType: enabled ? 'enable' : 'disable'
            });
            _context3.next = 5;
            return (0, _rules.enableRules)({
              ids: ids,
              enabled: enabled
            });

          case 5:
            response = _context3.sent;
            _bucketRulesResponse3 = (0, _helpers.bucketRulesResponse)(response), rules = _bucketRulesResponse3.rules, errors = _bucketRulesResponse3.errors;
            dispatch({
              type: 'updateRules',
              rules: rules
            });

            if (errors.length > 0) {
              (0, _toasters.displayErrorToast)(errorTitle, errors.map(function (e) {
                return e.error.message;
              }), dispatchToaster);
            }

            if (rules.some(function (rule) {
              return rule.immutable;
            })) {
              (0, _telemetry.track)(_telemetry.METRIC_TYPE.COUNT, enabled ? _telemetry.TELEMETRY_EVENT.SIEM_RULE_ENABLED : _telemetry.TELEMETRY_EVENT.SIEM_RULE_DISABLED);
            }

            if (rules.some(function (rule) {
              return !rule.immutable;
            })) {
              (0, _telemetry.track)(_telemetry.METRIC_TYPE.COUNT, enabled ? _telemetry.TELEMETRY_EVENT.CUSTOM_RULE_ENABLED : _telemetry.TELEMETRY_EVENT.CUSTOM_RULE_DISABLED);
            }

            _context3.next = 17;
            break;

          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3["catch"](1);
            (0, _toasters.displayErrorToast)(errorTitle, [_context3.t0.message], dispatchToaster);
            dispatch({
              type: 'loadingRuleIds',
              ids: [],
              actionType: null
            });

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 13]]);
  }));

  return function enableRulesAction(_x9, _x10, _x11, _x12) {
    return _ref3.apply(this, arguments);
  };
}();

exports.enableRulesAction = enableRulesAction;