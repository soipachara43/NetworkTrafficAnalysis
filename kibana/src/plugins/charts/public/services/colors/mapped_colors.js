"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MappedColors = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _d = _interopRequireDefault(require("d3"));

var _color_palette = require("./color_palette");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var standardizeColor = function standardizeColor(color) {
  return _d.default.rgb(color).toString();
};
/**
 * Maintains a lookup table that associates the value (key) with a hex color (value)
 * across the visualizations.
 * Provides functions to interact with the lookup table
 */


var MappedColors =
/*#__PURE__*/
function () {
  function MappedColors(uiSettings) {
    _classCallCheck(this, MappedColors);

    this.uiSettings = uiSettings;

    _defineProperty(this, "_oldMap", void 0);

    _defineProperty(this, "_mapping", void 0);

    this._oldMap = {};
    this._mapping = {};
  }

  _createClass(MappedColors, [{
    key: "getConfigColorMapping",
    value: function getConfigColorMapping() {
      return _lodash.default.mapValues(this.uiSettings.get('visualization:colorMapping'), standardizeColor);
    }
  }, {
    key: "get",
    value: function get(key) {
      return this.getConfigColorMapping()[key] || this._mapping[key];
    }
  }, {
    key: "flush",
    value: function flush() {
      this._oldMap = _lodash.default.clone(this._mapping);
      this._mapping = {};
    }
  }, {
    key: "purge",
    value: function purge() {
      this._oldMap = {};
      this._mapping = {};
    }
  }, {
    key: "mapKeys",
    value: function mapKeys(keys) {
      var _this = this;

      var configMapping = this.getConfigColorMapping();

      var configColors = _lodash.default.values(configMapping);

      var oldColors = _lodash.default.values(this._oldMap);

      var keysToMap = [];

      _lodash.default.each(keys, function (key) {
        // If this key is mapped in the config, it's unnecessary to have it mapped here
        if (configMapping[key]) delete _this._mapping[key]; // If this key is mapped to a color used by the config color mapping, we need to remap it

        if (_lodash.default.contains(configColors, _this._mapping[key])) keysToMap.push(key); // if key exist in oldMap, move it to mapping

        if (_this._oldMap[key]) _this._mapping[key] = _this._oldMap[key]; // If this key isn't mapped, we need to map it

        if (_this.get(key) == null) keysToMap.push(key);
      }); // Generate a color palette big enough that all new keys can have unique color values


      var allColors = (0, _lodash.default)(this._mapping).values().union(configColors).union(oldColors).value();
      var colorPalette = (0, _color_palette.createColorPalette)(allColors.length + keysToMap.length);

      var newColors = _lodash.default.difference(colorPalette, allColors);

      while (keysToMap.length > newColors.length) {
        newColors = newColors.concat(_lodash.default.sample(allColors, keysToMap.length - newColors.length));
      }

      _lodash.default.merge(this._mapping, _lodash.default.zipObject(keysToMap, newColors));
    }
  }, {
    key: "oldMap",
    get: function get() {
      return this._oldMap;
    }
  }, {
    key: "mapping",
    get: function get() {
      return this._mapping;
    }
  }]);

  return MappedColors;
}();

exports.MappedColors = MappedColors;