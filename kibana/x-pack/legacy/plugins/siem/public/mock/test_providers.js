"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TestProviderWithoutDragAndDrop = exports.TestProviders = exports.apolloClientObservable = exports.apolloClient = void 0;

var _eui_theme_dark = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_dark.json"));

var _react = require("@kbn/i18n/react");

var _apolloCacheInmemory = require("apollo-cache-inmemory");

var _apolloClient = _interopRequireDefault(require("apollo-client"));

var _apolloLink = require("apollo-link");

var _react2 = _interopRequireDefault(require("react"));

var _reactApollo = require("react-apollo");

var _reactBeautifulDnd = require("react-beautiful-dnd");

var _reactRedux = require("react-redux");

var _rxjs = require("rxjs");

var _styledComponents = require("styled-components");

var _store = require("../store");

var _global_state = require("./global_state");

var _kibana_react = require("./kibana_react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
jest.mock('ui/new_platform');
var state = _global_state.mockGlobalState;
var apolloClient = new _apolloClient.default({
  cache: new _apolloCacheInmemory.InMemoryCache(),
  link: new _apolloLink.ApolloLink(function (o, f) {
    return f ? f(o) : null;
  })
});
exports.apolloClient = apolloClient;
var apolloClientObservable = new _rxjs.BehaviorSubject(apolloClient);
exports.apolloClientObservable = apolloClientObservable;

var localStorageMock = function localStorageMock() {
  var store = {};
  return {
    getItem: function getItem(key) {
      return store[key] || null;
    },
    setItem: function setItem(key, value) {
      store[key] = value;
    },
    clear: function clear() {
      store = {};
    }
  };
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock()
});
var MockKibanaContextProvider = (0, _kibana_react.createKibanaContextProviderMock)();
/** A utility for wrapping children in the providers required to run most tests */

var TestProvidersComponent = function TestProvidersComponent(_ref) {
  var children = _ref.children,
      _ref$store = _ref.store,
      store = _ref$store === void 0 ? (0, _store.createStore)(state, apolloClientObservable) : _ref$store,
      _ref$onDragEnd = _ref.onDragEnd,
      onDragEnd = _ref$onDragEnd === void 0 ? jest.fn() : _ref$onDragEnd;
  return _react2.default.createElement(_react.I18nProvider, null, _react2.default.createElement(MockKibanaContextProvider, null, _react2.default.createElement(_reactApollo.ApolloProvider, {
    client: apolloClient
  }, _react2.default.createElement(_reactRedux.Provider, {
    store: store
  }, _react2.default.createElement(_styledComponents.ThemeProvider, {
    theme: function theme() {
      return {
        eui: _eui_theme_dark.default,
        darkMode: true
      };
    }
  }, _react2.default.createElement(_reactBeautifulDnd.DragDropContext, {
    onDragEnd: onDragEnd
  }, children))))));
};

var TestProviders = _react2.default.memo(TestProvidersComponent);

exports.TestProviders = TestProviders;

var TestProviderWithoutDragAndDropComponent = function TestProviderWithoutDragAndDropComponent(_ref2) {
  var children = _ref2.children,
      _ref2$store = _ref2.store,
      store = _ref2$store === void 0 ? (0, _store.createStore)(state, apolloClientObservable) : _ref2$store;
  return _react2.default.createElement(_react.I18nProvider, null, _react2.default.createElement(_reactRedux.Provider, {
    store: store
  }, children));
};

var TestProviderWithoutDragAndDrop = _react2.default.memo(TestProviderWithoutDragAndDropComponent);

exports.TestProviderWithoutDragAndDrop = TestProviderWithoutDragAndDrop;