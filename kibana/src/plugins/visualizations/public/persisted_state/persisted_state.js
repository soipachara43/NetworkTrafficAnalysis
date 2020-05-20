"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersistedState = void 0;

var _events = require("events");

var _lodash = require("lodash");

var _toPath = _interopRequireDefault(require("lodash/internal/toPath"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function prepSetParams(key, value, path) {
  // key must be the value, set the entire state using it
  if (value === undefined && ((0, _lodash.isPlainObject)(key) || path.length > 0)) {
    // setting entire tree, swap the key and value to write to the state
    value = key;
    key = undefined;
  } // ensure the value being passed in is never mutated


  return {
    value: (0, _lodash.cloneDeep)(value),
    key: key
  };
}

var PersistedState =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(PersistedState, _EventEmitter);

  function PersistedState(value, path) {
    var _this;

    _classCallCheck(this, PersistedState);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PersistedState).call(this));

    _defineProperty(_assertThisInitialized(_this), "_path", void 0);

    _defineProperty(_assertThisInitialized(_this), "_initialized", void 0);

    _defineProperty(_assertThisInitialized(_this), "_changedState", void 0);

    _defineProperty(_assertThisInitialized(_this), "_defaultState", void 0);

    _defineProperty(_assertThisInitialized(_this), "_mergedState", void 0);

    _this._path = _this.setPath(path); // Some validations

    if (!_this._path.length && value && !(0, _lodash.isPlainObject)(value)) {
      throw new Error('State value must be a plain object');
    }

    value = value || _this.getDefault(); // copy passed state values and create internal trackers

    _this.set(value);

    _this._initialized = true; // used to track state changes

    return _this;
  }

  _createClass(PersistedState, [{
    key: "get",
    value: function get(key, defaultValue) {
      // no path and no key, get the whole state
      if (!this.hasPath() && key === undefined) {
        return this._mergedState;
      }

      return (0, _lodash.cloneDeep)((0, _lodash.get)(this._mergedState, this.getIndex(key || ''), defaultValue));
    }
  }, {
    key: "set",
    value: function set(key, value) {
      var params = prepSetParams(key, value, this._path);
      var val = this.setValue(params.key, params.value);
      this.emit('set');
      return val;
    }
  }, {
    key: "setSilent",
    value: function setSilent(key, value) {
      var params = prepSetParams(key, value, this._path);

      if (params.key || params.value) {
        return this.setValue(params.key, params.value, true);
      }
    }
  }, {
    key: "clearAllKeys",
    value: function clearAllKeys() {
      var _this2 = this;

      Object.getOwnPropertyNames(this._changedState).forEach(function (key) {
        _this2.set(key, null);
      });
    }
  }, {
    key: "reset",
    value: function reset(path) {
      var keyPath = this.getIndex(path);
      var origValue = (0, _lodash.get)(this._defaultState, keyPath);
      var currentValue = (0, _lodash.get)(this._mergedState, keyPath);

      if (origValue === undefined) {
        this.cleanPath(path, this._mergedState);
      } else {
        (0, _lodash.set)(this._mergedState, keyPath, origValue);
      } // clean up the changedState tree


      this.cleanPath(path, this._changedState);
      if (!(0, _lodash.isEqual)(currentValue, origValue)) this.emit('change');
    }
  }, {
    key: "getChanges",
    value: function getChanges() {
      return (0, _lodash.cloneDeep)(this._changedState);
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.get();
    }
  }, {
    key: "toString",
    value: function toString() {
      return JSON.stringify(this.toJSON());
    }
  }, {
    key: "fromString",
    value: function fromString(input) {
      return this.set(JSON.parse(input));
    }
  }, {
    key: "getIndex",
    value: function getIndex(key) {
      if (key === undefined) return this._path;
      return [].concat(_toConsumableArray(this._path || []), _toConsumableArray((0, _toPath.default)(key)));
    }
  }, {
    key: "getPartialIndex",
    value: function getPartialIndex(key) {
      var keyPath = this.getIndex(key);
      return keyPath.slice(this._path.length);
    }
  }, {
    key: "cleanPath",
    value: function cleanPath(path, stateTree) {
      var partialPath = this.getPartialIndex(path);
      var remove = true;

      if (Array.isArray(partialPath)) {
        // recursively delete value tree, when no other keys exist
        while (partialPath.length > 0) {
          var lastKey = partialPath.splice(partialPath.length - 1, 1)[0];
          var statePath = [].concat(_toConsumableArray(this._path), [partialPath]);
          var stateVal = statePath.length > 0 ? (0, _lodash.get)(stateTree, statePath) : stateTree; // if stateVal isn't an object, do nothing

          if (!(0, _lodash.isPlainObject)(stateVal)) return;
          if (remove) delete stateVal[lastKey];
          if (Object.keys(stateVal).length > 0) remove = false;
        }
      }
    }
  }, {
    key: "getDefault",
    value: function getDefault() {
      return this.hasPath() ? undefined : {};
    }
  }, {
    key: "setPath",
    value: function setPath(path) {
      if (Array.isArray(path)) {
        return path;
      }

      if ((0, _lodash.isString)(path)) {
        return _toConsumableArray(this.getIndex(path));
      }

      return [];
    }
  }, {
    key: "hasPath",
    value: function hasPath() {
      return this._path.length > 0;
    }
  }, {
    key: "setValue",
    value: function setValue(key, value) {
      var silent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var self = this;
      var stateChanged = false;
      var initialState = !this._initialized;
      var keyPath = this.getIndex(key);
      var hasKeyPath = keyPath.length > 0; // if this is the initial state value, save value as the default

      if (initialState) {
        this._changedState = {};
        if (!this.hasPath() && key === undefined) this._defaultState = value;else this._defaultState = (0, _lodash.set)({}, keyPath, value);
      }

      if (!initialState) {
        // no path and no key, set the whole state
        if (!this.hasPath() && key === undefined) {
          // compare changedState and new state, emit an event when different
          stateChanged = !(0, _lodash.isEqual)(this._changedState, value);
          this._changedState = value;
          this._mergedState = (0, _lodash.cloneDeep)(value);
        } else {
          // check for changes at path, emit an event when different
          var curVal = hasKeyPath ? this.get(keyPath) : this._mergedState;
          stateChanged = !(0, _lodash.isEqual)(curVal, value); // arrays are merge by index, not desired - ensure they are replaced

          if (Array.isArray((0, _lodash.get)(this._mergedState, keyPath))) {
            if (hasKeyPath) {
              (0, _lodash.set)(this._mergedState, keyPath, undefined);
            } else {
              this._mergedState = undefined;
            }
          }

          if (hasKeyPath) {
            (0, _lodash.set)(this._changedState, keyPath, value);
          } else {
            this._changedState = (0, _lodash.isPlainObject)(value) ? value : {};
          }
        }
      } // update the merged state value


      var targetObj = this._mergedState || (0, _lodash.cloneDeep)(this._defaultState);
      var sourceObj = (0, _lodash.merge)({}, this._changedState); // handler arguments are (targetValue, sourceValue, key, target, source)

      var mergeMethod = function mergeMethod(targetValue, sourceValue, mergeKey) {
        // if not initial state, skip default merge method (ie. return value, see note below)
        if (!initialState && (0, _lodash.isEqual)(keyPath, self.getIndex(mergeKey))) {
          // use the sourceValue or fall back to targetValue
          return sourceValue === undefined ? targetValue : sourceValue;
        }
      }; // If `mergeMethod` is provided it is invoked to produce the merged values of the
      // destination and source properties.
      // If `mergeMethod` returns `undefined` the default merging method is used


      this._mergedState = (0, _lodash.merge)(targetObj, sourceObj, mergeMethod); // sanity check; verify that there are actually changes

      if ((0, _lodash.isEqual)(this._mergedState, this._defaultState)) this._changedState = {};
      if (!silent && stateChanged) this.emit('change', key);
      return this;
    }
  }]);

  return PersistedState;
}(_events.EventEmitter);

exports.PersistedState = PersistedState;