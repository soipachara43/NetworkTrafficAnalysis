"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBatchItems = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var i18n = _interopRequireWildcard(require("../translations"));

var _actions = require("./actions");

var _toasters = require("../../../../components/toasters");

var detectionI18n = _interopRequireWildcard(require("../../translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getBatchItems = function getBatchItems(_ref) {
  var closePopover = _ref.closePopover,
      dispatch = _ref.dispatch,
      dispatchToaster = _ref.dispatchToaster,
      hasMlPermissions = _ref.hasMlPermissions,
      loadingRuleIds = _ref.loadingRuleIds,
      reFetchRules = _ref.reFetchRules,
      rules = _ref.rules,
      selectedRuleIds = _ref.selectedRuleIds;
  var containsEnabled = selectedRuleIds.some(function (id) {
    var _ref2, _rules$find;

    return (_ref2 = (_rules$find = rules.find(function (r) {
      return r.id === id;
    })) === null || _rules$find === void 0 ? void 0 : _rules$find.enabled) !== null && _ref2 !== void 0 ? _ref2 : false;
  });
  var containsDisabled = selectedRuleIds.some(function (id) {
    var _ref3, _rules$find2;

    return (_ref3 = !((_rules$find2 = rules.find(function (r) {
      return r.id === id;
    })) === null || _rules$find2 === void 0 ? void 0 : _rules$find2.enabled)) !== null && _ref3 !== void 0 ? _ref3 : false;
  });
  var containsLoading = selectedRuleIds.some(function (id) {
    return loadingRuleIds.includes(id);
  });
  var containsImmutable = selectedRuleIds.some(function (id) {
    var _ref4, _rules$find3;

    return (_ref4 = (_rules$find3 = rules.find(function (r) {
      return r.id === id;
    })) === null || _rules$find3 === void 0 ? void 0 : _rules$find3.immutable) !== null && _ref4 !== void 0 ? _ref4 : false;
  });
  return [_react.default.createElement(_eui.EuiContextMenuItem, {
    key: i18n.BATCH_ACTION_ACTIVATE_SELECTED,
    icon: "checkInCircleFilled",
    disabled: containsLoading || !containsDisabled,
    onClick:
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var deactivatedIds, deactivatedIdsNoML, mlRuleCount;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              closePopover();
              deactivatedIds = selectedRuleIds.filter(function (id) {
                var _ref6, _rules$find4;

                return (_ref6 = !((_rules$find4 = rules.find(function (r) {
                  return r.id === id;
                })) === null || _rules$find4 === void 0 ? void 0 : _rules$find4.enabled)) !== null && _ref6 !== void 0 ? _ref6 : false;
              });
              deactivatedIdsNoML = deactivatedIds.filter(function (id) {
                var _ref7, _rules$find5;

                return (_ref7 = ((_rules$find5 = rules.find(function (r) {
                  return r.id === id;
                })) === null || _rules$find5 === void 0 ? void 0 : _rules$find5.type) !== 'machine_learning') !== null && _ref7 !== void 0 ? _ref7 : false;
              });
              mlRuleCount = deactivatedIds.length - deactivatedIdsNoML.length;

              if (!hasMlPermissions && mlRuleCount > 0) {
                (0, _toasters.displayWarningToast)(detectionI18n.ML_RULES_UNAVAILABLE(mlRuleCount), dispatchToaster);
              }

              _context.next = 7;
              return (0, _actions.enableRulesAction)(hasMlPermissions ? deactivatedIds : deactivatedIdsNoML, true, dispatch, dispatchToaster);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))
  }, i18n.BATCH_ACTION_ACTIVATE_SELECTED), _react.default.createElement(_eui.EuiContextMenuItem, {
    key: i18n.BATCH_ACTION_DEACTIVATE_SELECTED,
    icon: "crossInACircleFilled",
    disabled: containsLoading || !containsEnabled,
    onClick:
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var activatedIds;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              closePopover();
              activatedIds = selectedRuleIds.filter(function (id) {
                var _ref9, _rules$find6;

                return (_ref9 = (_rules$find6 = rules.find(function (r) {
                  return r.id === id;
                })) === null || _rules$find6 === void 0 ? void 0 : _rules$find6.enabled) !== null && _ref9 !== void 0 ? _ref9 : false;
              });
              _context2.next = 4;
              return (0, _actions.enableRulesAction)(activatedIds, false, dispatch, dispatchToaster);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))
  }, i18n.BATCH_ACTION_DEACTIVATE_SELECTED), _react.default.createElement(_eui.EuiContextMenuItem, {
    key: i18n.BATCH_ACTION_EXPORT_SELECTED,
    icon: "exportAction",
    disabled: containsImmutable || containsLoading || selectedRuleIds.length === 0,
    onClick: function onClick() {
      closePopover();
      (0, _actions.exportRulesAction)(rules.filter(function (r) {
        return selectedRuleIds.includes(r.id);
      }).map(function (r) {
        return r.rule_id;
      }), dispatch);
    }
  }, i18n.BATCH_ACTION_EXPORT_SELECTED), _react.default.createElement(_eui.EuiContextMenuItem, {
    key: i18n.BATCH_ACTION_DUPLICATE_SELECTED,
    icon: "copy",
    disabled: containsLoading || selectedRuleIds.length === 0,
    onClick:
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              closePopover();
              _context3.next = 3;
              return (0, _actions.duplicateRulesAction)(rules.filter(function (r) {
                return selectedRuleIds.includes(r.id);
              }), selectedRuleIds, dispatch, dispatchToaster);

            case 3:
              reFetchRules(true);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))
  }, i18n.BATCH_ACTION_DUPLICATE_SELECTED), _react.default.createElement(_eui.EuiContextMenuItem, {
    "data-test-subj": "deleteRuleBulk",
    key: i18n.BATCH_ACTION_DELETE_SELECTED,
    icon: "trash",
    title: containsImmutable ? i18n.BATCH_ACTION_DELETE_SELECTED_IMMUTABLE : undefined,
    disabled: containsLoading || selectedRuleIds.length === 0,
    onClick:
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              closePopover();
              _context4.next = 3;
              return (0, _actions.deleteRulesAction)(selectedRuleIds, dispatch, dispatchToaster);

            case 3:
              reFetchRules(true);

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))
  }, i18n.BATCH_ACTION_DELETE_SELECTED)];
};

exports.getBatchItems = getBatchItems;