"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadIndexPatterns = loadIndexPatterns;
exports.loadInitialState = loadInitialState;
exports.changeIndexPattern = changeIndexPattern;
exports.changeLayerIndexPattern = changeLayerIndexPattern;
exports.syncExistingFields = syncExistingFields;

var _lodash = _interopRequireDefault(require("lodash"));

var _state_helpers = require("./state_helpers");

var _common = require("../../../../../plugins/lens/common");

var _document_field = require("./document_field");

var _public = require("../../../../../../src/plugins/data/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function loadIndexPatterns(_x) {
  return _loadIndexPatterns.apply(this, arguments);
}

function _loadIndexPatterns() {
  _loadIndexPatterns = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref) {
    var patterns, savedObjectsClient, cache, missingIds, resp;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            patterns = _ref.patterns, savedObjectsClient = _ref.savedObjectsClient, cache = _ref.cache;
            missingIds = patterns.filter(function (id) {
              return !cache[id];
            });

            if (!(missingIds.length === 0)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", cache);

          case 4:
            _context.next = 6;
            return savedObjectsClient.bulkGet(missingIds.map(function (id) {
              return {
                id: id,
                type: 'index-pattern'
              };
            }));

          case 6:
            resp = _context.sent;
            return _context.abrupt("return", resp.savedObjects.reduce(function (acc, savedObject) {
              var indexPattern = fromSavedObject(savedObject);
              acc[indexPattern.id] = indexPattern;
              return acc;
            }, _objectSpread({}, cache)));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _loadIndexPatterns.apply(this, arguments);
}

function loadInitialState(_x2) {
  return _loadInitialState.apply(this, arguments);
}

function _loadInitialState() {
  _loadInitialState = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(_ref2) {
    var state, savedObjectsClient, defaultIndexPatternId, indexPatternRefs, requiredPatterns, currentIndexPatternId, indexPatterns;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            state = _ref2.state, savedObjectsClient = _ref2.savedObjectsClient, defaultIndexPatternId = _ref2.defaultIndexPatternId;
            _context2.next = 3;
            return loadIndexPatternRefs(savedObjectsClient);

          case 3:
            indexPatternRefs = _context2.sent;
            requiredPatterns = _lodash.default.unique(state ? Object.values(state.layers).map(function (l) {
              return l.indexPatternId;
            }).concat(state.currentIndexPatternId) : [defaultIndexPatternId || indexPatternRefs[0].id]);
            currentIndexPatternId = requiredPatterns[0];
            _context2.next = 8;
            return loadIndexPatterns({
              savedObjectsClient: savedObjectsClient,
              cache: {},
              patterns: requiredPatterns
            });

          case 8:
            indexPatterns = _context2.sent;

            if (!state) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return", _objectSpread({}, state, {
              currentIndexPatternId: currentIndexPatternId,
              indexPatternRefs: indexPatternRefs,
              indexPatterns: indexPatterns,
              showEmptyFields: false,
              existingFields: {}
            }));

          case 11:
            return _context2.abrupt("return", {
              currentIndexPatternId: currentIndexPatternId,
              indexPatternRefs: indexPatternRefs,
              indexPatterns: indexPatterns,
              layers: {},
              showEmptyFields: false,
              existingFields: {}
            });

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _loadInitialState.apply(this, arguments);
}

function changeIndexPattern(_x3) {
  return _changeIndexPattern.apply(this, arguments);
}

function _changeIndexPattern() {
  _changeIndexPattern = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(_ref3) {
    var id, savedObjectsClient, state, setState, onError, indexPatterns;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = _ref3.id, savedObjectsClient = _ref3.savedObjectsClient, state = _ref3.state, setState = _ref3.setState, onError = _ref3.onError;
            _context3.prev = 1;
            _context3.next = 4;
            return loadIndexPatterns({
              savedObjectsClient: savedObjectsClient,
              cache: state.indexPatterns,
              patterns: [id]
            });

          case 4:
            indexPatterns = _context3.sent;
            setState(function (s) {
              return _objectSpread({}, s, {
                layers: isSingleEmptyLayer(state.layers) ? _lodash.default.mapValues(state.layers, function (layer) {
                  return (0, _state_helpers.updateLayerIndexPattern)(layer, indexPatterns[id]);
                }) : state.layers,
                indexPatterns: _objectSpread({}, s.indexPatterns, _defineProperty({}, id, indexPatterns[id])),
                currentIndexPatternId: id
              });
            });
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](1);
            onError(_context3.t0);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 8]]);
  }));
  return _changeIndexPattern.apply(this, arguments);
}

function changeLayerIndexPattern(_x4) {
  return _changeLayerIndexPattern.apply(this, arguments);
}

function _changeLayerIndexPattern() {
  _changeLayerIndexPattern = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(_ref4) {
    var indexPatternId, layerId, savedObjectsClient, state, setState, onError, replaceIfPossible, indexPatterns;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            indexPatternId = _ref4.indexPatternId, layerId = _ref4.layerId, savedObjectsClient = _ref4.savedObjectsClient, state = _ref4.state, setState = _ref4.setState, onError = _ref4.onError, replaceIfPossible = _ref4.replaceIfPossible;
            _context4.prev = 1;
            _context4.next = 4;
            return loadIndexPatterns({
              savedObjectsClient: savedObjectsClient,
              cache: state.indexPatterns,
              patterns: [indexPatternId]
            });

          case 4:
            indexPatterns = _context4.sent;
            setState(function (s) {
              return _objectSpread({}, s, {
                layers: _objectSpread({}, s.layers, _defineProperty({}, layerId, (0, _state_helpers.updateLayerIndexPattern)(s.layers[layerId], indexPatterns[indexPatternId]))),
                indexPatterns: _objectSpread({}, s.indexPatterns, _defineProperty({}, indexPatternId, indexPatterns[indexPatternId])),
                currentIndexPatternId: replaceIfPossible ? indexPatternId : s.currentIndexPatternId
              });
            });
            _context4.next = 11;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](1);
            onError(_context4.t0);

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 8]]);
  }));
  return _changeLayerIndexPattern.apply(this, arguments);
}

function loadIndexPatternRefs(_x5) {
  return _loadIndexPatternRefs.apply(this, arguments);
}

function _loadIndexPatternRefs() {
  _loadIndexPatternRefs = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(savedObjectsClient) {
    var result;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return savedObjectsClient.find({
              type: 'index-pattern',
              fields: ['title'],
              perPage: 10000
            });

          case 2:
            result = _context5.sent;
            return _context5.abrupt("return", result.savedObjects.map(function (o) {
              return {
                id: String(o.id),
                title: o.attributes.title
              };
            }).sort(function (a, b) {
              return a.title.localeCompare(b.title);
            }));

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _loadIndexPatternRefs.apply(this, arguments);
}

function syncExistingFields(_x6) {
  return _syncExistingFields.apply(this, arguments);
}

function _syncExistingFields() {
  _syncExistingFields = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(_ref5) {
    var indexPatterns, dateRange, fetchJson, setState, dslQuery, emptinessInfo;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            indexPatterns = _ref5.indexPatterns, dateRange = _ref5.dateRange, fetchJson = _ref5.fetchJson, setState = _ref5.setState, dslQuery = _ref5.dslQuery;
            _context6.next = 3;
            return Promise.all(indexPatterns.map(function (pattern) {
              var body = {
                dslQuery: dslQuery,
                fromDate: dateRange.fromDate,
                toDate: dateRange.toDate
              };

              if (pattern.timeFieldName) {
                body.timeFieldName = pattern.timeFieldName;
              }

              return fetchJson("".concat(_common.BASE_API_URL, "/existing_fields/").concat(pattern.id), {
                body: JSON.stringify(body)
              });
            }));

          case 3:
            emptinessInfo = _context6.sent;
            setState(function (state) {
              return _objectSpread({}, state, {
                existingFields: emptinessInfo.reduce(function (acc, info) {
                  acc[info.indexPatternTitle] = booleanMap(info.existingFieldNames);
                  return acc;
                }, state.existingFields)
              });
            });

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _syncExistingFields.apply(this, arguments);
}

function booleanMap(keys) {
  return keys.reduce(function (acc, key) {
    acc[key] = true;
    return acc;
  }, {});
}

function isSingleEmptyLayer(layerMap) {
  var layers = Object.values(layerMap);
  return layers.length === 1 && layers[0].columnOrder.length === 0;
}

function fromSavedObject(savedObject) {
  var id = savedObject.id,
      attributes = savedObject.attributes,
      type = savedObject.type;

  var indexPattern = _objectSpread({}, attributes, {
    id: id,
    type: type,
    title: attributes.title,
    fields: JSON.parse(attributes.fields).filter(function (field) {
      return !_public.indexPatterns.isNestedField(field) && (!!field.aggregatable || !!field.scripted);
    }).concat(_document_field.documentField),
    typeMeta: attributes.typeMeta ? JSON.parse(attributes.typeMeta) : undefined,
    fieldFormatMap: attributes.fieldFormatMap ? JSON.parse(attributes.fieldFormatMap) : undefined
  });

  var typeMeta = indexPattern.typeMeta;

  if (!typeMeta) {
    return indexPattern;
  }

  var newFields = _toConsumableArray(indexPattern.fields);

  if (typeMeta.aggs) {
    var aggs = Object.keys(typeMeta.aggs);
    newFields.forEach(function (field, index) {
      var restrictionsObj = {};
      aggs.forEach(function (agg) {
        var restriction = typeMeta.aggs && typeMeta.aggs[agg] && typeMeta.aggs[agg][field.name];

        if (restriction) {
          restrictionsObj[agg] = restriction;
        }
      });

      if (Object.keys(restrictionsObj).length) {
        newFields[index] = _objectSpread({}, field, {
          aggregationRestrictions: restrictionsObj
        });
      }
    });
  }

  return {
    id: indexPattern.id,
    title: indexPattern.title,
    timeFieldName: indexPattern.timeFieldName || undefined,
    fields: newFields
  };
}