"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DistanceFilterForm = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _multi_index_geo_field_select = require("./multi_index_geo_field_select");

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

var DistanceFilterForm =
/*#__PURE__*/
function (_Component) {
  _inherits(DistanceFilterForm, _Component);

  function DistanceFilterForm() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DistanceFilterForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DistanceFilterForm)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      selectedField: _this.props.geoFields.length ? _this.props.geoFields[0] : undefined,
      filterLabel: ''
    });

    _defineProperty(_assertThisInitialized(_this), "_onGeoFieldChange", function (selectedField) {
      _this.setState({
        selectedField: selectedField
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onFilterLabelChange", function (e) {
      _this.setState({
        filterLabel: e.target.value
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onSubmit", function () {
      if (!_this.state.selectedField) {
        return;
      }

      _this.props.onSubmit({
        filterLabel: _this.state.filterLabel,
        indexPatternId: _this.state.selectedField.indexPatternId,
        geoFieldName: _this.state.selectedField.geoFieldName
      });
    });

    return _this;
  }

  _createClass(DistanceFilterForm, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_eui.EuiForm, {
        className: this.props.className
      }, _react.default.createElement(_eui.EuiFormRow, {
        label: _i18n.i18n.translate('xpack.maps.distanceFilterForm.filterLabelLabel', {
          defaultMessage: 'Filter label'
        }),
        display: "rowCompressed"
      }, _react.default.createElement(_eui.EuiFieldText, {
        compressed: true,
        value: this.state.filterLabel,
        onChange: this._onFilterLabelChange
      })), _react.default.createElement(_multi_index_geo_field_select.MultiIndexGeoFieldSelect, {
        selectedField: this.state.selectedField,
        fields: this.props.geoFields,
        onChange: this._onGeoFieldChange
      }), _react.default.createElement(_eui.EuiSpacer, {
        size: "m"
      }), _react.default.createElement(_eui.EuiTextAlign, {
        textAlign: "right"
      }, _react.default.createElement(_eui.EuiButton, {
        size: "s",
        fill: true,
        onClick: this._onSubmit,
        isDisabled: !this.state.selectedField
      }, this.props.buttonLabel)));
    }
  }]);

  return DistanceFilterForm;
}(_react.Component);

exports.DistanceFilterForm = DistanceFilterForm;