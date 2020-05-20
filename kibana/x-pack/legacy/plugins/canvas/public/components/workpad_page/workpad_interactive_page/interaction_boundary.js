"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InteractionBoundary = void 0;

var _react = _interopRequireWildcard(require("react"));

var _workpad_app = require("../../../apps/workpad/workpad_app");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// This adds a bit of a buffer to make room for scroll bars, etc.
var BUFFER = 24;
/**
 * The `InteractionBoundary` is a simple area which expands beyond the boundaries
 * of the `InteractiveWorkpadPage` to the corners of the `WorkpadApp`, allowing
 * mouse events started outside to fire and be tracked within.
 */

var InteractionBoundary =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(InteractionBoundary, _PureComponent);

  // Implemented with state, as I think there'll be cases where we want to
  // re-evaluate the size of the interaction boundary in the future.
  function InteractionBoundary() {
    var _this;

    _classCallCheck(this, InteractionBoundary);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InteractionBoundary).call(this));
    _this.state = {
      height: '0',
      width: '0',
      marginLeft: '0',
      marginTop: '0'
    };
    return _this;
  }

  _createClass(InteractionBoundary, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var container = $('#' + _workpad_app.WORKPAD_CONTAINER_ID);
      var height = container.height();
      var width = container.width();

      if (height && width) {
        this.setState({
          height: height - BUFFER + 'px',
          width: width - BUFFER + 'px',
          marginLeft: -((width - BUFFER) / 2) + 'px',
          marginTop: -((height - BUFFER) / 2) + 'px'
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var style = Object.assign({
        top: '50%',
        left: '50%',
        position: 'absolute'
      }, this.state);
      return _react.default.createElement("div", {
        id: "canvasInteractionBoundary",
        style: style
      });
    }
  }]);

  return InteractionBoundary;
}(_react.PureComponent);

exports.InteractionBoundary = InteractionBoundary;