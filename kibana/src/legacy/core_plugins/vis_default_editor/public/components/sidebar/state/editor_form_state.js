"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useEditorFormState = useEditorFormState;

var _react = require("react");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var initialFormState = {
  validity: {},
  touched: false,
  invalid: false
};

function useEditorFormState() {
  var _useState = (0, _react.useState)(initialFormState),
      _useState2 = _slicedToArray(_useState, 2),
      formState = _useState2[0],
      setFormState = _useState2[1];

  var setValidity = (0, _react.useCallback)(function (modelName, value) {
    setFormState(function (model) {
      var validity = _objectSpread({}, model.validity, _defineProperty({}, modelName, value));

      return _objectSpread({}, model, {
        validity: validity,
        invalid: Object.values(validity).some(function (valid) {
          return !valid;
        })
      });
    });
  }, []);
  var resetValidity = (0, _react.useCallback)(function () {
    setFormState(initialFormState);
  }, []);
  var setTouched = (0, _react.useCallback)(function (touched) {
    setFormState(function (model) {
      return _objectSpread({}, model, {
        touched: touched
      });
    });
  }, []);
  return {
    formState: formState,
    setValidity: setValidity,
    setTouched: setTouched,
    resetValidity: resetValidity
  };
}