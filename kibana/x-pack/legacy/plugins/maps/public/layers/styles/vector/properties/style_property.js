"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AbstractStyleProperty = void 0;

var _get_vector_style_label = require("../components/get_vector_style_label");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AbstractStyleProperty =
/*#__PURE__*/
function () {
  function AbstractStyleProperty(options, styleName) {
    _classCallCheck(this, AbstractStyleProperty);

    _defineProperty(this, "_options", void 0);

    _defineProperty(this, "_styleName", void 0);

    this._options = options;
    this._styleName = styleName;
  }

  _createClass(AbstractStyleProperty, [{
    key: "isDynamic",
    value: function isDynamic() {
      return false;
    }
    /**
     * Is the style fully defined and usable? (e.g. for rendering, in legend UX, ...)
     * Why? during editing, partially-completed descriptors may be added to the layer-descriptor
     * e.g. dynamic-fields can have an incomplete state when the field is not yet selected from the drop-down
     * @returns {boolean}
     */

  }, {
    key: "isComplete",
    value: function isComplete() {
      return true;
    }
  }, {
    key: "formatField",
    value: function formatField(value) {
      // eslint-disable-next-line eqeqeq
      return value == undefined ? '' : value;
    }
  }, {
    key: "getStyleName",
    value: function getStyleName() {
      return this._styleName;
    }
  }, {
    key: "getOptions",
    value: function getOptions() {
      return this._options || {};
    }
  }, {
    key: "renderRangeLegendHeader",
    value: function renderRangeLegendHeader() {
      return null;
    }
  }, {
    key: "renderLegendDetailRow",
    value: function renderLegendDetailRow() {
      return null;
    }
  }, {
    key: "renderFieldMetaPopover",
    value: function renderFieldMetaPopover() {
      return null;
    }
  }, {
    key: "getDisplayStyleName",
    value: function getDisplayStyleName() {
      return (0, _get_vector_style_label.getVectorStyleLabel)(this.getStyleName());
    }
  }]);

  return AbstractStyleProperty;
}();

exports.AbstractStyleProperty = AbstractStyleProperty;