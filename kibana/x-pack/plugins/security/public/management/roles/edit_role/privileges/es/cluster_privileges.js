"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClusterPrivileges = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _model = require("../../../../../../common/model");

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

var ClusterPrivileges =
/*#__PURE__*/
function (_Component) {
  _inherits(ClusterPrivileges, _Component);

  function ClusterPrivileges() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ClusterPrivileges);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ClusterPrivileges)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "buildComboBox", function (items) {
      var role = _this.props.role;
      var options = items.map(function (i) {
        return {
          label: i
        };
      });
      var selectedOptions = (role.elasticsearch.cluster || []).map(function (k) {
        return {
          label: k
        };
      });
      return _react.default.createElement(_eui.EuiFlexItem, {
        key: 'clusterPrivs'
      }, _react.default.createElement(_eui.EuiComboBox, {
        "data-test-subj": 'cluster-privileges-combobox',
        options: options,
        selectedOptions: selectedOptions,
        onChange: _this.onClusterPrivilegesChange,
        onCreateOption: _this.onCreateCustomPrivilege,
        isDisabled: (0, _model.isRoleReadOnly)(role)
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "onClusterPrivilegesChange", function (selectedPrivileges) {
      _this.props.onChange(selectedPrivileges.map(function (priv) {
        return priv.label;
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "onCreateCustomPrivilege", function (customPrivilege) {
      _this.props.onChange([].concat(_toConsumableArray(_this.props.role.elasticsearch.cluster), [customPrivilege]));
    });

    _defineProperty(_assertThisInitialized(_this), "getAvailableClusterPrivileges", function () {
      var availableClusterPrivileges = [].concat(_toConsumableArray(_this.props.builtinClusterPrivileges), _toConsumableArray(_this.props.role.elasticsearch.cluster));
      return _lodash.default.uniq(availableClusterPrivileges);
    });

    return _this;
  }

  _createClass(ClusterPrivileges, [{
    key: "render",
    value: function render() {
      var availableClusterPrivileges = this.getAvailableClusterPrivileges();
      return _react.default.createElement(_eui.EuiFlexGroup, null, this.buildComboBox(availableClusterPrivileges));
    }
  }]);

  return ClusterPrivileges;
}(_react.Component);

exports.ClusterPrivileges = ClusterPrivileges;