"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cytoscape = Cytoscape;
exports.CytoscapeContext = void 0;

var _cytoscape = _interopRequireDefault(require("cytoscape"));

var _react = _interopRequireWildcard(require("react"));

var _lodash = require("lodash");

var _cytoscapeOptions = require("./cytoscapeOptions");

var _public = require("../../../../../../../plugins/observability/public");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var CytoscapeContext = (0, _react.createContext)(undefined);
exports.CytoscapeContext = CytoscapeContext;

function useCytoscape(options) {
  var _useState = (0, _react.useState)(undefined),
      _useState2 = _slicedToArray(_useState, 2),
      cy = _useState2[0],
      setCy = _useState2[1];

  var ref = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    if (!cy) {
      setCy((0, _cytoscape.default)(_objectSpread({}, options, {
        container: ref.current
      })));
    }
  }, [options, cy]); // Destroy the cytoscape instance on unmount

  (0, _react.useEffect)(function () {
    return function () {
      if (cy) {
        cy.destroy();
      }
    };
  }, [cy]);
  return [ref, cy];
}

function rotatePoint(_ref, degreesRotated) {
  var x = _ref.x,
      y = _ref.y;
  var radiansPerDegree = Math.PI / 180;
  var θ = radiansPerDegree * degreesRotated;
  var cosθ = Math.cos(θ);
  var sinθ = Math.sin(θ);
  return {
    x: x * cosθ - y * sinθ,
    y: x * sinθ + y * cosθ
  };
}

function getLayoutOptions(selectedRoots, height, width) {
  return {
    name: 'breadthfirst',
    roots: selectedRoots.length ? selectedRoots : undefined,
    fit: true,
    padding: _cytoscapeOptions.nodeHeight,
    spacingFactor: 0.85,
    animate: true,
    animationEasing: _cytoscapeOptions.animationOptions.easing,
    animationDuration: _cytoscapeOptions.animationOptions.duration,
    // @ts-ignore
    // Rotate nodes counter-clockwise to transform layout from top→bottom to left→right.
    // The extra 5° achieves the effect of separating overlapping taxi-styled edges.
    transform: function transform(node, pos) {
      return rotatePoint(pos, -95);
    },
    // swap width/height of boundingBox to compensate for the rotation
    boundingBox: {
      x1: 0,
      y1: 0,
      w: height,
      h: width
    }
  };
}

function selectRoots(cy) {
  var bfs = cy.elements().bfs({
    roots: cy.elements().leaves()
  });
  var furthestNodeFromLeaves = bfs.path.last();
  return cy.elements().roots().union(furthestNodeFromLeaves).map(function (el) {
    return el.id();
  });
}

function Cytoscape(_ref2) {
  var children = _ref2.children,
      elements = _ref2.elements,
      height = _ref2.height,
      width = _ref2.width,
      serviceName = _ref2.serviceName,
      style = _ref2.style;

  var _useCytoscape = useCytoscape(_objectSpread({}, _cytoscapeOptions.cytoscapeOptions, {
    elements: elements
  })),
      _useCytoscape2 = _slicedToArray(_useCytoscape, 2),
      ref = _useCytoscape2[0],
      cy = _useCytoscape2[1]; // Add the height to the div style. The height is a separate prop because it
  // is required and can trigger rendering when changed.


  var divStyle = _objectSpread({}, style, {
    height: height
  });

  var trackApmEvent = (0, _public.useUiTracker)({
    app: 'apm'
  }); // Trigger a custom "data" event when data changes

  (0, _react.useEffect)(function () {
    if (cy && elements.length > 0) {
      var renderedElements = cy.elements('node,edge');
      var latestElementIds = elements.map(function (el) {
        return el.data.id;
      });
      var absentElements = renderedElements.filter(function (el) {
        return !latestElementIds.includes(el.id());
      });
      cy.remove(absentElements);
      cy.add(elements);
      cy.trigger('data');
    }
  }, [cy, elements]); // Set up cytoscape event handlers

  (0, _react.useEffect)(function () {
    var resetConnectedEdgeStyle = function resetConnectedEdgeStyle(node) {
      if (cy) {
        cy.edges().removeClass('highlight');

        if (node) {
          node.connectedEdges().addClass('highlight');
        }
      }
    };

    var dataHandler = function dataHandler(event) {
      if (cy) {
        if (serviceName) {
          resetConnectedEdgeStyle(cy.getElementById(serviceName)); // Add the "primary" class to the node if its id matches the serviceName.

          if (cy.nodes().length > 0) {
            cy.nodes().removeClass('primary');
            cy.getElementById(serviceName).addClass('primary');
          }
        } else {
          resetConnectedEdgeStyle();
        }

        var selectedRoots = selectRoots(event.cy);
        var layout = cy.layout(getLayoutOptions(selectedRoots, height, width));
        layout.run();
      }
    };

    var layoutstopDelayTimeout;

    var layoutstopHandler = function layoutstopHandler(event) {
      // This 0ms timer is necessary to prevent a race condition
      // between the layout finishing rendering and viewport centering
      layoutstopDelayTimeout = setTimeout(function () {
        if (serviceName) {
          event.cy.animate(_objectSpread({}, _cytoscapeOptions.animationOptions, {
            fit: {
              eles: event.cy.elements(),
              padding: _cytoscapeOptions.nodeHeight
            },
            center: {
              eles: event.cy.getElementById(serviceName)
            }
          }));
        } else {
          event.cy.fit(undefined, _cytoscapeOptions.nodeHeight);
        }
      }, 0);
    }; // debounce hover tracking so it doesn't spam telemetry with redundant events


    var trackNodeEdgeHover = (0, _lodash.debounce)(function () {
      return trackApmEvent({
        metric: 'service_map_node_or_edge_hover'
      });
    }, 1000);

    var mouseoverHandler = function mouseoverHandler(event) {
      trackNodeEdgeHover();
      event.target.addClass('hover');
      event.target.connectedEdges().addClass('nodeHover');
    };

    var mouseoutHandler = function mouseoutHandler(event) {
      event.target.removeClass('hover');
      event.target.connectedEdges().removeClass('nodeHover');
    };

    var selectHandler = function selectHandler(event) {
      trackApmEvent({
        metric: 'service_map_node_select'
      });
      resetConnectedEdgeStyle(event.target);
    };

    var unselectHandler = function unselectHandler(event) {
      resetConnectedEdgeStyle();
    };

    var debugHandler = function debugHandler(event) {
      var debugEnabled = sessionStorage.getItem('apm_debug') === 'true';

      if (debugEnabled) {
        // eslint-disable-next-line no-console
        console.debug('cytoscape:', event);
      }
    };

    if (cy) {
      cy.on('data layoutstop select unselect', debugHandler);
      cy.on('data', dataHandler);
      cy.on('layoutstop', layoutstopHandler);
      cy.on('mouseover', 'edge, node', mouseoverHandler);
      cy.on('mouseout', 'edge, node', mouseoutHandler);
      cy.on('select', 'node', selectHandler);
      cy.on('unselect', 'node', unselectHandler);
    }

    return function () {
      if (cy) {
        cy.removeListener('data layoutstop select unselect', undefined, debugHandler);
        cy.removeListener('data', undefined, dataHandler);
        cy.removeListener('layoutstop', undefined, layoutstopHandler);
        cy.removeListener('mouseover', 'edge, node', mouseoverHandler);
        cy.removeListener('mouseout', 'edge, node', mouseoutHandler);
        cy.removeListener('select', 'node', selectHandler);
        cy.removeListener('unselect', 'node', unselectHandler);
      }

      clearTimeout(layoutstopDelayTimeout);
    };
  }, [cy, height, serviceName, trackApmEvent, width]);
  return _react.default.createElement(CytoscapeContext.Provider, {
    value: cy
  }, _react.default.createElement("div", {
    ref: ref,
    style: divStyle
  }, children));
}