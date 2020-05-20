"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AllCases = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var i18n = _interopRequireWildcard(require("./translations"));

var _columns = require("./columns");

var _types = require("../../../../containers/case/types");

var _use_get_cases = require("../../../../containers/case/use_get_cases");

var _use_get_cases_status = require("../../../../containers/case/use_get_cases_status");

var _use_delete_cases = require("../../../../containers/case/use_delete_cases");

var _use_get_url_search = require("../../../../components/navigation/use_get_url_search");

var _panel = require("../../../../components/panel");

var _utility_bar = require("../../../../components/utility_bar");

var _link_to = require("../../../../components/link_to");

var _bulk_actions = require("../bulk_actions");

var _case_header_page = require("../case_header_page");

var _confirm_delete_case = require("../confirm_delete_case");

var _open_closed_stats = require("../open_closed_stats");

var _home_navigations = require("../../../home/home_navigations");

var _actions = require("./actions");

var _table_filters = require("./table_filters");

var _use_bulk_update_case = require("../../../../containers/case/use_bulk_update_case");

var _use_get_action_license = require("../../../../containers/case/use_get_action_license");

var _helpers = require("../use_push_to_service/helpers");

var _callout = require("../callout");

var _button = require("../configure_cases/button");

var _translations2 = require("../use_push_to_service/translations");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Div = _styledComponents.default.div.withConfig({
  displayName: "Div",
  componentId: "sc-58ic9z-0"
})(["margin-top:", ";"], function (_ref) {
  var theme = _ref.theme;
  return theme.eui.paddingSizes.m;
});

var FlexItemDivider = (0, _styledComponents.default)(_eui.EuiFlexItem).withConfig({
  displayName: "FlexItemDivider",
  componentId: "sc-58ic9z-1"
})(["", ""], function (_ref2) {
  var theme = _ref2.theme;
  return (0, _styledComponents.css)([".euiFlexGroup--gutterMedium > &.euiFlexItem{border-right:", ";padding-right:", ";margin-right:", ";}"], theme.eui.euiBorderThin, theme.eui.euiSize, theme.eui.euiSize);
});
var ProgressLoader = (0, _styledComponents.default)(_eui.EuiProgress).withConfig({
  displayName: "ProgressLoader",
  componentId: "sc-58ic9z-2"
})(["", ""], function (_ref3) {
  var theme = _ref3.theme;
  return (0, _styledComponents.css)(["top:2px;border-radius:", ";z-index:", ";"], theme.eui.euiBorderRadius, theme.eui.euiZHeader);
});

var getSortField = function getSortField(field) {
  if (field === _types.SortFieldCase.createdAt) {
    return _types.SortFieldCase.createdAt;
  } else if (field === _types.SortFieldCase.closedAt) {
    return _types.SortFieldCase.closedAt;
  }

  return _types.SortFieldCase.createdAt;
};

var AllCases = _react.default.memo(function (_ref4) {
  var _data$total;

  var userCanCrud = _ref4.userCanCrud;
  var urlSearch = (0, _use_get_url_search.useGetUrlSearch)(_home_navigations.navTabs.case);

  var _useGetActionLicense = (0, _use_get_action_license.useGetActionLicense)(),
      actionLicense = _useGetActionLicense.actionLicense;

  var _useGetCasesStatus = (0, _use_get_cases_status.useGetCasesStatus)(),
      countClosedCases = _useGetCasesStatus.countClosedCases,
      countOpenCases = _useGetCasesStatus.countOpenCases,
      isCasesStatusLoading = _useGetCasesStatus.isLoading,
      fetchCasesStatus = _useGetCasesStatus.fetchCasesStatus;

  var _useGetCases = (0, _use_get_cases.useGetCases)(),
      data = _useGetCases.data,
      dispatchUpdateCaseProperty = _useGetCases.dispatchUpdateCaseProperty,
      filterOptions = _useGetCases.filterOptions,
      loading = _useGetCases.loading,
      queryParams = _useGetCases.queryParams,
      selectedCases = _useGetCases.selectedCases,
      refetchCases = _useGetCases.refetchCases,
      setFilters = _useGetCases.setFilters,
      setQueryParams = _useGetCases.setQueryParams,
      setSelectedCases = _useGetCases.setSelectedCases; // Delete case


  var _useDeleteCases = (0, _use_delete_cases.useDeleteCases)(),
      dispatchResetIsDeleted = _useDeleteCases.dispatchResetIsDeleted,
      handleOnDeleteConfirm = _useDeleteCases.handleOnDeleteConfirm,
      handleToggleModal = _useDeleteCases.handleToggleModal,
      isDeleting = _useDeleteCases.isLoading,
      isDeleted = _useDeleteCases.isDeleted,
      isDisplayConfirmDeleteModal = _useDeleteCases.isDisplayConfirmDeleteModal; // Update case


  var _useUpdateCases = (0, _use_bulk_update_case.useUpdateCases)(),
      dispatchResetIsUpdated = _useUpdateCases.dispatchResetIsUpdated,
      isUpdating = _useUpdateCases.isLoading,
      isUpdated = _useUpdateCases.isUpdated,
      updateBulkStatus = _useUpdateCases.updateBulkStatus;

  var _useState = (0, _react.useState)({
    title: '',
    id: ''
  }),
      _useState2 = _slicedToArray(_useState, 2),
      deleteThisCase = _useState2[0],
      setDeleteThisCase = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      deleteBulk = _useState4[0],
      setDeleteBulk = _useState4[1];

  var filterRefetch = (0, _react.useRef)();
  var setFilterRefetch = (0, _react.useCallback)(function (refetchFilter) {
    filterRefetch.current = refetchFilter;
  }, [filterRefetch.current]);
  var refreshCases = (0, _react.useCallback)(function () {
    var dataRefresh = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    if (dataRefresh) refetchCases(filterOptions, queryParams);
    fetchCasesStatus();
    setSelectedCases([]);
    setDeleteBulk([]);

    if (filterRefetch.current != null) {
      filterRefetch.current();
    }
  }, [filterOptions, queryParams, filterRefetch.current]);
  (0, _react.useEffect)(function () {
    if (isDeleted) {
      refreshCases();
      dispatchResetIsDeleted();
    }

    if (isUpdated) {
      refreshCases();
      dispatchResetIsUpdated();
    }
  }, [isDeleted, isUpdated]);
  var confirmDeleteModal = (0, _react.useMemo)(function () {
    return _react.default.createElement(_confirm_delete_case.ConfirmDeleteCaseModal, {
      caseTitle: deleteThisCase.title,
      isModalVisible: isDisplayConfirmDeleteModal,
      isPlural: deleteBulk.length > 0,
      onCancel: handleToggleModal,
      onConfirm: handleOnDeleteConfirm.bind(null, deleteBulk.length > 0 ? deleteBulk : [deleteThisCase])
    });
  }, [deleteBulk, deleteThisCase, isDisplayConfirmDeleteModal]);
  var toggleDeleteModal = (0, _react.useCallback)(function (deleteCase) {
    handleToggleModal();
    setDeleteThisCase(deleteCase);
  }, []);
  var toggleBulkDeleteModal = (0, _react.useCallback)(function (caseIds) {
    handleToggleModal();

    if (caseIds.length === 1) {
      var singleCase = selectedCases.find(function (theCase) {
        return theCase.id === caseIds[0];
      });

      if (singleCase) {
        return setDeleteThisCase({
          id: singleCase.id,
          title: singleCase.title
        });
      }
    }

    var convertToDeleteCases = caseIds.map(function (id) {
      return {
        id: id
      };
    });
    setDeleteBulk(convertToDeleteCases);
  }, [selectedCases]);
  var handleUpdateCaseStatus = (0, _react.useCallback)(function (status) {
    updateBulkStatus(selectedCases, status);
  }, [selectedCases]);
  var selectedCaseIds = (0, _react.useMemo)(function () {
    return selectedCases.map(function (caseObj) {
      return caseObj.id;
    });
  }, [selectedCases]);
  var getBulkItemsPopoverContent = (0, _react.useCallback)(function (closePopover) {
    return _react.default.createElement(_eui.EuiContextMenuPanel, {
      "data-test-subj": "cases-bulk-actions",
      items: (0, _bulk_actions.getBulkItems)({
        caseStatus: filterOptions.status,
        closePopover: closePopover,
        deleteCasesAction: toggleBulkDeleteModal,
        selectedCaseIds: selectedCaseIds,
        updateCaseStatus: handleUpdateCaseStatus
      })
    });
  }, [selectedCaseIds, filterOptions.status, toggleBulkDeleteModal]);
  var handleDispatchUpdate = (0, _react.useCallback)(function (args) {
    dispatchUpdateCaseProperty(_objectSpread({}, args, {
      refetchCasesStatus: fetchCasesStatus
    }));
  }, [dispatchUpdateCaseProperty, fetchCasesStatus]);
  var actions = (0, _react.useMemo)(function () {
    return (0, _actions.getActions)({
      caseStatus: filterOptions.status,
      deleteCaseOnClick: toggleDeleteModal,
      dispatchUpdate: handleDispatchUpdate
    });
  }, [filterOptions.status, toggleDeleteModal, handleDispatchUpdate]);
  var actionsErrors = (0, _react.useMemo)(function () {
    return (0, _helpers.getActionLicenseError)(actionLicense);
  }, [actionLicense]);
  var tableOnChangeCallback = (0, _react.useCallback)(function (_ref5) {
    var page = _ref5.page,
        sort = _ref5.sort;
    var newQueryParams = queryParams;

    if (sort) {
      newQueryParams = _objectSpread({}, newQueryParams, {
        sortField: getSortField(sort.field),
        sortOrder: sort.direction
      });
    }

    if (page) {
      newQueryParams = _objectSpread({}, newQueryParams, {
        page: page.index + 1,
        perPage: page.size
      });
    }

    setQueryParams(newQueryParams);
    refreshCases(false);
  }, [queryParams]);
  var onFilterChangedCallback = (0, _react.useCallback)(function (newFilterOptions) {
    if (newFilterOptions.status && newFilterOptions.status === 'closed') {
      setQueryParams({
        sortField: _types.SortFieldCase.closedAt
      });
    } else if (newFilterOptions.status && newFilterOptions.status === 'open') {
      setQueryParams({
        sortField: _types.SortFieldCase.createdAt
      });
    }

    setFilters(newFilterOptions);
    refreshCases(false);
  }, [filterOptions, queryParams]);
  var memoizedGetCasesColumns = (0, _react.useMemo)(function () {
    return (0, _columns.getCasesColumns)(userCanCrud ? actions : [], filterOptions.status);
  }, [actions, filterOptions.status, userCanCrud]);
  var memoizedPagination = (0, _react.useMemo)(function () {
    return {
      pageIndex: queryParams.page - 1,
      pageSize: queryParams.perPage,
      totalItemCount: data.total,
      pageSizeOptions: [5, 10, 15, 20, 25]
    };
  }, [data, queryParams]);
  var sorting = {
    sort: {
      field: queryParams.sortField,
      direction: queryParams.sortOrder
    }
  };
  var euiBasicTableSelectionProps = (0, _react.useMemo)(function () {
    return {
      onSelectionChange: setSelectedCases
    };
  }, [selectedCases]);
  var isCasesLoading = (0, _react.useMemo)(function () {
    return loading.indexOf('cases') > -1 || loading.indexOf('caseUpdate') > -1;
  }, [loading]);
  var isDataEmpty = (0, _react.useMemo)(function () {
    return data.total === 0;
  }, [data]);
  return _react.default.createElement(_react.default.Fragment, null, !(0, _fp.isEmpty)(actionsErrors) && _react.default.createElement(_callout.CaseCallOut, {
    title: _translations2.ERROR_PUSH_SERVICE_CALLOUT_TITLE,
    messages: actionsErrors
  }), _react.default.createElement(_case_header_page.CaseHeaderPage, {
    title: i18n.PAGE_TITLE
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "m",
    responsive: false,
    wrap: true
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_open_closed_stats.OpenClosedStats, {
    caseCount: countOpenCases,
    caseStatus: 'open',
    isLoading: isCasesStatusLoading
  })), _react.default.createElement(FlexItemDivider, {
    grow: false
  }, _react.default.createElement(_open_closed_stats.OpenClosedStats, {
    caseCount: countClosedCases,
    caseStatus: 'closed',
    isLoading: isCasesStatusLoading
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_button.ConfigureCaseButton, {
    label: i18n.CONFIGURE_CASES_BUTTON,
    isDisabled: !(0, _fp.isEmpty)(actionsErrors) || !userCanCrud,
    showToolTip: !(0, _fp.isEmpty)(actionsErrors),
    msgTooltip: !(0, _fp.isEmpty)(actionsErrors) ? actionsErrors[0].description : _react.default.createElement(_react.default.Fragment, null),
    titleTooltip: !(0, _fp.isEmpty)(actionsErrors) ? actionsErrors[0].title : '',
    urlSearch: urlSearch
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    isDisabled: !userCanCrud,
    fill: true,
    href: (0, _link_to.getCreateCaseUrl)(urlSearch),
    iconType: "plusInCircle"
  }, i18n.CREATE_TITLE)))), (isCasesLoading || isDeleting || isUpdating) && !isDataEmpty && _react.default.createElement(ProgressLoader, {
    size: "xs",
    color: "accent",
    className: "essentialAnimation"
  }), _react.default.createElement(_panel.Panel, {
    loading: isCasesLoading
  }, _react.default.createElement(_table_filters.CasesTableFilters, {
    countClosedCases: data.countClosedCases,
    countOpenCases: data.countOpenCases,
    onFilterChanged: onFilterChangedCallback,
    initial: {
      search: filterOptions.search,
      reporters: filterOptions.reporters,
      tags: filterOptions.tags,
      status: filterOptions.status
    },
    setFilterRefetch: setFilterRefetch
  }), isCasesLoading && isDataEmpty ? _react.default.createElement(Div, null, _react.default.createElement(_eui.EuiLoadingContent, {
    "data-test-subj": "initialLoadingPanelAllCases",
    lines: 10
  })) : _react.default.createElement(Div, null, _react.default.createElement(_utility_bar.UtilityBar, {
    border: true
  }, _react.default.createElement(_utility_bar.UtilityBarSection, null, _react.default.createElement(_utility_bar.UtilityBarGroup, null, _react.default.createElement(_utility_bar.UtilityBarText, {
    "data-test-subj": "case-table-case-count"
  }, i18n.SHOWING_CASES((_data$total = data.total) !== null && _data$total !== void 0 ? _data$total : 0))), _react.default.createElement(_utility_bar.UtilityBarGroup, null, _react.default.createElement(_utility_bar.UtilityBarText, {
    "data-test-subj": "case-table-selected-case-count"
  }, i18n.SHOWING_SELECTED_CASES(selectedCases.length)), userCanCrud && _react.default.createElement(_utility_bar.UtilityBarAction, {
    "data-test-subj": "case-table-bulk-actions",
    iconSide: "right",
    iconType: "arrowDown",
    popoverContent: getBulkItemsPopoverContent
  }, i18n.BULK_ACTIONS), _react.default.createElement(_utility_bar.UtilityBarAction, {
    iconSide: "left",
    iconType: "refresh",
    onClick: refreshCases
  }, i18n.REFRESH)))), _react.default.createElement(_eui.EuiBasicTable, {
    columns: memoizedGetCasesColumns,
    "data-test-subj": "cases-table",
    isSelectable: userCanCrud,
    itemId: "id",
    items: data.cases,
    noItemsMessage: _react.default.createElement(_eui.EuiEmptyPrompt, {
      title: _react.default.createElement("h3", null, i18n.NO_CASES),
      titleSize: "xs",
      body: i18n.NO_CASES_BODY,
      actions: _react.default.createElement(_eui.EuiButton, {
        isDisabled: !userCanCrud,
        fill: true,
        size: "s",
        href: (0, _link_to.getCreateCaseUrl)(urlSearch),
        iconType: "plusInCircle"
      }, i18n.ADD_NEW_CASE)
    }),
    onChange: tableOnChangeCallback,
    pagination: memoizedPagination,
    selection: userCanCrud ? euiBasicTableSelectionProps : {},
    sorting: sorting
  }))), confirmDeleteModal);
});

exports.AllCases = AllCases;
AllCases.displayName = 'AllCases';