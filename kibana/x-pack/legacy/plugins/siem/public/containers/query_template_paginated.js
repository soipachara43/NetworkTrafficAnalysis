"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QueryTemplatePaginated = void 0;

var _apolloClient = require("apollo-client");

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _react = _interopRequireDefault(require("react"));

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _helpers = require("../components/paginated_table/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var QueryTemplatePaginated =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(QueryTemplatePaginated, _React$PureComponent);

  function QueryTemplatePaginated(props) {
    var _this;

    _classCallCheck(this, QueryTemplatePaginated);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(QueryTemplatePaginated).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "queryVariables", null);

    _defineProperty(_assertThisInitialized(_this), "myLoading", false);

    _defineProperty(_assertThisInitialized(_this), "fetchMore", void 0);

    _defineProperty(_assertThisInitialized(_this), "fetchMoreOptions", void 0);

    _defineProperty(_assertThisInitialized(_this), "memoizedRefetchQuery", void 0);

    _defineProperty(_assertThisInitialized(_this), "setFetchMore", function (val) {
      _this.fetchMore = val;
    });

    _defineProperty(_assertThisInitialized(_this), "setFetchMoreOptions", function (val) {
      _this.fetchMoreOptions = val;
    });

    _defineProperty(_assertThisInitialized(_this), "wrappedLoadMore", function (newActivePage) {
      return _this.fetchMore(_this.fetchMoreOptions(newActivePage));
    });

    _defineProperty(_assertThisInitialized(_this), "refetchQuery", function (variables, limit, refetch) {
      return function () {
        refetch(_objectSpread({}, variables, {
          pagination: (0, _helpers.generateTablePaginationOptions)(0, limit)
        }));
      };
    });

    _this.memoizedRefetchQuery = (0, _memoizeOne.default)(_this.refetchQuery);
    return _this;
  }

  _createClass(QueryTemplatePaginated, [{
    key: "setPrevVariables",
    value: function setPrevVariables(vars) {
      this.queryVariables = vars;
    }
  }, {
    key: "isItAValidLoading",
    value: function isItAValidLoading(loading, variables, networkStatus) {
      if (!this.myLoading && (!(0, _fastDeepEqual.default)(variables, this.queryVariables) || networkStatus === _apolloClient.NetworkStatus.refetch) && loading) {
        this.myLoading = true;
      } else if (this.myLoading && !loading) {
        this.myLoading = false;
      }

      this.setPrevVariables(variables);
      return this.myLoading;
    }
  }]);

  return QueryTemplatePaginated;
}(_react.default.PureComponent);

exports.QueryTemplatePaginated = QueryTemplatePaginated;