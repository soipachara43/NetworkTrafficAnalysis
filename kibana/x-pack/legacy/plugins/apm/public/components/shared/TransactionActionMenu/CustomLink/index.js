"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomLink = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _lodash = require("lodash");

var _public = require("../../../../../../../../plugins/observability/public");

var _CustomLinkSection = require("./CustomLinkSection");

var _ManageCustomLink = require("./ManageCustomLink");

var _useFetcher = require("../../../../hooks/useFetcher");

var _LoadingStatePrompt = require("../../LoadingStatePrompt");

var _variables = require("../../../../style/variables");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SeeMoreButton = _styledComponents.default.button.withConfig({
  displayName: "SeeMoreButton",
  componentId: "sc-1arfajx-0"
})(["display:", ";align-items:center;width:100%;justify-content:space-between;&:hover{text-decoration:underline;}"], function (props) {
  return props.show ? 'flex' : 'none';
});

var CustomLink = function CustomLink(_ref) {
  var customLinks = _ref.customLinks,
      status = _ref.status,
      onCreateCustomLinkClick = _ref.onCreateCustomLinkClick,
      onSeeMoreClick = _ref.onSeeMoreClick,
      transaction = _ref.transaction;

  var renderEmptyPrompt = _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiText, {
    size: "xs",
    grow: false,
    style: {
      width: (0, _variables.px)(300)
    }
  }, _i18n.i18n.translate('xpack.apm.customLink.empty', {
    defaultMessage: 'No custom links found. Set up your own custom links, e.g., a link to a specific Dashboard or external link.'
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiButtonEmpty, {
    iconType: "plusInCircle",
    size: "xs",
    onClick: onCreateCustomLinkClick
  }, _i18n.i18n.translate('xpack.apm.customLink.buttom.create', {
    defaultMessage: 'Create custom link'
  })));

  var renderCustomLinkBottomSection = (0, _lodash.isEmpty)(customLinks) ? renderEmptyPrompt : _react.default.createElement(SeeMoreButton, {
    onClick: onSeeMoreClick,
    show: customLinks.length > 3
  }, _react.default.createElement(_eui.EuiText, {
    size: "s"
  }, _i18n.i18n.translate('xpack.apm.transactionActionMenu.customLink.seeMore', {
    defaultMessage: 'See more'
  })), _react.default.createElement(_eui.EuiIcon, {
    type: "arrowRight"
  }));
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_public.ActionMenuDivider, null), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    style: {
      justifyContent: 'center'
    }
  }, _react.default.createElement(_eui.EuiText, {
    size: 's',
    grow: false
  }, _react.default.createElement("h5", null, _i18n.i18n.translate('xpack.apm.transactionActionMenu.customLink.section', {
    defaultMessage: 'Custom Links'
  })))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_ManageCustomLink.ManageCustomLink, {
    onCreateCustomLinkClick: onCreateCustomLinkClick,
    showCreateCustomLinkButton: !!customLinks.length
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_public.SectionSubtitle, null, _i18n.i18n.translate('xpack.apm.transactionActionMenu.customLink.subtitle', {
    defaultMessage: 'Links will open in a new window.'
  })), _react.default.createElement(_CustomLinkSection.CustomLinkSection, {
    customLinks: customLinks.slice(0, 3),
    transaction: transaction
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), status === _useFetcher.FETCH_STATUS.LOADING ? _react.default.createElement(_LoadingStatePrompt.LoadingStatePrompt, null) : renderCustomLinkBottomSection);
};

exports.CustomLink = CustomLink;