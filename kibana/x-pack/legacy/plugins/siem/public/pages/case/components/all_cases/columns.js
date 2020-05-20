"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCasesColumns = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _empty_value = require("../../../../components/empty_value");

var _formatted_date = require("../../../../components/formatted_date");

var _links = require("../../../../components/links");

var _truncatable_text = require("../../../../components/truncatable_text");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var MediumShadeText = _styledComponents.default.p.withConfig({
  displayName: "MediumShadeText",
  componentId: "sc-1nlhrbw-0"
})(["color:", ";"], function (_ref) {
  var theme = _ref.theme;
  return theme.eui.euiColorMediumShade;
});

var Spacer = _styledComponents.default.span.withConfig({
  displayName: "Spacer",
  componentId: "sc-1nlhrbw-1"
})(["margin-left:", ";"], function (_ref2) {
  var theme = _ref2.theme;
  return theme.eui.paddingSizes.s;
});

var renderStringField = function renderStringField(field, dataTestSubj) {
  return field != null ? _react.default.createElement("span", {
    "data-test-subj": dataTestSubj
  }, field) : (0, _empty_value.getEmptyTagValue)();
};

var getCasesColumns = function getCasesColumns(actions, filterStatus) {
  return [{
    name: i18n.NAME,
    render: function render(theCase) {
      if (theCase.id != null && theCase.title != null) {
        var caseDetailsLinkComponent = _react.default.createElement(_links.CaseDetailsLink, {
          detailName: theCase.id,
          title: theCase.title
        }, theCase.title);

        return theCase.status === 'open' ? caseDetailsLinkComponent : _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(MediumShadeText, null, caseDetailsLinkComponent, _react.default.createElement(Spacer, null, i18n.CLOSED)));
      }

      return (0, _empty_value.getEmptyTagValue)();
    }
  }, {
    field: 'createdBy',
    name: i18n.REPORTER,
    render: function render(createdBy) {
      if (createdBy != null) {
        var _createdBy$username, _createdBy$username2;

        return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiAvatar, {
          className: "userAction__circle",
          name: createdBy.fullName ? createdBy.fullName : (_createdBy$username = createdBy.username) !== null && _createdBy$username !== void 0 ? _createdBy$username : '',
          size: "s"
        }), _react.default.createElement(Spacer, {
          "data-test-subj": "case-table-column-createdBy"
        }, createdBy.fullName ? createdBy.fullName : (_createdBy$username2 = createdBy.username) !== null && _createdBy$username2 !== void 0 ? _createdBy$username2 : ''));
      }

      return (0, _empty_value.getEmptyTagValue)();
    }
  }, {
    field: 'tags',
    name: i18n.TAGS,
    render: function render(tags) {
      if (tags != null && tags.length > 0) {
        return _react.default.createElement(_truncatable_text.TruncatableText, null, tags.map(function (tag, i) {
          return _react.default.createElement(_eui.EuiBadge, {
            color: "hollow",
            key: "".concat(tag, "-").concat(i),
            "data-test-subj": "case-table-column-tags-".concat(i)
          }, tag);
        }));
      }

      return (0, _empty_value.getEmptyTagValue)();
    },
    truncateText: true
  }, {
    align: 'right',
    field: 'totalComment',
    name: i18n.COMMENTS,
    sortable: true,
    render: function render(totalComment) {
      return renderStringField("".concat(totalComment), "case-table-column-commentCount");
    }
  }, filterStatus === 'open' ? {
    field: 'createdAt',
    name: i18n.OPENED_ON,
    sortable: true,
    render: function render(createdAt) {
      if (createdAt != null) {
        return _react.default.createElement(_formatted_date.FormattedRelativePreferenceDate, {
          value: createdAt,
          "data-test-subj": "case-table-column-createdAt"
        });
      }

      return (0, _empty_value.getEmptyTagValue)();
    }
  } : {
    field: 'closedAt',
    name: i18n.CLOSED_ON,
    sortable: true,
    render: function render(closedAt) {
      if (closedAt != null) {
        return _react.default.createElement(_formatted_date.FormattedRelativePreferenceDate, {
          value: closedAt,
          "data-test-subj": "case-table-column-closedAt"
        });
      }

      return (0, _empty_value.getEmptyTagValue)();
    }
  }, {
    name: 'ServiceNow Incident',
    render: function render(theCase) {
      if (theCase.id != null) {
        return _react.default.createElement(ServiceNowColumn, {
          theCase: theCase
        });
      }

      return (0, _empty_value.getEmptyTagValue)();
    }
  }, {
    name: 'Actions',
    actions: actions
  }];
};

exports.getCasesColumns = getCasesColumns;

var ServiceNowColumn = function ServiceNowColumn(_ref3) {
  var theCase = _ref3.theCase;
  var handleRenderDataToPush = (0, _react.useCallback)(function () {
    var _theCase$externalServ, _theCase$externalServ2, _theCase$externalServ3, _theCase$externalServ4;

    var lastCaseUpdate = theCase.updatedAt != null ? new Date(theCase.updatedAt) : null;
    var lastCasePush = ((_theCase$externalServ = theCase.externalService) === null || _theCase$externalServ === void 0 ? void 0 : _theCase$externalServ.pushedAt) != null ? new Date((_theCase$externalServ2 = theCase.externalService) === null || _theCase$externalServ2 === void 0 ? void 0 : _theCase$externalServ2.pushedAt) : null;
    var hasDataToPush = lastCasePush === null || lastCasePush != null && lastCaseUpdate != null && lastCasePush.getTime() < (lastCaseUpdate === null || lastCaseUpdate === void 0 ? void 0 : lastCaseUpdate.getTime());
    return _react.default.createElement("p", null, _react.default.createElement(_eui.EuiLink, {
      "data-test-subj": "case-table-column-external",
      href: (_theCase$externalServ3 = theCase.externalService) === null || _theCase$externalServ3 === void 0 ? void 0 : _theCase$externalServ3.externalUrl,
      target: "_blank",
      "aria-label": i18n.SERVICENOW_LINK_ARIA
    }, (_theCase$externalServ4 = theCase.externalService) === null || _theCase$externalServ4 === void 0 ? void 0 : _theCase$externalServ4.externalTitle), hasDataToPush ? i18n.REQUIRES_UPDATE : i18n.UP_TO_DATE);
  }, [theCase]);

  if (theCase.externalService !== null) {
    return handleRenderDataToPush();
  }

  return renderStringField(i18n.NOT_PUSHED, "case-table-column-external-notPushed");
};