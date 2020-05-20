"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAxisModes = exports.getChartModes = exports.getChartTypes = exports.getInterpolationModes = exports.getScaleTypes = exports.getRotateOptions = exports.getPositions = exports.getHeatmapCollections = exports.getGaugeCollections = exports.getConfigCollections = exports.Alignments = exports.ColorModes = exports.GaugeTypes = exports.ThresholdLineStyles = exports.Rotates = exports.AxisModes = exports.ScaleTypes = exports.AxisTypes = exports.InterpolationModes = exports.ChartModes = exports.ChartTypes = exports.Positions = void 0;

var _i18n = require("@kbn/i18n");

var _public = require("../../../../../plugins/charts/public");

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
var Positions = Object.freeze({
  RIGHT: 'right',
  LEFT: 'left',
  TOP: 'top',
  BOTTOM: 'bottom'
});
exports.Positions = Positions;

var getPositions = function getPositions() {
  return [{
    text: _i18n.i18n.translate('visTypeVislib.legendPositions.topText', {
      defaultMessage: 'Top'
    }),
    value: Positions.TOP
  }, {
    text: _i18n.i18n.translate('visTypeVislib.legendPositions.leftText', {
      defaultMessage: 'Left'
    }),
    value: Positions.LEFT
  }, {
    text: _i18n.i18n.translate('visTypeVislib.legendPositions.rightText', {
      defaultMessage: 'Right'
    }),
    value: Positions.RIGHT
  }, {
    text: _i18n.i18n.translate('visTypeVislib.legendPositions.bottomText', {
      defaultMessage: 'Bottom'
    }),
    value: Positions.BOTTOM
  }];
};

exports.getPositions = getPositions;
var ChartTypes = Object.freeze({
  LINE: 'line',
  AREA: 'area',
  HISTOGRAM: 'histogram'
});
exports.ChartTypes = ChartTypes;

var getChartTypes = function getChartTypes() {
  return [{
    text: _i18n.i18n.translate('visTypeVislib.chartTypes.lineText', {
      defaultMessage: 'Line'
    }),
    value: ChartTypes.LINE
  }, {
    text: _i18n.i18n.translate('visTypeVislib.chartTypes.areaText', {
      defaultMessage: 'Area'
    }),
    value: ChartTypes.AREA
  }, {
    text: _i18n.i18n.translate('visTypeVislib.chartTypes.barText', {
      defaultMessage: 'Bar'
    }),
    value: ChartTypes.HISTOGRAM
  }];
};

exports.getChartTypes = getChartTypes;
var ChartModes = Object.freeze({
  NORMAL: 'normal',
  STACKED: 'stacked'
});
exports.ChartModes = ChartModes;

var getChartModes = function getChartModes() {
  return [{
    text: _i18n.i18n.translate('visTypeVislib.chartModes.normalText', {
      defaultMessage: 'Normal'
    }),
    value: ChartModes.NORMAL
  }, {
    text: _i18n.i18n.translate('visTypeVislib.chartModes.stackedText', {
      defaultMessage: 'Stacked'
    }),
    value: ChartModes.STACKED
  }];
};

exports.getChartModes = getChartModes;
var InterpolationModes = Object.freeze({
  LINEAR: 'linear',
  CARDINAL: 'cardinal',
  STEP_AFTER: 'step-after'
});
exports.InterpolationModes = InterpolationModes;

var getInterpolationModes = function getInterpolationModes() {
  return [{
    text: _i18n.i18n.translate('visTypeVislib.interpolationModes.straightText', {
      defaultMessage: 'Straight'
    }),
    value: InterpolationModes.LINEAR
  }, {
    text: _i18n.i18n.translate('visTypeVislib.interpolationModes.smoothedText', {
      defaultMessage: 'Smoothed'
    }),
    value: InterpolationModes.CARDINAL
  }, {
    text: _i18n.i18n.translate('visTypeVislib.interpolationModes.steppedText', {
      defaultMessage: 'Stepped'
    }),
    value: InterpolationModes.STEP_AFTER
  }];
};

exports.getInterpolationModes = getInterpolationModes;
var AxisTypes = Object.freeze({
  CATEGORY: 'category',
  VALUE: 'value'
});
exports.AxisTypes = AxisTypes;
var ScaleTypes = Object.freeze({
  LINEAR: 'linear',
  LOG: 'log',
  SQUARE_ROOT: 'square root'
});
exports.ScaleTypes = ScaleTypes;

var getScaleTypes = function getScaleTypes() {
  return [{
    text: _i18n.i18n.translate('visTypeVislib.scaleTypes.linearText', {
      defaultMessage: 'Linear'
    }),
    value: ScaleTypes.LINEAR
  }, {
    text: _i18n.i18n.translate('visTypeVislib.scaleTypes.logText', {
      defaultMessage: 'Log'
    }),
    value: ScaleTypes.LOG
  }, {
    text: _i18n.i18n.translate('visTypeVislib.scaleTypes.squareRootText', {
      defaultMessage: 'Square root'
    }),
    value: ScaleTypes.SQUARE_ROOT
  }];
};

exports.getScaleTypes = getScaleTypes;
var AxisModes = Object.freeze({
  NORMAL: 'normal',
  PERCENTAGE: 'percentage',
  WIGGLE: 'wiggle',
  SILHOUETTE: 'silhouette'
});
exports.AxisModes = AxisModes;

var getAxisModes = function getAxisModes() {
  return [{
    text: _i18n.i18n.translate('visTypeVislib.axisModes.normalText', {
      defaultMessage: 'Normal'
    }),
    value: AxisModes.NORMAL
  }, {
    text: _i18n.i18n.translate('visTypeVislib.axisModes.percentageText', {
      defaultMessage: 'Percentage'
    }),
    value: AxisModes.PERCENTAGE
  }, {
    text: _i18n.i18n.translate('visTypeVislib.axisModes.wiggleText', {
      defaultMessage: 'Wiggle'
    }),
    value: AxisModes.WIGGLE
  }, {
    text: _i18n.i18n.translate('visTypeVislib.axisModes.silhouetteText', {
      defaultMessage: 'Silhouette'
    }),
    value: AxisModes.SILHOUETTE
  }];
};

exports.getAxisModes = getAxisModes;
var Rotates = Object.freeze({
  HORIZONTAL: 0,
  VERTICAL: 90,
  ANGLED: 75
});
exports.Rotates = Rotates;
var ThresholdLineStyles = Object.freeze({
  FULL: 'full',
  DASHED: 'dashed',
  DOT_DASHED: 'dot-dashed'
});
exports.ThresholdLineStyles = ThresholdLineStyles;

var getThresholdLineStyles = function getThresholdLineStyles() {
  return [{
    value: ThresholdLineStyles.FULL,
    text: _i18n.i18n.translate('visTypeVislib.thresholdLine.style.fullText', {
      defaultMessage: 'Full'
    })
  }, {
    value: ThresholdLineStyles.DASHED,
    text: _i18n.i18n.translate('visTypeVislib.thresholdLine.style.dashedText', {
      defaultMessage: 'Dashed'
    })
  }, {
    value: ThresholdLineStyles.DOT_DASHED,
    text: _i18n.i18n.translate('visTypeVislib.thresholdLine.style.dotdashedText', {
      defaultMessage: 'Dot-dashed'
    })
  }];
};

var getRotateOptions = function getRotateOptions() {
  return [{
    text: _i18n.i18n.translate('visTypeVislib.categoryAxis.rotate.horizontalText', {
      defaultMessage: 'Horizontal'
    }),
    value: Rotates.HORIZONTAL
  }, {
    text: _i18n.i18n.translate('visTypeVislib.categoryAxis.rotate.verticalText', {
      defaultMessage: 'Vertical'
    }),
    value: Rotates.VERTICAL
  }, {
    text: _i18n.i18n.translate('visTypeVislib.categoryAxis.rotate.angledText', {
      defaultMessage: 'Angled'
    }),
    value: Rotates.ANGLED
  }];
};

exports.getRotateOptions = getRotateOptions;
var GaugeTypes = Object.freeze({
  ARC: 'Arc',
  CIRCLE: 'Circle'
});
exports.GaugeTypes = GaugeTypes;
var ColorModes = Object.freeze({
  BACKGROUND: 'Background',
  LABELS: 'Labels',
  NONE: 'None'
});
exports.ColorModes = ColorModes;

var getGaugeTypes = function getGaugeTypes() {
  return [{
    text: _i18n.i18n.translate('visTypeVislib.gauge.gaugeTypes.arcText', {
      defaultMessage: 'Arc'
    }),
    value: GaugeTypes.ARC
  }, {
    text: _i18n.i18n.translate('visTypeVislib.gauge.gaugeTypes.circleText', {
      defaultMessage: 'Circle'
    }),
    value: GaugeTypes.CIRCLE
  }];
};

var Alignments = Object.freeze({
  AUTOMATIC: 'automatic',
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical'
});
exports.Alignments = Alignments;

var getAlignments = function getAlignments() {
  return [{
    text: _i18n.i18n.translate('visTypeVislib.gauge.alignmentAutomaticTitle', {
      defaultMessage: 'Automatic'
    }),
    value: Alignments.AUTOMATIC
  }, {
    text: _i18n.i18n.translate('visTypeVislib.gauge.alignmentHorizontalTitle', {
      defaultMessage: 'Horizontal'
    }),
    value: Alignments.HORIZONTAL
  }, {
    text: _i18n.i18n.translate('visTypeVislib.gauge.alignmentVerticalTitle', {
      defaultMessage: 'Vertical'
    }),
    value: Alignments.VERTICAL
  }];
};

var getConfigCollections = function getConfigCollections() {
  return {
    legendPositions: getPositions(),
    positions: getPositions(),
    chartTypes: getChartTypes(),
    axisModes: getAxisModes(),
    scaleTypes: getScaleTypes(),
    chartModes: getChartModes(),
    interpolationModes: getInterpolationModes(),
    thresholdLineStyles: getThresholdLineStyles()
  };
};

exports.getConfigCollections = getConfigCollections;

var getGaugeCollections = function getGaugeCollections() {
  return {
    gaugeTypes: getGaugeTypes(),
    alignments: getAlignments(),
    colorSchemas: _public.colorSchemas
  };
};

exports.getGaugeCollections = getGaugeCollections;

var getHeatmapCollections = function getHeatmapCollections() {
  return {
    legendPositions: getPositions(),
    scales: getScaleTypes(),
    colorSchemas: _public.colorSchemas
  };
};

exports.getHeatmapCollections = getHeatmapCollections;