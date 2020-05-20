"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisualizationsPlugin = void 0;

var _vis_types = require("./vis_types");

var _services = require("./services");

var _embeddable = require("./embeddable");

var _visualization_function = require("./expressions/visualization_function");

var _visualization_renderer = require("./expressions/visualization_renderer");

var _saved_visualizations = require("./saved_visualizations");

var _vis = require("./vis");

var _wizard = require("./wizard");

var _saved_vis = require("./saved_visualizations/_saved_vis");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Visualizations Plugin - public
 *
 * This plugin's stateful contracts are returned from the `setup` and `start` methods
 * below. The interfaces for these contracts are provided above.
 *
 * @internal
 */
var VisualizationsPlugin =
/*#__PURE__*/
function () {
  function VisualizationsPlugin(initializerContext) {
    _classCallCheck(this, VisualizationsPlugin);

    _defineProperty(this, "types", new _vis_types.TypesService());
  }

  _createClass(VisualizationsPlugin, [{
    key: "setup",
    value: function setup(core, _ref) {
      var expressions = _ref.expressions,
          embeddable = _ref.embeddable,
          usageCollection = _ref.usageCollection,
          data = _ref.data;
      (0, _services.setUISettings)(core.uiSettings);
      (0, _services.setUsageCollector)(usageCollection);
      expressions.registerFunction(_visualization_function.visualization);
      expressions.registerRenderer(_visualization_renderer.visualization);
      var embeddableFactory = new _embeddable.VisualizeEmbeddableFactory();
      embeddable.registerEmbeddableFactory(_embeddable.VISUALIZE_EMBEDDABLE_TYPE, embeddableFactory);
      return _objectSpread({}, this.types.setup());
    }
  }, {
    key: "start",
    value: function start(core, _ref2) {
      var data = _ref2.data,
          expressions = _ref2.expressions,
          uiActions = _ref2.uiActions;
      var types = this.types.start();
      (0, _services.setI18n)(core.i18n);
      (0, _services.setTypes)(types);
      (0, _services.setCapabilities)(core.application.capabilities);
      (0, _services.setHttp)(core.http);
      (0, _services.setSavedObjects)(core.savedObjects);
      (0, _services.setIndexPatterns)(data.indexPatterns);
      (0, _services.setFilterManager)(data.query.filterManager);
      (0, _services.setExpressions)(expressions);
      (0, _services.setUiActions)(uiActions);
      (0, _services.setTimeFilter)(data.query.timefilter.timefilter);
      (0, _services.setAggs)(data.search.aggs);
      (0, _services.setOverlays)(core.overlays);
      (0, _services.setChrome)(core.chrome);
      var savedVisualizationsLoader = (0, _saved_visualizations.createSavedVisLoader)({
        savedObjectsClient: core.savedObjects.client,
        indexPatterns: data.indexPatterns,
        chrome: core.chrome,
        overlays: core.overlays,
        visualizationTypes: types
      });
      (0, _services.setSavedVisualizationsLoader)(savedVisualizationsLoader);
      return _objectSpread({}, types, {
        showNewVisModal: _wizard.showNewVisModal,

        /**
         * creates new instance of Vis
         * @param {IIndexPattern} indexPattern - index pattern to use
         * @param {VisState} visState - visualization configuration
         */
        createVis: function createVis(visType, visState) {
          return new _vis.Vis(visType, visState);
        },
        convertToSerializedVis: _saved_vis.convertToSerializedVis,
        convertFromSerializedVis: _saved_vis.convertFromSerializedVis,
        savedVisualizationsLoader: savedVisualizationsLoader
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      this.types.stop();
    }
  }]);

  return VisualizationsPlugin;
}();

exports.VisualizationsPlugin = VisualizationsPlugin;