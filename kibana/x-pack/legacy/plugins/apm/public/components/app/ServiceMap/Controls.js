"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Controls = Controls;

var _eui = require("@elastic/eui");

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Cytoscape = require("./Cytoscape");

var _cytoscapeOptions = require("./cytoscapeOptions");

var _APMLink = require("../../shared/Links/apm/APMLink");

var _useUrlParams2 = require("../../../hooks/useUrlParams");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ControlsContainer = (0, _styledComponents.default)('div').withConfig({
  displayName: "ControlsContainer",
  componentId: "nyuhsx-0"
})(["left:", ";position:absolute;top:", ";z-index:1;"], _eui_theme_light.default.gutterTypes.gutterMedium, _eui_theme_light.default.gutterTypes.gutterSmall);
var Button = (0, _styledComponents.default)(_eui.EuiButtonIcon).withConfig({
  displayName: "Button",
  componentId: "nyuhsx-1"
})(["display:block;margin:", ";"], _eui_theme_light.default.paddingSizes.xs);
var ZoomInButton = (0, _styledComponents.default)(Button).withConfig({
  displayName: "ZoomInButton",
  componentId: "nyuhsx-2"
})(["margin-bottom:", ";"], _eui_theme_light.default.paddingSizes.s);
var Panel = (0, _styledComponents.default)(_eui.EuiPanel).withConfig({
  displayName: "Panel",
  componentId: "nyuhsx-3"
})(["margin-bottom:", ";"], _eui_theme_light.default.paddingSizes.s);
var duration = parseInt(_eui_theme_light.default.euiAnimSpeedFast, 10);
var steps = 5;

function doZoom(cy, increment) {
  if (cy) {
    var level = cy.zoom() + increment; // @ts-ignore `.position()` _does_ work on a NodeCollection. It returns the position of the first element in the collection.

    var primaryCenter = cy.nodes('.primary').position();

    var _cy$nodes$boundingBox = cy.nodes().boundingBox({}),
        x1 = _cy$nodes$boundingBox.x1,
        y1 = _cy$nodes$boundingBox.y1,
        w = _cy$nodes$boundingBox.w,
        h = _cy$nodes$boundingBox.h;

    var graphCenter = {
      x: x1 + w / 2,
      y: y1 + h / 2
    };
    cy.animate({
      duration: duration,
      zoom: {
        level: level,
        position: primaryCenter || graphCenter
      }
    });
  }
}

function Controls() {
  var _urlParams$kuery;

  var cy = (0, _react.useContext)(_Cytoscape.CytoscapeContext);

  var _useUrlParams = (0, _useUrlParams2.useUrlParams)(),
      urlParams = _useUrlParams.urlParams;

  var currentSearch = (_urlParams$kuery = urlParams.kuery) !== null && _urlParams$kuery !== void 0 ? _urlParams$kuery : '';

  var _useState = (0, _react.useState)(cy && cy.zoom() || 1),
      _useState2 = _slicedToArray(_useState, 2),
      zoom = _useState2[0],
      setZoom = _useState2[1];

  (0, _react.useEffect)(function () {
    if (cy) {
      cy.on('zoom', function (event) {
        setZoom(event.cy.zoom());
      });
    }
  }, [cy]);

  function center() {
    if (cy) {
      var eles = cy.nodes();
      cy.animate(_objectSpread({}, _cytoscapeOptions.animationOptions, {
        center: {
          eles: eles
        },
        fit: {
          eles: eles,
          padding: _cytoscapeOptions.nodeHeight
        }
      }));
    }
  }

  function zoomIn() {
    doZoom(cy, increment);
  }

  function zoomOut() {
    doZoom(cy, -increment);
  }

  if (!cy) {
    return null;
  }

  var maxZoom = cy.maxZoom();
  var isMaxZoom = zoom === maxZoom;
  var minZoom = cy.minZoom();
  var isMinZoom = zoom === minZoom;
  var increment = (maxZoom - minZoom) / steps;

  var centerLabel = _i18n.i18n.translate('xpack.apm.serviceMap.center', {
    defaultMessage: 'Center'
  });

  var viewFullMapLabel = _i18n.i18n.translate('xpack.apm.serviceMap.viewFullMap', {
    defaultMessage: 'View full service map'
  });

  var zoomInLabel = _i18n.i18n.translate('xpack.apm.serviceMap.zoomIn', {
    defaultMessage: 'Zoom in'
  });

  var zoomOutLabel = _i18n.i18n.translate('xpack.apm.serviceMap.zoomOut', {
    defaultMessage: 'Zoom out'
  });

  var showViewFullMapButton = cy.nodes('.primary').length > 0;
  return _react.default.createElement(ControlsContainer, null, _react.default.createElement(Panel, {
    hasShadow: true,
    paddingSize: "none"
  }, _react.default.createElement(_eui.EuiToolTip, {
    anchorClassName: "eui-displayInline",
    content: zoomInLabel
  }, _react.default.createElement(ZoomInButton, {
    "aria-label": zoomInLabel,
    color: "text",
    disabled: isMaxZoom,
    iconType: "plusInCircleFilled",
    onClick: zoomIn
  })), _react.default.createElement(_eui.EuiToolTip, {
    anchorClassName: "eui-displayInline",
    content: zoomOutLabel
  }, _react.default.createElement(Button, {
    "aria-label": zoomOutLabel,
    color: "text",
    disabled: isMinZoom,
    iconType: "minusInCircleFilled",
    onClick: zoomOut
  }))), _react.default.createElement(Panel, {
    hasShadow: true,
    paddingSize: "none"
  }, _react.default.createElement(_eui.EuiToolTip, {
    anchorClassName: "eui-displayInline",
    content: centerLabel
  }, _react.default.createElement(Button, {
    "aria-label": centerLabel,
    color: "text",
    iconType: "crosshairs",
    onClick: center
  }))), showViewFullMapButton && _react.default.createElement(Panel, {
    hasShadow: true,
    paddingSize: "none"
  }, _react.default.createElement(_eui.EuiToolTip, {
    anchorClassName: "eui-displayInline",
    content: viewFullMapLabel
  }, _react.default.createElement(Button, {
    "aria-label": viewFullMapLabel,
    color: "text",
    href: (0, _APMLink.getAPMHref)('/service-map', currentSearch, urlParams),
    iconType: "apps"
  }))));
}