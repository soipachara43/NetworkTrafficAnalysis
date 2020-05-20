"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.suggest = suggest;
exports.getSuggestion = getSuggestion;
exports.SUGGESTION_TYPE = void 0;

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

var _monaco = require("@kbn/ui-shared-deps/monaco");

var _chain = require("../_generated_/chain");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var SUGGESTION_TYPE;
exports.SUGGESTION_TYPE = SUGGESTION_TYPE;

(function (SUGGESTION_TYPE) {
  SUGGESTION_TYPE["ARGUMENTS"] = "arguments";
  SUGGESTION_TYPE["ARGUMENT_VALUE"] = "argument_value";
  SUGGESTION_TYPE["FUNCTIONS"] = "functions";
})(SUGGESTION_TYPE || (exports.SUGGESTION_TYPE = SUGGESTION_TYPE = {}));

function inLocation(cursorPosition, location) {
  return cursorPosition >= location.min && cursorPosition <= location.max;
}

function getArgumentsHelp(functionHelp) {
  var functionArgs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (!functionHelp) {
    return [];
  } // Do not provide 'inputSeries' as argument suggestion for chainable functions


  var argsHelp = functionHelp.chainable ? functionHelp.args.slice(1) : functionHelp.args.slice(0); // ignore arguments that are already provided in function declaration

  var functionArgNames = functionArgs.map(function (arg) {
    return arg.name;
  });
  return argsHelp.filter(function (arg) {
    return !functionArgNames.includes(arg.name);
  });
}

function extractSuggestionsFromParsedResult(_x, _x2, _x3, _x4) {
  return _extractSuggestionsFromParsedResult.apply(this, arguments);
}

function _extractSuggestionsFromParsedResult() {
  _extractSuggestionsFromParsedResult = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(result, cursorPosition, functionList, argValueSuggestions) {
    var activeFunc, functionHelp, openParen, activeArg, functionName, functionArgs, argName, partialInput, valueSuggestions, _ref3, staticSuggestions, argsHelp, argumentSuggestions;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            activeFunc = result.functions.find(function (_ref) {
              var location = _ref.location;
              return inLocation(cursorPosition, location);
            });

            if (activeFunc) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return");

          case 3:
            functionHelp = functionList.find(function (_ref2) {
              var name = _ref2.name;
              return name === activeFunc.function;
            });

            if (functionHelp) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return");

          case 6:
            // return function suggestion when cursor is outside of parentheses
            // location range includes '.', function name, and '('.
            openParen = activeFunc.location.min + activeFunc.function.length + 2;

            if (!(cursorPosition < openParen)) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", {
              list: [functionHelp],
              type: SUGGESTION_TYPE.FUNCTIONS
            });

          case 9:
            // return argument value suggestions when cursor is inside argument value
            activeArg = activeFunc.arguments.find(function (argument) {
              return inLocation(cursorPosition, argument.location);
            });

            if (!(activeArg && activeArg.type === 'namedArg' && inLocation(cursorPosition, activeArg.value.location))) {
              _context.next = 22;
              break;
            }

            functionName = activeFunc.function, functionArgs = activeFunc.arguments;
            argName = activeArg.name, partialInput = activeArg.value.text;

            if (!argValueSuggestions.hasDynamicSuggestionsForArgument(functionName, argName)) {
              _context.next = 19;
              break;
            }

            _context.next = 16;
            return argValueSuggestions.getDynamicSuggestionsForArgument(functionName, argName, functionArgs, partialInput);

          case 16:
            valueSuggestions = _context.sent;
            _context.next = 21;
            break;

          case 19:
            _ref3 = functionHelp.args.find(function (arg) {
              return arg.name === activeArg.name;
            }) || {}, staticSuggestions = _ref3.suggestions;
            valueSuggestions = argValueSuggestions.getStaticSuggestionsForInput(partialInput, staticSuggestions);

          case 21:
            return _context.abrupt("return", {
              list: valueSuggestions,
              type: SUGGESTION_TYPE.ARGUMENT_VALUE
            });

          case 22:
            // return argument suggestions
            argsHelp = getArgumentsHelp(functionHelp, activeFunc.arguments);
            argumentSuggestions = argsHelp.filter(function (arg) {
              if ((0, _lodash.get)(activeArg, 'type') === 'namedArg') {
                return (0, _lodash.startsWith)(arg.name, activeArg.name);
              } else if (activeArg) {
                return (0, _lodash.startsWith)(arg.name, activeArg.text);
              }

              return true;
            });
            return _context.abrupt("return", {
              list: argumentSuggestions,
              type: SUGGESTION_TYPE.ARGUMENTS
            });

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _extractSuggestionsFromParsedResult.apply(this, arguments);
}

function suggest(_x5, _x6, _x7, _x8) {
  return _suggest.apply(this, arguments);
}

function _suggest() {
  _suggest = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(expression, functionList, cursorPosition, argValueSuggestions) {
    var result, message, list, _message, functionName, functionArgs, functionHelp, _message2, argName, _functionName, _functionArgs, valueSuggestions, _functionHelp, argHelp;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _chain.parse)(expression);

          case 3:
            result = _context2.sent;
            _context2.next = 6;
            return extractSuggestionsFromParsedResult(result, cursorPosition, functionList, argValueSuggestions);

          case 6:
            return _context2.abrupt("return", _context2.sent);

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            _context2.prev = 11;
            // The grammar will throw an error containing a message if the expression is formatted
            // correctly and is prepared to accept suggestions. If the expression is not formatted
            // correctly the grammar will just throw a regular PEG SyntaxError, and this JSON.parse
            // attempt will throw an error.
            message = JSON.parse(_context2.t0.message);
            _context2.next = 18;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t1 = _context2["catch"](11);
            return _context2.abrupt("return");

          case 18:
            _context2.t2 = message.type;
            _context2.next = _context2.t2 === 'incompleteFunction' ? 21 : _context2.t2 === 'incompleteArgument' ? 23 : _context2.t2 === 'incompleteArgumentValue' ? 26 : 37;
            break;

          case 21:
            if (message.function) {
              // The user has start typing a function name, so we'll filter the list down to only
              // possible matches.
              list = functionList.filter(function (func) {
                return (0, _lodash.startsWith)(func.name, message.function);
              });
            } else {
              // The user hasn't typed anything yet, so we'll just return the entire list.
              list = functionList;
            }

            return _context2.abrupt("return", {
              list: list,
              type: SUGGESTION_TYPE.FUNCTIONS
            });

          case 23:
            _message = message, functionName = _message.currentFunction, functionArgs = _message.currentArgs;
            functionHelp = functionList.find(function (func) {
              return func.name === functionName;
            });
            return _context2.abrupt("return", {
              list: getArgumentsHelp(functionHelp, functionArgs),
              type: SUGGESTION_TYPE.ARGUMENTS
            });

          case 26:
            _message2 = message, argName = _message2.name, _functionName = _message2.currentFunction, _functionArgs = _message2.currentArgs;
            valueSuggestions = [];

            if (!argValueSuggestions.hasDynamicSuggestionsForArgument(_functionName, argName)) {
              _context2.next = 34;
              break;
            }

            _context2.next = 31;
            return argValueSuggestions.getDynamicSuggestionsForArgument(_functionName, argName, _functionArgs);

          case 31:
            valueSuggestions = _context2.sent;
            _context2.next = 36;
            break;

          case 34:
            _functionHelp = functionList.find(function (func) {
              return func.name === _functionName;
            });

            if (_functionHelp) {
              argHelp = _functionHelp.args.find(function (arg) {
                return arg.name === argName;
              });

              if (argHelp && argHelp.suggestions) {
                valueSuggestions = argHelp.suggestions;
              }
            }

          case 36:
            return _context2.abrupt("return", {
              list: valueSuggestions,
              type: SUGGESTION_TYPE.ARGUMENT_VALUE
            });

          case 37:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9], [11, 15]]);
  }));
  return _suggest.apply(this, arguments);
}

function getSuggestion(suggestion, type, range) {
  var kind = _monaco.monaco.languages.CompletionItemKind.Method;
  var insertText = suggestion.name;
  var insertTextRules;
  var detail = '';
  var command;

  switch (type) {
    case SUGGESTION_TYPE.ARGUMENTS:
      command = {
        title: 'Trigger Suggestion Dialog',
        id: 'editor.action.triggerSuggest'
      };
      kind = _monaco.monaco.languages.CompletionItemKind.Property;
      insertText = "".concat(insertText, "=");
      detail = "".concat(_i18n.i18n.translate('timelion.expressionSuggestions.argument.description.acceptsText', {
        defaultMessage: 'Accepts'
      }), ": ").concat(suggestion.types);
      break;

    case SUGGESTION_TYPE.FUNCTIONS:
      command = {
        title: 'Trigger Suggestion Dialog',
        id: 'editor.action.triggerSuggest'
      };
      kind = _monaco.monaco.languages.CompletionItemKind.Function;
      insertText = "".concat(insertText, "($0)");
      insertTextRules = _monaco.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet;
      detail = "(".concat(suggestion.chainable ? _i18n.i18n.translate('timelion.expressionSuggestions.func.description.chainableHelpText', {
        defaultMessage: 'Chainable'
      }) : _i18n.i18n.translate('timelion.expressionSuggestions.func.description.dataSourceHelpText', {
        defaultMessage: 'Data source'
      }), ")");
      break;

    case SUGGESTION_TYPE.ARGUMENT_VALUE:
      var param = suggestion.name.split(':');

      if (param.length === 1 || param[1]) {
        insertText = "".concat(param.length === 1 ? insertText : param[1], ",");
      }

      command = {
        title: 'Trigger Suggestion Dialog',
        id: 'editor.action.triggerSuggest'
      };
      kind = _monaco.monaco.languages.CompletionItemKind.Property;
      detail = suggestion.help || '';
      break;
  }

  return {
    detail: detail,
    insertText: insertText,
    insertTextRules: insertTextRules,
    kind: kind,
    label: suggestion.name,
    documentation: suggestion.help,
    command: command,
    range: range
  };
}