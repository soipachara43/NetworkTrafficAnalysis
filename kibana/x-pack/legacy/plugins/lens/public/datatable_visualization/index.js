"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DatatableVisualization = void 0;

var _visualization = require("./visualization");

var _expression = require("./expression");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DatatableVisualization =
/*#__PURE__*/
function () {
  function DatatableVisualization() {
    _classCallCheck(this, DatatableVisualization);
  }

  _createClass(DatatableVisualization, [{
    key: "setup",
    value: function setup(_core, _ref) {
      var expressions = _ref.expressions,
          formatFactory = _ref.formatFactory,
          editorFrame = _ref.editorFrame;
      expressions.registerFunction(function () {
        return _expression.datatableColumns;
      });
      expressions.registerFunction(function () {
        return _expression.datatable;
      });
      expressions.registerRenderer(function () {
        return (0, _expression.getDatatableRenderer)(formatFactory);
      });
      editorFrame.registerVisualization(_visualization.datatableVisualization);
    }
  }]);

  return DatatableVisualization;
}();

exports.DatatableVisualization = DatatableVisualization;