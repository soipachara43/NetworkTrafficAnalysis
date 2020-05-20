"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isInSetupMode = exports.initSetupModeState = exports.addSetupModeCallback = exports.setSetupModeMenuItem = exports.toggleSetupMode = exports.disableElasticsearchInternalCollection = exports.updateSetupModeData = exports.fetchCollectionData = exports.setNewlyDiscoveredClusterUuid = exports.getSetupModeState = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _lodash = require("lodash");

var _notify = require("ui/notify");

var _i18n = require("@kbn/i18n");

var _new_platform = require("ui/new_platform");

var _chrome = _interopRequireDefault(require("../np_imports/ui/chrome"));

var _ajax_error_handler = require("./ajax_error_handler");

var _enter_button = require("../components/setup_mode/enter_button");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function isOnPage(hash) {
  return (0, _lodash.contains)(window.location.hash, hash);
}

var angularState = {
  injector: null,
  scope: null
};

var checkAngularState = function checkAngularState() {
  if (!angularState.injector || !angularState.scope) {
    throw new Error('Unable to interact with setup mode because the angular injector was not previously set.' + ' This needs to be set by calling `initSetupModeState`.');
  }
};

var setupModeState = {
  enabled: false,
  data: null,
  callbacks: []
};

var getSetupModeState = function getSetupModeState() {
  return setupModeState;
};

exports.getSetupModeState = getSetupModeState;

var setNewlyDiscoveredClusterUuid = function setNewlyDiscoveredClusterUuid(clusterUuid) {
  var globalState = angularState.injector.get('globalState');
  var executor = angularState.injector.get('$executor');
  angularState.scope.$apply(function () {
    globalState.cluster_uuid = clusterUuid;
    globalState.save();
  });
  executor.run();
};

exports.setNewlyDiscoveredClusterUuid = setNewlyDiscoveredClusterUuid;

var fetchCollectionData =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(uuid) {
    var fetchWithoutClusterUuid,
        http,
        globalState,
        clusterUuid,
        ccs,
        url,
        response,
        Private,
        ajaxErrorHandlers,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fetchWithoutClusterUuid = _args.length > 1 && _args[1] !== undefined ? _args[1] : false;
            checkAngularState();
            http = angularState.injector.get('$http');
            globalState = angularState.injector.get('globalState');
            clusterUuid = globalState.cluster_uuid;
            ccs = globalState.ccs;
            url = '../api/monitoring/v1/setup/collection';

            if (uuid) {
              url += "/node/".concat(uuid);
            } else if (!fetchWithoutClusterUuid && clusterUuid) {
              url += "/cluster/".concat(clusterUuid);
            } else {
              url += '/cluster';
            }

            _context.prev = 8;
            _context.next = 11;
            return http.post(url, {
              ccs: ccs
            });

          case 11:
            response = _context.sent;
            return _context.abrupt("return", response.data);

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](8);
            Private = angularState.injector.get('Private');
            ajaxErrorHandlers = Private(_ajax_error_handler.ajaxErrorHandlersProvider);
            return _context.abrupt("return", ajaxErrorHandlers(_context.t0));

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[8, 15]]);
  }));

  return function fetchCollectionData(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.fetchCollectionData = fetchCollectionData;

var notifySetupModeDataChange = function notifySetupModeDataChange(oldData) {
  setupModeState.callbacks.forEach(function (cb) {
    return cb(oldData);
  });
};

var updateSetupModeData =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(uuid) {
    var fetchWithoutClusterUuid,
        oldData,
        data,
        _ref3,
        cloud,
        isCloudEnabled,
        hasPermissions,
        text,
        globalState,
        clusterUuid,
        liveClusterUuid,
        migratedEsNodes,
        _args2 = arguments;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            fetchWithoutClusterUuid = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : false;
            oldData = setupModeState.data;
            _context2.next = 4;
            return fetchCollectionData(uuid, fetchWithoutClusterUuid);

          case 4:
            data = _context2.sent;
            setupModeState.data = data;
            _ref3 = _new_platform.npSetup.plugins, cloud = _ref3.cloud;
            isCloudEnabled = !!(cloud && cloud.isCloudEnabled);
            hasPermissions = (0, _lodash.get)(data, '_meta.hasPermissions', false);

            if (!(isCloudEnabled || !hasPermissions)) {
              _context2.next = 14;
              break;
            }

            text = '';

            if (!hasPermissions) {
              text = _i18n.i18n.translate('xpack.monitoring.setupMode.notAvailablePermissions', {
                defaultMessage: 'You do not have the necessary permissions to do this.'
              });
            } else {
              text = _i18n.i18n.translate('xpack.monitoring.setupMode.notAvailableCloud', {
                defaultMessage: 'This feature is not available on cloud.'
              });
            }

            angularState.scope.$evalAsync(function () {
              _notify.toastNotifications.addDanger({
                title: _i18n.i18n.translate('xpack.monitoring.setupMode.notAvailableTitle', {
                  defaultMessage: 'Setup mode is not available'
                }),
                text: text
              });
            });
            return _context2.abrupt("return", toggleSetupMode(false));

          case 14:
            notifySetupModeDataChange(oldData);
            globalState = angularState.injector.get('globalState');
            clusterUuid = globalState.cluster_uuid;

            if (!clusterUuid) {
              liveClusterUuid = (0, _lodash.get)(data, '_meta.liveClusterUuid');
              migratedEsNodes = Object.values((0, _lodash.get)(data, 'elasticsearch.byUuid', {})).filter(function (node) {
                return node.isPartiallyMigrated || node.isFullyMigrated;
              });

              if (liveClusterUuid && migratedEsNodes.length > 0) {
                setNewlyDiscoveredClusterUuid(liveClusterUuid);
              }
            }

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function updateSetupModeData(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.updateSetupModeData = updateSetupModeData;

var disableElasticsearchInternalCollection =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    var http, globalState, clusterUuid, url, response, Private, ajaxErrorHandlers;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            checkAngularState();
            http = angularState.injector.get('$http');
            globalState = angularState.injector.get('globalState');
            clusterUuid = globalState.cluster_uuid;
            url = "../api/monitoring/v1/setup/collection/".concat(clusterUuid, "/disable_internal_collection");
            _context3.prev = 5;
            _context3.next = 8;
            return http.post(url);

          case 8:
            response = _context3.sent;
            return _context3.abrupt("return", response.data);

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](5);
            Private = angularState.injector.get('Private');
            ajaxErrorHandlers = Private(_ajax_error_handler.ajaxErrorHandlersProvider);
            return _context3.abrupt("return", ajaxErrorHandlers(_context3.t0));

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[5, 12]]);
  }));

  return function disableElasticsearchInternalCollection() {
    return _ref4.apply(this, arguments);
  };
}();

exports.disableElasticsearchInternalCollection = disableElasticsearchInternalCollection;

var toggleSetupMode = function toggleSetupMode(inSetupMode) {
  checkAngularState();
  var globalState = angularState.injector.get('globalState');
  setupModeState.enabled = inSetupMode;
  globalState.inSetupMode = inSetupMode;
  globalState.save();
  setSetupModeMenuItem(); // eslint-disable-line  no-use-before-define

  notifySetupModeDataChange();

  if (inSetupMode) {
    // Intentionally do not await this so we don't block UI operations
    updateSetupModeData();
  }
};

exports.toggleSetupMode = toggleSetupMode;

var setSetupModeMenuItem = function setSetupModeMenuItem() {
  checkAngularState();

  if (isOnPage('no-data')) {
    return;
  }

  var globalState = angularState.injector.get('globalState');
  var _ref5 = _new_platform.npSetup.plugins,
      cloud = _ref5.cloud;
  var isCloudEnabled = !!(cloud && cloud.isCloudEnabled);
  var enabled = !globalState.inSetupMode && !isCloudEnabled;
  (0, _reactDom.render)(_react.default.createElement(_enter_button.SetupModeEnterButton, {
    enabled: enabled,
    toggleSetupMode: toggleSetupMode
  }), document.getElementById('setupModeNav'));
};

exports.setSetupModeMenuItem = setSetupModeMenuItem;

var addSetupModeCallback = function addSetupModeCallback(callback) {
  return setupModeState.callbacks.push(callback);
};

exports.addSetupModeCallback = addSetupModeCallback;

var initSetupModeState =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4($scope, $injector, callback) {
    var globalState;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            angularState.scope = $scope;
            angularState.injector = $injector;

            if (callback) {
              setupModeState.callbacks.push(callback);
            }

            globalState = $injector.get('globalState');

            if (!globalState.inSetupMode) {
              _context4.next = 7;
              break;
            }

            _context4.next = 7;
            return toggleSetupMode(true);

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function initSetupModeState(_x3, _x4, _x5) {
    return _ref6.apply(this, arguments);
  };
}();

exports.initSetupModeState = initSetupModeState;

var isInSetupMode = function isInSetupMode() {
  if (setupModeState.enabled) {
    return true;
  }

  var $injector = angularState.injector || _chrome.default.dangerouslyGetActiveInjector();

  var globalState = $injector.get('globalState');
  return globalState.inSetupMode;
};

exports.isInSetupMode = isInSetupMode;