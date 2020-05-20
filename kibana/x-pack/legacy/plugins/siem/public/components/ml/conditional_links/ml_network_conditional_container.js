"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MlNetworkConditionalContainer = void 0;

var _queryString = require("query-string");

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _add_entities_to_kql = require("./add_entities_to_kql");

var _replace_kql_parts = require("./replace_kql_parts");

var _entity_helpers = require("./entity_helpers");

var _types = require("../../../pages/home/types");

var _public = require("../../../../../../../../src/plugins/kibana_utils/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var MlNetworkConditionalContainer = _react.default.memo(function (_ref) {
  var url = _ref.url;
  return _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
    strict: true,
    exact: true,
    path: url,
    render: function render(_ref2) {
      var location = _ref2.location;
      var queryStringDecoded = (0, _queryString.parse)(location.search.substring(1), {
        sort: false
      });

      if (queryStringDecoded.query != null) {
        queryStringDecoded.query = (0, _replace_kql_parts.replaceKQLParts)(queryStringDecoded.query);
      }

      var reEncoded = (0, _queryString.stringify)(_public.url.encodeQuery(queryStringDecoded), {
        sort: false,
        encode: false
      });
      return _react.default.createElement(_reactRouterDom.Redirect, {
        to: "/".concat(_types.SiemPageName.network, "?").concat(reEncoded)
      });
    }
  }), _react.default.createElement(_reactRouterDom.Route, {
    path: "".concat(url, "/ip/:ip"),
    render: function render(_ref3) {
      var location = _ref3.location,
          ip = _ref3.match.params.ip;
      var queryStringDecoded = (0, _queryString.parse)(location.search.substring(1), {
        sort: false
      });

      if (queryStringDecoded.query != null) {
        queryStringDecoded.query = (0, _replace_kql_parts.replaceKQLParts)(queryStringDecoded.query);
      }

      if ((0, _entity_helpers.emptyEntity)(ip)) {
        var reEncoded = (0, _queryString.stringify)(_public.url.encodeQuery(queryStringDecoded), {
          sort: false,
          encode: false
        });
        return _react.default.createElement(_reactRouterDom.Redirect, {
          to: "/".concat(_types.SiemPageName.network, "?").concat(reEncoded)
        });
      } else if ((0, _entity_helpers.multipleEntities)(ip)) {
        var ips = (0, _entity_helpers.getMultipleEntities)(ip);
        queryStringDecoded.query = (0, _add_entities_to_kql.addEntitiesToKql)(['source.ip', 'destination.ip'], ips, queryStringDecoded.query || '');

        var _reEncoded = (0, _queryString.stringify)(_public.url.encodeQuery(queryStringDecoded), {
          sort: false,
          encode: false
        });

        return _react.default.createElement(_reactRouterDom.Redirect, {
          to: "/".concat(_types.SiemPageName.network, "?").concat(_reEncoded)
        });
      } else {
        var _reEncoded2 = (0, _queryString.stringify)(_public.url.encodeQuery(queryStringDecoded), {
          sort: false,
          encode: false
        });

        return _react.default.createElement(_reactRouterDom.Redirect, {
          to: "/".concat(_types.SiemPageName.network, "/ip/").concat(ip, "?").concat(_reEncoded2)
        });
      }
    }
  }), _react.default.createElement(_reactRouterDom.Route, {
    path: "/ml-network/",
    render: function render(_ref4) {
      var _ref4$location$search = _ref4.location.search,
          search = _ref4$location$search === void 0 ? '' : _ref4$location$search;
      return _react.default.createElement(_reactRouterDom.Redirect, {
        from: "/ml-network/",
        to: "/ml-network".concat(search)
      });
    }
  }));
});

exports.MlNetworkConditionalContainer = MlNetworkConditionalContainer;
MlNetworkConditionalContainer.displayName = 'MlNetworkConditionalContainer';