"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndicesList = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _constants = require("../../../../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var IndicesList =
/*#__PURE__*/
function (_React$Component) {
  _inherits(IndicesList, _React$Component);

  function IndicesList(props) {
    var _this;

    _classCallCheck(this, IndicesList);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(IndicesList).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "pager", void 0);

    _defineProperty(_assertThisInitialized(_this), "resetPageTo0", function () {
      return _this.onChangePage(0);
    });

    _defineProperty(_assertThisInitialized(_this), "onChangePage", function (page) {
      _this.pager.goToPageIndex(page);

      _this.setState({
        page: page
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onChangePerPage", function (perPage) {
      _this.pager.setItemsPerPage(perPage);

      _this.setState({
        perPage: perPage
      });

      _this.resetPageTo0();

      _this.closePerPageControl();
    });

    _defineProperty(_assertThisInitialized(_this), "openPerPageControl", function () {
      _this.setState({
        isPerPageControlOpen: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "closePerPageControl", function () {
      _this.setState({
        isPerPageControlOpen: false
      });
    });

    _this.state = {
      page: 0,
      perPage: _constants.PER_PAGE_INCREMENTS[1],
      isPerPageControlOpen: false
    };
    _this.pager = new _eui.Pager(props.indices.length, _this.state.perPage, _this.state.page);
    return _this;
  }

  _createClass(IndicesList, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (nextProps.indices.length !== this.props.indices.length) {
        this.pager.setTotalItems(nextProps.indices.length);
        this.resetPageTo0();
      }
    }
  }, {
    key: "renderPagination",
    value: function renderPagination() {
      var _this2 = this;

      var _this$state = this.state,
          perPage = _this$state.perPage,
          page = _this$state.page,
          isPerPageControlOpen = _this$state.isPerPageControlOpen;

      var button = _react.default.createElement(_eui.EuiButtonEmpty, {
        size: "s",
        color: "text",
        iconType: "arrowDown",
        iconSide: "right",
        onClick: this.openPerPageControl
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "kbn.management.createIndexPattern.step.pagingLabel",
        defaultMessage: "Rows per page: {perPage}",
        values: {
          perPage: perPage
        }
      }));

      var items = _constants.PER_PAGE_INCREMENTS.map(function (increment) {
        return _react.default.createElement(_eui.EuiContextMenuItem, {
          key: increment,
          icon: "empty",
          onClick: function onClick() {
            return _this2.onChangePerPage(increment);
          }
        }, increment);
      });

      var pageCount = this.pager.getTotalPages();
      var paginationControls = pageCount > 1 ? _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiPagination, {
        pageCount: pageCount,
        activePage: page,
        onPageClick: this.onChangePage
      })) : null;
      return _react.default.createElement(_eui.EuiFlexGroup, {
        justifyContent: "spaceBetween",
        alignItems: "center"
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiPopover, {
        id: "customizablePagination",
        button: button,
        isOpen: isPerPageControlOpen,
        closePopover: this.closePerPageControl,
        panelPaddingSize: "none",
        withTitle: true
      }, _react.default.createElement(_eui.EuiContextMenuPanel, {
        items: items
      }))), paginationControls);
    }
  }, {
    key: "highlightIndexName",
    value: function highlightIndexName(indexName, query) {
      var queryIdx = indexName.indexOf(query);

      if (!query || queryIdx === -1) {
        return indexName;
      }

      var preStr = indexName.substr(0, queryIdx);
      var postStr = indexName.substr(queryIdx + query.length);
      return _react.default.createElement("span", null, preStr, _react.default.createElement("strong", null, query), postStr);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          indices = _this$props.indices,
          query = _this$props.query,
          rest = _objectWithoutProperties(_this$props, ["indices", "query"]);

      var queryWithoutWildcard = query.endsWith('*') ? query.substr(0, query.length - 1) : query;
      var paginatedIndices = indices.slice(this.pager.firstItemIndex, this.pager.lastItemIndex + 1);
      var rows = paginatedIndices.map(function (index, key) {
        return _react.default.createElement(_eui.EuiTableRow, {
          key: key
        }, _react.default.createElement(_eui.EuiTableRowCell, null, _this3.highlightIndexName(index.name, queryWithoutWildcard)), _react.default.createElement(_eui.EuiTableRowCell, null, index.tags.map(function (tag) {
          return _react.default.createElement(_eui.EuiBadge, {
            key: "index_".concat(key, "_tag_").concat(tag.key),
            color: "primary"
          }, tag.name);
        })));
      });
      return _react.default.createElement("div", rest, _react.default.createElement(_eui.EuiTable, null, _react.default.createElement(_eui.EuiTableBody, null, rows)), _react.default.createElement(_eui.EuiSpacer, {
        size: "m"
      }), this.renderPagination());
    }
  }]);

  return IndicesList;
}(_react.default.Component);

exports.IndicesList = IndicesList;