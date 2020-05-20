"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WhoIsLink = exports.ReputationLink = exports.Comma = exports.CertificateFingerprintLink = exports.Ja3FingerprintLink = exports.PortOrServiceNameLink = exports.GoogleLink = exports.CreateCaseLink = exports.CaseDetailsLink = exports.IPDetailsLink = exports.HostDetailsLink = exports.ExternalLink = exports.DEFAULT_NUMBER_OF_LINK = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _fp = require("lodash/fp");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _field_renderers = require("../field_renderers/field_renderers");

var _helpers = require("../../lib/helpers");

var _link_to = require("../link_to");

var _types = require("../../graphql/types");

var _kibana = require("../../lib/kibana");

var _constants = require("../../../common/constants");

var _helpers2 = require("../../pages/detection_engine/rules/components/step_about_rule/helpers");

var _external_link_icon = require("../external_link_icon");

var _home_navigations = require("../../pages/home/home_navigations");

var _use_get_url_search = require("../navigation/use_get_url_search");

var i18n = _interopRequireWildcard(require("./translations"));

var _defaultNameMapping;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DEFAULT_NUMBER_OF_LINK = 5; // Internal Links

exports.DEFAULT_NUMBER_OF_LINK = DEFAULT_NUMBER_OF_LINK;

var HostDetailsLinkComponent = function HostDetailsLinkComponent(_ref) {
  var children = _ref.children,
      hostName = _ref.hostName;
  return _react.default.createElement(_eui.EuiLink, {
    href: (0, _link_to.getHostDetailsUrl)(encodeURIComponent(hostName))
  }, children ? children : hostName);
};

var whitelistUrlSchemes = ['http://', 'https://'];

var ExternalLink = _react.default.memo(function (_ref2) {
  var url = _ref2.url,
      children = _ref2.children,
      idx = _ref2.idx,
      _ref2$overflowIndexSt = _ref2.overflowIndexStart,
      overflowIndexStart = _ref2$overflowIndexSt === void 0 ? DEFAULT_NUMBER_OF_LINK : _ref2$overflowIndexSt,
      _ref2$allItemsLimit = _ref2.allItemsLimit,
      allItemsLimit = _ref2$allItemsLimit === void 0 ? DEFAULT_NUMBER_OF_LINK : _ref2$allItemsLimit;
  var lastVisibleItemIndex = overflowIndexStart - 1;
  var lastItemIndex = allItemsLimit - 1;
  var lastIndexToShow = Math.max(0, Math.min(lastVisibleItemIndex, lastItemIndex));
  var inWhitelist = whitelistUrlSchemes.some(function (scheme) {
    return url.indexOf(scheme) === 0;
  });
  return url && inWhitelist && !(0, _helpers2.isUrlInvalid)(url) && children ? _react.default.createElement(_eui.EuiToolTip, {
    content: url,
    position: "top",
    "data-test-subj": "externalLinkTooltip"
  }, _react.default.createElement(_eui.EuiLink, {
    href: url,
    target: "_blank",
    rel: "noopener",
    "data-test-subj": "externalLink"
  }, children, _react.default.createElement(_external_link_icon.ExternalLinkIcon, {
    "data-test-subj": "externalLinkIcon"
  }), !(0, _fp.isNil)(idx) && idx < lastIndexToShow && _react.default.createElement(Comma, {
    "data-test-subj": "externalLinkComma"
  }))) : null;
});

exports.ExternalLink = ExternalLink;
ExternalLink.displayName = 'ExternalLink';

var HostDetailsLink = _react.default.memo(HostDetailsLinkComponent);

exports.HostDetailsLink = HostDetailsLink;

var IPDetailsLinkComponent = function IPDetailsLinkComponent(_ref3) {
  var children = _ref3.children,
      ip = _ref3.ip,
      _ref3$flowTarget = _ref3.flowTarget,
      flowTarget = _ref3$flowTarget === void 0 ? _types.FlowTarget.source : _ref3$flowTarget;
  return _react.default.createElement(_eui.EuiLink, {
    href: "".concat((0, _link_to.getIPDetailsUrl)(encodeURIComponent((0, _helpers.encodeIpv6)(ip)), flowTarget))
  }, children ? children : ip);
};

var IPDetailsLink = _react.default.memo(IPDetailsLinkComponent);

exports.IPDetailsLink = IPDetailsLink;

var CaseDetailsLinkComponent = function CaseDetailsLinkComponent(_ref4) {
  var children = _ref4.children,
      detailName = _ref4.detailName,
      title = _ref4.title;
  var search = (0, _use_get_url_search.useGetUrlSearch)(_home_navigations.navTabs.case);
  return _react.default.createElement(_eui.EuiLink, {
    href: (0, _link_to.getCaseDetailsUrl)({
      id: detailName,
      search: search
    }),
    "data-test-subj": "case-details-link",
    "aria-label": i18n.CASE_DETAILS_LINK_ARIA(title !== null && title !== void 0 ? title : detailName)
  }, children ? children : detailName);
};

var CaseDetailsLink = _react.default.memo(CaseDetailsLinkComponent);

exports.CaseDetailsLink = CaseDetailsLink;
CaseDetailsLink.displayName = 'CaseDetailsLink';

var CreateCaseLink = _react.default.memo(function (_ref5) {
  var children = _ref5.children;
  var search = (0, _use_get_url_search.useGetUrlSearch)(_home_navigations.navTabs.case);
  return _react.default.createElement(_eui.EuiLink, {
    href: (0, _link_to.getCreateCaseUrl)(search)
  }, children);
});

exports.CreateCaseLink = CreateCaseLink;
CreateCaseLink.displayName = 'CreateCaseLink'; // External Links

var GoogleLink = _react.default.memo(function (_ref6) {
  var children = _ref6.children,
      link = _ref6.link;
  return _react.default.createElement(ExternalLink, {
    url: "https://www.google.com/search?q=".concat(encodeURIComponent(link))
  }, children ? children : link);
});

exports.GoogleLink = GoogleLink;
GoogleLink.displayName = 'GoogleLink';

var PortOrServiceNameLink = _react.default.memo(function (_ref7) {
  var children = _ref7.children,
      portOrServiceName = _ref7.portOrServiceName;
  return _react.default.createElement(_eui.EuiLink, {
    "data-test-subj": "port-or-service-name-link",
    href: "https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml?search=".concat(encodeURIComponent(String(portOrServiceName))),
    target: "_blank"
  }, children ? children : portOrServiceName);
});

exports.PortOrServiceNameLink = PortOrServiceNameLink;
PortOrServiceNameLink.displayName = 'PortOrServiceNameLink';

var Ja3FingerprintLink = _react.default.memo(function (_ref8) {
  var children = _ref8.children,
      ja3Fingerprint = _ref8.ja3Fingerprint;
  return _react.default.createElement(_eui.EuiLink, {
    "data-test-subj": "ja3-fingerprint-link",
    href: "https://sslbl.abuse.ch/ja3-fingerprints/".concat(encodeURIComponent(ja3Fingerprint)),
    target: "_blank"
  }, children ? children : ja3Fingerprint);
});

exports.Ja3FingerprintLink = Ja3FingerprintLink;
Ja3FingerprintLink.displayName = 'Ja3FingerprintLink';

var CertificateFingerprintLink = _react.default.memo(function (_ref9) {
  var children = _ref9.children,
      certificateFingerprint = _ref9.certificateFingerprint;
  return _react.default.createElement(_eui.EuiLink, {
    "data-test-subj": "certificate-fingerprint-link",
    href: "https://sslbl.abuse.ch/ssl-certificates/sha1/".concat(encodeURIComponent(certificateFingerprint)),
    target: "_blank"
  }, children ? children : certificateFingerprint);
});

exports.CertificateFingerprintLink = CertificateFingerprintLink;
CertificateFingerprintLink.displayName = 'CertificateFingerprintLink';
var DefaultReputationLink;

(function (DefaultReputationLink) {
  DefaultReputationLink["virustotal.com"] = "virustotal.com";
  DefaultReputationLink["talosIntelligence.com"] = "talosIntelligence.com";
})(DefaultReputationLink || (DefaultReputationLink = {}));

function isDefaultReputationLink(name) {
  return name === DefaultReputationLink['virustotal.com'] || name === DefaultReputationLink['talosIntelligence.com'];
}

var isReputationLink = function isReputationLink(rowItem) {
  return rowItem.url_template !== undefined && rowItem.name !== undefined;
};

var Comma = (0, _styledComponents.default)('span').withConfig({
  displayName: "Comma",
  componentId: "njjdbs-0"
})(["margin-right:5px;margin-left:5px;&::after{content:' ,';}"]);
exports.Comma = Comma;
Comma.displayName = 'Comma';
var defaultNameMapping = (_defaultNameMapping = {}, _defineProperty(_defaultNameMapping, DefaultReputationLink['virustotal.com'], i18n.VIEW_VIRUS_TOTAL), _defineProperty(_defaultNameMapping, DefaultReputationLink['talosIntelligence.com'], i18n.VIEW_TALOS_INTELLIGENCE), _defaultNameMapping);

var ReputationLinkComponent = function ReputationLinkComponent(_ref10) {
  var _ref10$overflowIndexS = _ref10.overflowIndexStart,
      overflowIndexStart = _ref10$overflowIndexS === void 0 ? DEFAULT_NUMBER_OF_LINK : _ref10$overflowIndexS,
      _ref10$allItemsLimit = _ref10.allItemsLimit,
      allItemsLimit = _ref10$allItemsLimit === void 0 ? DEFAULT_NUMBER_OF_LINK : _ref10$allItemsLimit,
      _ref10$showDomain = _ref10.showDomain,
      showDomain = _ref10$showDomain === void 0 ? false : _ref10$showDomain,
      domain = _ref10.domain,
      _ref10$direction = _ref10.direction,
      direction = _ref10$direction === void 0 ? 'row' : _ref10$direction;

  var _useUiSetting$ = (0, _kibana.useUiSetting$)(_constants.IP_REPUTATION_LINKS_SETTING),
      _useUiSetting$2 = _slicedToArray(_useUiSetting$, 1),
      ipReputationLinksSetting = _useUiSetting$2[0];

  var ipReputationLinks = (0, _react.useMemo)(function () {
    return ipReputationLinksSetting === null || ipReputationLinksSetting === void 0 ? void 0 : ipReputationLinksSetting.slice(0, allItemsLimit).filter(function (_ref11) {
      var url_template = _ref11.url_template,
          name = _ref11.name;
      return !(0, _fp.isNil)(url_template) && !(0, _fp.isNil)(name) && !(0, _helpers2.isUrlInvalid)(url_template);
    }).map(function (_ref12) {
      var name = _ref12.name,
          url_template = _ref12.url_template;
      return {
        name: isDefaultReputationLink(name) ? defaultNameMapping[name] : name,
        url_template: url_template.replace("{{ip}}", encodeURIComponent(domain))
      };
    });
  }, [ipReputationLinksSetting, domain, defaultNameMapping, allItemsLimit]);
  return (ipReputationLinks === null || ipReputationLinks === void 0 ? void 0 : ipReputationLinks.length) > 0 ? _react.default.createElement("section", null, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "none",
    justifyContent: "center",
    direction: direction,
    alignItems: "center",
    "data-test-subj": "reputationLinkGroup"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: true
  }, ipReputationLinks === null || ipReputationLinks === void 0 ? void 0 : ipReputationLinks.slice(0, overflowIndexStart).map(function (_ref13, id) {
    var name = _ref13.name,
        urlTemplate = _ref13.url_template;
    return _react.default.createElement(ExternalLink, {
      allItemsLimit: ipReputationLinks.length,
      idx: id,
      overflowIndexStart: overflowIndexStart,
      url: urlTemplate,
      "data-test-subj": "externalLinkComponent",
      key: "reputationLink-".concat(id)
    }, _react.default.createElement(_react.default.Fragment, null, showDomain ? domain : name !== null && name !== void 0 ? name : domain));
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_field_renderers.DefaultFieldRendererOverflow, {
    rowItems: ipReputationLinks,
    idPrefix: "moreReputationLink",
    render: function render(rowItem) {
      var _rowItem$name;

      return isReputationLink(rowItem) && _react.default.createElement(ExternalLink, {
        url: rowItem.url_template,
        overflowIndexStart: overflowIndexStart,
        allItemsLimit: allItemsLimit
      }, _react.default.createElement(_react.default.Fragment, null, (_rowItem$name = rowItem.name) !== null && _rowItem$name !== void 0 ? _rowItem$name : domain));
    },
    moreMaxHeight: _field_renderers.DEFAULT_MORE_MAX_HEIGHT,
    overflowIndexStart: overflowIndexStart
  })))) : null;
};

ReputationLinkComponent.displayName = 'ReputationLinkComponent';

var ReputationLink = _react.default.memo(ReputationLinkComponent);

exports.ReputationLink = ReputationLink;

var WhoIsLink = _react.default.memo(function (_ref14) {
  var children = _ref14.children,
      domain = _ref14.domain;
  return _react.default.createElement(ExternalLink, {
    url: "https://www.iana.org/whois?q=".concat(encodeURIComponent(domain))
  }, children ? children : domain);
});

exports.WhoIsLink = WhoIsLink;
WhoIsLink.displayName = 'WhoIsLink';