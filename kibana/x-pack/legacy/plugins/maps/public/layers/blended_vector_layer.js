"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlendedVectorLayer = void 0;

var _i18n = require("@kbn/i18n");

var _vector_layer = require("./vector_layer");

var _vector_style = require("./styles/vector/vector_style");

var _vector_style_defaults = require("./styles/vector/vector_style_defaults");

var _constants = require("../../common/constants");

var _es_geo_grid_source = require("./sources/es_geo_grid_source/es_geo_grid_source");

var _can_skip_fetch = require("./util/can_skip_fetch");

var _data_request = require("./util/data_request");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var ACTIVE_COUNT_DATA_ID = 'ACTIVE_COUNT_DATA_ID';

function getAggType(dynamicProperty) {
  return dynamicProperty.isOrdinal() ? _constants.AGG_TYPE.AVG : _constants.AGG_TYPE.TERMS;
}

function getClusterSource(documentSource, documentStyle) {
  var clusterSourceDescriptor = _es_geo_grid_source.ESGeoGridSource.createDescriptor({
    indexPatternId: documentSource.getIndexPatternId(),
    geoField: documentSource.getGeoFieldName(),
    requestType: _constants.RENDER_AS.POINT
  });

  clusterSourceDescriptor.metrics = [{
    type: _constants.AGG_TYPE.COUNT,
    label: _constants.COUNT_PROP_LABEL
  }].concat(_toConsumableArray(documentStyle.getDynamicPropertiesArray().map(function (dynamicProperty) {
    return {
      type: getAggType(dynamicProperty),
      field: dynamicProperty.getFieldName()
    };
  })));
  clusterSourceDescriptor.id = documentSource.getId();
  return new _es_geo_grid_source.ESGeoGridSource(clusterSourceDescriptor, documentSource.getInspectorAdapters());
}

function getClusterStyleDescriptor(documentStyle, clusterSource) {
  var _properties;

  var defaultDynamicProperties = (0, _vector_style_defaults.getDefaultDynamicProperties)();
  var clusterStyleDescriptor = {
    type: _constants.LAYER_STYLE_TYPE.VECTOR,
    properties: (_properties = {}, _defineProperty(_properties, _constants.VECTOR_STYLES.LABEL_TEXT, {
      type: _constants.STYLE_TYPE.DYNAMIC,
      options: _objectSpread({}, defaultDynamicProperties[_constants.VECTOR_STYLES.LABEL_TEXT].options, {
        field: {
          name: _constants.COUNT_PROP_NAME,
          origin: _constants.FIELD_ORIGIN.SOURCE
        }
      })
    }), _defineProperty(_properties, _constants.VECTOR_STYLES.ICON_SIZE, {
      type: _constants.STYLE_TYPE.DYNAMIC,
      options: _objectSpread({}, defaultDynamicProperties[_constants.VECTOR_STYLES.ICON_SIZE].options, {
        field: {
          name: _constants.COUNT_PROP_NAME,
          origin: _constants.FIELD_ORIGIN.SOURCE
        }
      })
    }), _properties)
  };
  documentStyle.getAllStyleProperties().forEach(function (styleProperty) {
    var styleName = styleProperty.getStyleName();

    if ([_constants.VECTOR_STYLES.LABEL_TEXT, _constants.VECTOR_STYLES.ICON_SIZE].includes(styleName) && (!styleProperty.isDynamic() || !styleProperty.isComplete())) {
      // Do not migrate static label and icon size properties to provide unique cluster styling out of the box
      return;
    }

    if (styleName === _constants.VECTOR_STYLES.SYMBOLIZE_AS || styleName === _constants.VECTOR_STYLES.LABEL_BORDER_SIZE) {
      // copy none static/dynamic styles to cluster style
      // @ts-ignore
      clusterStyleDescriptor.properties[styleName] = {
        options: _objectSpread({}, styleProperty.getOptions())
      };
    } else if (styleProperty.isDynamic()) {
      // copy dynamic styles to cluster style
      var options = styleProperty.getOptions();
      var field = options && options.field && options.field.name ? _objectSpread({}, options.field, {
        name: clusterSource.getAggKey(getAggType(styleProperty), options.field.name)
      }) : undefined; // @ts-ignore

      clusterStyleDescriptor.properties[styleName] = {
        type: _constants.STYLE_TYPE.DYNAMIC,
        options: _objectSpread({}, options, {
          field: field
        })
      };
    } else {
      // copy static styles to cluster style
      // @ts-ignore
      clusterStyleDescriptor.properties[styleName] = {
        type: _constants.STYLE_TYPE.STATIC,
        options: _objectSpread({}, styleProperty.getOptions())
      };
    }
  });
  return clusterStyleDescriptor;
}

var BlendedVectorLayer =
/*#__PURE__*/
function (_VectorLayer) {
  _inherits(BlendedVectorLayer, _VectorLayer);

  _createClass(BlendedVectorLayer, null, [{
    key: "createDescriptor",
    value: function createDescriptor(options, mapColors) {
      var layerDescriptor = _vector_layer.VectorLayer.createDescriptor(options, mapColors);

      layerDescriptor.type = BlendedVectorLayer.type;
      return layerDescriptor;
    }
  }]);

  function BlendedVectorLayer(options) {
    var _this;

    _classCallCheck(this, BlendedVectorLayer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BlendedVectorLayer).call(this, options));

    _defineProperty(_assertThisInitialized(_this), "_isClustered", void 0);

    _defineProperty(_assertThisInitialized(_this), "_clusterSource", void 0);

    _defineProperty(_assertThisInitialized(_this), "_clusterStyle", void 0);

    _defineProperty(_assertThisInitialized(_this), "_documentSource", void 0);

    _defineProperty(_assertThisInitialized(_this), "_documentStyle", void 0);

    _this._documentSource = _this._source; // VectorLayer constructor sets _source as document source

    _this._documentStyle = _this._style; // VectorLayer constructor sets _style as document source

    _this._clusterSource = getClusterSource(_this._documentSource, _this._documentStyle);
    var clusterStyleDescriptor = getClusterStyleDescriptor(_this._documentStyle, _this._clusterSource);
    _this._clusterStyle = new _vector_style.VectorStyle(clusterStyleDescriptor, _this._clusterSource, _assertThisInitialized(_this));
    var isClustered = false;

    var sourceDataRequest = _this.getSourceDataRequest();

    if (sourceDataRequest) {
      var requestMeta = sourceDataRequest.getMeta();

      if (requestMeta && requestMeta.sourceType && requestMeta.sourceType === _constants.ES_GEO_GRID) {
        isClustered = true;
      }
    }

    _this._isClustered = isClustered;
    return _this;
  }

  _createClass(BlendedVectorLayer, [{
    key: "destroy",
    value: function destroy() {
      if (this._documentSource) {
        this._documentSource.destroy();
      }

      if (this._clusterSource) {
        this._clusterSource.destroy();
      }
    }
  }, {
    key: "getDisplayName",
    value: function () {
      var _getDisplayName = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(source) {
        var displayName;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _get(_getPrototypeOf(BlendedVectorLayer.prototype), "getDisplayName", this).call(this, source);

              case 2:
                displayName = _context.sent;
                return _context.abrupt("return", this._isClustered ? _i18n.i18n.translate('xpack.maps.blendedVectorLayer.clusteredLayerName', {
                  defaultMessage: 'Clustered {displayName}',
                  values: {
                    displayName: displayName
                  }
                }) : displayName);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getDisplayName(_x) {
        return _getDisplayName.apply(this, arguments);
      }

      return getDisplayName;
    }()
  }, {
    key: "isJoinable",
    value: function isJoinable() {
      return false;
    }
  }, {
    key: "getJoins",
    value: function getJoins() {
      return [];
    }
  }, {
    key: "getSource",
    value: function getSource() {
      return this._isClustered ? this._clusterSource : this._documentSource;
    }
  }, {
    key: "getSourceForEditing",
    value: function getSourceForEditing() {
      // Layer is based on this._documentSource
      // this._clusterSource is a derived source for rendering only.
      // Regardless of this._activeSource, this._documentSource should always be displayed in the editor
      return this._documentSource;
    }
  }, {
    key: "getCurrentStyle",
    value: function getCurrentStyle() {
      return this._isClustered ? this._clusterStyle : this._documentStyle;
    }
  }, {
    key: "getStyleForEditing",
    value: function getStyleForEditing() {
      return this._documentStyle;
    }
  }, {
    key: "syncData",
    value: function () {
      var _syncData = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(syncContext) {
        var dataRequestId, requestToken, searchFilters, canSkipFetch, isSyncClustered, searchSource, resp, maxResultWindow, activeSource, activeStyle;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                dataRequestId = ACTIVE_COUNT_DATA_ID;
                requestToken = Symbol("layer-active-count:".concat(this.getId()));
                searchFilters = this._getSearchFilters(syncContext.dataFilters, this.getSource(), this.getCurrentStyle());
                _context2.next = 5;
                return (0, _can_skip_fetch.canSkipSourceUpdate)({
                  source: this.getSource(),
                  prevDataRequest: this.getDataRequest(dataRequestId),
                  nextMeta: searchFilters
                });

              case 5:
                canSkipFetch = _context2.sent;

                if (!canSkipFetch) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt("return");

              case 8:
                _context2.prev = 8;
                syncContext.startLoading(dataRequestId, requestToken, searchFilters);
                _context2.next = 12;
                return this._documentSource.makeSearchSource(searchFilters, 0);

              case 12:
                searchSource = _context2.sent;
                _context2.next = 15;
                return searchSource.fetch();

              case 15:
                resp = _context2.sent;
                _context2.next = 18;
                return this._documentSource.getMaxResultWindow();

              case 18:
                maxResultWindow = _context2.sent;
                isSyncClustered = resp.hits.total > maxResultWindow;
                syncContext.stopLoading(dataRequestId, requestToken, {
                  isSyncClustered: isSyncClustered
                }, searchFilters);
                _context2.next = 27;
                break;

              case 23:
                _context2.prev = 23;
                _context2.t0 = _context2["catch"](8);

                if (!(_context2.t0 instanceof _data_request.DataRequestAbortError)) {
                  syncContext.onLoadError(dataRequestId, requestToken, _context2.t0.message);
                }

                return _context2.abrupt("return");

              case 27:
                if (isSyncClustered) {
                  activeSource = this._clusterSource;
                  activeStyle = this._clusterStyle;
                } else {
                  activeSource = this._documentSource;
                  activeStyle = this._documentStyle;
                }

                _get(_getPrototypeOf(BlendedVectorLayer.prototype), "_syncData", this).call(this, syncContext, activeSource, activeStyle);

              case 29:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[8, 23]]);
      }));

      function syncData(_x2) {
        return _syncData.apply(this, arguments);
      }

      return syncData;
    }()
  }]);

  return BlendedVectorLayer;
}(_vector_layer.VectorLayer);

exports.BlendedVectorLayer = BlendedVectorLayer;

_defineProperty(BlendedVectorLayer, "type", _constants.LAYER_TYPE.BLENDED_VECTOR);