"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildRuleTypeDescription = exports.buildNoteDescription = exports.buildUrlsDescription = exports.buildSeverityDescription = exports.buildStringArrayDescription = exports.buildUnorderedListArrayDescription = exports.buildThreatDescription = exports.buildQueryBarDescription = exports.isNotEmptyArray = void 0;

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _public = require("../../../../../../../../../../src/plugins/data/public");

var _mitre_tactics_techniques = require("../../../mitre/mitre_tactics_techniques");

var i18n = _interopRequireWildcard(require("./translations"));

var _severity_badge = require("../severity_badge");

var _list_tree_icon = _interopRequireDefault(require("./assets/list_tree_icon.svg"));

var _helpers = require("../../../../../lib/helpers");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var NoteDescriptionContainer = (0, _styledComponents.default)(_eui.EuiFlexItem).withConfig({
  displayName: "NoteDescriptionContainer",
  componentId: "cjtyka-0"
})(["height:105px;overflow-y:hidden;"]);

var isNotEmptyArray = function isNotEmptyArray(values) {
  return !(0, _fp.isEmpty)(values.join(''));
};

exports.isNotEmptyArray = isNotEmptyArray;
var EuiBadgeWrap = (0, _styledComponents.default)(_eui.EuiBadge).withConfig({
  displayName: "EuiBadgeWrap",
  componentId: "cjtyka-1"
})([".euiBadge__text{white-space:pre-wrap !important;}"]);

var buildQueryBarDescription = function buildQueryBarDescription(_ref) {
  var field = _ref.field,
      filters = _ref.filters,
      filterManager = _ref.filterManager,
      query = _ref.query,
      savedId = _ref.savedId,
      indexPatterns = _ref.indexPatterns;
  var items = [];

  if (!(0, _fp.isEmpty)(filters)) {
    filterManager.setFilters(filters);
    items = [].concat(_toConsumableArray(items), [{
      title: _react.default.createElement(_react.default.Fragment, null, i18n.FILTERS_LABEL, " "),
      description: _react.default.createElement(_eui.EuiFlexGroup, {
        wrap: true,
        responsive: false,
        gutterSize: "xs"
      }, filterManager.getFilters().map(function (filter, index) {
        return _react.default.createElement(_eui.EuiFlexItem, {
          grow: false,
          key: "".concat(field, "-filter-").concat(index)
        }, _react.default.createElement(EuiBadgeWrap, {
          color: "hollow"
        }, indexPatterns != null ? _react.default.createElement(_public.esFilters.FilterLabel, {
          filter: filter,
          valueLabel: _public.esFilters.getDisplayValueFromFilter(filter, [indexPatterns])
        }) : _react.default.createElement(_eui.EuiLoadingSpinner, {
          size: "m"
        })));
      }))
    }]);
  }

  if (!(0, _fp.isEmpty)(query)) {
    items = [].concat(_toConsumableArray(items), [{
      title: _react.default.createElement(_react.default.Fragment, null, i18n.QUERY_LABEL, " "),
      description: _react.default.createElement(_react.default.Fragment, null, query, " ")
    }]);
  }

  if (!(0, _fp.isEmpty)(savedId)) {
    items = [].concat(_toConsumableArray(items), [{
      title: _react.default.createElement(_react.default.Fragment, null, i18n.SAVED_ID_LABEL, " "),
      description: _react.default.createElement(_react.default.Fragment, null, savedId, " ")
    }]);
  }

  return items;
};

exports.buildQueryBarDescription = buildQueryBarDescription;
var ThreatEuiFlexGroup = (0, _styledComponents.default)(_eui.EuiFlexGroup).withConfig({
  displayName: "ThreatEuiFlexGroup",
  componentId: "cjtyka-2"
})([".euiFlexItem{margin-bottom:0px;}"]);
var TechniqueLinkItem = (0, _styledComponents.default)(_eui.EuiButtonEmpty).withConfig({
  displayName: "TechniqueLinkItem",
  componentId: "cjtyka-3"
})([".euiIcon{width:8px;height:8px;}"]);

var buildThreatDescription = function buildThreatDescription(_ref2) {
  var label = _ref2.label,
      threat = _ref2.threat;

  if (threat.length > 0) {
    return [{
      title: label,
      description: _react.default.createElement(ThreatEuiFlexGroup, {
        direction: "column"
      }, threat.map(function (singleThreat, index) {
        var tactic = _mitre_tactics_techniques.tacticsOptions.find(function (t) {
          return t.id === singleThreat.tactic.id;
        });

        return _react.default.createElement(_eui.EuiFlexItem, {
          key: "".concat(singleThreat.tactic.name, "-").concat(index)
        }, _react.default.createElement(_eui.EuiLink, {
          "data-test-subj": "threatTacticLink",
          href: singleThreat.tactic.reference,
          target: "_blank"
        }, tactic != null ? tactic.text : ''), _react.default.createElement(_eui.EuiFlexGroup, {
          gutterSize: "none",
          alignItems: "flexStart",
          direction: "column"
        }, singleThreat.technique.map(function (technique) {
          var myTechnique = _mitre_tactics_techniques.techniquesOptions.find(function (t) {
            return t.id === technique.id;
          });

          return _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(TechniqueLinkItem, {
            "data-test-subj": "threatTechniqueLink",
            href: technique.reference,
            target: "_blank",
            iconType: _list_tree_icon.default,
            size: "xs",
            flush: "left"
          }, myTechnique != null ? myTechnique.label : ''));
        })));
      }), _react.default.createElement(_eui.EuiSpacer, null))
    }];
  }

  return [];
};

exports.buildThreatDescription = buildThreatDescription;

var buildUnorderedListArrayDescription = function buildUnorderedListArrayDescription(label, field, values) {
  if (isNotEmptyArray(values)) {
    return [{
      title: label,
      description: _react.default.createElement(_eui.EuiText, {
        size: "s"
      }, _react.default.createElement("ul", null, values.map(function (val) {
        return (0, _fp.isEmpty)(val) ? null : _react.default.createElement("li", {
          "data-test-subj": "unorderedListArrayDescriptionItem",
          key: "".concat(field, "-").concat(val)
        }, val);
      })))
    }];
  }

  return [];
};

exports.buildUnorderedListArrayDescription = buildUnorderedListArrayDescription;

var buildStringArrayDescription = function buildStringArrayDescription(label, field, values) {
  if (isNotEmptyArray(values)) {
    return [{
      title: label,
      description: _react.default.createElement(_eui.EuiFlexGroup, {
        responsive: false,
        gutterSize: "xs",
        wrap: true
      }, values.map(function (val) {
        return (0, _fp.isEmpty)(val) ? null : _react.default.createElement(_eui.EuiFlexItem, {
          grow: false,
          key: "".concat(field, "-").concat(val)
        }, _react.default.createElement(EuiBadgeWrap, {
          "data-test-subj": "stringArrayDescriptionBadgeItem",
          color: "hollow"
        }, val));
      }))
    }];
  }

  return [];
};

exports.buildStringArrayDescription = buildStringArrayDescription;

var buildSeverityDescription = function buildSeverityDescription(label, value) {
  return [{
    title: label,
    description: _react.default.createElement(_severity_badge.SeverityBadge, {
      value: value
    })
  }];
};

exports.buildSeverityDescription = buildSeverityDescription;

var buildUrlsDescription = function buildUrlsDescription(label, values) {
  if (isNotEmptyArray(values)) {
    return [{
      title: label,
      description: _react.default.createElement(_eui.EuiText, {
        size: "s"
      }, _react.default.createElement("ul", null, values.filter(function (v) {
        return !(0, _fp.isEmpty)(v);
      }).map(function (val, index) {
        return _react.default.createElement("li", {
          "data-test-subj": "urlsDescriptionReferenceLinkItem",
          key: "".concat(index, "-").concat(val)
        }, _react.default.createElement(_eui.EuiLink, {
          href: val,
          external: true,
          target: "_blank"
        }, val));
      })))
    }];
  }

  return [];
};

exports.buildUrlsDescription = buildUrlsDescription;

var buildNoteDescription = function buildNoteDescription(label, note) {
  if (note.trim() !== '') {
    return [{
      title: label,
      description: _react.default.createElement(NoteDescriptionContainer, null, _react.default.createElement("div", {
        "data-test-subj": "noteDescriptionItem",
        className: "eui-yScrollWithShadows"
      }, note))
    }];
  }

  return [];
};

exports.buildNoteDescription = buildNoteDescription;

var buildRuleTypeDescription = function buildRuleTypeDescription(label, ruleType) {
  switch (ruleType) {
    case 'machine_learning':
      {
        return [{
          title: label,
          description: i18n.ML_TYPE_DESCRIPTION
        }];
      }

    case 'query':
    case 'saved_query':
      {
        return [{
          title: label,
          description: i18n.QUERY_TYPE_DESCRIPTION
        }];
      }

    default:
      return (0, _helpers.assertUnreachable)(ruleType);
  }
};

exports.buildRuleTypeDescription = buildRuleTypeDescription;