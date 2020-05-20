"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNetworkResolvers = void 0;

var _create_options = require("../../utils/build_query/create_options");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createNetworkResolvers = libs => ({
  Source: {
    async NetworkTopCountries(source, args, {
      req
    }, info) {
      const options = { ...(0, _create_options.createOptionsPaginated)(source, args, info),
        flowTarget: args.flowTarget,
        networkTopCountriesSort: args.sort,
        ip: args.ip
      };
      return libs.network.getNetworkTopCountries(req, options);
    },

    async NetworkTopNFlow(source, args, {
      req
    }, info) {
      const options = { ...(0, _create_options.createOptionsPaginated)(source, args, info),
        flowTarget: args.flowTarget,
        networkTopNFlowSort: args.sort,
        ip: args.ip
      };
      return libs.network.getNetworkTopNFlow(req, options);
    },

    async NetworkHttp(source, args, {
      req
    }, info) {
      const options = { ...(0, _create_options.createOptionsPaginated)(source, args, info),
        networkHttpSort: args.sort,
        ip: args.ip
      };
      return libs.network.getNetworkHttp(req, options);
    },

    async NetworkDns(source, args, {
      req
    }, info) {
      const options = { ...(0, _create_options.createOptionsPaginated)(source, args, info),
        networkDnsSortField: args.sort,
        isPtrIncluded: args.isPtrIncluded
      };
      return libs.network.getNetworkDns(req, options);
    }

  }
});

exports.createNetworkResolvers = createNetworkResolvers;