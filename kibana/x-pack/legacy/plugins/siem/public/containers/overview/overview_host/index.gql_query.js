"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.overviewHostQuery = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  query GetOverviewHostQuery(\n    $sourceId: ID!\n    $timerange: TimerangeInput!\n    $filterQuery: String\n    $defaultIndex: [String!]!\n    $inspect: Boolean!\n  ) {\n    source(id: $sourceId) {\n      id\n      OverviewHost(timerange: $timerange, filterQuery: $filterQuery, defaultIndex: $defaultIndex) {\n        auditbeatAuditd\n        auditbeatFIM\n        auditbeatLogin\n        auditbeatPackage\n        auditbeatProcess\n        auditbeatUser\n        endgameDns\n        endgameFile\n        endgameImageLoad\n        endgameNetwork\n        endgameProcess\n        endgameRegistry\n        endgameSecurity\n        filebeatSystemModule\n        winlogbeatSecurity\n        winlogbeatMWSysmonOperational\n        inspect @include(if: $inspect) {\n          dsl\n          response\n        }\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var overviewHostQuery = (0, _graphqlTag.default)(_templateObject());
exports.overviewHostQuery = overviewHostQuery;