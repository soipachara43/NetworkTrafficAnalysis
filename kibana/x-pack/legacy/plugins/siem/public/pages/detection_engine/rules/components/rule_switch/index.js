"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RuleSwitch = exports.RuleSwitchComponent = void 0;

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _react = _interopRequireWildcard(require("react"));

var i18n = _interopRequireWildcard(require("../../translations"));

var _rules2 = require("../../../../../containers/detection_engine/rules");

var _actions = require("../../all/actions");

var _toasters = require("../../../../../components/toasters");

var _helpers = require("../../all/helpers");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var StaticSwitch = (0, _styledComponents.default)(_eui.EuiSwitch).withConfig({
  displayName: "StaticSwitch",
  componentId: "sc-9qwvlp-0"
})([".euiSwitch__thumb,.euiSwitch__icon{transition:none;}"]);
StaticSwitch.displayName = 'StaticSwitch';

/**
 * Basic switch component for displaying loader when enabled/disabled
 */
var RuleSwitchComponent = function RuleSwitchComponent(_ref) {
  var dispatch = _ref.dispatch,
      id = _ref.id,
      isDisabled = _ref.isDisabled,
      isLoading = _ref.isLoading,
      enabled = _ref.enabled,
      optionLabel = _ref.optionLabel,
      onChange = _ref.onChange;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      myIsLoading = _useState2[0],
      setMyIsLoading = _useState2[1];

  var _useState3 = (0, _react.useState)(enabled !== null && enabled !== void 0 ? enabled : false),
      _useState4 = _slicedToArray(_useState3, 2),
      myEnabled = _useState4[0],
      setMyEnabled = _useState4[1];

  var _useStateToaster = (0, _toasters.useStateToaster)(),
      _useStateToaster2 = _slicedToArray(_useStateToaster, 2),
      dispatchToaster = _useStateToaster2[1];

  var onRuleStateChange = (0, _react.useCallback)(
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(event) {
      var enabling, response, _bucketRulesResponse, rules, errors, title, _rules, rule;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setMyIsLoading(true);

              if (!(dispatch != null)) {
                _context.next = 6;
                break;
              }

              _context.next = 4;
              return (0, _actions.enableRulesAction)([id], event.target.checked, dispatch, dispatchToaster);

            case 4:
              _context.next = 18;
              break;

            case 6:
              _context.prev = 6;
              enabling = event.target.checked;
              _context.next = 10;
              return (0, _rules2.enableRules)({
                ids: [id],
                enabled: enabling
              });

            case 10:
              response = _context.sent;
              _bucketRulesResponse = (0, _helpers.bucketRulesResponse)(response), rules = _bucketRulesResponse.rules, errors = _bucketRulesResponse.errors;

              if (errors.length > 0) {
                setMyIsLoading(false);
                title = enabling ? i18n.BATCH_ACTION_ACTIVATE_SELECTED_ERROR(1) : i18n.BATCH_ACTION_DEACTIVATE_SELECTED_ERROR(1);
                (0, _toasters.displayErrorToast)(title, errors.map(function (e) {
                  return e.error.message;
                }), dispatchToaster);
              } else {
                _rules = _slicedToArray(rules, 1), rule = _rules[0];
                setMyEnabled(rule.enabled);

                if (onChange != null) {
                  onChange(rule.enabled);
                }
              }

              _context.next = 18;
              break;

            case 15:
              _context.prev = 15;
              _context.t0 = _context["catch"](6);
              setMyIsLoading(false);

            case 18:
              setMyIsLoading(false);

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[6, 15]]);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }(), [dispatch, id]);
  (0, _react.useEffect)(function () {
    if (myEnabled !== enabled) {
      setMyEnabled(enabled);
    }
  }, [enabled]);
  (0, _react.useEffect)(function () {
    if (myIsLoading !== isLoading) {
      setMyIsLoading(isLoading !== null && isLoading !== void 0 ? isLoading : false);
    }
  }, [isLoading]);
  return _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    justifyContent: "spaceAround"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, myIsLoading ? _react.default.createElement(_eui.EuiLoadingSpinner, {
    size: "m",
    "data-test-subj": "rule-switch-loader"
  }) : _react.default.createElement(StaticSwitch, {
    "data-test-subj": "rule-switch",
    label: optionLabel !== null && optionLabel !== void 0 ? optionLabel : '',
    showLabel: !(0, _fp.isEmpty)(optionLabel),
    disabled: isDisabled,
    checked: myEnabled,
    onChange: onRuleStateChange
  })));
};

exports.RuleSwitchComponent = RuleSwitchComponent;

var RuleSwitch = _react.default.memo(RuleSwitchComponent);

exports.RuleSwitch = RuleSwitch;
RuleSwitch.displayName = 'RuleSwitch';