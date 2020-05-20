"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefaultProperties = getDefaultProperties;
exports.getDefaultStaticProperties = getDefaultStaticProperties;
exports.getDefaultDynamicProperties = getDefaultDynamicProperties;
exports.POLYGON_STYLES = exports.LINE_STYLES = exports.DEFAULT_COLOR_PALETTE = exports.DEFAULT_COLOR_RAMP = exports.DEFAULT_ICON_SIZE = exports.DEFAULT_LABEL_SIZE = exports.DEFAULT_SIGMA = exports.DEFAULT_MAX_SIZE = exports.DEFAULT_MIN_SIZE = exports.MAX_SIZE = exports.MIN_SIZE = void 0;

var _constants = require("../../../../common/constants");

var _color_utils = require("../color_utils");

var _kibana_services = require("../../../kibana_services");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MIN_SIZE = 1;
exports.MIN_SIZE = MIN_SIZE;
var MAX_SIZE = 64;
exports.MAX_SIZE = MAX_SIZE;
var DEFAULT_MIN_SIZE = 7; // Make default large enough to fit default label size

exports.DEFAULT_MIN_SIZE = DEFAULT_MIN_SIZE;
var DEFAULT_MAX_SIZE = 32;
exports.DEFAULT_MAX_SIZE = DEFAULT_MAX_SIZE;
var DEFAULT_SIGMA = 3;
exports.DEFAULT_SIGMA = DEFAULT_SIGMA;
var DEFAULT_LABEL_SIZE = 14;
exports.DEFAULT_LABEL_SIZE = DEFAULT_LABEL_SIZE;
var DEFAULT_ICON_SIZE = 6;
exports.DEFAULT_ICON_SIZE = DEFAULT_ICON_SIZE;
var DEFAULT_COLOR_RAMP = _color_utils.COLOR_GRADIENTS[0].value;
exports.DEFAULT_COLOR_RAMP = DEFAULT_COLOR_RAMP;
var DEFAULT_COLOR_PALETTE = _color_utils.COLOR_PALETTES[0].value;
exports.DEFAULT_COLOR_PALETTE = DEFAULT_COLOR_PALETTE;
var LINE_STYLES = [_constants.VECTOR_STYLES.LINE_COLOR, _constants.VECTOR_STYLES.LINE_WIDTH];
exports.LINE_STYLES = LINE_STYLES;
var POLYGON_STYLES = [_constants.VECTOR_STYLES.FILL_COLOR, _constants.VECTOR_STYLES.LINE_COLOR, _constants.VECTOR_STYLES.LINE_WIDTH];
exports.POLYGON_STYLES = POLYGON_STYLES;

function getDefaultProperties() {
  var _objectSpread2;

  var mapColors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return _objectSpread({}, getDefaultStaticProperties(mapColors), (_objectSpread2 = {}, _defineProperty(_objectSpread2, _constants.VECTOR_STYLES.SYMBOLIZE_AS, {
    options: {
      value: _constants.SYMBOLIZE_AS_TYPES.CIRCLE
    }
  }), _defineProperty(_objectSpread2, _constants.VECTOR_STYLES.LABEL_BORDER_SIZE, {
    options: {
      size: _constants.LABEL_BORDER_SIZES.SMALL
    }
  }), _objectSpread2));
}

function getDefaultStaticProperties() {
  var _ref;

  var mapColors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // Colors must be state-aware to reduce unnecessary incrementation
  var lastColor = mapColors.pop();

  var nextColorIndex = (_color_utils.DEFAULT_FILL_COLORS.indexOf(lastColor) + 1) % _color_utils.DEFAULT_FILL_COLORS.length;

  var nextFillColor = _color_utils.DEFAULT_FILL_COLORS[nextColorIndex];
  var nextLineColor = _color_utils.DEFAULT_LINE_COLORS[nextColorIndex];
  var isDarkMode = (0, _kibana_services.getUiSettings)().get('theme:darkMode', false);
  return _ref = {}, _defineProperty(_ref, _constants.VECTOR_STYLES.ICON, {
    type: _constants.STYLE_TYPE.STATIC,
    options: {
      value: _constants.DEFAULT_ICON
    }
  }), _defineProperty(_ref, _constants.VECTOR_STYLES.FILL_COLOR, {
    type: _constants.STYLE_TYPE.STATIC,
    options: {
      color: nextFillColor
    }
  }), _defineProperty(_ref, _constants.VECTOR_STYLES.LINE_COLOR, {
    type: _constants.STYLE_TYPE.STATIC,
    options: {
      color: nextLineColor
    }
  }), _defineProperty(_ref, _constants.VECTOR_STYLES.LINE_WIDTH, {
    type: _constants.STYLE_TYPE.STATIC,
    options: {
      size: 1
    }
  }), _defineProperty(_ref, _constants.VECTOR_STYLES.ICON_SIZE, {
    type: _constants.STYLE_TYPE.STATIC,
    options: {
      size: DEFAULT_ICON_SIZE
    }
  }), _defineProperty(_ref, _constants.VECTOR_STYLES.ICON_ORIENTATION, {
    type: _constants.STYLE_TYPE.STATIC,
    options: {
      orientation: 0
    }
  }), _defineProperty(_ref, _constants.VECTOR_STYLES.LABEL_TEXT, {
    type: _constants.STYLE_TYPE.STATIC,
    options: {
      value: ''
    }
  }), _defineProperty(_ref, _constants.VECTOR_STYLES.LABEL_COLOR, {
    type: _constants.STYLE_TYPE.STATIC,
    options: {
      color: isDarkMode ? '#FFFFFF' : '#000000'
    }
  }), _defineProperty(_ref, _constants.VECTOR_STYLES.LABEL_SIZE, {
    type: _constants.STYLE_TYPE.STATIC,
    options: {
      size: DEFAULT_LABEL_SIZE
    }
  }), _defineProperty(_ref, _constants.VECTOR_STYLES.LABEL_BORDER_COLOR, {
    type: _constants.STYLE_TYPE.STATIC,
    options: {
      color: isDarkMode ? '#000000' : '#FFFFFF'
    }
  }), _ref;
}

function getDefaultDynamicProperties() {
  var _ref2;

  return _ref2 = {}, _defineProperty(_ref2, _constants.VECTOR_STYLES.ICON, {
    type: _constants.STYLE_TYPE.DYNAMIC,
    options: {
      iconPaletteId: 'filledShapes',
      field: undefined,
      fieldMetaOptions: {
        isEnabled: true
      }
    }
  }), _defineProperty(_ref2, _constants.VECTOR_STYLES.FILL_COLOR, {
    type: _constants.STYLE_TYPE.DYNAMIC,
    options: {
      color: DEFAULT_COLOR_RAMP,
      colorCategory: DEFAULT_COLOR_PALETTE,
      field: undefined,
      fieldMetaOptions: {
        isEnabled: true,
        sigma: DEFAULT_SIGMA
      }
    }
  }), _defineProperty(_ref2, _constants.VECTOR_STYLES.LINE_COLOR, {
    type: _constants.STYLE_TYPE.DYNAMIC,
    options: {
      color: DEFAULT_COLOR_RAMP,
      colorCategory: DEFAULT_COLOR_PALETTE,
      field: undefined,
      fieldMetaOptions: {
        isEnabled: true,
        sigma: DEFAULT_SIGMA
      }
    }
  }), _defineProperty(_ref2, _constants.VECTOR_STYLES.LINE_WIDTH, {
    type: _constants.STYLE_TYPE.DYNAMIC,
    options: {
      minSize: 1,
      maxSize: 10,
      field: undefined,
      fieldMetaOptions: {
        isEnabled: true,
        sigma: DEFAULT_SIGMA
      }
    }
  }), _defineProperty(_ref2, _constants.VECTOR_STYLES.ICON_SIZE, {
    type: _constants.STYLE_TYPE.DYNAMIC,
    options: {
      minSize: DEFAULT_MIN_SIZE,
      maxSize: DEFAULT_MAX_SIZE,
      field: undefined,
      fieldMetaOptions: {
        isEnabled: true,
        sigma: DEFAULT_SIGMA
      }
    }
  }), _defineProperty(_ref2, _constants.VECTOR_STYLES.ICON_ORIENTATION, {
    type: _constants.STYLE_TYPE.DYNAMIC,
    options: {
      field: undefined,
      fieldMetaOptions: {
        isEnabled: true,
        sigma: DEFAULT_SIGMA
      }
    }
  }), _defineProperty(_ref2, _constants.VECTOR_STYLES.LABEL_TEXT, {
    type: _constants.STYLE_TYPE.DYNAMIC,
    options: {
      field: undefined
    }
  }), _defineProperty(_ref2, _constants.VECTOR_STYLES.LABEL_COLOR, {
    type: _constants.STYLE_TYPE.DYNAMIC,
    options: {
      color: DEFAULT_COLOR_RAMP,
      colorCategory: DEFAULT_COLOR_PALETTE,
      field: undefined,
      fieldMetaOptions: {
        isEnabled: true,
        sigma: DEFAULT_SIGMA
      }
    }
  }), _defineProperty(_ref2, _constants.VECTOR_STYLES.LABEL_SIZE, {
    type: _constants.STYLE_TYPE.DYNAMIC,
    options: {
      minSize: DEFAULT_MIN_SIZE,
      maxSize: DEFAULT_MAX_SIZE,
      field: undefined,
      fieldMetaOptions: {
        isEnabled: true,
        sigma: DEFAULT_SIGMA
      }
    }
  }), _defineProperty(_ref2, _constants.VECTOR_STYLES.LABEL_BORDER_COLOR, {
    type: _constants.STYLE_TYPE.DYNAMIC,
    options: {
      color: DEFAULT_COLOR_RAMP,
      colorCategory: DEFAULT_COLOR_PALETTE,
      field: undefined,
      fieldMetaOptions: {
        isEnabled: true,
        sigma: DEFAULT_SIGMA
      }
    }
  }), _ref2;
}