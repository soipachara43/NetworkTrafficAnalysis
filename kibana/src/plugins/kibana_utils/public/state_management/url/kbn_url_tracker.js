"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createKbnUrlTracker = createKbnUrlTracker;

var _history = require("history");

var _kbn_url_storage = require("./kbn_url_storage");

var _hash_unhash_url = require("./hash_unhash_url");

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
 * Listens to history changes and optionally to global state changes and updates the nav link url of
 * a given app to point to the last visited page within the app.
 *
 * This includes the following parts:
 * * When the app is currently active, the nav link points to the configurable default url of the app.
 * * When the app is not active the last visited url is set to the nav link.
 * * When a provided observable emits a new value, the state parameter in the url of the nav link is updated
 * as long as the app is not active.
 */
function createKbnUrlTracker(_ref) {
  var baseUrl = _ref.baseUrl,
      defaultSubUrl = _ref.defaultSubUrl,
      storageKey = _ref.storageKey,
      stateParams = _ref.stateParams,
      navLinkUpdater$ = _ref.navLinkUpdater$,
      toastNotifications = _ref.toastNotifications,
      history = _ref.history,
      storage = _ref.storage,
      _ref$shouldTrackUrlUp = _ref.shouldTrackUrlUpdate,
      shouldTrackUrlUpdate = _ref$shouldTrackUrlUp === void 0 ? function (pathname) {
    var currentAppName = defaultSubUrl.slice(2); // cut hash and slash symbols

    var targetAppName = pathname.split('/')[1];
    return currentAppName === targetAppName;
  } : _ref$shouldTrackUrlUp;
  var historyInstance = history || (0, _history.createHashHistory)();
  var storageInstance = storage || sessionStorage; // local state storing current listeners and active url

  var activeUrl = '';
  var unsubscribeURLHistory;
  var unsubscribeGlobalState;

  function setNavLink(hash) {
    navLinkUpdater$.next(function () {
      return {
        activeUrl: baseUrl + hash
      };
    });
  }

  function getActiveSubUrl(url) {
    // remove baseUrl prefix (just storing the sub url part)
    return url.substr(baseUrl.length);
  }

  function unsubscribe() {
    if (unsubscribeURLHistory) {
      unsubscribeURLHistory();
      unsubscribeURLHistory = undefined;
    }

    if (unsubscribeGlobalState) {
      unsubscribeGlobalState.forEach(function (sub) {
        return sub.unsubscribe();
      });
      unsubscribeGlobalState = undefined;
    }
  }

  function setActiveUrl(newUrl) {
    var urlWithHashes = baseUrl + '#' + newUrl;
    var urlWithStates = '';

    try {
      urlWithStates = (0, _hash_unhash_url.unhashUrl)(urlWithHashes);
    } catch (e) {
      toastNotifications.addDanger(e.message);
    }

    activeUrl = getActiveSubUrl(urlWithStates || urlWithHashes);
    storageInstance.setItem(storageKey, activeUrl);
  }

  function onMountApp() {
    unsubscribe(); // track current hash when within app

    unsubscribeURLHistory = historyInstance.listen(function (location) {
      if (shouldTrackUrlUpdate(location.pathname)) {
        setActiveUrl(location.pathname + location.search);
      }
    });
  }

  function onUnmountApp() {
    unsubscribe(); // propagate state updates when in other apps

    unsubscribeGlobalState = stateParams.map(function (_ref2) {
      var stateUpdate$ = _ref2.stateUpdate$,
          kbnUrlKey = _ref2.kbnUrlKey;
      return stateUpdate$.subscribe(function (state) {
        var updatedUrl = (0, _kbn_url_storage.setStateToKbnUrl)(kbnUrlKey, state, {
          useHash: false
        }, baseUrl + (activeUrl || defaultSubUrl)); // remove baseUrl prefix (just storing the sub url part)

        activeUrl = getActiveSubUrl(updatedUrl);
        storageInstance.setItem(storageKey, activeUrl);
        setNavLink(activeUrl);
      });
    });
  } // register listeners for unmounted app initially


  onUnmountApp(); // initialize nav link and internal state

  var storedUrl = storageInstance.getItem(storageKey);

  if (storedUrl) {
    activeUrl = storedUrl;
    setNavLink(storedUrl);
  }

  return {
    appMounted: function appMounted() {
      onMountApp();
      setNavLink(defaultSubUrl);
    },
    appUnMounted: function appUnMounted() {
      onUnmountApp();
      setNavLink(activeUrl);
    },
    stop: function stop() {
      unsubscribe();
    },
    setActiveUrl: setActiveUrl
  };
}