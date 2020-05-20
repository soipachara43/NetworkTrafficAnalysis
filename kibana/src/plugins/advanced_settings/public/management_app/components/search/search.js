"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Search = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _lib = require("../../lib");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Search =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Search, _PureComponent);

  function Search(props) {
    var _this;

    _classCallCheck(this, Search);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Search).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "categories", []);

    _defineProperty(_assertThisInitialized(_this), "state", {
      isSearchTextValid: true,
      parseErrorMessage: null
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (_ref) {
      var query = _ref.query,
          error = _ref.error;

      if (error) {
        _this.setState({
          isSearchTextValid: false,
          parseErrorMessage: error.message
        });

        return;
      }

      _this.setState({
        isSearchTextValid: true,
        parseErrorMessage: null
      });

      _this.props.onQueryChange({
        query: query
      });
    });

    var categories = props.categories;
    _this.categories = categories.map(function (category) {
      return {
        value: category,
        name: (0, _lib.getCategoryName)(category)
      };
    });
    return _this;
  }

  _createClass(Search, [{
    key: "render",
    value: function render() {
      var query = this.props.query;
      var box = {
        incremental: true,
        'data-test-subj': 'settingsSearchBar',
        'aria-label': _i18n.i18n.translate('advancedSettings.searchBarAriaLabel', {
          defaultMessage: 'Search advanced settings'
        }) // hack until EuiSearchBar is fixed

      };
      var filters = [{
        type: 'field_value_selection',
        field: 'category',
        name: _i18n.i18n.translate('advancedSettings.categorySearchLabel', {
          defaultMessage: 'Category'
        }),
        multiSelect: 'or',
        options: this.categories
      }];
      var queryParseError;

      if (!this.state.isSearchTextValid) {
        var parseErrorMsg = _i18n.i18n.translate('advancedSettings.searchBar.unableToParseQueryErrorMessage', {
          defaultMessage: 'Unable to parse query'
        });

        queryParseError = _react.default.createElement(_eui.EuiFormErrorText, null, "".concat(parseErrorMsg, ". ").concat(this.state.parseErrorMessage));
      }

      return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSearchBar, {
        box: box,
        filters: filters,
        onChange: this.onChange,
        query: query
      }), queryParseError);
    }
  }]);

  return Search;
}(_react.PureComponent);

exports.Search = Search;