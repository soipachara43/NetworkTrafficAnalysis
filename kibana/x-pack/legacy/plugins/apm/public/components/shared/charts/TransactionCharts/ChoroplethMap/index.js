"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProgressionColor = getProgressionColor;
exports.ChoroplethMap = void 0;

var _react = _interopRequireWildcard(require("react"));

var _mapboxGl = require("mapbox-gl");

require("mapbox-gl/dist/mapbox-gl.css");

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _polished = require("polished");

var _ChoroplethToolTip = require("./ChoroplethToolTip");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var CHOROPLETH_LAYER_ID = 'choropleth_layer';
var CHOROPLETH_POLYGONS_SOURCE_ID = 'choropleth_polygons';
var GEOJSON_KEY_PROPERTY = 'iso2';
var MAPBOX_STYLE = 'https://tiles.maps.elastic.co/styles/osm-bright-desaturated/style.json';
var GEOJSON_SOURCE = 'https://vector.maps.elastic.co/files/world_countries_v1.geo.json?elastic_tile_service_tos=agree&my_app_name=ems-landing&my_app_version=7.2.0';

function getProgressionColor(scale) {
  var baseColor = _eui_theme_light.default.euiColorPrimary;
  var adjustedScale = 0.75 * scale + 0.05; // prevents pure black & white as min/max colors.

  if (adjustedScale < 0.5) {
    return (0, _polished.tint)(adjustedScale * 2, baseColor);
  }

  if (adjustedScale > 0.5) {
    return (0, _polished.shade)(1 - (adjustedScale - 0.5) * 2, baseColor);
  }

  return baseColor;
}

var getMin = function getMin(items) {
  return Math.min.apply(Math, _toConsumableArray(items.map(function (item) {
    return item.value;
  })));
};

var getMax = function getMax(items) {
  return Math.max.apply(Math, _toConsumableArray(items.map(function (item) {
    return item.value;
  })));
};

var ChoroplethMap = function ChoroplethMap(props) {
  var items = props.items;
  var containerRef = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      map = _useState2[0],
      setMap = _useState2[1];

  var popupRef = (0, _react.useRef)(null);
  var popupContainerRef = (0, _react.useRef)(null);

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      tooltipState = _useState4[0],
      setTooltipState = _useState4[1];

  var _useMemo = (0, _react.useMemo)(function () {
    return [getMin(items), getMax(items)];
  }, [items]),
      _useMemo2 = _slicedToArray(_useMemo, 2),
      min = _useMemo2[0],
      max = _useMemo2[1]; // converts an item value to a scaled value between 0 and 1


  var getValueScale = (0, _react.useCallback)(function (value) {
    return (value - min) / (max - min);
  }, [max, min]);
  var controlScrollZoomOnWheel = (0, _react.useCallback)(function (event) {
    if (event.ctrlKey || event.metaKey) {
      event.preventDefault();
    } else {
      event.stopPropagation();
    }
  }, []); // side effect creates a new mouseover handler referencing new component state
  // and replaces the old one stored in `updateTooltipStateOnMousemoveRef`

  (0, _react.useEffect)(function () {
    var updateTooltipStateOnMousemove = function updateTooltipStateOnMousemove(event) {
      var isMapQueryable = map && popupRef.current && items.length && map.getLayer(CHOROPLETH_LAYER_ID);

      if (!isMapQueryable) {
        return;
      }

      popupRef.current.setLngLat(event.lngLat);
      var hoverFeatures = map.queryRenderedFeatures(event.point, {
        layers: [CHOROPLETH_LAYER_ID]
      });

      if (tooltipState && hoverFeatures.length === 0) {
        return setTooltipState(null);
      }

      var featureProperties = hoverFeatures[0].properties;

      if (tooltipState && tooltipState.name === featureProperties.name) {
        return;
      }

      var item = items.find(function (_ref) {
        var key = _ref.key;
        return featureProperties && key === featureProperties[GEOJSON_KEY_PROPERTY];
      });

      if (item) {
        return setTooltipState({
          name: featureProperties.name,
          value: item.value,
          docCount: item.docCount
        });
      }

      setTooltipState(null);
    };

    updateTooltipStateOnMousemoveRef.current = updateTooltipStateOnMousemove;
  }, [map, items, tooltipState]);
  var updateTooltipStateOnMousemoveRef = (0, _react.useRef)(function (event) {}); // initialization side effect, only runs once

  (0, _react.useEffect)(function () {
    if (containerRef.current === null) {
      return;
    } // set up Map object


    var mapboxMap = new _mapboxGl.Map({
      attributionControl: false,
      container: containerRef.current,
      dragRotate: false,
      touchZoomRotate: false,
      zoom: 0.85,
      center: {
        lng: 0,
        lat: 30
      },
      style: MAPBOX_STYLE
    });
    mapboxMap.addControl(new _mapboxGl.NavigationControl({
      showCompass: false
    }), 'top-left'); // set up Popup object

    popupRef.current = new _mapboxGl.Popup({
      closeButton: false,
      closeOnClick: false
    }); // always use the current handler which changes with component state

    mapboxMap.on('mousemove', function () {
      return updateTooltipStateOnMousemoveRef.current.apply(updateTooltipStateOnMousemoveRef, arguments);
    });
    mapboxMap.on('mouseout', function () {
      setTooltipState(null);
    }); // only scroll zoom when key is pressed

    var canvasElement = mapboxMap.getCanvas();
    canvasElement.addEventListener('wheel', controlScrollZoomOnWheel);
    mapboxMap.on('load', function () {
      mapboxMap.addSource(CHOROPLETH_POLYGONS_SOURCE_ID, {
        type: 'geojson',
        data: GEOJSON_SOURCE
      });
      setMap(mapboxMap);
    }); // cleanup function called when component unmounts

    return function () {
      canvasElement.removeEventListener('wheel', controlScrollZoomOnWheel);
    };
  }, [controlScrollZoomOnWheel]); // side effect replaces choropleth layer with new one on items changes

  (0, _react.useEffect)(function () {
    if (!map) {
      return;
    } // find first symbol layer to place new layer in correct order


    var symbolLayer = (map.getStyle().layers || []).find(function (_ref2) {
      var type = _ref2.type;
      return type === 'symbol';
    });

    if (map.getLayer(CHOROPLETH_LAYER_ID)) {
      map.removeLayer(CHOROPLETH_LAYER_ID);
    }

    if (items.length === 0) {
      return;
    }

    var stops = items.map(function (_ref3) {
      var key = _ref3.key,
          value = _ref3.value;
      return [key, getProgressionColor(getValueScale(value))];
    });
    var fillColor = {
      property: GEOJSON_KEY_PROPERTY,
      stops: stops,
      type: 'categorical',
      default: 'transparent'
    };
    map.addLayer({
      id: CHOROPLETH_LAYER_ID,
      type: 'fill',
      source: CHOROPLETH_POLYGONS_SOURCE_ID,
      layout: {},
      paint: {
        'fill-opacity': 0.75,
        'fill-color': fillColor
      }
    }, symbolLayer ? symbolLayer.id : undefined);
  }, [map, items, getValueScale]); // side effect to only render the Popup when hovering a region with a matching item

  (0, _react.useEffect)(function () {
    if (!(popupContainerRef.current && map && popupRef.current)) {
      return;
    }

    if (tooltipState) {
      popupRef.current.setDOMContent(popupContainerRef.current).addTo(map);

      if (popupContainerRef.current.parentElement) {
        popupContainerRef.current.parentElement.style.pointerEvents = 'none';
      }
    } else {
      popupRef.current.remove();
    }
  }, [map, tooltipState]); // render map container and tooltip in a hidden container

  return _react.default.createElement("div", null, _react.default.createElement("div", {
    ref: containerRef,
    style: {
      height: 256
    }
  }), _react.default.createElement("div", {
    style: {
      display: 'none'
    }
  }, _react.default.createElement("div", {
    ref: popupContainerRef
  }, tooltipState ? _react.default.createElement(_ChoroplethToolTip.ChoroplethToolTip, tooltipState) : null)));
};

exports.ChoroplethMap = ChoroplethMap;