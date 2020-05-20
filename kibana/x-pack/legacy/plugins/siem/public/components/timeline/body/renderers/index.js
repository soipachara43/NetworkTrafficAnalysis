"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.columnRenderers = exports.rowRenderers = void 0;

var _generic_row_renderer = require("./auditd/generic_row_renderer");

var _empty_column_renderer = require("./empty_column_renderer");

var _netflow_row_renderer = require("./netflow/netflow_row_renderer");

var _plain_column_renderer = require("./plain_column_renderer");

var _plain_row_renderer = require("./plain_row_renderer");

var _suricata_row_renderer = require("./suricata/suricata_row_renderer");

var _unknown_column_renderer = require("./unknown_column_renderer");

var _zeek_row_renderer = require("./zeek/zeek_row_renderer");

var _generic_row_renderer2 = require("./system/generic_row_renderer");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// The row renderers are order dependent and will return the first renderer
// which returns true from its isInstance call. The bottom renderers which
// are netflowRenderer and plainRowRenderer are the most accepting where
// netflowRowRenderer returns true on any netflow related data set including
// Suricata and Zeek which is why Suricata and Zeek are above it. The
// plainRowRenderer always returns true to everything which is why it always
// should be last.
var rowRenderers = [].concat(_toConsumableArray(_generic_row_renderer.auditdRowRenderers), _toConsumableArray(_generic_row_renderer2.systemRowRenderers), [_suricata_row_renderer.suricataRowRenderer, _zeek_row_renderer.zeekRowRenderer, _netflow_row_renderer.netflowRowRenderer, _plain_row_renderer.plainRowRenderer]);
exports.rowRenderers = rowRenderers;
var columnRenderers = [_plain_column_renderer.plainColumnRenderer, _empty_column_renderer.emptyColumnRenderer, _unknown_column_renderer.unknownColumnRenderer];
exports.columnRenderers = columnRenderers;