"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserActionTitle = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _copyToClipboard = _interopRequireDefault(require("copy-to-clipboard"));

var _fp = require("lodash/fp");

var _react2 = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactRouterDom = require("react-router-dom");

var _localized_date_tooltip = require("../../../../components/localized_date_tooltip");

var _use_get_url_search = require("../../../../components/navigation/use_get_url_search");

var _home_navigations = require("../../../home/home_navigations");

var _property_actions = require("../property_actions");

var _types = require("../../../home/types");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var MySpinner = (0, _styledComponents.default)(_eui.EuiLoadingSpinner).withConfig({
  displayName: "MySpinner",
  componentId: "ztqyby-0"
})([".euiLoadingSpinner{margin-top:1px;}"]);

var UserActionTitle = function UserActionTitle(_ref) {
  var createdAt = _ref.createdAt,
      disabled = _ref.disabled,
      id = _ref.id,
      isLoading = _ref.isLoading,
      labelEditAction = _ref.labelEditAction,
      labelQuoteAction = _ref.labelQuoteAction,
      labelTitle = _ref.labelTitle,
      linkId = _ref.linkId,
      fullName = _ref.fullName,
      username = _ref.username,
      updatedAt = _ref.updatedAt,
      onEdit = _ref.onEdit,
      onQuote = _ref.onQuote,
      outlineComment = _ref.outlineComment;

  var _useParams = (0, _reactRouterDom.useParams)(),
      caseId = _useParams.detailName;

  var urlSearch = (0, _use_get_url_search.useGetUrlSearch)(_home_navigations.navTabs.case);
  var propertyActions = (0, _react2.useMemo)(function () {
    return [].concat(_toConsumableArray(labelEditAction != null && onEdit != null ? [{
      disabled: disabled,
      iconType: 'pencil',
      label: labelEditAction,
      onClick: function onClick() {
        return onEdit(id);
      }
    }] : []), _toConsumableArray(labelQuoteAction != null && onQuote != null ? [{
      disabled: disabled,
      iconType: 'quote',
      label: labelQuoteAction,
      onClick: function onClick() {
        return onQuote(id);
      }
    }] : []));
  }, [disabled, id, labelEditAction, onEdit, labelQuoteAction, onQuote]);
  var handleAnchorLink = (0, _react2.useCallback)(function () {
    (0, _copyToClipboard.default)("".concat(window.location.origin).concat(window.location.pathname, "#").concat(_types.SiemPageName.case, "/").concat(caseId, "/").concat(id).concat(urlSearch), {
      debug: true
    });
  }, [caseId, id, urlSearch]);
  var handleMoveToLink = (0, _react2.useCallback)(function () {
    if (outlineComment != null && linkId != null) {
      outlineComment(linkId);
    }
  }, [linkId, outlineComment]);
  return _react2.default.createElement(_eui.EuiText, {
    size: "s",
    className: "userAction__title",
    "data-test-subj": "user-action-title"
  }, _react2.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "baseline",
    gutterSize: "none",
    justifyContent: "spaceBetween",
    component: "span"
  }, _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "baseline",
    gutterSize: "xs",
    component: "span"
  }, _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(_eui.EuiToolTip, {
    position: "top",
    content: _react2.default.createElement("p", null, fullName !== null && fullName !== void 0 ? fullName : username)
  }, _react2.default.createElement("strong", null, username))), _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, labelTitle), _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(_localized_date_tooltip.LocalizedDateTooltip, {
    date: new Date(createdAt)
  }, _react2.default.createElement(_react.FormattedRelative, {
    "data-test-subj": "user-action-title-creation-relative-time",
    value: createdAt
  }))), updatedAt != null && _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_eui.EuiText, {
    size: "s",
    color: "subdued"
  }, '(', i18n.EDITED_FIELD, ' ', _react2.default.createElement(_localized_date_tooltip.LocalizedDateTooltip, {
    date: new Date(updatedAt)
  }, _react2.default.createElement(_react.FormattedRelative, {
    "data-test-subj": "user-action-title-edited-relative-time",
    value: updatedAt
  })), ')')))), _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "baseline",
    gutterSize: "none"
  }, !(0, _fp.isEmpty)(linkId) && _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(_eui.EuiToolTip, {
    position: "top",
    content: _react2.default.createElement("p", null, i18n.MOVE_TO_ORIGINAL_COMMENT)
  }, _react2.default.createElement(_eui.EuiButtonIcon, {
    "aria-label": i18n.MOVE_TO_ORIGINAL_COMMENT,
    onClick: handleMoveToLink,
    iconType: "arrowUp"
  }))), _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(_eui.EuiToolTip, {
    position: "top",
    content: _react2.default.createElement("p", null, i18n.COPY_REFERENCE_LINK)
  }, _react2.default.createElement(_eui.EuiButtonIcon, {
    "aria-label": i18n.COPY_REFERENCE_LINK,
    onClick: handleAnchorLink,
    iconType: "link",
    id: "".concat(id, "-permLink")
  }))), propertyActions.length > 0 && _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, isLoading && _react2.default.createElement(MySpinner, null), !isLoading && _react2.default.createElement(_property_actions.PropertyActions, {
    propertyActions: propertyActions
  }))))));
};

exports.UserActionTitle = UserActionTitle;