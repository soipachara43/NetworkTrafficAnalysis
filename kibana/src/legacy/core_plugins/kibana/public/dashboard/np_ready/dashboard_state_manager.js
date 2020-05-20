"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DashboardStateManager = void 0;

var _i18n = require("@kbn/i18n");

var _lodash = _interopRequireDefault(require("lodash"));

var _public = require("../../../../../../plugins/embeddable/public");

var _legacy_imports = require("../legacy_imports");

var _lib = require("./lib");

var _embeddable_saved_object_converters = require("./lib/embeddable_saved_object_converters");

var _filter_utils = require("./lib/filter_utils");

var _public2 = require("../../../../../../plugins/kibana_utils/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

/**
 * Dashboard state manager handles connecting angular and redux state between the angular and react portions of the
 * app. There are two "sources of truth" that need to stay in sync - AppState (aka the `_a` portion of the url) and
 * the Store. They aren't complete duplicates of each other as AppState has state that the Store doesn't, and vice
 * versa. They should be as decoupled as possible so updating the store won't affect bwc of urls.
 */
var DashboardStateManager =
/*#__PURE__*/
function () {
  _createClass(DashboardStateManager, [{
    key: "appState",
    get: function get() {
      return this.stateContainer.get();
    }
  }, {
    key: "appState$",
    get: function get() {
      return this.stateContainer.state$;
    }
  }]);

  /**
   *
   * @param savedDashboard
   * @param hideWriteControls true if write controls should be hidden.
   * @param kibanaVersion current kibanaVersion
   * @param
   */
  function DashboardStateManager(_ref) {
    var _this = this;

    var savedDashboard = _ref.savedDashboard,
        hideWriteControls = _ref.hideWriteControls,
        kibanaVersion = _ref.kibanaVersion,
        kbnUrlStateStorage = _ref.kbnUrlStateStorage,
        history = _ref.history;

    _classCallCheck(this, DashboardStateManager);

    _defineProperty(this, "savedDashboard", void 0);

    _defineProperty(this, "lastSavedDashboardFilters", void 0);

    _defineProperty(this, "stateDefaults", void 0);

    _defineProperty(this, "hideWriteControls", void 0);

    _defineProperty(this, "kibanaVersion", void 0);

    _defineProperty(this, "isDirty", void 0);

    _defineProperty(this, "changeListeners", void 0);

    _defineProperty(this, "stateContainer", void 0);

    _defineProperty(this, "stateContainerChangeSub", void 0);

    _defineProperty(this, "STATE_STORAGE_KEY", '_a');

    _defineProperty(this, "kbnUrlStateStorage", void 0);

    _defineProperty(this, "stateSyncRef", void 0);

    _defineProperty(this, "history", void 0);

    this.history = history;
    this.kibanaVersion = kibanaVersion;
    this.savedDashboard = savedDashboard;
    this.hideWriteControls = hideWriteControls; // get state defaults from saved dashboard, make sure it is migrated

    this.stateDefaults = (0, _lib.migrateAppState)((0, _lib.getAppStateDefaults)(this.savedDashboard, this.hideWriteControls), kibanaVersion);
    this.kbnUrlStateStorage = kbnUrlStateStorage; // setup initial state by merging defaults with state from url
    // also run migration, as state in url could be of older version

    var initialState = (0, _lib.migrateAppState)(_objectSpread({}, this.stateDefaults, {}, this.kbnUrlStateStorage.get(this.STATE_STORAGE_KEY)), kibanaVersion); // setup state container using initial state both from defaults and from url

    this.stateContainer = (0, _public2.createStateContainer)(initialState, {
      set: function set(state) {
        return function (prop, value) {
          return _objectSpread({}, state, _defineProperty({}, prop, value));
        };
      },
      setOption: function setOption(state) {
        return function (option, value) {
          return _objectSpread({}, state, {
            options: _objectSpread({}, state.options, _defineProperty({}, option, value))
          });
        };
      }
    });
    this.isDirty = false; // We can't compare the filters stored on this.appState to this.savedDashboard because in order to apply
    // the filters to the visualizations, we need to save it on the dashboard. We keep track of the original
    // filter state in order to let the user know if their filters changed and provide this specific information
    // in the 'lose changes' warning message.

    this.lastSavedDashboardFilters = this.getFilterState();
    this.changeListeners = [];
    this.stateContainerChangeSub = this.stateContainer.state$.subscribe(function () {
      _this.isDirty = _this.checkIsDirty();

      _this.changeListeners.forEach(function (listener) {
        return listener({
          dirty: _this.isDirty
        });
      });
    }); // make sure url ('_a') matches initial state

    this.kbnUrlStateStorage.set(this.STATE_STORAGE_KEY, initialState, {
      replace: true
    }); // setup state syncing utils. state container will be synced with url into `this.STATE_STORAGE_KEY` query param

    this.stateSyncRef = (0, _public2.syncState)({
      storageKey: this.STATE_STORAGE_KEY,
      stateContainer: _objectSpread({}, this.stateContainer, {
        set: function set(state) {
          // sync state required state container to be able to handle null
          // overriding set() so it could handle null coming from url
          if (state) {
            // Skip this update if current dashboardId in the url is different from what we have in the current instance of state manager
            // As dashboard is driven by angular at the moment, the destroy cycle happens async,
            // If the dashboardId has changed it means this instance
            // is going to be destroyed soon and we shouldn't sync state anymore,
            // as it could potentially trigger further url updates
            var currentDashboardIdInUrl = (0, _lib.getDashboardIdFromUrl)(history.location.pathname);
            if (currentDashboardIdInUrl !== _this.savedDashboard.id) return;

            _this.stateContainer.set(_objectSpread({}, _this.stateDefaults, {}, state));
          } else {// Do nothing in case when state from url is empty,
            // this fixes: https://github.com/elastic/kibana/issues/57789
            // There are not much cases when state in url could become empty:
            // 1. User manually removed `_a` from the url
            // 2. Browser is navigating away from the page and most likely there is no `_a` in the url.
            //    In this case we don't want to do any state updates
            //    and just allow $scope.$on('destroy') fire later and clean up everything
          }
        }
      }),
      stateStorage: this.kbnUrlStateStorage
    });
  }

  _createClass(DashboardStateManager, [{
    key: "startStateSyncing",
    value: function startStateSyncing() {
      this.saveState({
        replace: true
      });
      this.stateSyncRef.start();
    }
  }, {
    key: "registerChangeListener",
    value: function registerChangeListener(callback) {
      this.changeListeners.push(callback);
    }
  }, {
    key: "handleDashboardContainerChanges",
    value: function handleDashboardContainerChanges(dashboardContainer) {
      var _this2 = this;

      var dirty = false;
      var dirtyBecauseOfInitialStateMigration = false;
      var savedDashboardPanelMap = {};
      var input = dashboardContainer.getInput();
      this.getPanels().forEach(function (savedDashboardPanel) {
        if (input.panels[savedDashboardPanel.panelIndex] !== undefined) {
          savedDashboardPanelMap[savedDashboardPanel.panelIndex] = savedDashboardPanel;
        } else {
          // A panel was deleted.
          dirty = true;
        }
      });
      var convertedPanelStateMap = {};
      Object.values(input.panels).forEach(function (panelState) {
        if (savedDashboardPanelMap[panelState.explicitInput.id] === undefined) {
          dirty = true;
        }

        convertedPanelStateMap[panelState.explicitInput.id] = (0, _embeddable_saved_object_converters.convertPanelStateToSavedDashboardPanel)(panelState, _this2.kibanaVersion);

        if (!_lodash.default.isEqual(convertedPanelStateMap[panelState.explicitInput.id], savedDashboardPanelMap[panelState.explicitInput.id])) {
          var _savedDashboardPanelM, _convertedPanelStateM;

          // A panel was changed
          dirty = true;
          var oldVersion = (_savedDashboardPanelM = savedDashboardPanelMap[panelState.explicitInput.id]) === null || _savedDashboardPanelM === void 0 ? void 0 : _savedDashboardPanelM.version;
          var newVersion = (_convertedPanelStateM = convertedPanelStateMap[panelState.explicitInput.id]) === null || _convertedPanelStateM === void 0 ? void 0 : _convertedPanelStateM.version;

          if (oldVersion && newVersion && oldVersion !== newVersion) {
            dirtyBecauseOfInitialStateMigration = true;
          }
        }
      });

      if (dirty) {
        this.stateContainer.transitions.set('panels', Object.values(convertedPanelStateMap));

        if (dirtyBecauseOfInitialStateMigration) {
          this.saveState({
            replace: true
          });
        }
      }

      if (input.isFullScreenMode !== this.getFullScreenMode()) {
        this.setFullScreenMode(input.isFullScreenMode);
      }

      if (!_lodash.default.isEqual(input.query, this.getQuery())) {
        this.setQuery(input.query);
      }

      this.changeListeners.forEach(function (listener) {
        return listener({
          dirty: dirty
        });
      });
    }
  }, {
    key: "getFullScreenMode",
    value: function getFullScreenMode() {
      return this.appState.fullScreenMode;
    }
  }, {
    key: "setFullScreenMode",
    value: function setFullScreenMode(fullScreenMode) {
      this.stateContainer.transitions.set('fullScreenMode', fullScreenMode);
    }
  }, {
    key: "setFilters",
    value: function setFilters(filters) {
      this.stateContainer.transitions.set('filters', filters);
    }
    /**
     * Resets the state back to the last saved version of the dashboard.
     */

  }, {
    key: "resetState",
    value: function resetState() {
      // In order to show the correct warning, we have to store the unsaved
      // title on the dashboard object. We should fix this at some point, but this is how all the other object
      // save panels work at the moment.
      this.savedDashboard.title = this.savedDashboard.lastSavedTitle; // appState.reset uses the internal defaults to reset the state, but some of the default settings (e.g. the panels
      // array) point to the same object that is stored on appState and is getting modified.
      // The right way to fix this might be to ensure the defaults object stored on state is a deep
      // clone, but given how much code uses the state object, I determined that to be too risky of a change for
      // now.  TODO: revisit this!

      this.stateDefaults = (0, _lib.migrateAppState)((0, _lib.getAppStateDefaults)(this.savedDashboard, this.hideWriteControls), this.kibanaVersion); // The original query won't be restored by the above because the query on this.savedDashboard is applied
      // in place in order for it to affect the visualizations.

      this.stateDefaults.query = this.lastSavedDashboardFilters.query; // Need to make a copy to ensure they are not overwritten.

      this.stateDefaults.filters = _toConsumableArray(this.getLastSavedFilterBars());
      this.isDirty = false;
      this.stateContainer.set(this.stateDefaults);
    }
    /**
     * Returns an object which contains the current filter state of this.savedDashboard.
     */

  }, {
    key: "getFilterState",
    value: function getFilterState() {
      return {
        timeTo: this.savedDashboard.timeTo,
        timeFrom: this.savedDashboard.timeFrom,
        filterBars: this.savedDashboard.getFilters(),
        query: this.savedDashboard.getQuery()
      };
    }
  }, {
    key: "getTitle",
    value: function getTitle() {
      return this.appState.title;
    }
  }, {
    key: "isSaved",
    value: function isSaved() {
      return !!this.savedDashboard.id;
    }
  }, {
    key: "isNew",
    value: function isNew() {
      return !this.isSaved();
    }
  }, {
    key: "getDescription",
    value: function getDescription() {
      return this.appState.description;
    }
  }, {
    key: "setDescription",
    value: function setDescription(description) {
      this.stateContainer.transitions.set('description', description);
    }
  }, {
    key: "setTitle",
    value: function setTitle(title) {
      this.savedDashboard.title = title;
      this.stateContainer.transitions.set('title', title);
    }
  }, {
    key: "getAppState",
    value: function getAppState() {
      return this.stateContainer.get();
    }
  }, {
    key: "getQuery",
    value: function getQuery() {
      return (0, _legacy_imports.migrateLegacyQuery)(this.stateContainer.get().query);
    }
  }, {
    key: "getSavedQueryId",
    value: function getSavedQueryId() {
      return this.stateContainer.get().savedQuery;
    }
  }, {
    key: "setSavedQueryId",
    value: function setSavedQueryId(id) {
      this.stateContainer.transitions.set('savedQuery', id);
    }
  }, {
    key: "getUseMargins",
    value: function getUseMargins() {
      // Existing dashboards that don't define this should default to false.
      return this.appState.options.useMargins === undefined ? false : this.appState.options.useMargins;
    }
  }, {
    key: "setUseMargins",
    value: function setUseMargins(useMargins) {
      this.stateContainer.transitions.setOption('useMargins', useMargins);
    }
  }, {
    key: "getHidePanelTitles",
    value: function getHidePanelTitles() {
      return this.appState.options.hidePanelTitles;
    }
  }, {
    key: "setHidePanelTitles",
    value: function setHidePanelTitles(hidePanelTitles) {
      this.stateContainer.transitions.setOption('hidePanelTitles', hidePanelTitles);
    }
  }, {
    key: "getTimeRestore",
    value: function getTimeRestore() {
      return this.appState.timeRestore;
    }
  }, {
    key: "setTimeRestore",
    value: function setTimeRestore(timeRestore) {
      this.stateContainer.transitions.set('timeRestore', timeRestore);
    }
  }, {
    key: "getIsTimeSavedWithDashboard",
    value: function getIsTimeSavedWithDashboard() {
      return this.savedDashboard.timeRestore;
    }
  }, {
    key: "getLastSavedFilterBars",
    value: function getLastSavedFilterBars() {
      return this.lastSavedDashboardFilters.filterBars;
    }
  }, {
    key: "getLastSavedQuery",
    value: function getLastSavedQuery() {
      return this.lastSavedDashboardFilters.query;
    }
    /**
     * @returns True if the query changed since the last time the dashboard was saved, or if it's a
     * new dashboard, if the query differs from the default.
     */

  }, {
    key: "getQueryChanged",
    value: function getQueryChanged() {
      var currentQuery = this.appState.query;
      var lastSavedQuery = this.getLastSavedQuery();
      var query = (0, _legacy_imports.migrateLegacyQuery)(currentQuery);

      var isLegacyStringQuery = _lodash.default.isString(lastSavedQuery) && _lodash.default.isPlainObject(currentQuery) && _lodash.default.has(currentQuery, 'query');

      if (isLegacyStringQuery) {
        return lastSavedQuery !== query.query;
      }

      return !_lodash.default.isEqual(currentQuery, lastSavedQuery);
    }
    /**
     * @returns True if the filter bar state has changed since the last time the dashboard was saved,
     * or if it's a new dashboard, if the query differs from the default.
     */

  }, {
    key: "getFilterBarChanged",
    value: function getFilterBarChanged() {
      return !_lodash.default.isEqual(_filter_utils.FilterUtils.cleanFiltersForComparison(this.appState.filters), _filter_utils.FilterUtils.cleanFiltersForComparison(this.getLastSavedFilterBars()));
    }
    /**
     * @param timeFilter
     * @returns True if the time state has changed since the time saved with the dashboard.
     */

  }, {
    key: "getTimeChanged",
    value: function getTimeChanged(timeFilter) {
      return !_filter_utils.FilterUtils.areTimesEqual(this.lastSavedDashboardFilters.timeFrom, timeFilter.getTime().from) || !_filter_utils.FilterUtils.areTimesEqual(this.lastSavedDashboardFilters.timeTo, timeFilter.getTime().to);
    }
  }, {
    key: "getViewMode",
    value: function getViewMode() {
      return this.hideWriteControls ? _public.ViewMode.VIEW : this.appState.viewMode;
    }
  }, {
    key: "getIsViewMode",
    value: function getIsViewMode() {
      return this.getViewMode() === _public.ViewMode.VIEW;
    }
  }, {
    key: "getIsEditMode",
    value: function getIsEditMode() {
      return this.getViewMode() === _public.ViewMode.EDIT;
    }
    /**
     *
     * @returns True if the dashboard has changed since the last save (or, is new).
     */

  }, {
    key: "getIsDirty",
    value: function getIsDirty(timeFilter) {
      // Filter bar comparison is done manually (see cleanFiltersForComparison for the reason) and time picker
      // changes are not tracked by the state monitor.
      var hasTimeFilterChanged = timeFilter ? this.getFiltersChanged(timeFilter) : false;
      return this.getIsEditMode() && (this.isDirty || hasTimeFilterChanged);
    }
  }, {
    key: "getPanels",
    value: function getPanels() {
      return this.appState.panels;
    }
  }, {
    key: "updatePanel",
    value: function updatePanel(panelIndex, panelAttributes) {
      var foundPanel = this.getPanels().find(function (panel) {
        return panel.panelIndex === panelIndex;
      });
      Object.assign(foundPanel, panelAttributes);
      return foundPanel;
    }
    /**
     * @param timeFilter
     * @returns An array of user friendly strings indicating the filter types that have changed.
     */

  }, {
    key: "getChangedFilterTypes",
    value: function getChangedFilterTypes(timeFilter) {
      var changedFilters = [];

      if (this.getFilterBarChanged()) {
        changedFilters.push('filter');
      }

      if (this.getQueryChanged()) {
        changedFilters.push('query');
      }

      if (this.savedDashboard.timeRestore && this.getTimeChanged(timeFilter)) {
        changedFilters.push('time range');
      }

      return changedFilters;
    }
    /**
     * @returns True if filters (query, filter bar filters, and time picker if time is stored
     * with the dashboard) have changed since the last saved state (or if the dashboard hasn't been saved,
     * the default state).
     */

  }, {
    key: "getFiltersChanged",
    value: function getFiltersChanged(timeFilter) {
      return this.getChangedFilterTypes(timeFilter).length > 0;
    }
    /**
     * Updates timeFilter to match the time saved with the dashboard.
     * @param timeFilter
     * @param timeFilter.setTime
     * @param timeFilter.setRefreshInterval
     */

  }, {
    key: "syncTimefilterWithDashboardTime",
    value: function syncTimefilterWithDashboardTime(timeFilter) {
      if (!this.getIsTimeSavedWithDashboard()) {
        throw new Error(_i18n.i18n.translate('kbn.dashboard.stateManager.timeNotSavedWithDashboardErrorMessage', {
          defaultMessage: 'The time is not saved with this dashboard so should not be synced.'
        }));
      }

      if (this.savedDashboard.timeFrom && this.savedDashboard.timeTo) {
        timeFilter.setTime({
          from: this.savedDashboard.timeFrom,
          to: this.savedDashboard.timeTo
        });
      }
    }
    /**
     * Updates timeFilter to match the refreshInterval saved with the dashboard.
     * @param timeFilter
     */

  }, {
    key: "syncTimefilterWithDashboardRefreshInterval",
    value: function syncTimefilterWithDashboardRefreshInterval(timeFilter) {
      if (!this.getIsTimeSavedWithDashboard()) {
        throw new Error(_i18n.i18n.translate('kbn.dashboard.stateManager.timeNotSavedWithDashboardErrorMessage', {
          defaultMessage: 'The time is not saved with this dashboard so should not be synced.'
        }));
      }

      if (this.savedDashboard.refreshInterval) {
        timeFilter.setRefreshInterval(this.savedDashboard.refreshInterval);
      }
    }
    /**
     * Synchronously writes current state to url
     * returned boolean indicates whether the update happened and if history was updated
     */

  }, {
    key: "saveState",
    value: function saveState(_ref2) {
      var replace = _ref2.replace;
      // schedules setting current state to url
      this.kbnUrlStateStorage.set(this.STATE_STORAGE_KEY, this.stateContainer.get()); // immediately forces scheduled updates and changes location

      return this.kbnUrlStateStorage.flush({
        replace: replace
      });
    } // TODO: find nicer solution for this
    // this function helps to make just 1 browser history update, when we imperatively changing the dashboard url
    // It could be that there is pending *dashboardStateManager* updates, which aren't flushed yet to the url.
    // So to prevent 2 browser updates:
    // 1. Force flush any pending state updates (syncing state to query)
    // 2. If url was updated, then apply path change with replace

  }, {
    key: "changeDashboardUrl",
    value: function changeDashboardUrl(pathname) {
      // synchronously persist current state to url with push()
      var updated = this.saveState({
        replace: false
      }); // change pathname

      this.history[updated ? 'replace' : 'push'](_objectSpread({}, this.history.location, {
        pathname: pathname
      }));
    }
  }, {
    key: "setQuery",
    value: function setQuery(query) {
      this.stateContainer.transitions.set('query', query);
    }
    /**
     * Applies the current filter state to the dashboard.
     * @param filter An array of filter bar filters.
     */

  }, {
    key: "applyFilters",
    value: function applyFilters(query, filters) {
      this.savedDashboard.searchSource.setField('query', query);
      this.savedDashboard.searchSource.setField('filter', filters);
      this.stateContainer.transitions.set('query', query);
    }
  }, {
    key: "switchViewMode",
    value: function switchViewMode(newMode) {
      this.stateContainer.transitions.set('viewMode', newMode);
    }
    /**
     * Destroys and cleans up this object when it's no longer used.
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.stateContainerChangeSub.unsubscribe();
      this.savedDashboard.destroy();

      if (this.stateSyncRef) {
        this.stateSyncRef.stop();
      }
    }
  }, {
    key: "checkIsDirty",
    value: function checkIsDirty() {
      // Filters need to be compared manually because they sometimes have a $$hashkey stored on the object.
      // Query needs to be compared manually because saved legacy queries get migrated in app state automatically
      var propsToIgnore = ['viewMode', 'filters', 'query'];

      var initial = _lodash.default.omit(this.stateDefaults, propsToIgnore);

      var current = _lodash.default.omit(this.stateContainer.get(), propsToIgnore);

      return !_lodash.default.isEqual(initial, current);
    }
  }]);

  return DashboardStateManager;
}();

exports.DashboardStateManager = DashboardStateManager;