"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyleMeta = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var StyleMeta =
/*#__PURE__*/
function () {
  function StyleMeta(styleMetaDescriptor) {
    _classCallCheck(this, StyleMeta);

    _defineProperty(this, "_descriptor", void 0);

    this._descriptor = styleMetaDescriptor ? styleMetaDescriptor : {
      fieldMeta: {}
    };
  }

  _createClass(StyleMeta, [{
    key: "getRangeFieldMetaDescriptor",
    value: function getRangeFieldMetaDescriptor(fieldName) {
      return this._descriptor && this._descriptor.fieldMeta[fieldName] ? this._descriptor.fieldMeta[fieldName].range : null;
    }
  }, {
    key: "getCategoryFieldMetaDescriptor",
    value: function getCategoryFieldMetaDescriptor(fieldName) {
      return this._descriptor && this._descriptor.fieldMeta[fieldName] ? this._descriptor.fieldMeta[fieldName].categories : null;
    }
  }, {
    key: "isPointsOnly",
    value: function isPointsOnly() {
      return this._descriptor.geometryTypes ? !!this._descriptor.geometryTypes.isPointsOnly : false;
    }
  }, {
    key: "isLinesOnly",
    value: function isLinesOnly() {
      return this._descriptor.geometryTypes ? !!this._descriptor.geometryTypes.isLinesOnly : false;
    }
  }, {
    key: "isPolygonsOnly",
    value: function isPolygonsOnly() {
      return this._descriptor.geometryTypes ? !!this._descriptor.geometryTypes.isPolygonsOnly : false;
    }
  }]);

  return StyleMeta;
}();

exports.StyleMeta = StyleMeta;