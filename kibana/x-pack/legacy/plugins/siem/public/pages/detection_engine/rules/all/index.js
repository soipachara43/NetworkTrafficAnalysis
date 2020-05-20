"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AllRules = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _uuid = _interopRequireDefault(require("uuid"));

var _rules = require("../../../../containers/detection_engine/rules");

var _header_section = require("../../../../components/header_section");

var _utility_bar = require("../../../../components/utility_bar");

var _toasters = require("../../../../components/toasters");

var _loader = require("../../../../components/loader");

var _panel = require("../../../../components/panel");

var _load_empty_prompt = require("../components/pre_packaged_rules/load_empty_prompt");

var _generic_downloader = require("../../../../components/generic_downloader");

var _all_rules_tables = require("../components/all_rules_tables");

var _helpers = require("../helpers");

var i18n = _interopRequireWildcard(require("../translations"));

var _batch_actions = require("./batch_actions");

var _columns = require("./columns");

var _helpers2 = require("./helpers");

var _reducer = require("./reducer");

var _rules_table_filters = require("./rules_table_filters/rules_table_filters");

var _use_ml_capabilities = require("../../../../components/ml_popover/hooks/use_ml_capabilities");

var _has_ml_admin_permissions = require("../../../../components/ml/permissions/has_ml_admin_permissions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var SORT_FIELD = 'enabled';
var initialState = {
  exportRuleIds: [],
  filterOptions: {
    filter: '',
    sortField: SORT_FIELD,
    sortOrder: 'desc'
  },
  loadingRuleIds: [],
  loadingRulesAction: null,
  pagination: {
    page: 1,
    perPage: 20,
    total: 0
  },
  rules: [],
  selectedRuleIds: []
};

/**
 * Table Component for displaying all Rules for a given cluster. Provides the ability to filter
 * by name, sort by enabled, and perform the following actions:
 *   * Enable/Disable
 *   * Duplicate
 *   * Delete
 *   * Import/Export
 */
var AllRules = _react.default.memo(function (_ref) {
  var _pagination$total;

  var createPrePackagedRules = _ref.createPrePackagedRules,
      hasNoPermissions = _ref.hasNoPermissions,
      loading = _ref.loading,
      loadingCreatePrePackagedRules = _ref.loadingCreatePrePackagedRules,
      refetchPrePackagedRulesStatus = _ref.refetchPrePackagedRulesStatus,
      rulesCustomInstalled = _ref.rulesCustomInstalled,
      rulesInstalled = _ref.rulesInstalled,
      rulesNotInstalled = _ref.rulesNotInstalled,
      rulesNotUpdated = _ref.rulesNotUpdated,
      setRefreshRulesData = _ref.setRefreshRulesData;

  var _useState = (0, _react.useState)(true),
      _useState2 = _slicedToArray(_useState, 2),
      initLoading = _useState2[0],
      setInitLoading = _useState2[1];

  var tableRef = (0, _react.useRef)();

  var _useReducer = (0, _react.useReducer)((0, _reducer.allRulesReducer)(tableRef), initialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      _useReducer2$ = _useReducer2[0],
      exportRuleIds = _useReducer2$.exportRuleIds,
      filterOptions = _useReducer2$.filterOptions,
      loadingRuleIds = _useReducer2$.loadingRuleIds,
      loadingRulesAction = _useReducer2$.loadingRulesAction,
      pagination = _useReducer2$.pagination,
      rules = _useReducer2$.rules,
      selectedRuleIds = _useReducer2$.selectedRuleIds,
      dispatch = _useReducer2[1];

  var _useRulesStatuses = (0, _rules.useRulesStatuses)(rules),
      isLoadingRulesStatuses = _useRulesStatuses.loading,
      rulesStatuses = _useRulesStatuses.rulesStatuses;

  var history = (0, _reactRouterDom.useHistory)();

  var _useStateToaster = (0, _toasters.useStateToaster)(),
      _useStateToaster2 = _slicedToArray(_useStateToaster, 2),
      dispatchToaster = _useStateToaster2[1];

  var mlCapabilities = (0, _use_ml_capabilities.useMlCapabilities)(); // TODO: Refactor license check + hasMlAdminPermissions to common check

  var hasMlPermissions = mlCapabilities.isPlatinumOrTrialLicense && (0, _has_ml_admin_permissions.hasMlAdminPermissions)(mlCapabilities);
  var setRules = (0, _react.useCallback)(function (newRules, newPagination) {
    dispatch({
      type: 'setRules',
      rules: newRules,
      pagination: newPagination
    });
  }, []);

  var _useRules = (0, _rules.useRules)({
    pagination: pagination,
    filterOptions: filterOptions,
    refetchPrePackagedRulesStatus: refetchPrePackagedRulesStatus,
    dispatchRulesInReducer: setRules
  }),
      _useRules2 = _slicedToArray(_useRules, 3),
      isLoadingRules = _useRules2[0],
      reFetchRulesData = _useRules2[2];

  var sorting = (0, _react.useMemo)(function () {
    return {
      sort: {
        field: 'enabled',
        direction: filterOptions.sortOrder
      }
    };
  }, [filterOptions.sortOrder]);
  var prePackagedRuleStatus = (0, _helpers.getPrePackagedRuleStatus)(rulesInstalled, rulesNotInstalled, rulesNotUpdated);
  var getBatchItemsPopoverContent = (0, _react.useCallback)(function (closePopover) {
    return _react.default.createElement(_eui.EuiContextMenuPanel, {
      items: (0, _batch_actions.getBatchItems)({
        closePopover: closePopover,
        dispatch: dispatch,
        dispatchToaster: dispatchToaster,
        hasMlPermissions: hasMlPermissions,
        loadingRuleIds: loadingRuleIds,
        selectedRuleIds: selectedRuleIds,
        reFetchRules: reFetchRulesData,
        rules: rules
      })
    });
  }, [dispatch, dispatchToaster, hasMlPermissions, loadingRuleIds, reFetchRulesData, rules, selectedRuleIds]);
  var paginationMemo = (0, _react.useMemo)(function () {
    return {
      pageIndex: pagination.page - 1,
      pageSize: pagination.perPage,
      totalItemCount: pagination.total,
      pageSizeOptions: [5, 10, 20, 50, 100, 200, 300]
    };
  }, [pagination]);
  var tableOnChangeCallback = (0, _react.useCallback)(function (_ref2) {
    var _ref3;

    var page = _ref2.page,
        sort = _ref2.sort;
    dispatch({
      type: 'updateFilterOptions',
      filterOptions: {
        sortField: SORT_FIELD,
        // Only enabled is supported for sorting currently
        sortOrder: (_ref3 = sort === null || sort === void 0 ? void 0 : sort.direction) !== null && _ref3 !== void 0 ? _ref3 : 'desc'
      },
      pagination: {
        page: page.index + 1,
        perPage: page.size
      }
    });
  }, [dispatch]);
  var rulesColumns = (0, _react.useMemo)(function () {
    return (0, _columns.getColumns)({
      dispatch: dispatch,
      dispatchToaster: dispatchToaster,
      history: history,
      hasMlPermissions: hasMlPermissions,
      hasNoPermissions: hasNoPermissions,
      loadingRuleIds: loadingRulesAction != null && (loadingRulesAction === 'enable' || loadingRulesAction === 'disable') ? loadingRuleIds : [],
      reFetchRules: reFetchRulesData
    });
  }, [dispatch, dispatchToaster, hasMlPermissions, history, loadingRuleIds, loadingRulesAction, reFetchRulesData]);
  var monitoringColumns = (0, _react.useMemo)(function () {
    return (0, _columns.getMonitoringColumns)();
  }, []);
  (0, _react.useEffect)(function () {
    if (reFetchRulesData != null) {
      setRefreshRulesData(reFetchRulesData);
    }
  }, [reFetchRulesData, setRefreshRulesData]);
  (0, _react.useEffect)(function () {
    if (initLoading && !loading && !isLoadingRules && !isLoadingRulesStatuses) {
      setInitLoading(false);
    }
  }, [initLoading, loading, isLoadingRules, isLoadingRulesStatuses]);
  var handleCreatePrePackagedRules = (0, _react.useCallback)(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(createPrePackagedRules != null && reFetchRulesData != null)) {
              _context.next = 4;
              break;
            }

            _context.next = 3;
            return createPrePackagedRules();

          case 3:
            reFetchRulesData(true);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })), [createPrePackagedRules, reFetchRulesData]);
  var euiBasicTableSelectionProps = (0, _react.useMemo)(function () {
    return {
      selectable: function selectable(item) {
        return !loadingRuleIds.includes(item.id);
      },
      onSelectionChange: function onSelectionChange(selected) {
        return dispatch({
          type: 'selectedRuleIds',
          ids: selected.map(function (r) {
            return r.id;
          })
        });
      }
    };
  }, [loadingRuleIds]);
  var onFilterChangedCallback = (0, _react.useCallback)(function (newFilterOptions) {
    dispatch({
      type: 'updateFilterOptions',
      filterOptions: _objectSpread({}, newFilterOptions),
      pagination: {
        page: 1
      }
    });
  }, []);
  var isLoadingAnActionOnRule = (0, _react.useMemo)(function () {
    if (loadingRuleIds.length > 0 && (loadingRulesAction === 'disable' || loadingRulesAction === 'enable')) {
      return false;
    } else if (loadingRuleIds.length > 0) {
      return true;
    }

    return false;
  }, [loadingRuleIds, loadingRulesAction]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_generic_downloader.GenericDownloader, {
    filename: "".concat(i18n.EXPORT_FILENAME, ".ndjson"),
    ids: exportRuleIds,
    onExportSuccess: function onExportSuccess(exportCount) {
      dispatch({
        type: 'loadingRuleIds',
        ids: [],
        actionType: null
      });
      dispatchToaster({
        type: 'addToaster',
        toast: {
          id: _uuid.default.v4(),
          title: i18n.SUCCESSFULLY_EXPORTED_RULES(exportCount),
          color: 'success',
          iconType: 'check'
        }
      });
    },
    exportSelectedData: _rules.exportRules
  }), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_panel.Panel, {
    loading: loading || isLoadingRules || isLoadingRulesStatuses
  }, _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_header_section.HeaderSection, {
    split: true,
    title: i18n.ALL_RULES
  }, _react.default.createElement(_rules_table_filters.RulesTableFilters, {
    onFilterChanged: onFilterChangedCallback,
    rulesCustomInstalled: rulesCustomInstalled,
    rulesInstalled: rulesInstalled
  })), (loading || isLoadingRules || isLoadingAnActionOnRule || isLoadingRulesStatuses) && !initLoading && _react.default.createElement(_loader.Loader, {
    "data-test-subj": "loadingPanelAllRulesTable",
    overlay: true,
    size: "xl"
  }), rulesCustomInstalled != null && rulesCustomInstalled === 0 && prePackagedRuleStatus === 'ruleNotInstalled' && !initLoading && _react.default.createElement(_load_empty_prompt.PrePackagedRulesPrompt, {
    createPrePackagedRules: handleCreatePrePackagedRules,
    loading: loadingCreatePrePackagedRules,
    userHasNoPermissions: hasNoPermissions
  }), initLoading && _react.default.createElement(_eui.EuiLoadingContent, {
    "data-test-subj": "initialLoadingPanelAllRulesTable",
    lines: 10
  }), (0, _helpers2.showRulesTable)({
    rulesCustomInstalled: rulesCustomInstalled,
    rulesInstalled: rulesInstalled
  }) && !initLoading && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_utility_bar.UtilityBar, {
    border: true
  }, _react.default.createElement(_utility_bar.UtilityBarSection, null, _react.default.createElement(_utility_bar.UtilityBarGroup, null, _react.default.createElement(_utility_bar.UtilityBarText, {
    dataTestSubj: "showingRules"
  }, i18n.SHOWING_RULES((_pagination$total = pagination.total) !== null && _pagination$total !== void 0 ? _pagination$total : 0))), _react.default.createElement(_utility_bar.UtilityBarGroup, null, _react.default.createElement(_utility_bar.UtilityBarText, null, i18n.SELECTED_RULES(selectedRuleIds.length)), !hasNoPermissions && _react.default.createElement(_utility_bar.UtilityBarAction, {
    dataTestSubj: "bulkActions",
    iconSide: "right",
    iconType: "arrowDown",
    popoverContent: getBatchItemsPopoverContent
  }, i18n.BATCH_ACTIONS), _react.default.createElement(_utility_bar.UtilityBarAction, {
    iconSide: "left",
    iconType: "refresh",
    onClick: function onClick() {
      return reFetchRulesData(true);
    }
  }, i18n.REFRESH)))), _react.default.createElement(_all_rules_tables.AllRulesTables, {
    euiBasicTableSelectionProps: euiBasicTableSelectionProps,
    hasNoPermissions: hasNoPermissions,
    monitoringColumns: monitoringColumns,
    paginationMemo: paginationMemo,
    rules: rules,
    rulesColumns: rulesColumns,
    rulesStatuses: rulesStatuses,
    sorting: sorting,
    tableOnChangeCallback: tableOnChangeCallback,
    tableRef: tableRef
  })))));
});

exports.AllRules = AllRules;
AllRules.displayName = 'AllRules';