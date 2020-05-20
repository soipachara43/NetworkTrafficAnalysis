"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TagsPage = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

var _breadcrumb = require("../../components/navigation/breadcrumb");

var _table = require("../../components/table");

var _action_schema = require("../../components/table/action_schema");

var _with_kuery_autocompletion = require("../../containers/with_kuery_autocompletion");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TagsPageComponent =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(TagsPageComponent, _React$PureComponent);

  function TagsPageComponent(props) {
    var _this;

    _classCallCheck(this, TagsPageComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TagsPageComponent).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "renderActionArea", function () {
      return _react2.default.createElement(_eui.EuiButton, {
        size: "s",
        color: "primary",
        onClick:
        /*#__PURE__*/
        _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _this.props.goTo('/tag/create');

                case 1:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }))
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.beatsManagement.tags.addTagButtonLabel",
        defaultMessage: "Add Tag"
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "handleTagsAction",
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(action) {
        var intl, success;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                intl = _this.props.intl;
                _context2.t0 = action;
                _context2.next = _context2.t0 === _table.AssignmentActionType.Delete ? 4 : 9;
                break;

              case 4:
                _context2.next = 6;
                return _this.props.containers.tags.delete(_this.getSelectedTags());

              case 6:
                success = _context2.sent;

                if (!success) {
                  alert(intl.formatMessage({
                    id: 'xpack.beatsManagement.tags.someTagsMightBeAssignedToBeatsTitle',
                    defaultMessage: 'Some of these tags might be assigned to beats. Please ensure tags being removed are not activly assigned'
                  }));
                } else {
                  if (_this.state.tableRef && _this.state.tableRef.current) {
                    _this.state.tableRef.current.resetSelection();
                  }
                }

                return _context2.abrupt("break", 9);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "getSelectedTags", function () {
      return _this.state.tableRef.current ? _this.state.tableRef.current.state.selection : [];
    });

    _this.state = {
      tableRef: _react2.default.createRef()
    };
    props.containers.tags.reload(props.urlState.tagsKBar);
    props.renderAction(_this.renderActionArea);
    return _this;
  }

  _createClass(TagsPageComponent, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_breadcrumb.Breadcrumb, {
        title: _i18n.i18n.translate('xpack.beatsManagement.breadcrumb.configurationTags', {
          defaultMessage: 'Configuration tags'
        }),
        path: "/overview/configuration_tags"
      }), _react2.default.createElement(_with_kuery_autocompletion.WithKueryAutocompletion, {
        libs: this.props.libs,
        fieldPrefix: "tag"
      }, function (autocompleteProps) {
        return _react2.default.createElement(_table.Table, {
          kueryBarProps: _objectSpread({}, autocompleteProps, {
            filterQueryDraft: 'false',
            // todo
            isValid: _this2.props.libs.elasticsearch.isKueryValid(_this2.props.urlState.tagsKBar || ''),
            onChange: function onChange(value) {
              _this2.props.setUrlState({
                tagsKBar: value
              });

              _this2.props.containers.tags.reload(value);
            },
            onSubmit: function onSubmit() {
              return null;
            },
            // todo
            value: _this2.props.urlState.tagsKBar || ''
          }),
          actions: _action_schema.tagListActions,
          actionHandler: _this2.handleTagsAction,
          ref: _this2.state.tableRef,
          items: _this2.props.containers.tags.state.list,
          type: _table.TagsTableType
        });
      }));
    }
  }]);

  return TagsPageComponent;
}(_react2.default.PureComponent);

var TagsPage = (0, _react.injectI18n)(TagsPageComponent);
exports.TagsPage = TagsPage;