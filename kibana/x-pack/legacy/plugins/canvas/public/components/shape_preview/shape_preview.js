"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShapePreview = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ShapePreview = function ShapePreview(_ref) {
  var shape = _ref.shape;

  if (!shape) {
    return _react.default.createElement("div", {
      className: "canvasShapePreview"
    });
  }

  var weight = 5;
  var parser = new DOMParser();
  var shapeSvg = parser.parseFromString(shape, 'image/svg+xml').getElementsByTagName('svg').item(0);

  if (!shapeSvg) {
    throw new Error('An unexpected error occurred: the SVG was not parseable');
  }

  shapeSvg.setAttribute('fill', 'none');
  shapeSvg.setAttribute('stroke', 'black');
  var viewBox = shapeSvg.getAttribute('viewBox') || '0 0 0 0';
  var initialViewBox = viewBox.split(' ').map(function (v) {
    return parseInt(v, 10);
  });

  var _initialViewBox = _slicedToArray(initialViewBox, 4),
      minX = _initialViewBox[0],
      minY = _initialViewBox[1],
      width = _initialViewBox[2],
      height = _initialViewBox[3];

  minX -= weight / 2;
  minY -= weight / 2;
  width += weight;
  height += weight;
  shapeSvg.setAttribute('viewBox', [minX, minY, width, height].join(' '));
  return (// eslint-disable-next-line react/no-danger
    _react.default.createElement("div", {
      className: "canvasShapePreview",
      dangerouslySetInnerHTML: {
        __html: shapeSvg.outerHTML
      }
    })
  );
};

exports.ShapePreview = ShapePreview;
ShapePreview.propTypes = {
  shape: _propTypes.default.string
};