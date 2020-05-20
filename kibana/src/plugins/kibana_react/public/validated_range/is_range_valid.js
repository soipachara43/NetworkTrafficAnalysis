"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isRangeValid = isRangeValid;

var _i18n = require("@kbn/i18n");

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
var LOWER_VALUE_INDEX = 0;
var UPPER_VALUE_INDEX = 1;

function isRangeValid() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [0, 0];
  var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var allowEmptyRange = arguments.length > 3 ? arguments[3] : undefined;
  allowEmptyRange = typeof allowEmptyRange === 'boolean' ? allowEmptyRange : true; // cannot use default props since that uses falsy check

  var lowerValue = isNaN(value[LOWER_VALUE_INDEX]) ? '' : "".concat(value[LOWER_VALUE_INDEX]);
  var upperValue = isNaN(value[UPPER_VALUE_INDEX]) ? '' : "".concat(value[UPPER_VALUE_INDEX]);
  var isLowerValueValid = lowerValue.toString() !== '';
  var isUpperValueValid = upperValue.toString() !== '';

  if (isLowerValueValid) {
    lowerValue = parseFloat(lowerValue);
  }

  if (isUpperValueValid) {
    upperValue = parseFloat(upperValue);
  }

  var isValid = true;
  var errorMessage = '';

  var bothMustBeSetErrorMessage = _i18n.i18n.translate('kibana-react.dualRangeControl.mustSetBothErrorMessage', {
    defaultMessage: 'Both lower and upper values must be set'
  });

  if (!allowEmptyRange && (!isLowerValueValid || !isUpperValueValid)) {
    isValid = false;
    errorMessage = bothMustBeSetErrorMessage;
  } else if (!isLowerValueValid && isUpperValueValid || isLowerValueValid && !isUpperValueValid) {
    isValid = false;
    errorMessage = bothMustBeSetErrorMessage;
  } else if (isLowerValueValid && lowerValue < min || isUpperValueValid && upperValue > max) {
    isValid = false;
    errorMessage = _i18n.i18n.translate('kibana-react.dualRangeControl.outsideOfRangeErrorMessage', {
      defaultMessage: 'Values must be on or between {min} and {max}',
      values: {
        min: min,
        max: max
      }
    });
  } else if (isLowerValueValid && isUpperValueValid && upperValue < lowerValue) {
    isValid = false;
    errorMessage = _i18n.i18n.translate('kibana-react.dualRangeControl.upperValidErrorMessage', {
      defaultMessage: 'Upper value must be greater or equal to lower value'
    });
  }

  return {
    isValid: isValid,
    errorMessage: errorMessage
  };
}