"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deserializeFieldFormat = void 0;

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

var _date_range = require("../../search/aggs/buckets/lib/date_range");

var _ip_range = require("../../search/aggs/buckets/lib/ip_range");

var _common = require("../../../common");

var _services = require("../../../public/services");

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
function isTermsFieldFormat(serializedFieldFormat) {
  return serializedFieldFormat.id === 'terms';
}

var getConfig = function getConfig(key, defaultOverride) {
  return (0, _services.getUiSettings)().get(key, defaultOverride);
};

var DefaultFieldFormat = _common.FieldFormat.from(_lodash.identity);

var getFieldFormat = function getFieldFormat(fieldFormatsService, id) {
  var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (id) {
    var Format = fieldFormatsService.getType(id);

    if (Format) {
      return new Format(params, getConfig);
    }
  }

  return new DefaultFieldFormat();
};

var deserializeFieldFormat = function deserializeFieldFormat(mapping) {
  var _this = this;

  if (!mapping) {
    return new DefaultFieldFormat();
  }

  var id = mapping.id;

  if (id === 'range') {
    var RangeFormat = _common.FieldFormat.from(function (range) {
      var nestedFormatter = mapping.params;
      var format = getFieldFormat(_this, nestedFormatter.id, nestedFormatter.params);
      var gte = "\u2265";
      var lt = "<";
      return _i18n.i18n.translate('data.aggTypes.buckets.ranges.rangesFormatMessage', {
        defaultMessage: '{gte} {from} and {lt} {to}',
        values: {
          gte: gte,
          from: format.convert(range.gte),
          lt: lt,
          to: format.convert(range.lt)
        }
      });
    });

    return new RangeFormat();
  } else if (id === 'date_range') {
    var nestedFormatter = mapping.params;

    var DateRangeFormat = _common.FieldFormat.from(function (range) {
      var format = getFieldFormat(_this, nestedFormatter.id, nestedFormatter.params);
      return (0, _date_range.convertDateRangeToString)(range, format.convert.bind(format));
    });

    return new DateRangeFormat();
  } else if (id === 'ip_range') {
    var _nestedFormatter = mapping.params;

    var IpRangeFormat = _common.FieldFormat.from(function (range) {
      var format = getFieldFormat(_this, _nestedFormatter.id, _nestedFormatter.params);
      return (0, _ip_range.convertIPRangeToString)(range, format.convert.bind(format));
    });

    return new IpRangeFormat();
  } else if (isTermsFieldFormat(mapping) && mapping.params) {
    var params = mapping.params;

    var convert = function convert(val, type) {
      var format = getFieldFormat(_this, params.id, mapping.params);

      if (val === '__other__') {
        return params.otherBucketLabel;
      }

      if (val === '__missing__') {
        return params.missingBucketLabel;
      }

      return format.convert(val, type);
    };

    return {
      convert: convert,
      getConverterFor: function getConverterFor(type) {
        return function (val) {
          return convert(val, type);
        };
      }
    };
  } else {
    return getFieldFormat(this, id, mapping.params);
  }
};

exports.deserializeFieldFormat = deserializeFieldFormat;