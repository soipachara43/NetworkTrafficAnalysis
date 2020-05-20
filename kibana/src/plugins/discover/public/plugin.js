"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DiscoverPlugin = void 0;

var _i18n = require("@kbn/i18n");

var _doc_views_registry = require("./doc_views/doc_views_registry");

var _table = require("./components/table/table");

var _json_code_block = require("./components/json_code_block/json_code_block");

var _doc_viewer = require("./components/doc_viewer/doc_viewer");

var _services = require("./services");

require("./index.scss");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Contains Discover, one of the oldest parts of Kibana
 * There are 2 kinds of Angular bootstrapped for rendering, additionally to the main Angular
 * Discover provides embeddables, those contain a slimmer Angular
 */
var DiscoverPlugin =
/*#__PURE__*/
function () {
  function DiscoverPlugin() {
    _classCallCheck(this, DiscoverPlugin);

    _defineProperty(this, "docViewsRegistry", null);
  }

  _createClass(DiscoverPlugin, [{
    key: "setup",
    value: function setup(core) {
      this.docViewsRegistry = new _doc_views_registry.DocViewsRegistry();
      (0, _services.setDocViewsRegistry)(this.docViewsRegistry);
      this.docViewsRegistry.addDocView({
        title: _i18n.i18n.translate('discover.docViews.table.tableTitle', {
          defaultMessage: 'Table'
        }),
        order: 10,
        component: _table.DocViewTable
      });
      this.docViewsRegistry.addDocView({
        title: _i18n.i18n.translate('discover.docViews.json.jsonTitle', {
          defaultMessage: 'JSON'
        }),
        order: 20,
        component: _json_code_block.JsonCodeBlock
      });
      return {
        docViews: {
          addDocView: this.docViewsRegistry.addDocView.bind(this.docViewsRegistry),
          setAngularInjectorGetter: this.docViewsRegistry.setAngularInjectorGetter.bind(this.docViewsRegistry)
        }
      };
    }
  }, {
    key: "start",
    value: function start() {
      return {
        docViews: {
          DocViewer: _doc_viewer.DocViewer
        }
      };
    }
  }]);

  return DiscoverPlugin;
}();

exports.DiscoverPlugin = DiscoverPlugin;