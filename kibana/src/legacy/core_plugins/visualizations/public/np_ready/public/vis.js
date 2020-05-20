"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vis = void 0;

var _lodash = require("lodash");

var _public = require("../../../../../../../src/plugins/visualizations/public");

var _vis_update = require("./legacy/vis_update");

var _services = require("./services");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Vis =
/*#__PURE__*/
function () {
  // Session state is for storing information that is transitory, and will not be saved with the visualization.
  // For instance, map bounds, which depends on the view port, browser window size, etc.
  function Vis(visType) {
    var visState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Vis);

    _defineProperty(this, "type", void 0);

    _defineProperty(this, "id", void 0);

    _defineProperty(this, "title", '');

    _defineProperty(this, "description", '');

    _defineProperty(this, "params", {});

    _defineProperty(this, "sessionState", {});

    _defineProperty(this, "data", {});

    _defineProperty(this, "uiState", void 0);

    this.type = this.getType(visType);
    this.params = this.getParams(visState.params);
    this.uiState = new _public.PersistedState(visState.uiState);
    this.id = visState.id;
    this.setState(visState || {});
  }

  _createClass(Vis, [{
    key: "getType",
    value: function getType(visType) {
      var type = (0, _services.getTypes)().get(visType);

      if (!type) {
        throw new Error("Invalid type \"".concat(visType, "\""));
      }

      return type;
    }
  }, {
    key: "getParams",
    value: function getParams(params) {
      return (0, _lodash.defaults)({}, (0, _lodash.cloneDeep)(params || {}), (0, _lodash.cloneDeep)(this.type.visConfig.defaults || {}));
    }
  }, {
    key: "setState",
    value: function setState(state) {
      var typeChanged = false;

      if (state.type && this.type.name !== state.type) {
        // @ts-ignore
        this.type = this.getType(state.type);
        typeChanged = true;
      }

      if (state.title !== undefined) {
        this.title = state.title;
      }

      if (state.description !== undefined) {
        this.description = state.description;
      }

      if (state.params || typeChanged) {
        this.params = this.getParams(state.params);
      } // move to migration script


      (0, _vis_update.updateVisualizationConfig)(state.params, this.params);

      if (state.data && state.data.searchSource) {
        this.data.searchSource = state.data.searchSource;
        this.data.indexPattern = this.data.searchSource.getField('index');
      }

      if (state.data && state.data.savedSearchId) {
        this.data.savedSearchId = state.data.savedSearchId;
      }

      if (state.data && state.data.aggs) {
        var configStates = this.initializeDefaultsFromSchemas((0, _lodash.cloneDeep)(state.data.aggs), this.type.schemas.all || []);

        if (!this.data.indexPattern) {
          if (state.data.aggs.length) {
            throw new Error('trying to initialize aggs without index pattern');
          }

          return;
        }

        this.data.aggs = (0, _services.getAggs)().createAggConfigs(this.data.indexPattern, configStates);
      }
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Vis(this.type.name, this.serialize());
    }
  }, {
    key: "serialize",
    value: function serialize() {
      var aggs = this.data.aggs ? this.data.aggs.aggs.map(function (agg) {
        return agg.toJSON();
      }) : [];
      var indexPattern = this.data.searchSource && this.data.searchSource.getField('index');
      return {
        id: this.id,
        title: this.title,
        type: this.type.name,
        params: (0, _lodash.cloneDeep)(this.params),
        uiState: this.uiState.toJSON(),
        data: {
          aggs: aggs,
          indexPattern: indexPattern ? indexPattern.id : undefined,
          searchSource: this.data.searchSource.createCopy(),
          savedSearchId: this.data.savedSearchId
        }
      };
    }
  }, {
    key: "toAST",
    value: function toAST() {
      return this.type.toAST(this.params);
    } // deprecated

  }, {
    key: "isHierarchical",
    value: function isHierarchical() {
      if ((0, _lodash.isFunction)(this.type.hierarchicalData)) {
        return !!this.type.hierarchicalData(this);
      } else {
        return !!this.type.hierarchicalData;
      }
    }
  }, {
    key: "initializeDefaultsFromSchemas",
    value: function initializeDefaultsFromSchemas(configStates, schemas) {
      // Set the defaults for any schema which has them. If the defaults
      // for some reason has more then the max only set the max number
      // of defaults (not sure why a someone define more...
      // but whatever). Also if a schema.name is already set then don't
      // set anything.
      var newConfigs = _toConsumableArray(configStates);

      schemas.filter(function (schema) {
        return Array.isArray(schema.defaults) && schema.defaults.length > 0;
      }).filter(function (schema) {
        return !configStates.find(function (agg) {
          return agg.schema && agg.schema === schema.name;
        });
      }).forEach(function (schema) {
        var defaultSchemaConfig = schema.defaults.slice(0, schema.max);
        defaultSchemaConfig.forEach(function (d) {
          return newConfigs.push(d);
        });
      });
      return newConfigs;
    }
  }]);

  return Vis;
}();

exports.Vis = Vis;