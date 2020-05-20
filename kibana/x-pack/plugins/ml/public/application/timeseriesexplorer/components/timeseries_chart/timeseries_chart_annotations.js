"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAnnotationBrush = getAnnotationBrush;
exports.getAnnotationLevels = getAnnotationLevels;
exports.renderAnnotations = renderAnnotations;
exports.getAnnotationWidth = getAnnotationWidth;
exports.highlightFocusChartAnnotation = highlightFocusChartAnnotation;
exports.unhighlightFocusChartAnnotation = unhighlightFocusChartAnnotation;
exports.ANNOTATION_MASK_ID = void 0;

var _d = _interopRequireDefault(require("d3"));

var _moment = _interopRequireDefault(require("moment"));

var _annotations = require("../../../../../common/constants/annotations");

var _chart_tooltip_service = require("../../../components/chart_tooltip/chart_tooltip_service");

var _annotations_service = require("../../../services/annotations_service");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
var ANNOTATION_MASK_ID = 'mlAnnotationMask'; // getAnnotationBrush() is expected to be called like getAnnotationBrush.call(this)
// so it gets passed on the context of the component it gets called from.

exports.ANNOTATION_MASK_ID = ANNOTATION_MASK_ID;

function getAnnotationBrush() {
  var focusXScale = this.focusXScale;

  var annotateBrush = _d.default.svg.brush().x(focusXScale).on('brushend', brushend.bind(this)); // cast a reference to this so we get the latest state when brushend() gets called


  function brushend() {
    var selectedJob = this.props.selectedJob; // TS TODO make this work with the actual types.

    var extent = annotateBrush.extent();
    var timestamp = extent[0].getTime();
    var endTimestamp = extent[1].getTime();

    if (timestamp === endTimestamp) {
      _annotations_service.annotation$.next(null);

      return;
    }

    var annotation = {
      timestamp: timestamp,
      end_timestamp: endTimestamp,
      annotation: '',
      job_id: selectedJob.job_id,
      type: _annotations.ANNOTATION_TYPE.ANNOTATION
    };

    _annotations_service.annotation$.next(annotation);
  }

  return annotateBrush;
} // Used to resolve overlapping annotations in the UI.
// The returned levels can be used to create a vertical offset.


function getAnnotationLevels(focusAnnotationData) {
  var levels = {};
  focusAnnotationData.forEach(function (d, i) {
    if (d.key !== undefined) {
      var longerAnnotations = focusAnnotationData.filter(function (d2, i2) {
        return i2 < i;
      });
      levels[d.key] = longerAnnotations.reduce(function (level, d2) {
        // For now we only support overlap removal for annotations which have both
        // `timestamp` and `end_timestamp` set.
        if (d.end_timestamp === undefined || d2.end_timestamp === undefined || d2.key === undefined) {
          return level;
        }

        if ( // d2 is completely before d
        d2.timestamp < d.timestamp && d2.end_timestamp < d.timestamp || // d2 is completely after d
        d2.timestamp > d.end_timestamp && d2.end_timestamp > d.end_timestamp) {
          return level;
        }

        return levels[d2.key] + 1;
      }, 0);
    }
  });
  return levels;
}

var ANNOTATION_DEFAULT_LEVEL = 1;
var ANNOTATION_LEVEL_HEIGHT = 28;
var ANNOTATION_UPPER_RECT_MARGIN = 0;
var ANNOTATION_UPPER_TEXT_MARGIN = -7;
var ANNOTATION_MIN_WIDTH = 2;
var ANNOTATION_RECT_BORDER_RADIUS = 2;
var ANNOTATION_TEXT_VERTICAL_OFFSET = 26;
var ANNOTATION_TEXT_RECT_VERTICAL_OFFSET = 12;
var ANNOTATION_TEXT_RECT_WIDTH = 24;
var ANNOTATION_TEXT_RECT_HEIGHT = 20;

function renderAnnotations(focusChart, focusAnnotationData, focusZoomPanelHeight, focusChartHeight, focusXScale, showAnnotations, showFocusChartTooltip) {
  var upperRectMargin = ANNOTATION_UPPER_RECT_MARGIN;
  var upperTextMargin = ANNOTATION_UPPER_TEXT_MARGIN;
  var durations = {};
  focusAnnotationData.forEach(function (d) {
    if (d.key !== undefined) {
      var duration = (d.end_timestamp || 0) - d.timestamp;
      durations[d.key] = duration;
    }
  }); // sort by duration

  focusAnnotationData.sort(function (a, b) {
    if (a.key === undefined || b.key === undefined) {
      return 0;
    }

    return durations[b.key] - durations[a.key];
  });
  var levelHeight = ANNOTATION_LEVEL_HEIGHT;
  var levels = getAnnotationLevels(focusAnnotationData);
  var annotations = focusChart.select('.mlAnnotations').selectAll('g.mlAnnotation').data(focusAnnotationData || [], function (d) {
    return d._id || '';
  });
  annotations.enter().append('g').classed('mlAnnotation', true);
  var rects = annotations.selectAll('.mlAnnotationRect').data(function (d) {
    return [d];
  });
  rects.enter().append('rect').attr('rx', ANNOTATION_RECT_BORDER_RADIUS).attr('ry', ANNOTATION_RECT_BORDER_RADIUS).classed('mlAnnotationRect', true).attr('mask', "url(#".concat(ANNOTATION_MASK_ID, ")")).on('mouseover', function (d) {
    showFocusChartTooltip(d, this);
  }).on('mouseout', function () {
    return _chart_tooltip_service.mlChartTooltipService.hide();
  }).on('click', function (d) {
    // clear a possible existing annotation set up for editing before setting the new one.
    // this needs to be done explicitly here because a new annotation created using the brush tool
    // could still be present in the chart.
    _annotations_service.annotation$.next(null); // set the actual annotation and trigger the flyout


    _annotations_service.annotation$.next(d);
  });
  rects.attr('x', function (d) {
    var date = (0, _moment.default)(d.timestamp);
    return focusXScale(date);
  }).attr('y', function (d) {
    var level = d.key !== undefined ? levels[d.key] : ANNOTATION_DEFAULT_LEVEL;
    return focusZoomPanelHeight + 1 + upperRectMargin + level * levelHeight;
  }).attr('height', function (d) {
    var level = d.key !== undefined ? levels[d.key] : ANNOTATION_DEFAULT_LEVEL;
    return focusChartHeight - 2 - upperRectMargin - level * levelHeight;
  }).attr('width', function (d) {
    var s = focusXScale((0, _moment.default)(d.timestamp)) + 1;
    var e = typeof d.end_timestamp !== 'undefined' ? focusXScale((0, _moment.default)(d.end_timestamp)) - 1 : s + ANNOTATION_MIN_WIDTH;
    var width = Math.max(ANNOTATION_MIN_WIDTH, e - s);
    return width;
  });
  rects.exit().remove();
  var textRects = annotations.selectAll('.mlAnnotationTextRect').data(function (d) {
    return [d];
  });
  var texts = annotations.selectAll('.mlAnnotationText').data(function (d) {
    return [d];
  });
  textRects.enter().append('rect').classed('mlAnnotationTextRect', true).attr('width', ANNOTATION_TEXT_RECT_WIDTH).attr('height', ANNOTATION_TEXT_RECT_HEIGHT).attr('rx', ANNOTATION_RECT_BORDER_RADIUS).attr('ry', ANNOTATION_RECT_BORDER_RADIUS);
  texts.enter().append('text').classed('mlAnnotationText', true);

  function labelXOffset(ts) {
    var earliestMs = focusXScale.domain()[0];
    var latestMs = focusXScale.domain()[1];
    var date = (0, _moment.default)(ts);
    var minX = Math.max(focusXScale(earliestMs), focusXScale(date)); // To avoid overflow to the right, substract maxOffset which is
    // the width of the text label (24px) plus left margin (8xp).

    var maxOffset = 32;
    return Math.min(focusXScale(latestMs) - maxOffset, minX);
  }

  texts.attr('x', function (d) {
    var leftInnerOffset = 17;
    return labelXOffset(d.timestamp) + leftInnerOffset;
  }).attr('y', function (d) {
    var level = d.key !== undefined ? levels[d.key] : ANNOTATION_DEFAULT_LEVEL;
    return focusZoomPanelHeight + upperTextMargin + ANNOTATION_TEXT_VERTICAL_OFFSET + level * levelHeight;
  }).text(function (d) {
    return d.key;
  });
  textRects.attr('x', function (d) {
    var leftInnerOffset = 5;
    return labelXOffset(d.timestamp) + leftInnerOffset;
  }).attr('y', function (d) {
    var level = d.key !== undefined ? levels[d.key] : ANNOTATION_DEFAULT_LEVEL;
    return focusZoomPanelHeight + upperTextMargin + ANNOTATION_TEXT_RECT_VERTICAL_OFFSET + level * levelHeight;
  });
  textRects.exit().remove();
  texts.exit().remove();
  annotations.classed('mlAnnotationHidden', !showAnnotations);
  annotations.exit().remove();
}

function getAnnotationWidth(annotation, focusXScale) {
  var start = focusXScale(annotation.timestamp) + 1;
  var end = typeof annotation.end_timestamp !== 'undefined' ? focusXScale(annotation.end_timestamp) - 1 : start + ANNOTATION_MIN_WIDTH;
  var width = Math.max(ANNOTATION_MIN_WIDTH, end - start);
  return width;
}

function highlightFocusChartAnnotation(annotation) {
  var annotations = _d.default.selectAll('.mlAnnotation');

  annotations.each(function (d) {
    // @ts-ignore
    var element = _d.default.select(this);

    if (d._id === annotation._id) {
      element.selectAll('.mlAnnotationRect').classed('mlAnnotationRect-isHighlight', true);
    } else {
      element.selectAll('.mlAnnotationTextRect').classed('mlAnnotationTextRect-isBlur', true);
      element.selectAll('.mlAnnotationText').classed('mlAnnotationText-isBlur', true);
      element.selectAll('.mlAnnotationRect').classed('mlAnnotationRect-isBlur', true);
    }
  });
}

function unhighlightFocusChartAnnotation() {
  var annotations = _d.default.selectAll('.mlAnnotation');

  annotations.each(function () {
    // @ts-ignore
    var element = _d.default.select(this);

    element.selectAll('.mlAnnotationTextRect').classed('mlAnnotationTextRect-isBlur', false);
    element.selectAll('.mlAnnotationRect').classed('mlAnnotationRect-isHighlight', false).classed('mlAnnotationRect-isBlur', false);
    element.selectAll('.mlAnnotationText').classed('mlAnnotationText-isBlur', false);
  });
}