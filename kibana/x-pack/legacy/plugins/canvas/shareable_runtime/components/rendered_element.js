"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderedElement = exports.RenderedElementComponent = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styleIt = _interopRequireDefault(require("style-it"));

var _positionable = require("../../public/components/positionable/positionable");

var _utils = require("../../public/components/workpad_page/utils");

var _context = require("../context");

var _rendered_elementModule = _interopRequireDefault(require("./rendered_element.module.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * A Rendered Element is different from an Element added to a Canvas Workpad.  A
 * Rendered Element has actually be evaluated already to gather any data from
 * datasources, and is just a simple expression to render the result.  This
 * component renders that "transient" element state.
 */
class RenderedElementComponent extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "ref", void 0);

    this.ref = _react.default.createRef();
  }

  componentDidMount() {
    const {
      element,
      fn
    } = this.props;
    const {
      expressionRenderable
    } = element;
    const {
      value
    } = expressionRenderable;
    const {
      as
    } = value;

    if (!this.ref.current) {
      return null;
    }

    try {
      // TODO: These are stubbed, but may need implementation.
      fn.render(this.ref.current, value.value, {
        done: () => {},
        onDestroy: () => {},
        onResize: () => {},
        getElementId: () => '',
        setFilter: () => {},
        getFilter: () => '',
        onEmbeddableInputChange: () => {},
        onEmbeddableDestroyed: () => {}
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(as, e.message);
    }
  }

  render() {
    const {
      element,
      index
    } = this.props;
    const shape = (0, _utils.elementToShape)(element, index || 1);
    const {
      id,
      expressionRenderable,
      position
    } = element;
    const {
      value
    } = expressionRenderable;
    const {
      as,
      css: elementCSS,
      containerStyle
    } = value;
    const {
      height,
      width
    } = position;
    return _react.default.createElement(_positionable.Positionable, {
      height: height,
      width: width,
      transformMatrix: shape.transformMatrix
    }, _react.default.createElement("div", {
      className: _rendered_elementModule.default.root
    }, _styleIt.default.it(elementCSS, _react.default.createElement("div", {
      className: _rendered_elementModule.default.container,
      style: { ...containerStyle
      }
    }, _react.default.createElement("div", {
      className: _rendered_elementModule.default.content
    }, _react.default.createElement("div", {
      className: _rendered_elementModule.default.renderContainer
    }, _react.default.createElement("div", {
      key: id,
      ref: this.ref,
      "data-renderer": as,
      className: _rendered_elementModule.default.render
    })))))));
  }

}
/**
 * A store-connected container for the `RenderedElement` component.
 */


exports.RenderedElementComponent = RenderedElementComponent;

_defineProperty(RenderedElementComponent, "contextType", _context.CanvasShareableContext);

const RenderedElement = ({
  index,
  element
}) => {
  const [{
    renderers
  }] = (0, _context.useCanvasShareableState)();
  const {
    expressionRenderable
  } = element;
  const {
    value
  } = expressionRenderable;
  const {
    as
  } = value;
  const fn = renderers[as];
  return _react.default.createElement(RenderedElementComponent, {
    element,
    fn,
    index
  });
};

exports.RenderedElement = RenderedElement;