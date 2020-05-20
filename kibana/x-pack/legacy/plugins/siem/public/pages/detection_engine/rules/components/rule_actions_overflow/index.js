"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RuleActionsOverflow = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _fp = require("lodash/fp");

var _reactRouterDom = require("react-router-dom");

var _rules = require("../../../../../containers/detection_engine/rules");

var i18n = _interopRequireWildcard(require("./translations"));

var i18nActions = _interopRequireWildcard(require("../../../rules/translations"));

var _toasters = require("../../../../../components/toasters");

var _actions = require("../../all/actions");

var _generic_downloader = require("../../../../../components/generic_downloader");

var _redirect_to_detection_engine = require("../../../../../components/link_to/redirect_to_detection_engine");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MyEuiButtonIcon = (0, _styledComponents.default)(_eui.EuiButtonIcon).withConfig({
  displayName: "MyEuiButtonIcon",
  componentId: "bi1r1e-0"
})(["&.euiButtonIcon{svg{transform:rotate(90deg);}border:1px solid\xA0 ", ";width:40px;height:40px;}"], function (_ref) {
  var theme = _ref.theme;
  return theme.euiColorPrimary;
});

/**
 * Overflow Actions for a Rule
 */
var RuleActionsOverflowComponent = function RuleActionsOverflowComponent(_ref2) {
  var rule = _ref2.rule,
      userHasNoPermissions = _ref2.userHasNoPermissions;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isPopoverOpen = _useState2[0],
      setIsPopoverOpen = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      rulesToExport = _useState4[0],
      setRulesToExport = _useState4[1];

  var history = (0, _reactRouterDom.useHistory)();

  var _useStateToaster = (0, _toasters.useStateToaster)(),
      _useStateToaster2 = _slicedToArray(_useStateToaster, 2),
      dispatchToaster = _useStateToaster2[1];

  var onRuleDeletedCallback = (0, _react.useCallback)(function () {
    history.push("/".concat(_redirect_to_detection_engine.DETECTION_ENGINE_PAGE_NAME, "/rules"));
  }, [history]);
  var actions = (0, _react.useMemo)(function () {
    return rule != null ? [_react.default.createElement(_eui.EuiContextMenuItem, {
      key: i18nActions.DUPLICATE_RULE,
      icon: "copy",
      disabled: userHasNoPermissions,
      "data-test-subj": "rules-details-duplicate-rule",
      onClick:
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                setIsPopoverOpen(false);
                _context.next = 3;
                return (0, _actions.duplicateRulesAction)([rule], [rule.id], _fp.noop, dispatchToaster);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))
    }, i18nActions.DUPLICATE_RULE), _react.default.createElement(_eui.EuiContextMenuItem, {
      key: i18nActions.EXPORT_RULE,
      icon: "exportAction",
      disabled: userHasNoPermissions || rule.immutable,
      "data-test-subj": "rules-details-export-rule",
      onClick: function onClick() {
        setIsPopoverOpen(false);
        setRulesToExport([rule.rule_id]);
      }
    }, i18nActions.EXPORT_RULE), _react.default.createElement(_eui.EuiContextMenuItem, {
      key: i18nActions.DELETE_RULE,
      icon: "trash",
      disabled: userHasNoPermissions,
      "data-test-subj": "rules-details-delete-rule",
      onClick:
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                setIsPopoverOpen(false);
                _context2.next = 3;
                return (0, _actions.deleteRulesAction)([rule.id], _fp.noop, dispatchToaster, onRuleDeletedCallback);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))
    }, i18nActions.DELETE_RULE)] : [];
  }, [rule, userHasNoPermissions]);
  var handlePopoverOpen = (0, _react.useCallback)(function () {
    setIsPopoverOpen(!isPopoverOpen);
  }, [setIsPopoverOpen, isPopoverOpen]);
  var button = (0, _react.useMemo)(function () {
    return _react.default.createElement(_eui.EuiToolTip, {
      position: "top",
      content: i18n.ALL_ACTIONS
    }, _react.default.createElement(MyEuiButtonIcon, {
      iconType: "boxesHorizontal",
      "aria-label": i18n.ALL_ACTIONS,
      isDisabled: userHasNoPermissions,
      "data-test-subj": "rules-details-popover-button-icon",
      onClick: handlePopoverOpen
    }));
  }, [handlePopoverOpen, userHasNoPermissions]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiPopover, {
    anchorPosition: "leftCenter",
    button: button,
    closePopover: function closePopover() {
      return setIsPopoverOpen(false);
    },
    id: "ruleActionsOverflow",
    isOpen: isPopoverOpen,
    "data-test-subj": "rules-details-popover",
    ownFocus: true,
    panelPaddingSize: "none"
  }, _react.default.createElement(_eui.EuiContextMenuPanel, {
    "data-test-subj": "rules-details-menu-panel",
    items: actions
  })), _react.default.createElement(_generic_downloader.GenericDownloader, {
    filename: "".concat(i18nActions.EXPORT_FILENAME, ".ndjson"),
    ids: rulesToExport,
    exportSelectedData: _rules.exportRules,
    "data-test-subj": "rules-details-generic-downloader",
    onExportSuccess: function onExportSuccess(exportCount) {
      (0, _toasters.displaySuccessToast)(i18nActions.SUCCESSFULLY_EXPORTED_RULES(exportCount), dispatchToaster);
    }
  }));
};

var RuleActionsOverflow = _react.default.memo(RuleActionsOverflowComponent);

exports.RuleActionsOverflow = RuleActionsOverflow;
RuleActionsOverflow.displayName = 'RuleActionsOverflow';