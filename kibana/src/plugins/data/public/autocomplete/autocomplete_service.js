"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutocompleteService = void 0;

var _value_suggestion_provider = require("./providers/value_suggestion_provider");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AutocompleteService =
/*#__PURE__*/
function () {
  function AutocompleteService() {
    var _this = this;

    _classCallCheck(this, AutocompleteService);

    _defineProperty(this, "querySuggestionProviders", new Map());

    _defineProperty(this, "getValueSuggestions", void 0);

    _defineProperty(this, "addQuerySuggestionProvider", function (language, provider) {
      if (language && provider) {
        _this.querySuggestionProviders.set(language, provider);
      }
    });

    _defineProperty(this, "getQuerySuggestions", function (args) {
      var language = args.language;

      var provider = _this.querySuggestionProviders.get(language);

      if (provider) {
        return provider(args);
      }
    });

    _defineProperty(this, "hasQuerySuggestions", function (language) {
      return _this.querySuggestionProviders.has(language);
    });
  }

  _createClass(AutocompleteService, [{
    key: "setup",

    /** @public **/
    value: function setup(core) {
      this.getValueSuggestions = (0, _value_suggestion_provider.setupValueSuggestionProvider)(core);
      return {
        addQuerySuggestionProvider: this.addQuerySuggestionProvider,

        /** @obsolete **/

        /** please use "getProvider" only from the start contract **/
        getQuerySuggestions: this.getQuerySuggestions
      };
    }
    /** @public **/

  }, {
    key: "start",
    value: function start() {
      return {
        getQuerySuggestions: this.getQuerySuggestions,
        hasQuerySuggestions: this.hasQuerySuggestions,
        getValueSuggestions: this.getValueSuggestions
      };
    }
    /** @internal **/

  }, {
    key: "clearProviders",
    value: function clearProviders() {
      this.querySuggestionProviders.clear();
    }
  }]);

  return AutocompleteService;
}();
/** @public **/


exports.AutocompleteService = AutocompleteService;