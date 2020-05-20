"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BeatTagsPage = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _breadcrumb = require("../../components/navigation/breadcrumb");

var _table = require("../../components/table");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var BeatTagsPage =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(BeatTagsPage, _React$PureComponent);

  function BeatTagsPage(props) {
    var _this;

    _classCallCheck(this, BeatTagsPage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BeatTagsPage).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "tableRef", _react.default.createRef());

    _this.state = {
      notifications: [],
      tags: []
    };
    return _this;
  }

  _createClass(BeatTagsPage, [{
    key: "UNSAFE_componentWillMount",
    value: function UNSAFE_componentWillMount() {
      this.updateBeatsData();
    }
  }, {
    key: "updateBeatsData",
    value: function () {
      var _updateBeatsData = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var tags;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.props.libs.tags.getTagsWithIds(this.props.beat.tags);

              case 2:
                tags = _context.sent;
                this.setState({
                  tags: tags
                });

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function updateBeatsData() {
        return _updateBeatsData.apply(this, arguments);
      }

      return updateBeatsData;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var beat = this.props.beat;
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_breadcrumb.Breadcrumb, {
        title: _i18n.i18n.translate('xpack.beatsManagement.breadcrumb.beatTags', {
          defaultMessage: 'Beat tags for: {beatId}',
          values: {
            beatId: beat.id
          }
        }),
        path: "/beat/".concat(beat.id, "/tags")
      }), _react.default.createElement(_table.Table, {
        hideTableControls: true,
        items: this.state.tags,
        ref: this.tableRef,
        type: _table.BeatDetailTagsTable
      }), _react.default.createElement(_eui.EuiGlobalToastList, {
        toasts: this.state.notifications,
        dismissToast: function dismissToast() {
          return _this2.setState({
            notifications: []
          });
        },
        toastLifeTimeMs: 5000
      }));
    }
  }]);

  return BeatTagsPage;
}(_react.default.PureComponent);

exports.BeatTagsPage = BeatTagsPage;