"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.simplePositioning = exports.elementToShape = exports.isGroupId = void 0;

var _matrix = require("../../lib/aeroelastic/matrix");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var isGroupId = function isGroupId(id) {
  return id.startsWith('group');
};

exports.isGroupId = isGroupId;

var headerData = function headerData(id) {
  return isGroupId(id) ? {
    id: id,
    type: 'group',
    subtype: 'persistentGroup'
  } : {
    id: id,
    type: 'rectangleElement',
    subtype: ''
  };
};

var transformData = function transformData(_ref, z) {
  var top = _ref.top,
      left = _ref.left,
      width = _ref.width,
      height = _ref.height,
      angle = _ref.angle;
  return (0, _matrix.multiply)((0, _matrix.translate)(left + width / 2, top + height / 2, z), // painter's algo: latest item (highest z) goes to top
  (0, _matrix.rotateZ)(-angle / 180 * Math.PI) // minus angle as transform:matrix3d uses a left-handed coordinate system
  );
};
/**
 * elementToShape
 *
 * converts a `kibana-canvas` element to an `aeroelastic` shape.
 *
 * Shape: the layout algorithms need to deal with objects through their geometric properties, excluding other aspects,
 * such as what's inside the element, eg. image or scatter plot. This representation is, at its core, a transform matrix
 * that establishes a new local coordinate system https://drafts.csswg.org/css-transforms/#local-coordinate-system plus a
 * size descriptor. There are two versions of the transform matrix:
 *   - `transformMatrix` is analogous to the SVG https://drafts.csswg.org/css-transforms/#current-transformation-matrix
 *   - `localTransformMatrix` is analogous to the SVG https://drafts.csswg.org/css-transforms/#transformation-matrix
 *
 * Element: it also needs to represent the geometry, primarily because of the need to persist it in `redux` and on the
 * server, and to accept such data from the server. The redux and server representations will need to change as more general
 * projections such as 3D are added. The element also needs to maintain its content, such as an image or a plot.
 *
 * While all elements on the current page also exist as shapes, there are shapes that are not elements: annotations.
 * For example, `rotation_handle`, `border_resize_handle` and `border_connection` are modeled as shapes by the layout
 * library, simply for generality.
 */


var elementToShape = function elementToShape(_ref2, z) {
  var id = _ref2.id,
      position = _ref2.position;
  return _objectSpread({}, headerData(id), {
    parent: position && position.parent || null,
    transformMatrix: transformData(position, z),
    a: position.width / 2,
    // we currently specify half-width, half-height as it leads to
    b: position.height / 2 // more regular math (like ellipsis radii rather than diameters)

  });
};

exports.elementToShape = elementToShape;

var simplePosition = function simplePosition(_ref3, z) {
  var id = _ref3.id,
      position = _ref3.position,
      filter = _ref3.filter;
  return _objectSpread({}, headerData(id), {
    width: position.width,
    height: position.height,
    transformMatrix: transformData(position, z),
    filter: filter
  });
};

var simplePositioning = function simplePositioning(_ref4) {
  var elements = _ref4.elements;
  return {
    elements: elements.map(simplePosition)
  };
};

exports.simplePositioning = simplePositioning;