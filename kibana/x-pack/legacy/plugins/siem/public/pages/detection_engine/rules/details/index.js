"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RuleDetailsPage = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _reactSticky = require("react-sticky");

var _reactRedux = require("react-redux");

var _filters_global = require("../../../../components/filters_global");

var _formatted_date = require("../../../../components/formatted_date");

var _redirect_to_detection_engine = require("../../../../components/link_to/redirect_to_detection_engine");

var _search_bar = require("../../../../components/search_bar");

var _wrapper_page = require("../../../../components/wrapper_page");

var _rules = require("../../../../containers/detection_engine/rules");

var _source = require("../../../../containers/source");

var _spy_routes = require("../../../../utils/route/spy_routes");

var _step_about_rule_details = require("../components/step_about_rule_details/");

var _detection_engine_header_page = require("../../components/detection_engine_header_page");

var _signals_histogram_panel = require("../../components/signals_histogram_panel");

var _signals = require("../../components/signals");

var _user_info = require("../../components/user_info");

var _detection_engine_empty_page = require("../../detection_engine_empty_page");

var _signals_info = require("../../components/signals_info");

var _step_define_rule = require("../components/step_define_rule");

var _step_schedule_rule = require("../components/step_schedule_rule");

var _default_config = require("../../components/signals/default_config");

var _no_write_signals_callout = require("../../components/no_write_signals_callout");

var detectionI18n = _interopRequireWildcard(require("../../translations"));

var _read_only_callout = require("../components/read_only_callout");

var _rule_switch = require("../components/rule_switch");

var _step_panel = require("../components/step_panel");

var _helpers = require("../helpers");

var ruleI18n = _interopRequireWildcard(require("../translations"));

var i18n = _interopRequireWildcard(require("./translations"));

var _global_time = require("../../../../containers/global_time");

var _config = require("../../components/signals_histogram_panel/config");

var _inputs = require("../../../../store/inputs");

var _actions = require("../../../../store/inputs/actions");

var _rule_actions_overflow = require("../components/rule_actions_overflow");

var _status_failed_callout = require("./status_failed_callout");

var _failure_history = require("./failure_history");

var _rule_status = require("../components/rule_status");

var _use_ml_capabilities = require("../../../../components/ml_popover/hooks/use_ml_capabilities");

var _has_ml_admin_permissions = require("../../../../components/ml/permissions/has_ml_admin_permissions");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var RuleDetailTabs;

(function (RuleDetailTabs) {
  RuleDetailTabs["signals"] = "signals";
  RuleDetailTabs["failures"] = "failures";
})(RuleDetailTabs || (RuleDetailTabs = {}));

var ruleDetailTabs = [{
  id: RuleDetailTabs.signals,
  name: detectionI18n.SIGNAL,
  disabled: false
}, {
  id: RuleDetailTabs.failures,
  name: i18n.FAILURE_HISTORY_TAB,
  disabled: false
}];

var RuleDetailsPageComponent = function RuleDetailsPageComponent(_ref) {
  var filters = _ref.filters,
      query = _ref.query,
      setAbsoluteRangeDatePicker = _ref.setAbsoluteRangeDatePicker;

  var _useUserInfo = (0, _user_info.useUserInfo)(),
      loading = _useUserInfo.loading,
      isSignalIndexExists = _useUserInfo.isSignalIndexExists,
      isAuthenticated = _useUserInfo.isAuthenticated,
      hasEncryptionKey = _useUserInfo.hasEncryptionKey,
      canUserCRUD = _useUserInfo.canUserCRUD,
      hasIndexWrite = _useUserInfo.hasIndexWrite,
      signalIndexName = _useUserInfo.signalIndexName;

  var _useParams = (0, _reactRouterDom.useParams)(),
      ruleId = _useParams.detailName;

  var _useRule = (0, _rules.useRule)(ruleId),
      _useRule2 = _slicedToArray(_useRule, 2),
      isLoading = _useRule2[0],
      rule = _useRule2[1]; // This is used to re-trigger api rule status when user de/activate rule


  var _useState = (0, _react2.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      ruleEnabled = _useState2[0],
      setRuleEnabled = _useState2[1];

  var _useState3 = (0, _react2.useState)(RuleDetailTabs.signals),
      _useState4 = _slicedToArray(_useState3, 2),
      ruleDetailTab = _useState4[0],
      setRuleDetailTab = _useState4[1];

  var _ref2 = rule != null ? (0, _helpers.getStepsData)({
    rule: rule,
    detailsView: true
  }) : {
    aboutRuleData: null,
    modifiedAboutRuleDetailsData: null,
    defineRuleData: null,
    scheduleRuleData: null
  },
      aboutRuleData = _ref2.aboutRuleData,
      modifiedAboutRuleDetailsData = _ref2.modifiedAboutRuleDetailsData,
      defineRuleData = _ref2.defineRuleData,
      scheduleRuleData = _ref2.scheduleRuleData;

  var _useSignalInfo = (0, _signals_info.useSignalInfo)({
    ruleId: ruleId
  }),
      _useSignalInfo2 = _slicedToArray(_useSignalInfo, 1),
      lastSignals = _useSignalInfo2[0];

  var mlCapabilities = (0, _use_ml_capabilities.useMlCapabilities)(); // TODO: Refactor license check + hasMlAdminPermissions to common check

  var hasMlPermissions = mlCapabilities.isPlatinumOrTrialLicense && (0, _has_ml_admin_permissions.hasMlAdminPermissions)(mlCapabilities);
  var title = isLoading === true || rule === null ? _react2.default.createElement(_eui.EuiLoadingSpinner, {
    size: "m"
  }) : rule.name;
  var subTitle = (0, _react2.useMemo)(function () {
    var _ref3, _ref4, _ref5, _ref6;

    return isLoading === true || rule === null ? _react2.default.createElement(_eui.EuiLoadingSpinner, {
      size: "m"
    }) : [_react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.siem.detectionEngine.ruleDetails.ruleCreationDescription",
      defaultMessage: "Created by: {by} on {date}",
      values: {
        by: (_ref3 = rule === null || rule === void 0 ? void 0 : rule.created_by) !== null && _ref3 !== void 0 ? _ref3 : i18n.UNKNOWN,
        date: _react2.default.createElement(_formatted_date.FormattedDate, {
          value: (_ref4 = rule === null || rule === void 0 ? void 0 : rule.created_at) !== null && _ref4 !== void 0 ? _ref4 : new Date().toISOString(),
          fieldName: "createdAt"
        })
      }
    }), (rule === null || rule === void 0 ? void 0 : rule.updated_by) != null ? _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.siem.detectionEngine.ruleDetails.ruleUpdateDescription",
      defaultMessage: "Updated by: {by} on {date}",
      values: {
        by: (_ref5 = rule === null || rule === void 0 ? void 0 : rule.updated_by) !== null && _ref5 !== void 0 ? _ref5 : i18n.UNKNOWN,
        date: _react2.default.createElement(_formatted_date.FormattedDate, {
          value: (_ref6 = rule === null || rule === void 0 ? void 0 : rule.updated_at) !== null && _ref6 !== void 0 ? _ref6 : new Date().toISOString(),
          fieldName: "updatedAt"
        })
      }
    }) : ''];
  }, [isLoading, rule]);
  var signalDefaultFilters = (0, _react2.useMemo)(function () {
    return ruleId != null ? (0, _default_config.buildSignalsRuleIdFilter)(ruleId) : [];
  }, [ruleId]);
  var signalMergedFilters = (0, _react2.useMemo)(function () {
    return [].concat(_toConsumableArray(signalDefaultFilters), _toConsumableArray(filters));
  }, [signalDefaultFilters, filters]);
  var tabs = (0, _react2.useMemo)(function () {
    return _react2.default.createElement(_eui.EuiTabs, null, ruleDetailTabs.map(function (tab) {
      return _react2.default.createElement(_eui.EuiTab, {
        onClick: function onClick() {
          return setRuleDetailTab(tab.id);
        },
        isSelected: tab.id === ruleDetailTab,
        disabled: tab.disabled,
        key: tab.id
      }, tab.name);
    }));
  }, [ruleDetailTabs, ruleDetailTab, setRuleDetailTab]);
  var ruleError = (0, _react2.useMemo)(function () {
    var _ref7;

    return (rule === null || rule === void 0 ? void 0 : rule.status) === 'failed' && ruleDetailTab === RuleDetailTabs.signals && (rule === null || rule === void 0 ? void 0 : rule.last_failure_at) != null ? _react2.default.createElement(_status_failed_callout.RuleStatusFailedCallOut, {
      message: (_ref7 = rule === null || rule === void 0 ? void 0 : rule.last_failure_message) !== null && _ref7 !== void 0 ? _ref7 : '',
      date: rule === null || rule === void 0 ? void 0 : rule.last_failure_at
    }) : null;
  }, [rule, ruleDetailTab]);
  var indexToAdd = (0, _react2.useMemo)(function () {
    return signalIndexName == null ? [] : [signalIndexName];
  }, [signalIndexName]);
  var updateDateRangeCallback = (0, _react2.useCallback)(function (min, max) {
    setAbsoluteRangeDatePicker({
      id: 'global',
      from: min,
      to: max
    });
  }, [setAbsoluteRangeDatePicker]);
  var handleOnChangeEnabledRule = (0, _react2.useCallback)(function (enabled) {
    if (ruleEnabled == null || enabled !== ruleEnabled) {
      setRuleEnabled(enabled);
    }
  }, [ruleEnabled, setRuleEnabled]);

  if ((0, _helpers.redirectToDetections)(isSignalIndexExists, isAuthenticated, hasEncryptionKey)) {
    return _react2.default.createElement(_reactRouterDom.Redirect, {
      to: "/".concat(_redirect_to_detection_engine.DETECTION_ENGINE_PAGE_NAME)
    });
  }

  return _react2.default.createElement(_react2.default.Fragment, null, hasIndexWrite != null && !hasIndexWrite && _react2.default.createElement(_no_write_signals_callout.NoWriteSignalsCallOut, null), (0, _helpers.userHasNoPermissions)(canUserCRUD) && _react2.default.createElement(_read_only_callout.ReadOnlyCallOut, null), _react2.default.createElement(_source.WithSource, {
    sourceId: "default",
    indexToAdd: indexToAdd
  }, function (_ref8) {
    var indicesExist = _ref8.indicesExist,
        indexPattern = _ref8.indexPattern;
    return (0, _source.indicesExistOrDataTemporarilyUnavailable)(indicesExist) ? _react2.default.createElement(_global_time.GlobalTime, null, function (_ref9) {
      var _ref10, _ref11, _userHasNoPermissions;

      var to = _ref9.to,
          from = _ref9.from,
          deleteQuery = _ref9.deleteQuery,
          setQuery = _ref9.setQuery;
      return _react2.default.createElement(_reactSticky.StickyContainer, null, _react2.default.createElement(_filters_global.FiltersGlobal, null, _react2.default.createElement(_search_bar.SiemSearchBar, {
        id: "global",
        indexPattern: indexPattern
      })), _react2.default.createElement(_wrapper_page.WrapperPage, null, _react2.default.createElement(_detection_engine_header_page.DetectionEngineHeaderPage, {
        backOptions: {
          href: (0, _redirect_to_detection_engine.getRulesUrl)(),
          text: i18n.BACK_TO_RULES
        },
        border: true,
        subtitle: subTitle,
        subtitle2: [].concat(_toConsumableArray(lastSignals != null ? [_react2.default.createElement(_react2.default.Fragment, null, detectionI18n.LAST_SIGNAL, ': ', lastSignals)] : []), [_react2.default.createElement(_rule_status.RuleStatus, {
          ruleId: ruleId !== null && ruleId !== void 0 ? ruleId : null,
          ruleEnabled: ruleEnabled
        })]),
        title: title
      }, _react2.default.createElement(_eui.EuiFlexGroup, {
        alignItems: "center"
      }, _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_eui.EuiToolTip, {
        position: "top",
        content: (rule === null || rule === void 0 ? void 0 : rule.type) === 'machine_learning' && !hasMlPermissions ? detectionI18n.ML_RULES_DISABLED_MESSAGE : undefined
      }, _react2.default.createElement(_rule_switch.RuleSwitch, {
        id: (_ref10 = rule === null || rule === void 0 ? void 0 : rule.id) !== null && _ref10 !== void 0 ? _ref10 : '-1',
        isDisabled: (0, _helpers.userHasNoPermissions)(canUserCRUD) || !hasMlPermissions && !(rule === null || rule === void 0 ? void 0 : rule.enabled),
        enabled: (_ref11 = rule === null || rule === void 0 ? void 0 : rule.enabled) !== null && _ref11 !== void 0 ? _ref11 : false,
        optionLabel: i18n.ACTIVATE_RULE,
        onChange: handleOnChangeEnabledRule
      }))), _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_eui.EuiFlexGroup, {
        alignItems: "center",
        gutterSize: "s",
        responsive: false
      }, _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_eui.EuiButton, {
        href: (0, _redirect_to_detection_engine.getEditRuleUrl)(ruleId !== null && ruleId !== void 0 ? ruleId : ''),
        iconType: "controlsHorizontal",
        isDisabled: (_userHasNoPermissions = (0, _helpers.userHasNoPermissions)(canUserCRUD)) !== null && _userHasNoPermissions !== void 0 ? _userHasNoPermissions : true
      }, ruleI18n.EDIT_RULE_SETTINGS)), _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_rule_actions_overflow.RuleActionsOverflow, {
        rule: rule,
        userHasNoPermissions: (0, _helpers.userHasNoPermissions)(canUserCRUD)
      })))))), ruleError, _react2.default.createElement(_eui.EuiSpacer, null), _react2.default.createElement(_eui.EuiFlexGroup, null, _react2.default.createElement(_eui.EuiFlexItem, {
        "data-test-subj": "aboutRule",
        component: "section",
        grow: 1
      }, _react2.default.createElement(_step_about_rule_details.StepAboutRuleToggleDetails, {
        loading: isLoading,
        stepData: aboutRuleData,
        stepDataDetails: modifiedAboutRuleDetailsData
      })), _react2.default.createElement(_eui.EuiFlexItem, {
        grow: 1
      }, _react2.default.createElement(_eui.EuiFlexGroup, {
        direction: "column"
      }, _react2.default.createElement(_eui.EuiFlexItem, {
        component: "section",
        grow: 1
      }, _react2.default.createElement(_step_panel.StepPanel, {
        loading: isLoading,
        title: ruleI18n.DEFINITION
      }, defineRuleData != null && _react2.default.createElement(_step_define_rule.StepDefineRule, {
        descriptionColumns: "singleSplit",
        isReadOnlyView: true,
        isLoading: false,
        defaultValues: defineRuleData
      }))), _react2.default.createElement(_eui.EuiSpacer, null), _react2.default.createElement(_eui.EuiFlexItem, {
        "data-test-subj": "schedule",
        component: "section",
        grow: 1
      }, _react2.default.createElement(_step_panel.StepPanel, {
        loading: isLoading,
        title: ruleI18n.SCHEDULE
      }, scheduleRuleData != null && _react2.default.createElement(_step_schedule_rule.StepScheduleRule, {
        descriptionColumns: "singleSplit",
        isReadOnlyView: true,
        isLoading: false,
        defaultValues: scheduleRuleData
      })))))), _react2.default.createElement(_eui.EuiSpacer, null), tabs, _react2.default.createElement(_eui.EuiSpacer, null), ruleDetailTab === RuleDetailTabs.signals && _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_signals_histogram_panel.SignalsHistogramPanel, {
        deleteQuery: deleteQuery,
        filters: signalMergedFilters,
        query: query,
        from: from,
        signalIndexName: signalIndexName,
        setQuery: setQuery,
        stackByOptions: _config.signalsHistogramOptions,
        to: to,
        updateDateRange: updateDateRangeCallback
      }), _react2.default.createElement(_eui.EuiSpacer, null), ruleId != null && _react2.default.createElement(_signals.SignalsTable, {
        canUserCRUD: canUserCRUD !== null && canUserCRUD !== void 0 ? canUserCRUD : false,
        defaultFilters: signalDefaultFilters,
        hasIndexWrite: hasIndexWrite !== null && hasIndexWrite !== void 0 ? hasIndexWrite : false,
        from: from,
        loading: loading,
        signalsIndex: signalIndexName !== null && signalIndexName !== void 0 ? signalIndexName : '',
        to: to
      })), ruleDetailTab === RuleDetailTabs.failures && _react2.default.createElement(_failure_history.FailureHistory, {
        id: rule === null || rule === void 0 ? void 0 : rule.id
      })));
    }) : _react2.default.createElement(_wrapper_page.WrapperPage, null, _react2.default.createElement(_detection_engine_header_page.DetectionEngineHeaderPage, {
      border: true,
      title: i18n.PAGE_TITLE
    }), _react2.default.createElement(_detection_engine_empty_page.DetectionEngineEmptyPage, null));
  }), _react2.default.createElement(_spy_routes.SpyRoute, {
    state: {
      ruleName: rule === null || rule === void 0 ? void 0 : rule.name
    }
  }));
};

var makeMapStateToProps = function makeMapStateToProps() {
  var getGlobalInputs = _inputs.inputsSelectors.globalSelector();

  return function (state) {
    var globalInputs = getGlobalInputs(state);
    var query = globalInputs.query,
        filters = globalInputs.filters;
    return {
      query: query,
      filters: filters
    };
  };
};

var mapDispatchToProps = {
  setAbsoluteRangeDatePicker: _actions.setAbsoluteRangeDatePicker
};
var connector = (0, _reactRedux.connect)(makeMapStateToProps, mapDispatchToProps);
var RuleDetailsPage = connector((0, _react2.memo)(RuleDetailsPageComponent));
exports.RuleDetailsPage = RuleDetailsPage;