"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ZeekSignature = exports.constructDroppedValue = exports.extractStateValue = exports.extractStateLink = exports.zeekConnLogDictionay = exports.TotalVirusLinkSha = exports.Link = exports.DraggableZeekElement = exports.sha1StringRenderer = exports.md5StringRenderer = exports.droppedStringRenderer = exports.moduleStringRenderer = exports.defaultStringRenderer = void 0;

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _draggable_wrapper = require("../../../../drag_and_drop/draggable_wrapper");

var _helpers = require("../../../../drag_and_drop/helpers");

var _external_link_icon = require("../../../../external_link_icon");

var _links = require("../../../../links");

var _provider = require("../../../../timeline/data_providers/provider");

var _data_provider = require("../../../data_providers/data_provider");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Badge = (0, _styledComponents.default)(_eui.EuiBadge).withConfig({
  displayName: "Badge",
  componentId: "sc-14gql1f-0"
})(["vertical-align:top;"]);
Badge.displayName = 'Badge';
var TokensFlexItem = (0, _styledComponents.default)(_eui.EuiFlexItem).withConfig({
  displayName: "TokensFlexItem",
  componentId: "sc-14gql1f-1"
})(["margin-left:3px;"]);
TokensFlexItem.displayName = 'TokensFlexItem';
var LinkFlexItem = (0, _styledComponents.default)(_eui.EuiFlexItem).withConfig({
  displayName: "LinkFlexItem",
  componentId: "sc-14gql1f-2"
})(["margin-left:6px;"]);
LinkFlexItem.displayName = 'LinkFlexItem';

var defaultStringRenderer = function defaultStringRenderer(value) {
  return value;
};

exports.defaultStringRenderer = defaultStringRenderer;

var moduleStringRenderer = function moduleStringRenderer(value) {
  var split = value.split('.');

  if (split.length >= 2 && split[1] != null) {
    if (split[1] !== '') {
      return split[1];
    } else {
      return split[0];
    }
  } else {
    return value;
  }
};

exports.moduleStringRenderer = moduleStringRenderer;

var droppedStringRenderer = function droppedStringRenderer(value) {
  return "Dropped:".concat(value);
};

exports.droppedStringRenderer = droppedStringRenderer;

var md5StringRenderer = function md5StringRenderer(value) {
  return "md5: ".concat(value.substr(0, 7), "...");
};

exports.md5StringRenderer = md5StringRenderer;

var sha1StringRenderer = function sha1StringRenderer(value) {
  return "sha1: ".concat(value.substr(0, 7), "...");
};

exports.sha1StringRenderer = sha1StringRenderer;

var DraggableZeekElement = _react.default.memo(function (_ref) {
  var id = _ref.id,
      field = _ref.field,
      value = _ref.value,
      _ref$stringRenderer = _ref.stringRenderer,
      stringRenderer = _ref$stringRenderer === void 0 ? defaultStringRenderer : _ref$stringRenderer;
  return value != null ? _react.default.createElement(TokensFlexItem, {
    grow: false
  }, _react.default.createElement(_draggable_wrapper.DraggableWrapper, {
    dataProvider: {
      and: [],
      enabled: true,
      id: (0, _helpers.escapeDataProviderId)("draggable-zeek-element-draggable-wrapper-".concat(id, "-").concat(field, "-").concat(value)),
      name: value,
      excluded: false,
      kqlQuery: '',
      queryMatch: {
        field: field,
        value: value,
        operator: _data_provider.IS_OPERATOR
      }
    },
    render: function render(dataProvider, _, snapshot) {
      return snapshot.isDragging ? _react.default.createElement(_draggable_wrapper.DragEffects, null, _react.default.createElement(_provider.Provider, {
        dataProvider: dataProvider
      })) : _react.default.createElement(_eui.EuiToolTip, {
        "data-test-subj": "badge-tooltip",
        content: field
      }, _react.default.createElement(Badge, {
        iconType: "tag",
        color: "hollow"
      }, stringRenderer(value)));
    }
  })) : null;
});

exports.DraggableZeekElement = DraggableZeekElement;
DraggableZeekElement.displayName = 'DraggableZeekElement';

var Link = _react.default.memo(function (_ref2) {
  var value = _ref2.value,
      link = _ref2.link;

  if (value != null) {
    if (link != null) {
      return _react.default.createElement(LinkFlexItem, {
        grow: false
      }, _react.default.createElement("div", null, _react.default.createElement(_links.GoogleLink, {
        link: link
      }, value), _react.default.createElement(_external_link_icon.ExternalLinkIcon, null)));
    } else {
      return _react.default.createElement(LinkFlexItem, {
        grow: false
      }, _react.default.createElement("div", null, _react.default.createElement(_links.GoogleLink, {
        link: value
      }), _react.default.createElement(_external_link_icon.ExternalLinkIcon, null)));
    }
  } else {
    return null;
  }
});

exports.Link = Link;
Link.displayName = 'Link';

var TotalVirusLinkSha = _react.default.memo(function (_ref3) {
  var value = _ref3.value;
  return value != null ? _react.default.createElement(LinkFlexItem, {
    grow: false
  }, _react.default.createElement("div", null, _react.default.createElement(_links.ReputationLink, {
    domain: value,
    overflowIndexStart: 1,
    showDomain: true,
    "data-test-subj": "reputationLinkSha"
  }))) : null;
});

exports.TotalVirusLinkSha = TotalVirusLinkSha;
TotalVirusLinkSha.displayName = 'TotalVirusLinkSha'; // English Text for these codes are shortened from
// https://docs.zeek.org/en/stable/scripts/base/protocols/conn/main.bro.html

var zeekConnLogDictionay = {
  S0: i18n.S0,
  S1: i18n.S1,
  S2: i18n.S2,
  S3: i18n.S3,
  SF: i18n.SF,
  REJ: i18n.REJ,
  RSTO: i18n.RSTO,
  RSTR: i18n.RSTR,
  RSTOS0: i18n.RSTOS0,
  RSTRH: i18n.RSTRH,
  SH: i18n.SH,
  SHR: i18n.SHR,
  OTH: i18n.OTH
};
exports.zeekConnLogDictionay = zeekConnLogDictionay;

var extractStateLink = function extractStateLink(state) {
  if (state != null) {
    var lookup = zeekConnLogDictionay[state];

    if (lookup != null) {
      return "".concat(state, " ").concat(lookup);
    } else {
      return state;
    }
  } else {
    return null;
  }
};

exports.extractStateLink = extractStateLink;

var extractStateValue = function extractStateValue(state) {
  return state != null && zeekConnLogDictionay[state] != null ? zeekConnLogDictionay[state] : null;
};

exports.extractStateValue = extractStateValue;

var constructDroppedValue = function constructDroppedValue(dropped) {
  return dropped != null ? String(dropped) : null;
};

exports.constructDroppedValue = constructDroppedValue;

var ZeekSignature = _react.default.memo(function (_ref4) {
  var data = _ref4.data,
      timelineId = _ref4.timelineId;
  var id = "zeek-signature-draggable-zeek-element-".concat(timelineId, "-").concat(data._id);
  var sessionId = (0, _fp.get)('zeek.session_id[0]', data);
  var dataSet = (0, _fp.get)('event.dataset[0]', data);
  var sslVersion = (0, _fp.get)('zeek.ssl.version[0]', data);
  var cipher = (0, _fp.get)('zeek.ssl.cipher[0]', data);
  var state = (0, _fp.get)('zeek.connection.state[0]', data);
  var history = (0, _fp.get)('zeek.connection.history[0]', data);
  var note = (0, _fp.get)('zeek.notice.note[0]', data);
  var noteMsg = (0, _fp.get)('zeek.notice.msg[0]', data);
  var dropped = constructDroppedValue((0, _fp.get)('zeek.notice.dropped[0]', data));
  var dnsQuery = (0, _fp.get)('zeek.dns.query[0]', data);
  var qClassName = (0, _fp.get)('zeek.dns.qclass_name[0]', data);
  var httpMethod = (0, _fp.get)('http.request.method[0]', data);
  var httpResponseStatusCode = (0, _fp.get)('http.response.status_code[0]', data);
  var urlOriginal = (0, _fp.get)('url.original[0]', data);
  var fileSha1 = (0, _fp.get)('zeek.files.sha1[0]', data);
  var filemd5 = (0, _fp.get)('zeek.files.md5[0]', data);
  var stateLink = extractStateLink(state);
  var stateValue = extractStateValue(state);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "center",
    gutterSize: "none",
    wrap: true
  }, _react.default.createElement(DraggableZeekElement, {
    id: id,
    field: "zeek.session_id",
    value: sessionId
  }), _react.default.createElement(DraggableZeekElement, {
    id: id,
    field: "event.dataset",
    value: dataSet,
    stringRenderer: moduleStringRenderer
  }), _react.default.createElement(DraggableZeekElement, {
    id: id,
    field: "zeek.files.sha1",
    value: fileSha1,
    stringRenderer: sha1StringRenderer
  }), _react.default.createElement(DraggableZeekElement, {
    id: id,
    field: "zeek.files.md5",
    value: filemd5,
    stringRenderer: md5StringRenderer
  }), _react.default.createElement(DraggableZeekElement, {
    id: id,
    field: "zeek.notice.dropped",
    value: dropped,
    stringRenderer: droppedStringRenderer
  }), _react.default.createElement(DraggableZeekElement, {
    id: id,
    field: "zeek.ssl.version",
    value: sslVersion
  }), _react.default.createElement(DraggableZeekElement, {
    id: id,
    field: "zeek.ssl.cipher",
    value: cipher
  }), _react.default.createElement(DraggableZeekElement, {
    id: id,
    field: "zeek.connection.state",
    value: state
  }), _react.default.createElement(DraggableZeekElement, {
    id: id,
    field: "http.request.method",
    value: httpMethod
  }), _react.default.createElement(DraggableZeekElement, {
    id: id,
    field: "zeek.connection.history",
    value: history
  }), _react.default.createElement(DraggableZeekElement, {
    id: id,
    field: "zeek.notice.note",
    value: note
  }), _react.default.createElement(DraggableZeekElement, {
    id: id,
    field: "zeek.dns.query",
    value: dnsQuery
  }), _react.default.createElement(DraggableZeekElement, {
    id: id,
    field: "zeek.dns.qclass_name",
    value: qClassName
  }), _react.default.createElement(DraggableZeekElement, {
    id: id,
    field: "http.response.status_code",
    value: httpResponseStatusCode
  })), _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "center",
    gutterSize: "none"
  }, _react.default.createElement(Link, {
    link: stateLink,
    value: stateValue
  }), _react.default.createElement(Link, {
    value: cipher
  }), _react.default.createElement(Link, {
    value: dnsQuery
  }), _react.default.createElement(Link, {
    value: noteMsg
  }), _react.default.createElement(Link, {
    value: urlOriginal
  }), _react.default.createElement(TotalVirusLinkSha, {
    value: fileSha1
  })));
});

exports.ZeekSignature = ZeekSignature;
ZeekSignature.displayName = 'ZeekSignature';