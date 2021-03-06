"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFontSpec = exports.defaultSpec = void 0;

var _fonts = require("../../../../common/lib/fonts");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// converts the output of the font function to a flot font spec
// for font spec, see https://github.com/flot/flot/blob/master/API.md#customizing-the-axes
const defaultSpec = {
  size: 14,
  lHeight: 21,
  style: 'normal',
  weight: 'normal',
  family: _fonts.openSans.value,
  color: '#000'
};
exports.defaultSpec = defaultSpec;

const getFontSpec = argFont => {
  if (!argFont || !argFont.spec) {
    return defaultSpec;
  }

  const {
    fontSize,
    lineHeight,
    fontStyle,
    fontWeight,
    fontFamily,
    color
  } = argFont.spec;
  const size = fontSize && Number(fontSize.replace('px', ''));
  const lHeight = typeof lineHeight === 'string' && Number(lineHeight.replace('px', ''));
  return {
    size: size && !isNaN(size) ? size : defaultSpec.size,
    lHeight: size && !isNaN(size) ? lHeight : defaultSpec.lHeight,
    style: fontStyle || defaultSpec.style,
    weight: fontWeight || defaultSpec.weight,
    family: fontFamily || defaultSpec.family,
    color: color || defaultSpec.color
  };
};

exports.getFontSpec = getFontSpec;