"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cytoscapeOptions = exports.cytoscapeDivStyle = exports.nodeHeight = exports.animationOptions = void 0;

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _elasticsearch_fieldnames = require("../../../../../../../plugins/apm/common/elasticsearch_fieldnames");

var _icons = require("./icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// IE 11 does not properly load some SVGs or draw certain shapes. This causes
// a runtime error and the map fails work at all. We would prefer to do some
// kind of feature detection rather than browser detection, but some of these
// limitations are not well documented for older browsers.
//
// This method of detecting IE is from a Stack Overflow answer:
// https://stackoverflow.com/a/21825207
//
// @ts-ignore `documentMode` is not recognized as a valid property of `document`.
var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
var animationOptions = {
  duration: parseInt(_eui_theme_light.default.euiAnimSpeedNormal, 10),
  // @ts-ignore The cubic-bezier options here are not recognized by the cytoscape types
  easing: _eui_theme_light.default.euiAnimSlightBounce
};
exports.animationOptions = animationOptions;
var lineColor = '#C5CCD7';
var zIndexNode = 200;
var zIndexEdge = 100;
var zIndexEdgeHighlight = 110;
var zIndexEdgeHover = 120;
var nodeHeight = parseInt(_eui_theme_light.default.avatarSizing.l.size, 10);
exports.nodeHeight = nodeHeight;

function isService(el) {
  return el.data(_elasticsearch_fieldnames.SERVICE_NAME) !== undefined;
}

var style = [{
  selector: 'node',
  style: {
    'background-color': 'white',
    // The DefinitelyTyped definitions don't specify that a function can be
    // used here.
    //
    // @ts-ignore
    'background-image': isIE11 ? undefined : function (el) {
      var _iconForNode;

      return (_iconForNode = (0, _icons.iconForNode)(el)) !== null && _iconForNode !== void 0 ? _iconForNode : _icons.defaultIcon;
    },
    'background-height': function backgroundHeight(el) {
      return isService(el) ? '60%' : '40%';
    },
    'background-width': function backgroundWidth(el) {
      return isService(el) ? '60%' : '40%';
    },
    'border-color': function borderColor(el) {
      return el.hasClass('primary') || el.selected() ? _eui_theme_light.default.euiColorPrimary : _eui_theme_light.default.euiColorMediumShade;
    },
    'border-width': 2,
    color: _eui_theme_light.default.textColors.default,
    // theme.euiFontFamily doesn't work here for some reason, so we're just
    // specifying a subset of the fonts for the label text.
    'font-family': 'Inter UI, Segoe UI, Helvetica, Arial, sans-serif',
    'font-size': _eui_theme_light.default.euiFontSizeXS,
    ghost: 'yes',
    'ghost-offset-x': 0,
    'ghost-offset-y': 2,
    'ghost-opacity': 0.15,
    height: nodeHeight,
    label: function label(el) {
      return isService(el) ? el.data(_elasticsearch_fieldnames.SERVICE_NAME) : el.data(_elasticsearch_fieldnames.SPAN_DESTINATION_SERVICE_RESOURCE);
    },
    'min-zoomed-font-size': parseInt(_eui_theme_light.default.euiSizeL, 10),
    'overlay-opacity': 0,
    shape: function shape(el) {
      return isService(el) ? isIE11 ? 'rectangle' : 'ellipse' : 'diamond';
    },
    'text-background-color': _eui_theme_light.default.euiColorLightestShade,
    'text-background-opacity': 0,
    'text-background-padding': _eui_theme_light.default.paddingSizes.xs,
    'text-background-shape': 'roundrectangle',
    'text-margin-y': parseInt(_eui_theme_light.default.paddingSizes.s, 10),
    'text-max-width': '200px',
    'text-valign': 'bottom',
    'text-wrap': 'ellipsis',
    width: _eui_theme_light.default.avatarSizing.l.size,
    'z-index': zIndexNode
  }
}, {
  selector: 'edge',
  style: {
    'curve-style': 'taxi',
    // @ts-ignore
    'taxi-direction': 'auto',
    'line-color': lineColor,
    'overlay-opacity': 0,
    'target-arrow-color': lineColor,
    'target-arrow-shape': isIE11 ? 'none' : 'triangle',
    // The DefinitelyTyped definitions don't specify this property since it's
    // fairly new.
    //
    // @ts-ignore
    'target-distance-from-node': isIE11 ? undefined : _eui_theme_light.default.paddingSizes.xs,
    width: 1,
    'source-arrow-shape': 'none',
    'z-index': zIndexEdge
  }
}, {
  selector: 'edge[bidirectional]',
  style: {
    'source-arrow-shape': isIE11 ? 'none' : 'triangle',
    'source-arrow-color': lineColor,
    'target-arrow-shape': isIE11 ? 'none' : 'triangle',
    // @ts-ignore
    'source-distance-from-node': isIE11 ? undefined : parseInt(_eui_theme_light.default.paddingSizes.xs, 10),
    'target-distance-from-node': isIE11 ? undefined : parseInt(_eui_theme_light.default.paddingSizes.xs, 10)
  }
}, // @ts-ignore DefinitelyTyped says visibility is "none" but it's
// actually "hidden"
{
  selector: 'edge[isInverseEdge]',
  style: {
    visibility: 'hidden'
  }
}, {
  selector: 'edge.nodeHover',
  style: {
    width: 2,
    // @ts-ignore
    'z-index': zIndexEdgeHover,
    'line-color': _eui_theme_light.default.euiColorDarkShade,
    'source-arrow-color': _eui_theme_light.default.euiColorDarkShade,
    'target-arrow-color': _eui_theme_light.default.euiColorDarkShade
  }
}, {
  selector: 'node.hover',
  style: {
    'border-width': 2
  }
}, {
  selector: 'edge.highlight',
  style: {
    width: 2,
    'line-color': _eui_theme_light.default.euiColorPrimary,
    'source-arrow-color': _eui_theme_light.default.euiColorPrimary,
    'target-arrow-color': _eui_theme_light.default.euiColorPrimary,
    // @ts-ignore
    'z-index': zIndexEdgeHighlight
  }
}]; // The CSS styles for the div containing the cytoscape element. Makes a
// background grid of dots.

var cytoscapeDivStyle = {
  background: "linear-gradient(\n  90deg,\n  ".concat(_eui_theme_light.default.euiPageBackgroundColor, "\n    calc(").concat(_eui_theme_light.default.euiSizeL, " - calc(").concat(_eui_theme_light.default.euiSizeXS, " / 2)),\n  transparent 1%\n)\ncenter,\nlinear-gradient(\n  ").concat(_eui_theme_light.default.euiPageBackgroundColor, "\n    calc(").concat(_eui_theme_light.default.euiSizeL, " - calc(").concat(_eui_theme_light.default.euiSizeXS, " / 2)),\n  transparent 1%\n)\ncenter,\n").concat(_eui_theme_light.default.euiColorLightShade),
  backgroundSize: "".concat(_eui_theme_light.default.euiSizeL, " ").concat(_eui_theme_light.default.euiSizeL),
  margin: "-".concat(_eui_theme_light.default.gutterTypes.gutterLarge),
  marginTop: 0
};
exports.cytoscapeDivStyle = cytoscapeDivStyle;
var cytoscapeOptions = {
  autoungrabify: true,
  boxSelectionEnabled: false,
  maxZoom: 3,
  minZoom: 0.2,
  style: style
};
exports.cytoscapeOptions = cytoscapeOptions;