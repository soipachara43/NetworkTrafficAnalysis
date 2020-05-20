"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Breadcrumb = void 0;

var _react = _interopRequireWildcard(require("react"));

var _constants = require("../../../../common/constants");

var _consumer = require("./consumer");

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

var BreadcrumbManager =
/*#__PURE__*/
function (_Component) {
  _inherits(BreadcrumbManager, _Component);

  function BreadcrumbManager() {
    _classCallCheck(this, BreadcrumbManager);

    return _possibleConstructorReturn(this, _getPrototypeOf(BreadcrumbManager).apply(this, arguments));
  }

  _createClass(BreadcrumbManager, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this$props = this.props,
          text = _this$props.text,
          href = _this$props.href,
          context = _this$props.context;
      context.removeCrumb({
        text: text,
        href: href
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props2 = this.props,
          text = _this$props2.text,
          href = _this$props2.href,
          parents = _this$props2.parents,
          context = _this$props2.context;
      context.addCrumb({
        text: text,
        href: href
      }, parents);
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("span", null);
    }
  }]);

  return BreadcrumbManager;
}(_react.Component);

var Breadcrumb = function Breadcrumb(_ref) {
  var title = _ref.title,
      path = _ref.path,
      parentBreadcrumbs = _ref.parentBreadcrumbs;
  return _react.default.createElement(_consumer.BreadcrumbConsumer, null, function (context) {
    return _react.default.createElement(BreadcrumbManager, {
      text: title,
      href: "#".concat(_constants.BASE_PATH).concat(path),
      parents: parentBreadcrumbs,
      context: context
    });
  });
};

exports.Breadcrumb = Breadcrumb;