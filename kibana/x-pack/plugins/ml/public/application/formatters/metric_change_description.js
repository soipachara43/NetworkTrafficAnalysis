"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMetricChangeDescription = getMetricChangeDescription;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/*
 * Produces a concise textual description of how the
 * actual value compares to the typical value for an anomaly.
 */
// Returns an Object containing a text message and EuiIcon type to
// describe how the actual value compares to the typical.
function getMetricChangeDescription(actualProp, typicalProp) {
  if (actualProp === undefined || typicalProp === undefined) {
    return {
      iconType: 'empty',
      message: ''
    };
  }

  var iconType = 'alert';
  var message; // For metric functions, actual and typical will be single value arrays.

  var actual = 0;
  var typical = 0;

  if (Array.isArray(actualProp)) {
    if (actualProp.length === 1) {
      actual = actualProp[0];
    } else {
      // lat_long anomalies currently the only multi-value case.
      // TODO - do we want to enhance the description depending on detector?
      // e.g. 'Unusual location' if using a lat_long detector.
      return {
        iconType: 'alert',
        message: _i18n.i18n.translate('xpack.ml.formatters.metricChangeDescription.unusualValuesDescription', {
          defaultMessage: 'Unusual values'
        })
      };
    }
  } else {
    actual = actualProp;
  }

  if (Array.isArray(typicalProp)) {
    if (typicalProp.length === 1) {
      typical = typicalProp[0];
    }
  } else {
    typical = typicalProp;
  }

  if (actual === typical) {
    // Very unlikely, but just in case.
    message = _i18n.i18n.translate('xpack.ml.formatters.metricChangeDescription.actualSameAsTypicalDescription', {
      defaultMessage: 'actual same as typical'
    });
  } else {
    // For actual / typical gives output of the form:
    // 4 / 2        2x higher
    // 2 / 10       5x lower
    // 1000 / 1     More than 100x higher
    // 999 / 1000   Unusually low
    // 100 / -100   Unusually high
    // 0 / 100      Unexpected zero value
    // 1 / 0        Unexpected non-zero value
    var isHigher = actual > typical;
    iconType = isHigher ? 'sortUp' : 'sortDown';

    if (typical !== 0 && actual !== 0) {
      var factor = isHigher ? actual / typical : typical / actual;

      if (factor > 1.5) {
        if (factor <= 100) {
          message = isHigher ? _i18n.i18n.translate('xpack.ml.formatters.metricChangeDescription.moreThanOneAndHalfxHigherDescription', {
            defaultMessage: '{factor}x higher',
            values: {
              factor: Math.round(factor)
            }
          }) : _i18n.i18n.translate('xpack.ml.formatters.metricChangeDescription.moreThanOneAndHalfxLowerDescription', {
            defaultMessage: '{factor}x lower',
            values: {
              factor: Math.round(factor)
            }
          });
        } else {
          message = isHigher ? _i18n.i18n.translate('xpack.ml.formatters.metricChangeDescription.moreThan100xHigherDescription', {
            defaultMessage: 'More than 100x higher'
          }) : _i18n.i18n.translate('xpack.ml.formatters.metricChangeDescription.moreThan100xLowerDescription', {
            defaultMessage: 'More than 100x lower'
          });
        }
      } else if (factor >= 1.05) {
        message = isHigher ? _i18n.i18n.translate('xpack.ml.formatters.metricChangeDescription.moreThanOneAndFiveHundredthsxHigherDescription', {
          defaultMessage: '{factor}x higher',
          values: {
            factor: factor.toPrecision(2)
          }
        }) : _i18n.i18n.translate('xpack.ml.formatters.metricChangeDescription.moreThanOneAndFiveHundredthsxLowerDescription', {
          defaultMessage: '{factor}x lower',
          values: {
            factor: factor.toPrecision(2)
          }
        });
      } else {
        message = isHigher ? _i18n.i18n.translate('xpack.ml.formatters.metricChangeDescription.unusuallyHighDescription', {
          defaultMessage: 'Unusually high'
        }) : _i18n.i18n.translate('xpack.ml.formatters.metricChangeDescription.unusuallyLowDescription', {
          defaultMessage: 'Unusually low'
        });
      }
    } else {
      if (actual === 0) {
        message = _i18n.i18n.translate('xpack.ml.formatters.metricChangeDescription.unexpectedZeroValueDescription', {
          defaultMessage: 'Unexpected zero value'
        });
      } else {
        message = _i18n.i18n.translate('xpack.ml.formatters.metricChangeDescription.unexpectedNonZeroValueDescription', {
          defaultMessage: 'Unexpected non-zero value'
        });
      }
    }
  }

  return {
    iconType: iconType,
    message: message
  };
}