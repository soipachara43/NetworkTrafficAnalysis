"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimelionVisDefinition = getTimelionVisDefinition;
exports.TIMELION_VIS_NAME = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _public = require("../../../../plugins/kibana_react/public");

var _public2 = require("../../vis_default_editor/public");

var _timelion_request_handler = require("./helpers/timelion_request_handler");

var _components = require("./components");

var _timelion_options = require("./timelion_options");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TIMELION_VIS_NAME = 'timelion';
exports.TIMELION_VIS_NAME = TIMELION_VIS_NAME;

function getTimelionVisDefinition(dependencies) {
  var timelionRequestHandler = (0, _timelion_request_handler.getTimelionRequestHandler)(dependencies); // return the visType object, which kibana will use to display and configure new
  // Vis object of this type.

  return {
    name: TIMELION_VIS_NAME,
    title: 'Timelion',
    icon: 'visTimelion',
    description: _i18n.i18n.translate('timelion.timelionDescription', {
      defaultMessage: 'Build time-series using functional expressions'
    }),
    visConfig: {
      defaults: {
        expression: '.es(*)',
        interval: 'auto'
      },
      component: function component(props) {
        return _react.default.createElement(_public.KibanaContextProvider, {
          services: _objectSpread({}, dependencies)
        }, _react.default.createElement(_components.TimelionVisComponent, props));
      }
    },
    editorConfig: {
      optionsTemplate: _timelion_options.TimelionOptions,
      defaultSize: _public2.DefaultEditorSize.MEDIUM
    },
    requestHandler: timelionRequestHandler,
    responseHandler: 'none',
    options: {
      showIndexSelection: false,
      showQueryBar: false,
      showFilterBar: false
    }
  };
}