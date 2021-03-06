"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getParametersFormForType = void 0;

var _alias_type = require("./alias_type");

var _keyword_type = require("./keyword_type");

var _numeric_type = require("./numeric_type");

var _text_type = require("./text_type");

var _boolean_type = require("./boolean_type");

var _binary_type = require("./binary_type");

var _range_type = require("./range_type");

var _ip_type = require("./ip_type");

var _token_count_type = require("./token_count_type");

var _completion_type = require("./completion_type");

var _geo_point_type = require("./geo_point_type");

var _date_type = require("./date_type");

var _geo_shape_type = require("./geo_shape_type");

var _search_as_you_type = require("./search_as_you_type");

var _flattened_type = require("./flattened_type");

var _shape_type = require("./shape_type");

var _dense_vector_type = require("./dense_vector_type");

var _object_type = require("./object_type");

var _other_type = require("./other_type");

var _nested_type = require("./nested_type");

var _join_type = require("./join_type");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var typeToParametersFormMap = {
  alias: _alias_type.AliasType,
  keyword: _keyword_type.KeywordType,
  numeric: _numeric_type.NumericType,
  text: _text_type.TextType,
  boolean: _boolean_type.BooleanType,
  binary: _binary_type.BinaryType,
  range: _range_type.RangeType,
  ip: _ip_type.IpType,
  token_count: _token_count_type.TokenCountType,
  completion: _completion_type.CompletionType,
  geo_point: _geo_point_type.GeoPointType,
  date: _date_type.DateType,
  date_nanos: _date_type.DateType,
  geo_shape: _geo_shape_type.GeoShapeType,
  search_as_you_type: _search_as_you_type.SearchAsYouType,
  flattened: _flattened_type.FlattenedType,
  shape: _shape_type.ShapeType,
  dense_vector: _dense_vector_type.DenseVectorType,
  object: _object_type.ObjectType,
  other: _other_type.OtherType,
  nested: _nested_type.NestedType,
  join: _join_type.JoinType
};

var getParametersFormForType = function getParametersFormForType(type, subType) {
  return subType === undefined ? typeToParametersFormMap[type] : typeToParametersFormMap[subType] || typeToParametersFormMap[type];
};

exports.getParametersFormForType = getParametersFormForType;