"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpressionInput = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _eui = require("@elastic/eui");

var _lodash = require("lodash");

var _monaco = require("@kbn/ui-shared-deps/monaco");

var _public = require("../../../../../../../src/plugins/kibana_react/public");

var _autocomplete = require("../../../common/lib/autocomplete");

var _monaco_language_def = require("../../lib/monaco_language_def");

var _reference = require("./reference");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ExpressionInput =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ExpressionInput, _React$Component);

  function ExpressionInput(props) {
    var _this;

    _classCallCheck(this, ExpressionInput);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ExpressionInput).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "editor", void 0);

    _defineProperty(_assertThisInitialized(_this), "undoHistory", void 0);

    _defineProperty(_assertThisInitialized(_this), "redoHistory", void 0);

    _defineProperty(_assertThisInitialized(_this), "stash", (0, _lodash.debounce)(function (value) {
      _this.undoHistory.push(value);

      _this.redoHistory = [];
    }, 500, {
      leading: true,
      trailing: false
    }));

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (e) {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z') {
          e.preventDefault();

          if (e.shiftKey) {
            _this.redo();
          } else {
            _this.undo();
          }
        }

        if (e.key === 'y') {
          e.preventDefault();

          _this.redo();
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (value) {
      _this.updateState({
        value: value
      });
    });

    _defineProperty(_assertThisInitialized(_this), "updateState", function (_ref) {
      var value = _ref.value;

      _this.stash(_this.props.value);

      _this.props.onChange(value);
    });

    _defineProperty(_assertThisInitialized(_this), "provideSuggestions", function (model, position, context) {
      var text = model.getValue();
      var textRange = model.getFullModelRange();
      var lengthAfterPosition = model.getValueLengthInRange({
        startLineNumber: position.lineNumber,
        startColumn: position.column,
        endLineNumber: textRange.endLineNumber,
        endColumn: textRange.endColumn
      });
      var wordRange;
      var aSuggestions;

      if (context.triggerCharacter === '{') {
        var wordUntil = model.getWordAtPosition(position.delta(0, -3));

        if (wordUntil) {
          wordRange = new _monaco.monaco.Range(position.lineNumber, position.column, position.lineNumber, position.column); // Retrieve suggestions for subexpressions
          // TODO: make this work for expressions nested more than one level deep

          aSuggestions = (0, _autocomplete.getAutocompleteSuggestions)(_this.props.functionDefinitions, text.substring(0, text.length - lengthAfterPosition) + '}', text.length - lengthAfterPosition);
        }
      } else {
        var _wordUntil = model.getWordUntilPosition(position);

        wordRange = new _monaco.monaco.Range(position.lineNumber, _wordUntil.startColumn, position.lineNumber, _wordUntil.endColumn);
        aSuggestions = (0, _autocomplete.getAutocompleteSuggestions)(_this.props.functionDefinitions, text, text.length - lengthAfterPosition);
      }

      if (!aSuggestions) {
        return {
          suggestions: []
        };
      }

      var suggestions = aSuggestions.map(function (s, index) {
        var sortText = String.fromCharCode(index);

        if (s.type === 'argument') {
          return {
            label: s.argDef.name,
            kind: _monaco.monaco.languages.CompletionItemKind.Variable,
            documentation: {
              value: (0, _reference.getArgReferenceStr)(s.argDef),
              isTrusted: true
            },
            insertText: s.text,
            command: {
              title: 'Trigger Suggestion Dialog',
              id: 'editor.action.triggerSuggest'
            },
            range: wordRange,
            sortText: sortText
          };
        } else if (s.type === 'value') {
          return {
            label: s.text,
            kind: _monaco.monaco.languages.CompletionItemKind.Value,
            insertText: s.text,
            command: {
              title: 'Trigger Suggestion Dialog',
              id: 'editor.action.triggerSuggest'
            },
            range: wordRange,
            sortText: sortText
          };
        } else {
          return {
            label: s.fnDef.name,
            kind: _monaco.monaco.languages.CompletionItemKind.Function,
            documentation: {
              value: (0, _reference.getFunctionReferenceStr)(s.fnDef),
              isTrusted: true
            },
            insertText: s.text,
            command: {
              title: 'Trigger Suggestion Dialog',
              id: 'editor.action.triggerSuggest'
            },
            range: wordRange,
            sortText: sortText
          };
        }
      });
      return {
        suggestions: suggestions
      };
    });

    _defineProperty(_assertThisInitialized(_this), "providerHover", function (model, position) {
      var text = model.getValue();
      var word = model.getWordAtPosition(position);

      if (!word) {
        return {
          contents: []
        };
      }

      var absPosition = model.getValueLengthInRange({
        startLineNumber: 0,
        startColumn: 0,
        endLineNumber: position.lineNumber,
        endColumn: word.endColumn
      });

      var _getFnArgDefAtPositio = (0, _autocomplete.getFnArgDefAtPosition)(_this.props.functionDefinitions, text, absPosition),
          fnDef = _getFnArgDefAtPositio.fnDef,
          argDef = _getFnArgDefAtPositio.argDef,
          argStart = _getFnArgDefAtPositio.argStart,
          argEnd = _getFnArgDefAtPositio.argEnd;

      if (argDef && argStart && argEnd) {
        // Use the start/end position of the arg to generate a complete range to highlight
        // that includes the arg name and its complete value
        var startPos = model.getPositionAt(argStart);
        var endPos = model.getPositionAt(argEnd);
        var argRange = new _monaco.monaco.Range(startPos.lineNumber, startPos.column, endPos.lineNumber, endPos.column);
        return {
          contents: [{
            value: (0, _reference.getArgReferenceStr)(argDef),
            isTrusted: true
          }],
          range: argRange
        };
      } else if (fnDef) {
        return {
          contents: [{
            value: (0, _reference.getFunctionReferenceStr)(fnDef),
            isTrusted: true
          }]
        };
      }

      return {
        contents: []
      };
    });

    _defineProperty(_assertThisInitialized(_this), "editorDidMount", function (editor) {
      // Updating tab size for the editor
      var model = editor.getModel();

      if (model) {
        model.updateOptions({
          tabSize: 2
        });
      }

      _this.editor = editor;
    });

    _this.undoHistory = [];
    _this.redoHistory = [];
    _this.editor = null;
    return _this;
  }

  _createClass(ExpressionInput, [{
    key: "undo",
    value: function undo() {
      if (!this.undoHistory.length) {
        return;
      }

      var value = this.undoHistory.pop();
      this.redoHistory.push(this.props.value);
      this.props.onChange(value);
    }
  }, {
    key: "redo",
    value: function redo() {
      if (!this.redoHistory.length) {
        return;
      }

      var value = this.redoHistory.pop();
      this.undoHistory.push(this.props.value);
      this.props.onChange(value);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          value = _this$props.value,
          error = _this$props.error,
          isCompact = _this$props.isCompact;
      return _react.default.createElement("div", {
        className: "canvasExpressionInput"
      }, _react.default.createElement(_eui.EuiFormRow, {
        className: "canvasExpressionInput__inner",
        fullWidth: true,
        isInvalid: Boolean(error),
        error: error
      }, _react.default.createElement("div", {
        className: "canvasExpressionInput__editor"
      }, _react.default.createElement(_public.CodeEditor, {
        languageId: _monaco_language_def.LANGUAGE_ID,
        languageConfiguration: {
          autoClosingPairs: [{
            open: '{',
            close: '}'
          }]
        },
        value: value,
        onChange: this.onChange,
        suggestionProvider: {
          triggerCharacters: [' ', '{'],
          provideCompletionItems: this.provideSuggestions
        },
        hoverProvider: {
          provideHover: this.providerHover
        },
        options: {
          fontSize: isCompact ? 12 : 16,
          scrollBeyondLastLine: false,
          quickSuggestions: true,
          minimap: {
            enabled: false
          },
          wordBasedSuggestions: false,
          wordWrap: 'on',
          wrappingIndent: 'indent'
        },
        editorDidMount: this.editorDidMount
      }))));
    }
  }]);

  return ExpressionInput;
}(_react.default.Component);

exports.ExpressionInput = ExpressionInput;

_defineProperty(ExpressionInput, "propTypes", {
  functionDefinitions: _propTypes.default.array.isRequired,
  value: _propTypes.default.string.isRequired,
  error: _propTypes.default.string,
  onChange: _propTypes.default.func.isRequired
});