"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConnectorsDropdown = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _config = require("../../../../lib/connectors/config");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var ICON_SIZE = 'm';
var EuiIconExtended = (0, _styledComponents.default)(_eui.EuiIcon).withConfig({
  displayName: "EuiIconExtended",
  componentId: "sc-1573eht-0"
})(["margin-right:13px;"]);
var noConnectorOption = {
  value: 'none',
  inputDisplay: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(EuiIconExtended, {
    type: "minusInCircle",
    size: ICON_SIZE
  }), _react.default.createElement("span", null, i18n.NO_CONNECTOR)),
  'data-test-subj': 'dropdown-connector-no-connector'
};

var ConnectorsDropdownComponent = function ConnectorsDropdownComponent(_ref) {
  var connectors = _ref.connectors,
      disabled = _ref.disabled,
      isLoading = _ref.isLoading,
      onChange = _ref.onChange,
      selectedConnector = _ref.selectedConnector;
  var connectorsAsOptions = (0, _react.useMemo)(function () {
    return connectors.reduce(function (acc, connector) {
      return [].concat(_toConsumableArray(acc), [{
        value: connector.id,
        inputDisplay: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(EuiIconExtended, {
          type: _config.connectors[connector.actionTypeId].logo,
          size: ICON_SIZE
        }), _react.default.createElement("span", null, connector.name)),
        'data-test-subj': "dropdown-connector-".concat(connector.id)
      }]);
    }, [noConnectorOption]);
  }, [connectors]);
  return _react.default.createElement(_eui.EuiSuperSelect, {
    disabled: disabled,
    isLoading: isLoading,
    options: connectorsAsOptions,
    valueOfSelected: selectedConnector,
    fullWidth: true,
    onChange: onChange,
    "data-test-subj": "dropdown-connectors"
  });
};

var ConnectorsDropdown = _react.default.memo(ConnectorsDropdownComponent);

exports.ConnectorsDropdown = ConnectorsDropdown;