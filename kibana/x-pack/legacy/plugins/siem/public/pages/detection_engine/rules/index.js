"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RulesPage = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _rules = require("../../../containers/detection_engine/rules");

var _redirect_to_detection_engine = require("../../../components/link_to/redirect_to_detection_engine");

var _detection_engine_header_page = require("../components/detection_engine_header_page");

var _wrapper_page = require("../../../components/wrapper_page");

var _spy_routes = require("../../../utils/route/spy_routes");

var _user_info = require("../components/user_info");

var _all = require("./all");

var _import_data_modal = require("../../../components/import_data_modal");

var _read_only_callout = require("./components/read_only_callout");

var _update_callout = require("./components/pre_packaged_rules/update_callout");

var _helpers = require("./helpers");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var RulesPageComponent = function RulesPageComponent() {
  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      showImportModal = _useState2[0],
      setShowImportModal = _useState2[1];

  var refreshRulesData = (0, _react.useRef)(null);

  var _useUserInfo = (0, _user_info.useUserInfo)(),
      loading = _useUserInfo.loading,
      isSignalIndexExists = _useUserInfo.isSignalIndexExists,
      isAuthenticated = _useUserInfo.isAuthenticated,
      hasEncryptionKey = _useUserInfo.hasEncryptionKey,
      canUserCRUD = _useUserInfo.canUserCRUD,
      hasIndexWrite = _useUserInfo.hasIndexWrite;

  var _usePrePackagedRules = (0, _rules.usePrePackagedRules)({
    canUserCRUD: canUserCRUD,
    hasIndexWrite: hasIndexWrite,
    isSignalIndexExists: isSignalIndexExists,
    isAuthenticated: isAuthenticated,
    hasEncryptionKey: hasEncryptionKey
  }),
      createPrePackagedRules = _usePrePackagedRules.createPrePackagedRules,
      prePackagedRuleLoading = _usePrePackagedRules.loading,
      loadingCreatePrePackagedRules = _usePrePackagedRules.loadingCreatePrePackagedRules,
      refetchPrePackagedRulesStatus = _usePrePackagedRules.refetchPrePackagedRulesStatus,
      rulesCustomInstalled = _usePrePackagedRules.rulesCustomInstalled,
      rulesInstalled = _usePrePackagedRules.rulesInstalled,
      rulesNotInstalled = _usePrePackagedRules.rulesNotInstalled,
      rulesNotUpdated = _usePrePackagedRules.rulesNotUpdated;

  var prePackagedRuleStatus = (0, _helpers.getPrePackagedRuleStatus)(rulesInstalled, rulesNotInstalled, rulesNotUpdated);
  var handleRefreshRules = (0, _react.useCallback)(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (refreshRulesData.current != null) {
              refreshRulesData.current(true);
            }

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })), [refreshRulesData]);
  var handleCreatePrePackagedRules = (0, _react.useCallback)(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(createPrePackagedRules != null)) {
              _context2.next = 4;
              break;
            }

            _context2.next = 3;
            return createPrePackagedRules();

          case 3:
            handleRefreshRules();

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })), [createPrePackagedRules, handleRefreshRules]);
  var handleRefetchPrePackagedRulesStatus = (0, _react.useCallback)(function () {
    if (refetchPrePackagedRulesStatus != null) {
      refetchPrePackagedRulesStatus();
    }
  }, [refetchPrePackagedRulesStatus]);
  var handleSetRefreshRulesData = (0, _react.useCallback)(function (refreshRule) {
    refreshRulesData.current = refreshRule;
  }, []);

  if ((0, _helpers.redirectToDetections)(isSignalIndexExists, isAuthenticated, hasEncryptionKey)) {
    return _react.default.createElement(_reactRouterDom.Redirect, {
      to: "/".concat(_redirect_to_detection_engine.DETECTION_ENGINE_PAGE_NAME)
    });
  }

  return _react.default.createElement(_react.default.Fragment, null, (0, _helpers.userHasNoPermissions)(canUserCRUD) && _react.default.createElement(_read_only_callout.ReadOnlyCallOut, null), _react.default.createElement(_import_data_modal.ImportDataModal, {
    checkBoxLabel: i18n.OVERWRITE_WITH_SAME_NAME,
    closeModal: function closeModal() {
      return setShowImportModal(false);
    },
    description: i18n.SELECT_RULE,
    errorMessage: i18n.IMPORT_FAILED,
    failedDetailed: i18n.IMPORT_FAILED_DETAILED,
    importComplete: handleRefreshRules,
    importData: _rules.importRules,
    successMessage: i18n.SUCCESSFULLY_IMPORTED_RULES,
    showCheckBox: true,
    showModal: showImportModal,
    submitBtnText: i18n.IMPORT_RULE_BTN_TITLE,
    subtitle: i18n.INITIAL_PROMPT_TEXT,
    title: i18n.IMPORT_RULE
  }), _react.default.createElement(_wrapper_page.WrapperPage, null, _react.default.createElement(_detection_engine_header_page.DetectionEngineHeaderPage, {
    backOptions: {
      href: (0, _redirect_to_detection_engine.getDetectionEngineUrl)(),
      text: i18n.BACK_TO_DETECTION_ENGINE
    },
    title: i18n.PAGE_TITLE
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "s",
    responsive: false,
    wrap: true
  }, prePackagedRuleStatus === 'ruleNotInstalled' && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    iconType: "indexOpen",
    isLoading: loadingCreatePrePackagedRules,
    isDisabled: (0, _helpers.userHasNoPermissions)(canUserCRUD) || loading,
    onClick: handleCreatePrePackagedRules
  }, i18n.LOAD_PREPACKAGED_RULES)), prePackagedRuleStatus === 'someRuleUninstall' && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    "data-test-subj": "reloadPrebuiltRulesBtn",
    iconType: "plusInCircle",
    isLoading: loadingCreatePrePackagedRules,
    isDisabled: (0, _helpers.userHasNoPermissions)(canUserCRUD) || loading,
    onClick: handleCreatePrePackagedRules
  }, i18n.RELOAD_MISSING_PREPACKAGED_RULES(rulesNotInstalled !== null && rulesNotInstalled !== void 0 ? rulesNotInstalled : 0))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    iconType: "importAction",
    isDisabled: (0, _helpers.userHasNoPermissions)(canUserCRUD) || loading,
    onClick: function onClick() {
      setShowImportModal(true);
    }
  }, i18n.IMPORT_RULE)), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    "data-test-subj": "create-new-rule",
    fill: true,
    href: (0, _redirect_to_detection_engine.getCreateRuleUrl)(),
    iconType: "plusInCircle",
    isDisabled: (0, _helpers.userHasNoPermissions)(canUserCRUD) || loading
  }, i18n.ADD_NEW_RULE)))), prePackagedRuleStatus === 'ruleNeedUpdate' && _react.default.createElement(_update_callout.UpdatePrePackagedRulesCallOut, {
    loading: loadingCreatePrePackagedRules,
    numberOfUpdatedRules: rulesNotUpdated !== null && rulesNotUpdated !== void 0 ? rulesNotUpdated : 0,
    updateRules: handleCreatePrePackagedRules
  }), _react.default.createElement(_all.AllRules, {
    createPrePackagedRules: createPrePackagedRules,
    loading: loading || prePackagedRuleLoading,
    loadingCreatePrePackagedRules: loadingCreatePrePackagedRules,
    hasNoPermissions: (0, _helpers.userHasNoPermissions)(canUserCRUD),
    refetchPrePackagedRulesStatus: handleRefetchPrePackagedRulesStatus,
    rulesCustomInstalled: rulesCustomInstalled,
    rulesInstalled: rulesInstalled,
    rulesNotInstalled: rulesNotInstalled,
    rulesNotUpdated: rulesNotUpdated,
    setRefreshRulesData: handleSetRefreshRulesData
  })), _react.default.createElement(_spy_routes.SpyRoute, null));
};

var RulesPage = _react.default.memo(RulesPageComponent);

exports.RulesPage = RulesPage;