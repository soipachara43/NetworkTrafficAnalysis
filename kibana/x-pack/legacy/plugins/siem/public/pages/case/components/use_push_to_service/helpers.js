"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActionLicenseError = exports.getKibanaConfigError = exports.getLicenseError = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var getLicenseError = function getLicenseError() {
  return {
    title: i18n.PUSH_DISABLE_BY_LICENSE_TITLE,
    description: _react2.default.createElement(_react.FormattedMessage, {
      defaultMessage: "To open cases in external systems, you must update your license to Platinum, start a free 30-day trial, or spin up a {link} on AWS, GCP, or Azure.",
      id: "xpack.siem.case.caseView.pushToServiceDisableByLicenseDescription",
      values: {
        link: _react2.default.createElement(_eui.EuiLink, {
          href: "https://www.elastic.co/cloud/",
          target: "_blank"
        }, i18n.LINK_CLOUD_DEPLOYMENT)
      }
    })
  };
};

exports.getLicenseError = getLicenseError;

var getKibanaConfigError = function getKibanaConfigError() {
  return {
    title: i18n.PUSH_DISABLE_BY_KIBANA_CONFIG_TITLE,
    description: _react2.default.createElement(_react.FormattedMessage, {
      defaultMessage: "The kibana.yml file is configured to only allow specific connectors. To enable opening a case in external systems, add .servicenow to the xpack.actions.enabledActiontypes setting. For more information, see {link}.",
      id: "xpack.siem.case.caseView.pushToServiceDisableByConfigDescription",
      values: {
        link: _react2.default.createElement(_eui.EuiLink, {
          href: "#",
          target: "_blank"
        }, 'coming soon...')
      }
    })
  };
};

exports.getKibanaConfigError = getKibanaConfigError;

var getActionLicenseError = function getActionLicenseError(actionLicense) {
  var errors = [];

  if (actionLicense != null && !actionLicense.enabledInLicense) {
    errors = [].concat(_toConsumableArray(errors), [getLicenseError()]);
  }

  if (actionLicense != null && !actionLicense.enabledInConfig) {
    errors = [].concat(_toConsumableArray(errors), [getKibanaConfigError()]);
  }

  return errors;
};

exports.getActionLicenseError = getActionLicenseError;