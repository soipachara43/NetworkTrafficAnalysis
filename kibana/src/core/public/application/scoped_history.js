"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScopedHistory = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * A wrapper around a `History` instance that is scoped to a particular base path of the history stack. Behaves
 * similarly to the `basename` option except that this wrapper hides any history stack entries from outside the scope
 * of this base path.
 *
 * This wrapper also allows Core and Plugins to share a single underlying global `History` instance without exposing
 * the history of other applications.
 *
 * The {@link ScopedHistory.createSubHistory | createSubHistory} method is particularly useful for applications that
 * contain any number of "sub-apps" which should not have access to the main application's history or basePath.
 *
 * @public
 */
var ScopedHistory =
/*#__PURE__*/
function () {
  /**
   * Tracks whether or not the user has left this history's scope. All methods throw errors if called after scope has
   * been left.
   */

  /**
   * All active listeners on this history instance.
   */

  /**
   * Array of the local history stack. Only stores {@link Location.key} to use tracking an index of the current
   * position of the window in the history stack.
   */

  /**
   * The key of the current position of the window in the history stack.
   */
  function ScopedHistory(parentHistory, basePath) {
    var _this = this;

    _classCallCheck(this, ScopedHistory);

    this.parentHistory = parentHistory;
    this.basePath = basePath;

    _defineProperty(this, "isActive", true);

    _defineProperty(this, "listeners", new Set());

    _defineProperty(this, "locationKeys", []);

    _defineProperty(this, "currentLocationKeyIndex", 0);

    _defineProperty(this, "createSubHistory", function (basePath) {
      return new ScopedHistory(_this, basePath);
    });

    _defineProperty(this, "push", function (pathOrLocation, state) {
      _this.verifyActive();

      if (typeof pathOrLocation === 'string') {
        _this.parentHistory.push(_this.prependBasePath(pathOrLocation), state);
      } else {
        _this.parentHistory.push(_this.prependBasePath(pathOrLocation));
      }
    });

    _defineProperty(this, "replace", function (pathOrLocation, state) {
      _this.verifyActive();

      if (typeof pathOrLocation === 'string') {
        _this.parentHistory.replace(_this.prependBasePath(pathOrLocation), state);
      } else {
        _this.parentHistory.replace(_this.prependBasePath(pathOrLocation));
      }
    });

    _defineProperty(this, "go", function (n) {
      _this.verifyActive();

      if (n === 0) {
        _this.parentHistory.go(n);
      } else if (n < 0) {
        if (_this.currentLocationKeyIndex + 1 + n >= 1) {
          _this.parentHistory.go(n);
        }
      } else if (n <= _this.currentLocationKeyIndex + _this.locationKeys.length - 1) {
        _this.parentHistory.go(n);
      } // no-op if no conditions above are met

    });

    _defineProperty(this, "goBack", function () {
      _this.verifyActive();

      _this.go(-1);
    });

    _defineProperty(this, "goForward", function () {
      _this.verifyActive();

      _this.go(1);
    });

    _defineProperty(this, "block", function (prompt) {
      throw new Error("history.block is not supported. Please use the AppMountParams.onAppLeave API.");
    });

    _defineProperty(this, "listen", function (listener) {
      _this.verifyActive();

      _this.listeners.add(listener);

      return function () {
        _this.listeners.delete(listener);
      };
    });

    _defineProperty(this, "createHref", function (location) {
      _this.verifyActive();

      return _this.parentHistory.createHref(location);
    });

    var parentPath = this.parentHistory.location.pathname;

    if (!parentPath.startsWith(basePath)) {
      throw new Error("Browser location [".concat(parentPath, "] is not currently in expected basePath [").concat(basePath, "]"));
    }

    this.locationKeys.push(this.parentHistory.location.key);
    this.setupHistoryListener();
  }
  /**
   * Creates a `ScopedHistory` for a subpath of this `ScopedHistory`. Useful for applications that may have sub-apps
   * that do not need access to the containing application's history.
   *
   * @param basePath the URL path scope for the sub history
   */


  _createClass(ScopedHistory, [{
    key: "prependBasePath",

    /**
     * Prepends the scoped base path to the Path or Location
     */
    value: function prependBasePath(pathOrLocation) {
      if (typeof pathOrLocation === 'string') {
        return this.prependBasePathToString(pathOrLocation);
      } else {
        return _objectSpread({}, pathOrLocation, {
          pathname: pathOrLocation.pathname !== undefined ? this.prependBasePathToString(pathOrLocation.pathname) : undefined
        });
      }
    }
    /**
     * Prepends the base path to string.
     */

  }, {
    key: "prependBasePathToString",
    value: function prependBasePathToString(path) {
      path = path.startsWith('/') ? path.slice(1) : path;
      return path.length ? "".concat(this.basePath, "/").concat(path) : this.basePath;
    }
    /**
     * Removes the base path from a location.
     */

  }, {
    key: "stripBasePath",
    value: function stripBasePath(location) {
      return _objectSpread({}, location, {
        pathname: location.pathname.replace(new RegExp("^".concat(this.basePath)), '')
      });
    }
    /** Called on each public method to ensure that we have not fallen out of scope yet. */

  }, {
    key: "verifyActive",
    value: function verifyActive() {
      if (!this.isActive) {
        throw new Error("ScopedHistory instance has fell out of navigation scope for basePath: ".concat(this.basePath));
      }
    }
    /**
     * Sets up the listener on the parent history instance used to follow navigation updates and track our internal
     * state. Also forwards events to child listeners with the base path stripped from the location.
     */

  }, {
    key: "setupHistoryListener",
    value: function setupHistoryListener() {
      var _this2 = this;

      var unlisten = this.parentHistory.listen(function (location, action) {
        // If the user navigates outside the scope of this basePath, tear it down.
        if (!location.pathname.startsWith(_this2.basePath)) {
          unlisten();
          _this2.isActive = false;
          return;
        }
        /**
         * Track location keys using the same algorithm the browser uses internally.
         * - On PUSH, remove all items that came after the current location and append the new location.
         * - On POP, set the current location, but do not change the entries.
         * - On REPLACE, override the location for the current index with the new location.
         */


        if (action === 'PUSH') {
          _this2.locationKeys = [].concat(_toConsumableArray(_this2.locationKeys.slice(0, _this2.currentLocationKeyIndex + 1)), [location.key]);
          _this2.currentLocationKeyIndex = _this2.locationKeys.indexOf(location.key); // should always be the last index
        } else if (action === 'POP') {
          _this2.currentLocationKeyIndex = _this2.locationKeys.indexOf(location.key);
        } else if (action === 'REPLACE') {
          _this2.locationKeys[_this2.currentLocationKeyIndex] = location.key;
        } else {
          throw new Error("Unrecognized history action: ".concat(action));
        }

        _toConsumableArray(_this2.listeners).forEach(function (listener) {
          listener(_this2.stripBasePath(location), action);
        });
      });
    }
  }, {
    key: "length",

    /**
     * The number of entries in the history stack, including all entries forwards and backwards from the current location.
     */
    get: function get() {
      this.verifyActive();
      return this.locationKeys.length;
    }
    /**
     * The current location of the history stack.
     */

  }, {
    key: "location",
    get: function get() {
      this.verifyActive();
      return this.stripBasePath(this.parentHistory.location);
    }
    /**
     * The last action dispatched on the history stack.
     */

  }, {
    key: "action",
    get: function get() {
      this.verifyActive();
      return this.parentHistory.action;
    }
    /**
     * Pushes a new location onto the history stack. If there are forward entries in the stack, they will be removed.
     *
     * @param pathOrLocation a string or location descriptor
     * @param state
     */

  }]);

  return ScopedHistory;
}();

exports.ScopedHistory = ScopedHistory;