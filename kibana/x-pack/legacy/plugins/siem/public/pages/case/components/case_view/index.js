"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CaseView = exports.CaseComponent = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var i18n = _interopRequireWildcard(require("./translations"));

var _link_to = require("../../../../components/link_to");

var _header_page = require("../../../../components/header_page");

var _editable_title = require("../../../../components/header_page/editable_title");

var _tag_list = require("../tag_list");

var _use_get_case = require("../../../../containers/case/use_get_case");

var _user_action_tree = require("../user_action_tree");

var _user_list = require("../user_list");

var _use_update_case = require("../../../../containers/case/use_update_case");

var _use_get_url_search = require("../../../../components/navigation/use_get_url_search");

var _wrapper_page = require("../../../../components/wrapper_page");

var _utils = require("../../../../containers/case/utils");

var _wrappers = require("../wrappers");

var _kibana = require("../../../../lib/kibana");

var _case_status = require("../case_status");

var _home_navigations = require("../../../home/home_navigations");

var _spy_routes = require("../../../../utils/route/spy_routes");

var _use_get_case_user_actions = require("../../../../containers/case/use_get_case_user_actions");

var _use_push_to_service = require("../use_push_to_service");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MyWrapper = (0, _styledComponents.default)(_wrapper_page.WrapperPage).withConfig({
  displayName: "MyWrapper",
  componentId: "sc-1bgh3s7-0"
})(["padding-bottom:0;"]);
var MyEuiFlexGroup = (0, _styledComponents.default)(_eui.EuiFlexGroup).withConfig({
  displayName: "MyEuiFlexGroup",
  componentId: "sc-1bgh3s7-1"
})(["height:100%;"]);
var MyEuiHorizontalRule = (0, _styledComponents.default)(_eui.EuiHorizontalRule).withConfig({
  displayName: "MyEuiHorizontalRule",
  componentId: "sc-1bgh3s7-2"
})(["margin-left:48px;&.euiHorizontalRule--full{width:calc(100% - 48px);}"]);

var CaseComponent = _react.default.memo(function (_ref) {
  var caseId = _ref.caseId,
      caseData = _ref.caseData,
      fetchCase = _ref.fetchCase,
      updateCase = _ref.updateCase,
      userCanCrud = _ref.userCanCrud;
  var basePath = window.location.origin + (0, _kibana.useBasePath)();
  var caseLink = "".concat(basePath, "/app/siem#/case/").concat(caseId);
  var search = (0, _use_get_url_search.useGetUrlSearch)(_home_navigations.navTabs.case);

  var _useState = (0, _react.useState)(true),
      _useState2 = _slicedToArray(_useState, 2),
      initLoadingData = _useState2[0],
      setInitLoadingData = _useState2[1];

  var _useGetCaseUserAction = (0, _use_get_case_user_actions.useGetCaseUserActions)(caseId),
      caseUserActions = _useGetCaseUserAction.caseUserActions,
      fetchCaseUserActions = _useGetCaseUserAction.fetchCaseUserActions,
      firstIndexPushToService = _useGetCaseUserAction.firstIndexPushToService,
      hasDataToPush = _useGetCaseUserAction.hasDataToPush,
      isLoadingUserActions = _useGetCaseUserAction.isLoading,
      lastIndexPushToService = _useGetCaseUserAction.lastIndexPushToService,
      participants = _useGetCaseUserAction.participants;

  var _useUpdateCase = (0, _use_update_case.useUpdateCase)({
    caseId: caseId
  }),
      isLoading = _useUpdateCase.isLoading,
      updateKey = _useUpdateCase.updateKey,
      updateCaseProperty = _useUpdateCase.updateCaseProperty; // Update Fields


  var onUpdateField = (0, _react.useCallback)(function (newUpdateKey, updateValue) {
    var handleUpdateNewCase = function handleUpdateNewCase(newCase) {
      return updateCase(_objectSpread({}, newCase, {
        comments: caseData.comments
      }));
    };

    switch (newUpdateKey) {
      case 'title':
        var titleUpdate = (0, _utils.getTypedPayload)(updateValue);

        if (titleUpdate.length > 0) {
          updateCaseProperty({
            fetchCaseUserActions: fetchCaseUserActions,
            updateKey: 'title',
            updateValue: titleUpdate,
            updateCase: handleUpdateNewCase,
            version: caseData.version
          });
        }

        break;

      case 'description':
        var descriptionUpdate = (0, _utils.getTypedPayload)(updateValue);

        if (descriptionUpdate.length > 0) {
          updateCaseProperty({
            fetchCaseUserActions: fetchCaseUserActions,
            updateKey: 'description',
            updateValue: descriptionUpdate,
            updateCase: handleUpdateNewCase,
            version: caseData.version
          });
        }

        break;

      case 'tags':
        var tagsUpdate = (0, _utils.getTypedPayload)(updateValue);
        updateCaseProperty({
          fetchCaseUserActions: fetchCaseUserActions,
          updateKey: 'tags',
          updateValue: tagsUpdate,
          updateCase: handleUpdateNewCase,
          version: caseData.version
        });
        break;

      case 'status':
        var statusUpdate = (0, _utils.getTypedPayload)(updateValue);

        if (caseData.status !== updateValue) {
          updateCaseProperty({
            fetchCaseUserActions: fetchCaseUserActions,
            updateKey: 'status',
            updateValue: statusUpdate,
            updateCase: handleUpdateNewCase,
            version: caseData.version
          });
        }

      default:
        return null;
    }
  }, [fetchCaseUserActions, updateCaseProperty, updateCase, caseData]);
  var handleUpdateCase = (0, _react.useCallback)(function (newCase) {
    updateCase(newCase);
    fetchCaseUserActions(newCase.id);
  }, [updateCase, fetchCaseUserActions]);

  var _usePushToService = (0, _use_push_to_service.usePushToService)({
    caseId: caseData.id,
    caseStatus: caseData.status,
    isNew: caseUserActions.filter(function (cua) {
      return cua.action === 'push-to-service';
    }).length === 0,
    updateCase: handleUpdateCase,
    userCanCrud: userCanCrud
  }),
      pushButton = _usePushToService.pushButton,
      pushCallouts = _usePushToService.pushCallouts;

  var onSubmitTags = (0, _react.useCallback)(function (newTags) {
    return onUpdateField('tags', newTags);
  }, [onUpdateField]);
  var onSubmitTitle = (0, _react.useCallback)(function (newTitle) {
    return onUpdateField('title', newTitle);
  }, [onUpdateField]);
  var toggleStatusCase = (0, _react.useCallback)(function (e) {
    return onUpdateField('status', e.target.checked ? 'closed' : 'open');
  }, [onUpdateField]);
  var handleRefresh = (0, _react.useCallback)(function () {
    fetchCaseUserActions(caseData.id);
    fetchCase();
  }, [caseData.id, fetchCase, fetchCaseUserActions]);
  var spyState = (0, _react.useMemo)(function () {
    return {
      caseTitle: caseData.title
    };
  }, [caseData.title]);
  var caseStatusData = (0, _react.useMemo)(function () {
    var _caseData$closedAt;

    return caseData.status === 'open' ? {
      'data-test-subj': 'case-view-createdAt',
      value: caseData.createdAt,
      title: i18n.CASE_OPENED,
      buttonLabel: i18n.CLOSE_CASE,
      status: caseData.status,
      icon: 'folderCheck',
      badgeColor: 'secondary',
      isSelected: false
    } : {
      'data-test-subj': 'case-view-closedAt',
      value: (_caseData$closedAt = caseData.closedAt) !== null && _caseData$closedAt !== void 0 ? _caseData$closedAt : '',
      title: i18n.CASE_CLOSED,
      buttonLabel: i18n.REOPEN_CASE,
      status: caseData.status,
      icon: 'folderExclamation',
      badgeColor: 'danger',
      isSelected: true
    };
  }, [caseData.closedAt, caseData.createdAt, caseData.status]);
  var emailContent = (0, _react.useMemo)(function () {
    return {
      subject: i18n.EMAIL_SUBJECT(caseData.title),
      body: i18n.EMAIL_BODY(caseLink)
    };
  }, [caseLink, caseData.title]);
  (0, _react.useEffect)(function () {
    if (initLoadingData && !isLoadingUserActions) {
      setInitLoadingData(false);
    }
  }, [initLoadingData, isLoadingUserActions]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(MyWrapper, null, _react.default.createElement(_header_page.HeaderPage, {
    backOptions: {
      href: (0, _link_to.getCaseUrl)(search),
      text: i18n.BACK_TO_ALL
    },
    "data-test-subj": "case-view-title",
    titleNode: _react.default.createElement(_editable_title.EditableTitle, {
      disabled: !userCanCrud,
      isLoading: isLoading && updateKey === 'title',
      title: caseData.title,
      onSubmit: onSubmitTitle
    }),
    title: caseData.title
  }, _react.default.createElement(_case_status.CaseStatus, _extends({
    caseData: caseData,
    disabled: !userCanCrud,
    isLoading: isLoading && updateKey === 'status',
    onRefresh: handleRefresh,
    toggleStatusCase: toggleStatusCase
  }, caseStatusData)))), _react.default.createElement(_wrappers.WhitePageWrapper, null, _react.default.createElement(MyWrapper, null, pushCallouts != null && pushCallouts, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: 6
  }, initLoadingData && _react.default.createElement(_eui.EuiLoadingContent, {
    lines: 8
  }), !initLoadingData && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_user_action_tree.UserActionTree, {
    caseUserActions: caseUserActions,
    data: caseData,
    fetchUserActions: fetchCaseUserActions.bind(null, caseData.id),
    firstIndexPushToService: firstIndexPushToService,
    isLoadingDescription: isLoading && updateKey === 'description',
    isLoadingUserActions: isLoadingUserActions,
    lastIndexPushToService: lastIndexPushToService,
    onUpdateField: onUpdateField,
    updateCase: updateCase,
    userCanCrud: userCanCrud
  }), _react.default.createElement(MyEuiHorizontalRule, {
    margin: "s"
  }), _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "s",
    justifyContent: "flexEnd"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonToggle, {
    "data-test-subj": caseStatusData['data-test-subj'],
    iconType: caseStatusData.icon,
    isDisabled: !userCanCrud,
    isSelected: caseStatusData.isSelected,
    isLoading: isLoading && updateKey === 'status',
    label: caseStatusData.buttonLabel,
    onChange: toggleStatusCase
  })), hasDataToPush && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, pushButton)))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: 2
  }, _react.default.createElement(_user_list.UserList, {
    "data-test-subj": "case-view-user-list-reporter",
    email: emailContent,
    headline: i18n.REPORTER,
    users: [caseData.createdBy]
  }), _react.default.createElement(_user_list.UserList, {
    "data-test-subj": "case-view-user-list-participants",
    email: emailContent,
    headline: i18n.PARTICIPANTS,
    loading: isLoadingUserActions,
    users: participants
  }), _react.default.createElement(_tag_list.TagList, {
    "data-test-subj": "case-view-tag-list",
    disabled: !userCanCrud,
    tags: caseData.tags,
    onSubmit: onSubmitTags,
    isLoading: isLoading && updateKey === 'tags'
  }))))), _react.default.createElement(_spy_routes.SpyRoute, {
    state: spyState
  }));
});

exports.CaseComponent = CaseComponent;

var CaseView = _react.default.memo(function (_ref2) {
  var caseId = _ref2.caseId,
      userCanCrud = _ref2.userCanCrud;

  var _useGetCase = (0, _use_get_case.useGetCase)(caseId),
      data = _useGetCase.data,
      isLoading = _useGetCase.isLoading,
      isError = _useGetCase.isError,
      fetchCase = _useGetCase.fetchCase,
      updateCase = _useGetCase.updateCase;

  if (isError) {
    return null;
  }

  if (isLoading) {
    return _react.default.createElement(MyEuiFlexGroup, {
      justifyContent: "center",
      alignItems: "center"
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiLoadingSpinner, {
      size: "xl"
    })));
  }

  return _react.default.createElement(CaseComponent, {
    caseId: caseId,
    fetchCase: fetchCase,
    caseData: data,
    updateCase: updateCase,
    userCanCrud: userCanCrud
  });
});

exports.CaseView = CaseView;
CaseComponent.displayName = 'CaseComponent';
CaseView.displayName = 'CaseView';