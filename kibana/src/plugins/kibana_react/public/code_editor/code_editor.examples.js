"use strict";

var _addonActions = require("@storybook/addon-actions");

var _react = require("@storybook/react");

var _react2 = _interopRequireDefault(require("react"));

var _monaco = require("@kbn/ui-shared-deps/monaco");

var _code_editor = require("./code_editor");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
// A sample language definition with a few example tokens
// Taken from https://microsoft.github.io/monaco-editor/playground.html#extending-language-services-custom-languages
var simpleLogLang = {
  tokenizer: {
    root: [[/\[error.*/, 'constant'], [/\[notice.*/, 'variable'], [/\[info.*/, 'string'], [/\[[a-zA-Z 0-9:]+\]/, 'tag']]
  }
};

_monaco.monaco.languages.register({
  id: 'loglang'
});

_monaco.monaco.languages.setMonarchTokensProvider('loglang', simpleLogLang);

var logs = "[Sun Mar 7 20:54:27 2004] [notice] [client xx.xx.xx.xx] This is a notice!\n[Sun Mar 7 20:58:27 2004] [info] [client xx.xx.xx.xx] (104)Connection reset by peer: client stopped connection before send body completed\n[Sun Mar 7 21:16:17 2004] [error] [client xx.xx.xx.xx] File does not exist: /home/httpd/twiki/view/Main/WebHome\n";
(0, _react.storiesOf)('CodeEditor', module).addParameters({
  info: {
    // CodeEditor has no PropTypes set so this table will show up
    // as blank. I'm just disabling it to reduce confusion
    propTablesExclude: [_code_editor.CodeEditor]
  }
}).add('default', function () {
  return _react2.default.createElement("div", null, _react2.default.createElement(_code_editor.CodeEditor, {
    languageId: "plaintext",
    height: 250,
    value: "Hello!",
    onChange: (0, _addonActions.action)('onChange')
  }));
}, {
  info: {
    text: 'Plaintext Monaco Editor'
  }
}).add('dark mode', function () {
  return _react2.default.createElement("div", null, _react2.default.createElement(_code_editor.CodeEditor, {
    languageId: "plaintext",
    height: 250,
    value: "Hello!",
    onChange: (0, _addonActions.action)('onChange'),
    useDarkTheme: true
  }));
}, {
  info: {
    text: 'The dark theme is automatically used when dark mode is enabled in Kibana'
  }
}).add('custom log language', function () {
  return _react2.default.createElement("div", null, _react2.default.createElement(_code_editor.CodeEditor, {
    languageId: "loglang",
    height: 250,
    value: logs,
    onChange: (0, _addonActions.action)('onChange')
  }));
}, {
  info: {
    text: 'Custom language example. Language definition taken from [here](https://microsoft.github.io/monaco-editor/playground.html#extending-language-services-custom-languages)'
  }
}).add('hide minimap', function () {
  return _react2.default.createElement("div", null, _react2.default.createElement(_code_editor.CodeEditor, {
    languageId: "loglang",
    height: 250,
    value: logs,
    onChange: (0, _addonActions.action)('onChange'),
    options: {
      minimap: {
        enabled: false
      }
    }
  }));
}, {
  info: {
    text: 'The minimap (on left side of editor) can be disabled to save space'
  }
}).add('suggestion provider', function () {
  var provideSuggestions = function provideSuggestions(model, position, context) {
    var wordRange = new _monaco.monaco.Range(position.lineNumber, position.column, position.lineNumber, position.column);
    return {
      suggestions: [{
        label: 'Hello, World',
        kind: _monaco.monaco.languages.CompletionItemKind.Variable,
        documentation: {
          value: '*Markdown* can be used in autocomplete help',
          isTrusted: true
        },
        insertText: 'Hello, World',
        range: wordRange
      }, {
        label: 'You know, for search',
        kind: _monaco.monaco.languages.CompletionItemKind.Variable,
        documentation: {
          value: 'Thanks `Monaco`',
          isTrusted: true
        },
        insertText: 'You know, for search',
        range: wordRange
      }]
    };
  };

  return _react2.default.createElement("div", null, _react2.default.createElement(_code_editor.CodeEditor, {
    languageId: "loglang",
    height: 250,
    value: logs,
    onChange: (0, _addonActions.action)('onChange'),
    suggestionProvider: {
      triggerCharacters: ['.'],
      provideCompletionItems: provideSuggestions
    },
    options: {
      wordBasedSuggestions: false,
      quickSuggestions: true
    }
  }));
}, {
  info: {
    text: 'Example suggestion provider is triggered by the `.` character'
  }
}).add('hover provider', function () {
  var provideHover = function provideHover(model, position) {
    var word = model.getWordAtPosition(position);

    if (!word) {
      return {
        contents: []
      };
    }

    return {
      contents: [{
        value: "You're hovering over **".concat(word.word, "**")
      }]
    };
  };

  return _react2.default.createElement("div", null, _react2.default.createElement(_code_editor.CodeEditor, {
    languageId: "loglang",
    height: 250,
    value: logs,
    onChange: (0, _addonActions.action)('onChange'),
    hoverProvider: {
      provideHover: provideHover
    }
  }));
}, {
  info: {
    text: 'Hover dialog example can be triggered by hovering over a word'
  }
});