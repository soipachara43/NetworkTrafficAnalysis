"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEsValueResolvers = exports.createEventsResolvers = void 0;

var _graphql = require("graphql");

var _create_options = require("../../utils/build_query/create_options");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createEventsResolvers = libs => ({
  Source: {
    async Timeline(source, args, {
      req
    }, info) {
      const options = (0, _create_options.createOptions)(source, args, info, 'edges.node.ecs.');
      return libs.events.getTimelineData(req, { ...options,
        fieldRequested: args.fieldRequested
      });
    },

    async TimelineDetails(source, args, {
      req
    }) {
      return libs.events.getTimelineDetails(req, {
        indexName: args.indexName,
        eventId: args.eventId,
        defaultIndex: args.defaultIndex
      });
    },

    async LastEventTime(source, args, {
      req
    }) {
      const options = {
        defaultIndex: args.defaultIndex,
        sourceConfiguration: source.configuration,
        indexKey: args.indexKey,
        details: args.details
      };
      return libs.events.getLastEventTimeData(req, options);
    }

  }
});
/*
 *  serialize: gets invoked when serializing the result to send it back to a client.
 *
 *  parseValue: gets invoked to parse client input that was passed through variables.
 *
 *  parseLiteral: gets invoked to parse client input that was passed inline in the query.
 */


exports.createEventsResolvers = createEventsResolvers;
const esValueScalar = new _graphql.GraphQLScalarType({
  name: 'DetailItemValue',
  description: 'Represents value in detail item from the timeline who wants to more than one type',

  serialize(value) {
    return value;
  },

  parseValue(value) {
    return value;
  },

  parseLiteral(ast) {
    switch (ast.kind) {
      case _graphql.Kind.INT:
        return parseInt(ast.value, 10);

      case _graphql.Kind.FLOAT:
        return parseFloat(ast.value);

      case _graphql.Kind.STRING:
        return ast.value;

      case _graphql.Kind.LIST:
        return ast.values;

      case _graphql.Kind.OBJECT:
        return ast.fields;
    }

    return null;
  }

});

const createEsValueResolvers = () => ({
  EsValue: esValueScalar
});

exports.createEsValueResolvers = createEsValueResolvers;