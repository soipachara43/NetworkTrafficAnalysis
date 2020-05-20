"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pie = pie;

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(require("lodash.keyby"));

var _get_colors_from_palette = require("../../../common/lib/get_colors_from_palette");

var _get_legend_config = require("../../../common/lib/get_legend_config");

var _i18n = require("../../../i18n");

var _types = require("../../../types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore lodash.keyby imports invalid member from @types/lodash
// @ts-ignore untyped local
// @ts-ignore untyped local
function pie() {
  const {
    help,
    args: argHelp
  } = (0, _i18n.getFunctionHelp)().pie;
  return {
    name: 'pie',
    aliases: [],
    type: 'render',
    inputTypes: ['pointseries'],
    help,
    args: {
      font: {
        types: ['style'],
        help: argHelp.font,
        default: '{font}'
      },
      hole: {
        types: ['number'],
        default: 0,
        help: argHelp.hole
      },
      labelRadius: {
        types: ['number'],
        default: 100,
        help: argHelp.labelRadius
      },
      labels: {
        types: ['boolean'],
        default: true,
        help: argHelp.labels
      },
      legend: {
        types: ['string', 'boolean'],
        help: argHelp.legend,
        default: false,
        options: [...Object.values(_types.Legend), false]
      },
      palette: {
        types: ['palette'],
        help: argHelp.palette,
        default: '{palette}'
      },
      radius: {
        types: ['string', 'number'],
        help: argHelp.radius,
        default: 'auto'
      },
      seriesStyle: {
        multi: true,
        types: ['seriesStyle'],
        help: argHelp.seriesStyle
      },
      tilt: {
        types: ['number'],
        default: 1,
        help: argHelp.tilt
      }
    },
    fn: (input, args) => {
      const {
        tilt,
        radius,
        labelRadius,
        labels,
        hole,
        legend,
        palette,
        font,
        seriesStyle
      } = args;
      const seriesStyles = (0, _lodash2.default)(seriesStyle || [], 'label') || {};
      const data = (0, _lodash.map)((0, _lodash.groupBy)(input.rows, 'color'), (series, label = '') => {
        const item = {
          label,
          data: series.map(point => point.size || 1)
        };
        const style = seriesStyles[label]; // append series style, if there is a match

        if (style) {
          item.color = (0, _lodash.get)(style, 'color');
        }

        return item;
      });
      return {
        type: 'render',
        as: 'pie',
        value: {
          font,
          data,
          options: {
            canvas: false,
            colors: (0, _get_colors_from_palette.getColorsFromPalette)(palette, data.length),
            legend: (0, _get_legend_config.getLegendConfig)(legend, data.length),
            grid: {
              show: false
            },
            series: {
              pie: {
                show: true,
                innerRadius: Math.max(hole, 0) / 100,
                stroke: {
                  width: 0
                },
                label: {
                  show: labels,
                  radius: (labelRadius >= 0 ? labelRadius : 100) / 100
                },
                tilt,
                radius
              },
              bubbles: {
                show: false
              },
              shadowSize: 0
            }
          }
        }
      };
    }
  };
}