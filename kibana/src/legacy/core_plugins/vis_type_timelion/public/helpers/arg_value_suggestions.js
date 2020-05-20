"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getArgValueSuggestions = getArgValueSuggestions;

var _lodash = require("lodash");

var _plugin_services = require("./plugin_services");

var _public = require("../../../../../plugins/data/public");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getArgValueSuggestions() {
  var indexPatterns = (0, _plugin_services.getIndexPatterns)();
  var savedObjectsClient = (0, _plugin_services.getSavedObjectsClient)();

  function getIndexPattern(_x) {
    return _getIndexPattern.apply(this, arguments);
  }

  function _getIndexPattern() {
    _getIndexPattern = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(functionArgs) {
      var indexPatternArg, indexPatternTitle, _ref2, savedObjects, indexPatternSavedObject;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              indexPatternArg = functionArgs.find(function (_ref) {
                var name = _ref.name;
                return name === 'index';
              });

              if (indexPatternArg) {
                _context6.next = 3;
                break;
              }

              return _context6.abrupt("return");

            case 3:
              indexPatternTitle = (0, _lodash.get)(indexPatternArg, 'value.text');
              _context6.next = 6;
              return savedObjectsClient.find({
                type: 'index-pattern',
                fields: ['title'],
                search: "\"".concat(indexPatternTitle, "\""),
                searchFields: ['title'],
                perPage: 10
              });

            case 6:
              _ref2 = _context6.sent;
              savedObjects = _ref2.savedObjects;
              indexPatternSavedObject = savedObjects.find(function (_ref3) {
                var attributes = _ref3.attributes;
                return attributes.title === indexPatternTitle;
              });

              if (indexPatternSavedObject) {
                _context6.next = 11;
                break;
              }

              return _context6.abrupt("return");

            case 11:
              _context6.next = 13;
              return indexPatterns.get(indexPatternSavedObject.id);

            case 13:
              return _context6.abrupt("return", _context6.sent);

            case 14:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));
    return _getIndexPattern.apply(this, arguments);
  }

  function containsFieldName(partial, field) {
    if (!partial) {
      return true;
    }

    return field.name.includes(partial);
  } // Argument value suggestion handlers requiring custom client side code
  // Could not put with function definition since functions are defined on server


  var customHandlers = {
    es: {
      index: function index(partial) {
        return _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
          var search, resp;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  search = partial ? "".concat(partial, "*") : '*';
                  _context.next = 3;
                  return savedObjectsClient.find({
                    type: 'index-pattern',
                    fields: ['title', 'type'],
                    search: "".concat(search),
                    searchFields: ['title'],
                    perPage: 25
                  });

                case 3:
                  resp = _context.sent;
                  return _context.abrupt("return", resp.savedObjects.filter(function (savedObject) {
                    return !savedObject.get('type');
                  }).map(function (savedObject) {
                    return {
                      name: savedObject.attributes.title
                    };
                  }));

                case 5:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }))();
      },
      metric: function metric(partial, functionArgs) {
        return _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2() {
          var indexPattern, valueSplit;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (!(!partial || !partial.includes(':'))) {
                    _context2.next = 2;
                    break;
                  }

                  return _context2.abrupt("return", [{
                    name: 'avg:'
                  }, {
                    name: 'cardinality:'
                  }, {
                    name: 'count'
                  }, {
                    name: 'max:'
                  }, {
                    name: 'min:'
                  }, {
                    name: 'percentiles:'
                  }, {
                    name: 'sum:'
                  }]);

                case 2:
                  _context2.next = 4;
                  return getIndexPattern(functionArgs);

                case 4:
                  indexPattern = _context2.sent;

                  if (indexPattern) {
                    _context2.next = 7;
                    break;
                  }

                  return _context2.abrupt("return", []);

                case 7:
                  valueSplit = partial.split(':');
                  return _context2.abrupt("return", indexPattern.fields.filter(function (field) {
                    return field.aggregatable && 'number' === field.type && containsFieldName(valueSplit[1], field) && !_public.indexPatterns.isNestedField(field);
                  }).map(function (field) {
                    return {
                      name: "".concat(valueSplit[0], ":").concat(field.name),
                      help: field.type
                    };
                  }));

                case 9:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }))();
      },
      split: function split(partial, functionArgs) {
        return _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee3() {
          var indexPattern;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return getIndexPattern(functionArgs);

                case 2:
                  indexPattern = _context3.sent;

                  if (indexPattern) {
                    _context3.next = 5;
                    break;
                  }

                  return _context3.abrupt("return", []);

                case 5:
                  return _context3.abrupt("return", indexPattern.fields.filter(function (field) {
                    return field.aggregatable && ['number', 'boolean', 'date', 'ip', 'string'].includes(field.type) && containsFieldName(partial, field) && !_public.indexPatterns.isNestedField(field);
                  }).map(function (field) {
                    return {
                      name: field.name,
                      help: field.type
                    };
                  }));

                case 6:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }))();
      },
      timefield: function timefield(partial, functionArgs) {
        return _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee4() {
          var indexPattern;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return getIndexPattern(functionArgs);

                case 2:
                  indexPattern = _context4.sent;

                  if (indexPattern) {
                    _context4.next = 5;
                    break;
                  }

                  return _context4.abrupt("return", []);

                case 5:
                  return _context4.abrupt("return", indexPattern.fields.filter(function (field) {
                    return 'date' === field.type && containsFieldName(partial, field) && !_public.indexPatterns.isNestedField(field);
                  }).map(function (field) {
                    return {
                      name: field.name
                    };
                  }));

                case 6:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        }))();
      }
    }
  };
  return {
    /**
     * @param {string} functionName - user provided function name containing argument
     * @param {string} argName - user provided argument name
     * @return {boolean} true when dynamic suggestion handler provided for function argument
     */
    hasDynamicSuggestionsForArgument: function hasDynamicSuggestionsForArgument(functionName, argName) {
      return customHandlers[functionName] && customHandlers[functionName][argName];
    },

    /**
     * @param {string} functionName - user provided function name containing argument
     * @param {string} argName - user provided argument name
     * @param {object} functionArgs - user provided function arguments parsed ahead of current argument
     * @param {string} partial - user provided argument value
     * @return {array} array of dynamic suggestions matching partial
     */
    getDynamicSuggestionsForArgument: function () {
      var _getDynamicSuggestionsForArgument = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(functionName, argName, functionArgs) {
        var partialInput,
            _args5 = arguments;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                partialInput = _args5.length > 3 && _args5[3] !== undefined ? _args5[3] : '';
                _context5.next = 3;
                return customHandlers[functionName][argName](partialInput, functionArgs);

              case 3:
                return _context5.abrupt("return", _context5.sent);

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function getDynamicSuggestionsForArgument(_x2, _x3, _x4) {
        return _getDynamicSuggestionsForArgument.apply(this, arguments);
      }

      return getDynamicSuggestionsForArgument;
    }(),

    /**
     * @param {string} partial - user provided argument value
     * @param {array} staticSuggestions - argument value suggestions
     * @return {array} array of static suggestions matching partial
     */
    getStaticSuggestionsForInput: function getStaticSuggestionsForInput() {
      var partialInput = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var staticSuggestions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      if (partialInput) {
        return staticSuggestions.filter(function (suggestion) {
          return suggestion.name.includes(partialInput);
        });
      }

      return staticSuggestions;
    }
  };
}