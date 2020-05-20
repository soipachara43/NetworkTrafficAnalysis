"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plot = plot;

var _lodash = _interopRequireDefault(require("lodash.keyby"));

var _lodash2 = require("lodash");

var _get_colors_from_palette = require("../../../../common/lib/get_colors_from_palette");

var _get_legend_config = require("../../../../common/lib/get_legend_config");

var _get_flot_axis_config = require("./get_flot_axis_config");

var _get_font_spec = require("./get_font_spec");

var _series_style_to_flot = require("./series_style_to_flot");

var _get_tick_hash = require("./get_tick_hash");

var _i18n = require("../../../../i18n");

var _types = require("../../../../types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore no @typed def
// @ts-ignore untyped local
// @ts-ignore untyped local
function plot() {
  const {
    help,
    args: argHelp
  } = (0, _i18n.getFunctionHelp)().plot;
  return {
    name: 'plot',
    aliases: [],
    type: 'render',
    inputTypes: ['pointseries'],
    help,
    args: {
      defaultStyle: {
        multi: false,
        types: ['seriesStyle'],
        help: argHelp.defaultStyle,
        default: '{seriesStyle points=5}'
      },
      font: {
        types: ['style'],
        help: argHelp.font,
        default: '{font}'
      },
      legend: {
        types: ['string', 'boolean'],
        help: argHelp.legend,
        default: 'ne',
        options: [...Object.values(_types.Legend), false]
      },
      palette: {
        types: ['palette'],
        help: argHelp.palette,
        default: '{palette}'
      },
      seriesStyle: {
        multi: true,
        types: ['seriesStyle'],
        help: argHelp.seriesStyle
      },
      xaxis: {
        types: ['boolean', 'axisConfig'],
        help: argHelp.xaxis,
        default: true
      },
      yaxis: {
        types: ['boolean', 'axisConfig'],
        help: argHelp.yaxis,
        default: true
      }
    },
    fn: (input, args) => {
      const seriesStyles = (0, _lodash.default)(args.seriesStyle || [], 'label') || {};
      const sortedRows = (0, _lodash2.sortBy)(input.rows, ['x', 'y', 'color', 'size', 'text']);
      const ticks = (0, _get_tick_hash.getTickHash)(input.columns, sortedRows);
      const font = args.font ? (0, _get_font_spec.getFontSpec)(args.font) : {};
      const data = (0, _lodash2.map)((0, _lodash2.groupBy)(sortedRows, 'color'), (series, label) => {
        const seriesStyle = { ...args.defaultStyle,
          ...seriesStyles[label]
        };
        const flotStyle = seriesStyle ? (0, _series_style_to_flot.seriesStyleToFlot)(seriesStyle) : {};
        return { ...flotStyle,
          label,
          data: series.map(point => {
            const attrs = {};
            const x = (0, _lodash2.get)(input.columns, 'x.type') === 'string' ? ticks.x.hash[point.x] : point.x;
            const y = (0, _lodash2.get)(input.columns, 'y.type') === 'string' ? ticks.y.hash[point.y] : point.y;

            if (point.size != null) {
              attrs.size = point.size;
            } else if ((0, _lodash2.get)(seriesStyle, 'points')) {
              attrs.size = seriesStyle.points;
              (0, _lodash2.set)(flotStyle, 'bubbles.size.min', seriesStyle.points);
            }

            if (point.text != null) {
              attrs.text = point.text;
            }

            return [x, y, attrs];
          })
        };
      });
      const gridConfig = {
        borderWidth: 0,
        borderColor: null,
        color: 'rgba(0,0,0,0)',
        labelMargin: 30,
        margin: {
          right: 30,
          top: 20,
          bottom: 0,
          left: 0
        }
      };
      const output = {
        type: 'render',
        as: 'plot',
        value: {
          font: args.font,
          data: (0, _lodash2.sortBy)(data, 'label'),
          options: {
            canvas: false,
            colors: (0, _get_colors_from_palette.getColorsFromPalette)(args.palette, data.length),
            legend: (0, _get_legend_config.getLegendConfig)(args.legend, data.length),
            grid: gridConfig,
            xaxis: (0, _get_flot_axis_config.getFlotAxisConfig)('x', args.xaxis, {
              columns: input.columns,
              ticks,
              font
            }),
            yaxis: (0, _get_flot_axis_config.getFlotAxisConfig)('y', args.yaxis, {
              columns: input.columns,
              ticks,
              font
            }),
            series: {
              shadowSize: 0,
              ...(0, _series_style_to_flot.seriesStyleToFlot)(args.defaultStyle)
            }
          }
        }
      }; // fix the issue of plot sometimes re-rendering with an empty chart
      // TODO: holy hell, why does this work?! the working theory is that some values become undefined
      // and serializing the result here causes them to be dropped off, and this makes flot react differently.
      // It's also possible that something else ends up mutating this object, but that seems less likely.

      return JSON.parse(JSON.stringify(output));
    }
  };
}