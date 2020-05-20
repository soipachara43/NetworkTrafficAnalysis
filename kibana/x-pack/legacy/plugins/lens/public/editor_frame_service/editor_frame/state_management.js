"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActiveDatasourceIdFromDoc = getActiveDatasourceIdFromDoc;
exports.reducer = exports.getInitialState = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getActiveDatasourceIdFromDoc(doc) {
  if (!doc) {
    return null;
  }

  var _Object$keys = Object.keys(doc.state.datasourceStates),
      _Object$keys2 = _slicedToArray(_Object$keys, 1),
      initialDatasourceId = _Object$keys2[0];

  return initialDatasourceId || null;
}

function getInitialDatasourceId(props) {
  return props.initialDatasourceId ? props.initialDatasourceId : getActiveDatasourceIdFromDoc(props.doc);
}

var getInitialState = function getInitialState(props) {
  var datasourceStates = {};

  if (props.doc) {
    Object.entries(props.doc.state.datasourceStates).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          datasourceId = _ref2[0],
          state = _ref2[1];

      datasourceStates[datasourceId] = {
        isLoading: true,
        state: state
      };
    });
  } else if (props.initialDatasourceId) {
    datasourceStates[props.initialDatasourceId] = {
      state: null,
      isLoading: true
    };
  }

  return {
    title: '',
    datasourceStates: datasourceStates,
    activeDatasourceId: getInitialDatasourceId(props),
    visualization: {
      state: null,
      activeId: props.initialVisualizationId
    }
  };
};

exports.getInitialState = getInitialState;

var reducer = function reducer(state, action) {
  switch (action.type) {
    case 'RESET':
      return action.state;

    case 'UPDATE_TITLE':
      return _objectSpread({}, state, {
        title: action.title
      });

    case 'UPDATE_STATE':
      return action.updater(state);

    case 'UPDATE_LAYER':
      return _objectSpread({}, state, {
        datasourceStates: _objectSpread({}, state.datasourceStates, _defineProperty({}, action.datasourceId, _objectSpread({}, state.datasourceStates[action.datasourceId], {
          state: action.updater(state.datasourceStates[action.datasourceId].state, action.layerId)
        })))
      });

    case 'VISUALIZATION_LOADED':
      return _objectSpread({}, state, {
        persistedId: action.doc.id,
        title: action.doc.title,
        datasourceStates: Object.entries(action.doc.state.datasourceStates).reduce(function (stateMap, _ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              datasourceId = _ref4[0],
              datasourceState = _ref4[1];

          return _objectSpread({}, stateMap, _defineProperty({}, datasourceId, {
            isLoading: true,
            state: datasourceState
          }));
        }, {}),
        activeDatasourceId: getActiveDatasourceIdFromDoc(action.doc),
        visualization: _objectSpread({}, state.visualization, {
          activeId: action.doc.visualizationType,
          state: action.doc.state.visualization
        })
      });

    case 'SWITCH_DATASOURCE':
      return _objectSpread({}, state, {
        datasourceStates: _objectSpread({}, state.datasourceStates, _defineProperty({}, action.newDatasourceId, state.datasourceStates[action.newDatasourceId] || {
          state: null,
          isLoading: true
        })),
        activeDatasourceId: action.newDatasourceId
      });

    case 'SWITCH_VISUALIZATION':
      return _objectSpread({}, state, {
        datasourceStates: 'datasourceId' in action && action.datasourceId ? _objectSpread({}, state.datasourceStates, _defineProperty({}, action.datasourceId, _objectSpread({}, state.datasourceStates[action.datasourceId], {
          state: action.datasourceState
        }))) : state.datasourceStates,
        visualization: _objectSpread({}, state.visualization, {
          activeId: action.newVisualizationId,
          state: action.initialState
        }),
        stagedPreview: undefined
      });

    case 'SELECT_SUGGESTION':
      return _objectSpread({}, state, {
        datasourceStates: 'datasourceId' in action && action.datasourceId ? _objectSpread({}, state.datasourceStates, _defineProperty({}, action.datasourceId, _objectSpread({}, state.datasourceStates[action.datasourceId], {
          state: action.datasourceState
        }))) : state.datasourceStates,
        visualization: _objectSpread({}, state.visualization, {
          activeId: action.newVisualizationId,
          state: action.initialState
        }),
        stagedPreview: state.stagedPreview || {
          datasourceStates: state.datasourceStates,
          visualization: state.visualization
        }
      });

    case 'ROLLBACK_SUGGESTION':
      return _objectSpread({}, state, {}, state.stagedPreview || {}, {
        stagedPreview: undefined
      });

    case 'SUBMIT_SUGGESTION':
      return _objectSpread({}, state, {
        stagedPreview: undefined
      });

    case 'UPDATE_DATASOURCE_STATE':
      return _objectSpread({}, state, {
        datasourceStates: _objectSpread({}, state.datasourceStates, _defineProperty({}, action.datasourceId, {
          state: typeof action.updater === 'function' ? action.updater(state.datasourceStates[action.datasourceId].state) : action.updater,
          isLoading: false
        })),
        stagedPreview: action.clearStagedPreview ? undefined : state.stagedPreview
      });

    case 'UPDATE_VISUALIZATION_STATE':
      if (!state.visualization.activeId) {
        throw new Error('Invariant: visualization state got updated without active visualization');
      } // This is a safeguard that prevents us from accidentally updating the
      // wrong visualization. This occurs in some cases due to the uncoordinated
      // way we manage state across plugins.


      if (state.visualization.activeId !== action.visualizationId) {
        return state;
      }

      return _objectSpread({}, state, {
        visualization: _objectSpread({}, state.visualization, {
          state: action.newState
        }),
        stagedPreview: action.clearStagedPreview ? undefined : state.stagedPreview
      });

    default:
      return state;
  }
};

exports.reducer = reducer;