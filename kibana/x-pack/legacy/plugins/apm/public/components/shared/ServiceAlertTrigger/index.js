"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServiceAlertTrigger = ServiceAlertTrigger;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _useUrlParams2 = require("../../../hooks/useUrlParams");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function ServiceAlertTrigger(props) {
  var _useUrlParams = (0, _useUrlParams2.useUrlParams)(),
      urlParams = _useUrlParams.urlParams;

  var fields = props.fields,
      setAlertParams = props.setAlertParams,
      setAlertProperty = props.setAlertProperty,
      alertTypeName = props.alertTypeName,
      defaults = props.defaults;

  var params = _objectSpread({}, defaults, {
    serviceName: urlParams.serviceName
  });

  (0, _react.useEffect)(function () {
    // we only want to run this on mount to set default values
    setAlertProperty('name', "".concat(alertTypeName, " | ").concat(params.serviceName));
    setAlertProperty('tags', ['apm', "service.name:".concat(params.serviceName).toLowerCase()]);
    Object.keys(params).forEach(function (key) {
      setAlertParams(key, params[key]);
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), _react.default.createElement(_eui.EuiFlexGrid, {
    gutterSize: "l",
    direction: "row",
    columns: 2
  }, fields.map(function (field, index) {
    return _react.default.createElement(_eui.EuiFlexItem, {
      grow: false,
      key: index
    }, field);
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }));
}