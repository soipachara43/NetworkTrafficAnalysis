"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.overviewNetworkQuery = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  query GetOverviewNetworkQuery(\n    $sourceId: ID!\n    $timerange: TimerangeInput!\n    $filterQuery: String\n    $defaultIndex: [String!]!\n    $inspect: Boolean!\n  ) {\n    source(id: $sourceId) {\n      id\n      OverviewNetwork(\n        timerange: $timerange\n        filterQuery: $filterQuery\n        defaultIndex: $defaultIndex\n      ) {\n        auditbeatSocket\n        filebeatCisco\n        filebeatNetflow\n        filebeatPanw\n        filebeatSuricata\n        filebeatZeek\n        packetbeatDNS\n        packetbeatFlow\n        packetbeatTLS\n        inspect @include(if: $inspect) {\n          dsl\n          response\n        }\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var overviewNetworkQuery = (0, _graphqlTag.default)(_templateObject());
exports.overviewNetworkQuery = overviewNetworkQuery;