"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserActionTree = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var i18n = _interopRequireWildcard(require("../case_view/translations"));

var _use_update_comment = require("../../../../containers/case/use_update_comment");

var _kibana = require("../../../../lib/kibana");

var _add_comment = require("../add_comment");

var _helpers = require("./helpers");

var _user_action_item = require("./user_action_item");

var _user_action_markdown = require("./user_action_markdown");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MyEuiFlexGroup = (0, _styledComponents.default)(_eui.EuiFlexGroup).withConfig({
  displayName: "MyEuiFlexGroup",
  componentId: "rkbwd4-0"
})(["margin-bottom:8px;"]);
var DESCRIPTION_ID = 'description';
var NEW_ID = 'newComment';

var UserActionTree = _react.default.memo(function (_ref) {
  var _ref3, _caseData$createdBy$f, _caseData$createdBy$u, _currentUser$fullName, _currentUser$username;

  var caseData = _ref.data,
      caseUserActions = _ref.caseUserActions,
      fetchUserActions = _ref.fetchUserActions,
      firstIndexPushToService = _ref.firstIndexPushToService,
      isLoadingDescription = _ref.isLoadingDescription,
      isLoadingUserActions = _ref.isLoadingUserActions,
      lastIndexPushToService = _ref.lastIndexPushToService,
      onUpdateField = _ref.onUpdateField,
      updateCase = _ref.updateCase,
      userCanCrud = _ref.userCanCrud;

  var _useParams = (0, _reactRouterDom.useParams)(),
      commentId = _useParams.commentId;

  var handlerTimeoutId = (0, _react.useRef)(0);

  var _useState = (0, _react.useState)(true),
      _useState2 = _slicedToArray(_useState, 2),
      initLoading = _useState2[0],
      setInitLoading = _useState2[1];

  var _useState3 = (0, _react.useState)(''),
      _useState4 = _slicedToArray(_useState3, 2),
      selectedOutlineCommentId = _useState4[0],
      setSelectedOutlineCommentId = _useState4[1];

  var _useUpdateComment = (0, _use_update_comment.useUpdateComment)(),
      isLoadingIds = _useUpdateComment.isLoadingIds,
      patchComment = _useUpdateComment.patchComment;

  var currentUser = (0, _kibana.useCurrentUser)();

  var _useState5 = (0, _react.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      manageMarkdownEditIds = _useState6[0],
      setManangeMardownEditIds = _useState6[1];

  var _useState7 = (0, _react.useState)(null),
      _useState8 = _slicedToArray(_useState7, 2),
      insertQuote = _useState8[0],
      setInsertQuote = _useState8[1];

  var handleManageMarkdownEditId = (0, _react.useCallback)(function (id) {
    if (!manageMarkdownEditIds.includes(id)) {
      setManangeMardownEditIds([].concat(_toConsumableArray(manageMarkdownEditIds), [id]));
    } else {
      setManangeMardownEditIds(manageMarkdownEditIds.filter(function (myId) {
        return id !== myId;
      }));
    }
  }, [manageMarkdownEditIds]);
  var handleSaveComment = (0, _react.useCallback)(function (_ref2, content) {
    var id = _ref2.id,
        version = _ref2.version;
    handleManageMarkdownEditId(id);
    patchComment({
      caseId: caseData.id,
      commentId: id,
      commentUpdate: content,
      fetchUserActions: fetchUserActions,
      version: version,
      updateCase: updateCase
    });
  }, [caseData, handleManageMarkdownEditId, patchComment, updateCase]);
  var handleOutlineComment = (0, _react.useCallback)(function (id) {
    var moveToTarget = document.getElementById("".concat(id, "-permLink"));

    if (moveToTarget != null) {
      var yOffset = -60;
      var y = moveToTarget.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });

      if (id === 'add-comment') {
        moveToTarget.getElementsByTagName('textarea')[0].focus();
      }
    }

    window.clearTimeout(handlerTimeoutId.current);
    setSelectedOutlineCommentId(id);
    handlerTimeoutId.current = window.setTimeout(function () {
      setSelectedOutlineCommentId('');
      window.clearTimeout(handlerTimeoutId.current);
    }, 2400);
  }, [handlerTimeoutId.current]);
  var handleManageQuote = (0, _react.useCallback)(function (quote) {
    var addCarrots = quote.replace(new RegExp('\r?\n', 'g'), '  \n> ');
    setInsertQuote("> ".concat(addCarrots, " \n"));
    handleOutlineComment('add-comment');
  }, [handleOutlineComment]);
  var handleUpdate = (0, _react.useCallback)(function (newCase) {
    updateCase(newCase);
    fetchUserActions();
  }, [fetchUserActions, updateCase]);
  var MarkdownDescription = (0, _react.useMemo)(function () {
    return _react.default.createElement(_user_action_markdown.UserActionMarkdown, {
      id: DESCRIPTION_ID,
      content: caseData.description,
      isEditable: manageMarkdownEditIds.includes(DESCRIPTION_ID),
      onSaveContent: function onSaveContent(content) {
        handleManageMarkdownEditId(DESCRIPTION_ID);
        onUpdateField(DESCRIPTION_ID, content);
      },
      onChangeEditable: handleManageMarkdownEditId
    });
  }, [caseData.description, handleManageMarkdownEditId, manageMarkdownEditIds, onUpdateField]);
  var MarkdownNewComment = (0, _react.useMemo)(function () {
    return _react.default.createElement(_add_comment.AddComment, {
      caseId: caseData.id,
      disabled: !userCanCrud,
      insertQuote: insertQuote,
      onCommentPosted: handleUpdate,
      onCommentSaving: handleManageMarkdownEditId.bind(null, NEW_ID),
      showLoading: false
    });
  }, [caseData.id, handleUpdate, insertQuote, userCanCrud]);
  (0, _react.useEffect)(function () {
    if (initLoading && !isLoadingUserActions && isLoadingIds.length === 0) {
      setInitLoading(false);

      if (commentId != null) {
        handleOutlineComment(commentId);
      }
    }
  }, [commentId, initLoading, isLoadingUserActions, isLoadingIds]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_user_action_item.UserActionItem, {
    createdAt: caseData.createdAt,
    disabled: !userCanCrud,
    id: DESCRIPTION_ID,
    isEditable: manageMarkdownEditIds.includes(DESCRIPTION_ID),
    isLoading: isLoadingDescription,
    labelEditAction: i18n.EDIT_DESCRIPTION,
    labelQuoteAction: i18n.QUOTE,
    labelTitle: _react.default.createElement(_react.default.Fragment, null, i18n.ADDED_DESCRIPTION),
    fullName: (_ref3 = (_caseData$createdBy$f = caseData.createdBy.fullName) !== null && _caseData$createdBy$f !== void 0 ? _caseData$createdBy$f : caseData.createdBy.username) !== null && _ref3 !== void 0 ? _ref3 : '',
    markdown: MarkdownDescription,
    onEdit: handleManageMarkdownEditId.bind(null, DESCRIPTION_ID),
    onQuote: handleManageQuote.bind(null, caseData.description),
    username: (_caseData$createdBy$u = caseData.createdBy.username) !== null && _caseData$createdBy$u !== void 0 ? _caseData$createdBy$u : 'Unknown'
  }), caseUserActions.map(function (action, index) {
    if (action.commentId != null && action.action === 'create') {
      var comment = caseData.comments.find(function (c) {
        return c.id === action.commentId;
      });

      if (comment != null) {
        var _ref4, _comment$createdBy$fu, _comment$createdBy$us;

        return _react.default.createElement(_user_action_item.UserActionItem, {
          key: action.actionId,
          createdAt: comment.createdAt,
          disabled: !userCanCrud,
          id: comment.id,
          idToOutline: selectedOutlineCommentId,
          isEditable: manageMarkdownEditIds.includes(comment.id),
          isLoading: isLoadingIds.includes(comment.id),
          labelEditAction: i18n.EDIT_COMMENT,
          labelQuoteAction: i18n.QUOTE,
          labelTitle: _react.default.createElement(_react.default.Fragment, null, i18n.ADDED_COMMENT),
          fullName: (_ref4 = (_comment$createdBy$fu = comment.createdBy.fullName) !== null && _comment$createdBy$fu !== void 0 ? _comment$createdBy$fu : comment.createdBy.username) !== null && _ref4 !== void 0 ? _ref4 : '',
          markdown: _react.default.createElement(_user_action_markdown.UserActionMarkdown, {
            id: comment.id,
            content: comment.comment,
            isEditable: manageMarkdownEditIds.includes(comment.id),
            onChangeEditable: handleManageMarkdownEditId,
            onSaveContent: handleSaveComment.bind(null, {
              id: comment.id,
              version: comment.version
            })
          }),
          onEdit: handleManageMarkdownEditId.bind(null, comment.id),
          onQuote: handleManageQuote.bind(null, comment.comment),
          outlineComment: handleOutlineComment,
          username: (_comment$createdBy$us = comment.createdBy.username) !== null && _comment$createdBy$us !== void 0 ? _comment$createdBy$us : '',
          updatedAt: comment.updatedAt
        });
      }
    }

    if (action.actionField.length === 1) {
      var _ref5, _action$actionBy$full, _action$actionBy$user;

      var myField = action.actionField[0];
      var labelTitle = (0, _helpers.getLabelTitle)({
        action: action,
        field: myField,
        firstIndexPushToService: firstIndexPushToService,
        index: index
      });
      return _react.default.createElement(_user_action_item.UserActionItem, {
        key: action.actionId,
        createdAt: action.actionAt,
        disabled: !userCanCrud,
        id: action.actionId,
        isEditable: false,
        isLoading: false,
        labelTitle: _react.default.createElement(_react.default.Fragment, null, labelTitle),
        linkId: action.action === 'update' && action.commentId != null ? action.commentId : null,
        fullName: (_ref5 = (_action$actionBy$full = action.actionBy.fullName) !== null && _action$actionBy$full !== void 0 ? _action$actionBy$full : action.actionBy.username) !== null && _ref5 !== void 0 ? _ref5 : '',
        outlineComment: handleOutlineComment,
        showTopFooter: action.action === 'push-to-service' && index === lastIndexPushToService,
        showBottomFooter: action.action === 'push-to-service' && index === lastIndexPushToService && index < caseUserActions.length - 1,
        username: (_action$actionBy$user = action.actionBy.username) !== null && _action$actionBy$user !== void 0 ? _action$actionBy$user : ''
      });
    }

    return null;
  }), (isLoadingUserActions || isLoadingIds.includes(NEW_ID)) && _react.default.createElement(MyEuiFlexGroup, {
    justifyContent: "center",
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiLoadingSpinner, {
    size: "l"
  }))), _react.default.createElement(_user_action_item.UserActionItem, {
    createdAt: new Date().toISOString(),
    disabled: !userCanCrud,
    id: NEW_ID,
    isEditable: true,
    isLoading: isLoadingIds.includes(NEW_ID),
    fullName: currentUser != null ? (_currentUser$fullName = currentUser.fullName) !== null && _currentUser$fullName !== void 0 ? _currentUser$fullName : '' : '',
    markdown: MarkdownNewComment,
    username: currentUser != null ? (_currentUser$username = currentUser.username) !== null && _currentUser$username !== void 0 ? _currentUser$username : '' : ''
  }));
});

exports.UserActionTree = UserActionTree;
UserActionTree.displayName = 'UserActionTree';