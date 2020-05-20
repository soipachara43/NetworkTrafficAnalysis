"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Editor = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

var _queryString = require("query-string");

var _react = _interopRequireWildcard(require("react"));

var _public = require("../../../../../../../es_ui_shared/public");

var _mappings = _interopRequireDefault(require("../../../../../lib/mappings/mappings"));

var _components = require("../../../../components");

var _contexts = require("../../../../contexts");

var _hooks = require("../../../../hooks");

var senseEditor = _interopRequireWildcard(require("../../../../models/sense_editor"));

var _console_menu_actions = require("../console_menu_actions");

var _subscribe_console_resize_checker = require("../subscribe_console_resize_checker");

var _apply_editor_settings = require("./apply_editor_settings");

var _keyboard_shortcuts = require("./keyboard_shortcuts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var abs = {
  position: 'absolute',
  top: '0',
  left: '0',
  bottom: '0',
  right: '0'
};
var DEFAULT_INPUT_VALUE = "GET _search\n{\n  \"query\": {\n    \"match_all\": {}\n  }\n}";
var inputId = 'ConAppInputTextarea';

function EditorUI(_ref) {
  var initialTextValue = _ref.initialTextValue;

  var _useServicesContext = (0, _contexts.useServicesContext)(),
      _useServicesContext$s = _useServicesContext.services,
      history = _useServicesContext$s.history,
      notifications = _useServicesContext$s.notifications,
      settingsService = _useServicesContext$s.settings,
      docLinkVersion = _useServicesContext.docLinkVersion,
      elasticsearchUrl = _useServicesContext.elasticsearchUrl;

  var _useEditorReadContext = (0, _contexts.useEditorReadContext)(),
      settings = _useEditorReadContext.settings;

  var setInputEditor = (0, _hooks.useSetInputEditor)();
  var sendCurrentRequestToES = (0, _hooks.useSendCurrentRequestToES)();
  var saveCurrentTextObject = (0, _hooks.useSaveCurrentTextObject)();
  var editorRef = (0, _react.useRef)(null);
  var editorInstanceRef = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      textArea = _useState2[0],
      setTextArea = _useState2[1];

  (0, _public.useUIAceKeyboardMode)(textArea);
  var openDocumentation = (0, _react.useCallback)(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var documentation;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _console_menu_actions.getDocumentation)(editorInstanceRef.current, docLinkVersion);

          case 2:
            documentation = _context.sent;

            if (documentation) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return");

          case 5:
            window.open(documentation, '_blank');

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })), [docLinkVersion]);
  (0, _react.useEffect)(function () {
    editorInstanceRef.current = senseEditor.create(editorRef.current);
    var editor = editorInstanceRef.current;
    var textareaElement = editorRef.current.querySelector('textarea');

    if (textareaElement) {
      textareaElement.setAttribute('id', inputId);
    }

    var readQueryParams = function readQueryParams() {
      var _split = (window.location.hash || '').split('?'),
          _split2 = _slicedToArray(_split, 2),
          queryString = _split2[1];

      return (0, _queryString.parse)(queryString || '', {
        sort: false
      });
    };

    var loadBufferFromRemote = function loadBufferFromRemote(url) {
      if (/^https?:\/\//.test(url)) {
        var loadFrom = {
          url: url,
          // Having dataType here is required as it doesn't allow jQuery to `eval` content
          // coming from the external source thereby preventing XSS attack.
          dataType: 'text',
          kbnXsrfToken: false
        };

        if (/https?:\/\/api\.github\.com/.test(url)) {
          loadFrom.headers = {
            Accept: 'application/vnd.github.v3.raw'
          };
        } // Fire and forget.


        $.ajax(loadFrom).done(
        /*#__PURE__*/
        function () {
          var _ref3 = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee2(data) {
            var coreEditor;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    coreEditor = editor.getCoreEditor();
                    _context2.next = 3;
                    return editor.update(data, true);

                  case 3:
                    editor.moveToNextRequestEdge(false);
                    coreEditor.clearSelection();
                    editor.highlightCurrentRequestsAndUpdateActionBar();
                    coreEditor.getContainer().focus();

                  case 7:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));

          return function (_x) {
            return _ref3.apply(this, arguments);
          };
        }());
      }
    }; // Support for loading a console snippet from a remote source, like support docs.


    var onHashChange = (0, _lodash.debounce)(function () {
      var _readQueryParams = readQueryParams(),
          url = _readQueryParams.load_from;

      if (!url) {
        return;
      }

      loadBufferFromRemote(url);
    }, 200);
    window.addEventListener('hashchange', onHashChange);
    var initialQueryParams = readQueryParams();

    if (initialQueryParams.load_from) {
      loadBufferFromRemote(initialQueryParams.load_from);
    } else {
      editor.update(initialTextValue || DEFAULT_INPUT_VALUE);
    }

    function setupAutosave() {
      var timer;
      var saveDelay = 500;
      editor.getCoreEditor().on('change', function () {
        if (timer) {
          clearTimeout(timer);
        }

        timer = window.setTimeout(saveCurrentState, saveDelay);
      });
    }

    function saveCurrentState() {
      try {
        var content = editor.getCoreEditor().getValue();
        saveCurrentTextObject(content);
      } catch (e) {// Ignoring saving error
      }
    }

    setInputEditor(editor);
    setTextArea(editorRef.current.querySelector('textarea'));

    _mappings.default.retrieveAutoCompleteInfo(settingsService, settingsService.getAutocomplete());

    var unsubscribeResizer = (0, _subscribe_console_resize_checker.subscribeResizeChecker)(editorRef.current, editor);
    setupAutosave();
    return function () {
      unsubscribeResizer();

      _mappings.default.clearSubscriptions();

      window.removeEventListener('hashchange', onHashChange);
    };
  }, [saveCurrentTextObject, initialTextValue, history, setInputEditor, settingsService]);
  (0, _react.useEffect)(function () {
    var editor = editorInstanceRef.current;
    (0, _apply_editor_settings.applyCurrentSettings)(editor.getCoreEditor(), settings); // Preserve legacy focus behavior after settings have updated.

    editor.getCoreEditor().getContainer().focus();
  }, [settings]);
  (0, _react.useEffect)(function () {
    (0, _keyboard_shortcuts.registerCommands)({
      senseEditor: editorInstanceRef.current,
      sendCurrentRequestToES: sendCurrentRequestToES,
      openDocumentation: openDocumentation
    });
  }, [sendCurrentRequestToES, openDocumentation]);
  return _react.default.createElement("div", {
    style: abs,
    className: "conApp"
  }, _react.default.createElement("div", {
    className: "conApp__editor"
  }, _react.default.createElement("ul", {
    className: "conApp__autoComplete",
    id: "autocomplete"
  }), _react.default.createElement(_eui.EuiFlexGroup, {
    className: "conApp__editorActions",
    id: "ConAppEditorActions",
    gutterSize: "none",
    responsive: false
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiToolTip, {
    content: _i18n.i18n.translate('console.sendRequestButtonTooltip', {
      defaultMessage: 'Click to send request'
    })
  }, _react.default.createElement("button", {
    onClick: sendCurrentRequestToES,
    "data-test-subj": "sendRequestButton",
    "aria-label": _i18n.i18n.translate('console.sendRequestButtonTooltip', {
      defaultMessage: 'Click to send request'
    }),
    className: "conApp__editorActionButton conApp__editorActionButton--success"
  }, _react.default.createElement(_eui.EuiIcon, {
    type: "play"
  })))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_components.ConsoleMenu, {
    getCurl: function getCurl() {
      return editorInstanceRef.current.getRequestsAsCURL(elasticsearchUrl);
    },
    getDocumentation: function getDocumentation() {
      return (0, _console_menu_actions.getDocumentation)(editorInstanceRef.current, docLinkVersion);
    },
    autoIndent: function autoIndent(event) {
      (0, _console_menu_actions.autoIndent)(editorInstanceRef.current, event);
    },
    addNotification: function addNotification(_ref4) {
      var title = _ref4.title;
      return notifications.toasts.add({
        title: title
      });
    }
  }))), _react.default.createElement(_eui.EuiScreenReaderOnly, null, _react.default.createElement("label", {
    htmlFor: inputId
  }, _i18n.i18n.translate('console.inputTextarea', {
    defaultMessage: 'Dev Tools Console'
  }))), _react.default.createElement("div", {
    ref: editorRef,
    id: "ConAppEditor",
    className: "conApp__editorContent",
    "data-test-subj": "request-editor"
  })));
}

var Editor = _react.default.memo(EditorUI);

exports.Editor = Editor;