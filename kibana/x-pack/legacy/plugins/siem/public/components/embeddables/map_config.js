"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLineLayer = exports.getDestinationLayer = exports.getSourceLayer = exports.getLayerList = exports.lmc = exports.SUM_OF_SERVER_BYTES = exports.SUM_OF_CLIENT_BYTES = exports.SUM_OF_DESTINATION_BYTES = exports.SUM_OF_SOURCE_BYTES = exports.sourceDestinationFieldMappings = void 0;

var _uuid = _interopRequireDefault(require("uuid"));

var _eui = require("@elastic/eui");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var euiVisColorPalette = (0, _eui.euiPaletteColorBlind)(); // Update field mappings to modify what fields will be returned to map tooltip

var sourceFieldMappings = {
  'host.name': i18n.HOST,
  'source.ip': i18n.SOURCE_IP,
  'source.domain': i18n.SOURCE_DOMAIN,
  'source.geo.country_iso_code': i18n.LOCATION,
  'source.as.organization.name': i18n.ASN
};
var destinationFieldMappings = {
  'host.name': i18n.HOST,
  'destination.ip': i18n.DESTINATION_IP,
  'destination.domain': i18n.DESTINATION_DOMAIN,
  'destination.geo.country_iso_code': i18n.LOCATION,
  'destination.as.organization.name': i18n.ASN
};
var clientFieldMappings = {
  'host.name': i18n.HOST,
  'client.ip': i18n.CLIENT_IP,
  'client.domain': i18n.CLIENT_DOMAIN,
  'client.geo.country_iso_code': i18n.LOCATION,
  'client.as.organization.name': i18n.ASN
};
var serverFieldMappings = {
  'host.name': i18n.HOST,
  'server.ip': i18n.SERVER_IP,
  'server.domain': i18n.SERVER_DOMAIN,
  'server.geo.country_iso_code': i18n.LOCATION,
  'server.as.organization.name': i18n.ASN
}; // Mapping of field -> display name for use within map tooltip

var sourceDestinationFieldMappings = _objectSpread({}, sourceFieldMappings, {}, destinationFieldMappings, {}, clientFieldMappings, {}, serverFieldMappings); // Field names of LineLayer props returned from Maps API


exports.sourceDestinationFieldMappings = sourceDestinationFieldMappings;
var SUM_OF_SOURCE_BYTES = 'sum_of_source.bytes';
exports.SUM_OF_SOURCE_BYTES = SUM_OF_SOURCE_BYTES;
var SUM_OF_DESTINATION_BYTES = 'sum_of_destination.bytes';
exports.SUM_OF_DESTINATION_BYTES = SUM_OF_DESTINATION_BYTES;
var SUM_OF_CLIENT_BYTES = 'sum_of_client.bytes';
exports.SUM_OF_CLIENT_BYTES = SUM_OF_CLIENT_BYTES;
var SUM_OF_SERVER_BYTES = 'sum_of_server.bytes'; // Mapping to fields for creating specific layers for a given index pattern
// e.g. The apm-* index pattern needs layers for client/server instead of source/destination

exports.SUM_OF_SERVER_BYTES = SUM_OF_SERVER_BYTES;
var lmc = {
  default: {
    source: {
      metricField: 'source.bytes',
      geoField: 'source.geo.location',
      tooltipProperties: Object.keys(sourceFieldMappings),
      label: i18n.SOURCE_LAYER
    },
    destination: {
      metricField: 'destination.bytes',
      geoField: 'destination.geo.location',
      tooltipProperties: Object.keys(destinationFieldMappings),
      label: i18n.DESTINATION_LAYER
    }
  },
  'apm-*': {
    source: {
      metricField: 'client.bytes',
      geoField: 'client.geo.location',
      tooltipProperties: Object.keys(clientFieldMappings),
      label: i18n.CLIENT_LAYER
    },
    destination: {
      metricField: 'server.bytes',
      geoField: 'server.geo.location',
      tooltipProperties: Object.keys(serverFieldMappings),
      label: i18n.SERVER_LAYER
    }
  }
};
/**
 * Returns `Source/Destination Point-to-point` Map LayerList configuration, with a source,
 * destination, and line layer for each of the provided indexPatterns
 *
 * @param indexPatternIds array of indexPatterns' title and id
 */

exports.lmc = lmc;

var getLayerList = function getLayerList(indexPatternIds) {
  return [{
    sourceDescriptor: {
      type: 'EMS_TMS',
      isAutoSelect: true
    },
    id: _uuid.default.v4(),
    label: null,
    minZoom: 0,
    maxZoom: 24,
    alpha: 1,
    visible: true,
    style: null,
    type: 'VECTOR_TILE'
  }].concat(_toConsumableArray(indexPatternIds.reduce(function (acc, _ref) {
    var _lmc$title, _ref2, _lmc$title2, _ref3, _lmc$title3;

    var title = _ref.title,
        id = _ref.id;
    return [].concat(_toConsumableArray(acc), [getLineLayer(title, id, (_lmc$title = lmc[title]) !== null && _lmc$title !== void 0 ? _lmc$title : lmc.default), getDestinationLayer(title, id, (_ref2 = (_lmc$title2 = lmc[title]) === null || _lmc$title2 === void 0 ? void 0 : _lmc$title2.destination) !== null && _ref2 !== void 0 ? _ref2 : lmc.default.destination), getSourceLayer(title, id, (_ref3 = (_lmc$title3 = lmc[title]) === null || _lmc$title3 === void 0 ? void 0 : _lmc$title3.source) !== null && _ref3 !== void 0 ? _ref3 : lmc.default.source)]);
  }, [])));
};
/**
 * Returns Document Data Source layer configuration ('source.geo.location') for the given
 * indexPattern title/id
 *
 * @param indexPatternTitle used as layer name in LayerToC UI: "${indexPatternTitle} | Source point"
 * @param indexPatternId used as layer's indexPattern to query for data
 * @param layerDetails layer-specific field details
 */


exports.getLayerList = getLayerList;

var getSourceLayer = function getSourceLayer(indexPatternTitle, indexPatternId, layerDetails) {
  return {
    sourceDescriptor: {
      id: _uuid.default.v4(),
      type: 'ES_SEARCH',
      applyGlobalQuery: true,
      geoField: layerDetails.geoField,
      filterByMapBounds: false,
      tooltipProperties: layerDetails.tooltipProperties,
      useTopHits: false,
      topHitsTimeField: '@timestamp',
      topHitsSize: 1,
      indexPatternId: indexPatternId
    },
    style: {
      type: 'VECTOR',
      properties: {
        fillColor: {
          type: 'STATIC',
          options: {
            color: euiVisColorPalette[1]
          }
        },
        lineColor: {
          type: 'STATIC',
          options: {
            color: '#FFFFFF'
          }
        },
        lineWidth: {
          type: 'STATIC',
          options: {
            size: 2
          }
        },
        iconSize: {
          type: 'STATIC',
          options: {
            size: 8
          }
        },
        iconOrientation: {
          type: 'STATIC',
          options: {
            orientation: 0
          }
        },
        symbolizeAs: {
          options: {
            value: 'icon'
          }
        },
        icon: {
          type: 'STATIC',
          options: {
            value: 'home'
          }
        }
      }
    },
    id: _uuid.default.v4(),
    label: "".concat(indexPatternTitle, " | ").concat(layerDetails.label),
    minZoom: 0,
    maxZoom: 24,
    alpha: 1,
    visible: true,
    type: 'VECTOR',
    query: {
      query: '',
      language: 'kuery'
    },
    joins: []
  };
};
/**
 * Returns Document Data Source layer configuration ('destination.geo.location') for the given
 * indexPattern title/id
 *
 * @param indexPatternTitle used as layer name in LayerToC UI: "${indexPatternTitle} | Destination point"
 * @param indexPatternId used as layer's indexPattern to query for data
 * @param layerDetails layer-specific field details
 *
 */


exports.getSourceLayer = getSourceLayer;

var getDestinationLayer = function getDestinationLayer(indexPatternTitle, indexPatternId, layerDetails) {
  return {
    sourceDescriptor: {
      id: _uuid.default.v4(),
      type: 'ES_SEARCH',
      applyGlobalQuery: true,
      geoField: layerDetails.geoField,
      filterByMapBounds: true,
      tooltipProperties: layerDetails.tooltipProperties,
      useTopHits: false,
      topHitsTimeField: '@timestamp',
      topHitsSize: 1,
      indexPatternId: indexPatternId
    },
    style: {
      type: 'VECTOR',
      properties: {
        fillColor: {
          type: 'STATIC',
          options: {
            color: euiVisColorPalette[2]
          }
        },
        lineColor: {
          type: 'STATIC',
          options: {
            color: '#FFFFFF'
          }
        },
        lineWidth: {
          type: 'STATIC',
          options: {
            size: 2
          }
        },
        iconSize: {
          type: 'STATIC',
          options: {
            size: 8
          }
        },
        iconOrientation: {
          type: 'STATIC',
          options: {
            orientation: 0
          }
        },
        symbolizeAs: {
          options: {
            value: 'icon'
          }
        },
        icon: {
          type: 'STATIC',
          options: {
            value: 'marker'
          }
        }
      }
    },
    id: _uuid.default.v4(),
    label: "".concat(indexPatternTitle, " | ").concat(layerDetails.label),
    minZoom: 0,
    maxZoom: 24,
    alpha: 1,
    visible: true,
    type: 'VECTOR',
    query: {
      query: '',
      language: 'kuery'
    }
  };
};
/**
 * Returns Point-to-point Data Source layer configuration ('source.geo.location' &
 * 'source.geo.location') for the given indexPattern title/id
 *
 * @param indexPatternTitle used as layer name in LayerToC UI: "${indexPatternTitle} | Line"
 * @param indexPatternId used as layer's indexPattern to query for data
 * @param layerDetails layer-specific field details
 */


exports.getDestinationLayer = getDestinationLayer;

var getLineLayer = function getLineLayer(indexPatternTitle, indexPatternId, layerDetails) {
  return {
    sourceDescriptor: {
      type: 'ES_PEW_PEW',
      applyGlobalQuery: true,
      id: _uuid.default.v4(),
      indexPatternId: indexPatternId,
      sourceGeoField: layerDetails.source.geoField,
      destGeoField: layerDetails.destination.geoField,
      metrics: [{
        type: 'sum',
        field: layerDetails.source.metricField,
        label: layerDetails.source.metricField
      }, {
        type: 'sum',
        field: layerDetails.destination.metricField,
        label: layerDetails.destination.metricField
      }]
    },
    style: {
      type: 'VECTOR',
      properties: {
        fillColor: {
          type: 'STATIC',
          options: {
            color: '#1EA593'
          }
        },
        lineColor: {
          type: 'STATIC',
          options: {
            color: euiVisColorPalette[1]
          }
        },
        lineWidth: {
          type: 'DYNAMIC',
          options: {
            field: {
              label: 'count',
              name: 'doc_count',
              origin: 'source'
            },
            minSize: 1,
            maxSize: 8,
            fieldMetaOptions: {
              isEnabled: true,
              sigma: 3
            }
          }
        },
        iconSize: {
          type: 'STATIC',
          options: {
            size: 10
          }
        },
        iconOrientation: {
          type: 'STATIC',
          options: {
            orientation: 0
          }
        },
        symbolizeAs: {
          options: {
            value: 'icon'
          }
        },
        icon: {
          type: 'STATIC',
          options: {
            value: 'airfield'
          }
        }
      }
    },
    id: _uuid.default.v4(),
    label: "".concat(indexPatternTitle, " | ").concat(i18n.LINE_LAYER),
    minZoom: 0,
    maxZoom: 24,
    alpha: 0.5,
    visible: true,
    type: 'VECTOR',
    query: {
      query: '',
      language: 'kuery'
    }
  };
};

exports.getLineLayer = getLineLayer;