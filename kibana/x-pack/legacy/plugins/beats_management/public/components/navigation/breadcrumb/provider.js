"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BreadcrumbProvider = void 0;

var _react = _interopRequireWildcard(require("react"));

var _chrome = _interopRequireDefault(require("ui/chrome"));

var _context = require("./context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BreadcrumbProvider =
/*#__PURE__*/
function (_Component) {
  _inherits(BreadcrumbProvider, _Component);

  function BreadcrumbProvider() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, BreadcrumbProvider);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(BreadcrumbProvider)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      breadcrumbs: []
    });

    _defineProperty(_assertThisInitialized(_this), "addCrumb", function (breadcrumb, parents) {
      _this.setState(function (_ref) {
        var prevCrumbs = _ref.breadcrumbs;
        return {
          breadcrumbs: [].concat(_toConsumableArray(prevCrumbs), [{
            href: breadcrumb.href,
            breadcrumb: breadcrumb,
            parents: parents
          }])
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "removeCrumb", function (crumbToRemove) {
      _this.setState(function (_ref2) {
        var prevCrumbs = _ref2.breadcrumbs;
        var breadcrumbs = prevCrumbs.filter(function (prevCrumb) {
          var href = prevCrumb.href;
          return !(crumbToRemove.href === href);
        });
        return {
          breadcrumbs: breadcrumbs
        };
      });
    });

    return _this;
  }

  _createClass(BreadcrumbProvider, [{
    key: "render",
    value: function render() {
      var breadcrumbs = this.state.breadcrumbs;
      var context = {
        breadcrumbs: breadcrumbs.reduce(function (crumbs, crumbStorageItem) {
          if (crumbStorageItem.parents) {
            crumbs = crumbs.concat(crumbStorageItem.parents);
          }

          crumbs.push(crumbStorageItem.breadcrumb);
          return crumbs;
        }, []),
        addCrumb: this.addCrumb,
        removeCrumb: this.removeCrumb
      };

      if (this.props.useGlobalBreadcrumbs) {
        _chrome.default.breadcrumbs.set(context.breadcrumbs);
      }

      return _react.default.createElement(_context.Provider, {
        value: context
      }, this.props.children);
    }
  }]);

  return BreadcrumbProvider;
}(_react.Component);

exports.BreadcrumbProvider = BreadcrumbProvider;