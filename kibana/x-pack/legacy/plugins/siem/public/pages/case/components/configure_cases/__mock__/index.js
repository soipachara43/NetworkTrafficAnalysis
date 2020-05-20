"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.kibanaMockImplementationArgs = exports.useConnectorsResponse = exports.useCaseConfigureResponse = exports.initialState = exports.searchURL = exports.mapping = exports.connectors = void 0;

var _kibana_react = require("../../../../../mock/kibana_react");

var _action_type_registry = require("../../../../../../../../../plugins/triggers_actions_ui/public/application/action_type_registry.mock");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var connectors = [{
  id: '123',
  actionTypeId: '.servicenow',
  name: 'My Connector',
  config: {
    apiUrl: 'https://instance1.service-now.com',
    casesConfiguration: {
      mapping: [{
        source: 'title',
        target: 'short_description',
        actionType: 'overwrite'
      }, {
        source: 'description',
        target: 'description',
        actionType: 'append'
      }, {
        source: 'comments',
        target: 'comments',
        actionType: 'append'
      }]
    }
  }
}, {
  id: '456',
  actionTypeId: '.servicenow',
  name: 'My Connector 2',
  config: {
    apiUrl: 'https://instance2.service-now.com',
    casesConfiguration: {
      mapping: [{
        source: 'title',
        target: 'short_description',
        actionType: 'overwrite'
      }, {
        source: 'description',
        target: 'description',
        actionType: 'overwrite'
      }, {
        source: 'comments',
        target: 'comments',
        actionType: 'append'
      }]
    }
  }
}];
exports.connectors = connectors;
var mapping = [{
  source: 'title',
  target: 'short_description',
  actionType: 'overwrite'
}, {
  source: 'description',
  target: 'description',
  actionType: 'append'
}, {
  source: 'comments',
  target: 'comments',
  actionType: 'append'
}];
exports.mapping = mapping;
var searchURL = '?timerange=(global:(linkTo:!(),timerange:(from:1585487656371,fromStr:now-24h,kind:relative,to:1585574056371,toStr:now)),timeline:(linkTo:!(),timerange:(from:1585227005527,kind:absolute,to:1585313405527)))';
exports.searchURL = searchURL;
var initialState = {
  connectorId: 'none',
  closureType: 'close-by-user',
  mapping: null,
  currentConfiguration: {
    connectorId: 'none',
    closureType: 'close-by-user'
  }
};
exports.initialState = initialState;
var useCaseConfigureResponse = {
  loading: false,
  persistLoading: false,
  refetchCaseConfigure: jest.fn(),
  persistCaseConfigure: jest.fn()
};
exports.useCaseConfigureResponse = useCaseConfigureResponse;
var useConnectorsResponse = {
  loading: false,
  connectors: connectors,
  refetchConnectors: jest.fn()
};
exports.useConnectorsResponse = useConnectorsResponse;
var kibanaMockImplementationArgs = {
  services: _objectSpread({}, (0, _kibana_react.createUseKibanaMock)()().services, {
    triggers_actions_ui: {
      actionTypeRegistry: _action_type_registry.actionTypeRegistryMock.create()
    }
  })
};
exports.kibanaMockImplementationArgs = kibanaMockImplementationArgs;