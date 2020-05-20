"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePersistRule = void 0;

var _react = require("react");

var _toasters = require("../../../components/toasters");

var _api = require("./api");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var usePersistRule = function usePersistRule() {
  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      rule = _useState2[0],
      setRule = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isSaved = _useState4[0],
      setIsSaved = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isLoading = _useState6[0],
      setIsLoading = _useState6[1];

  var _useStateToaster = (0, _toasters.useStateToaster)(),
      _useStateToaster2 = _slicedToArray(_useStateToaster, 2),
      dispatchToaster = _useStateToaster2[1];

  (0, _react.useEffect)(function () {
    var isSubscribed = true;
    var abortCtrl = new AbortController();
    setIsSaved(false);

    function saveRule() {
      return _saveRule.apply(this, arguments);
    }

    function _saveRule() {
      _saveRule = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(rule != null)) {
                  _context.next = 12;
                  break;
                }

                _context.prev = 1;
                setIsLoading(true);
                _context.next = 5;
                return (0, _api.addRule)({
                  rule: rule,
                  signal: abortCtrl.signal
                });

              case 5:
                if (isSubscribed) {
                  setIsSaved(true);
                }

                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](1);

                if (isSubscribed) {
                  (0, _toasters.errorToToaster)({
                    title: i18n.RULE_ADD_FAILURE,
                    error: _context.t0,
                    dispatchToaster: dispatchToaster
                  });
                }

              case 11:
                if (isSubscribed) {
                  setIsLoading(false);
                }

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 8]]);
      }));
      return _saveRule.apply(this, arguments);
    }

    saveRule();
    return function () {
      isSubscribed = false;
      abortCtrl.abort();
    };
  }, [rule]);
  return [{
    isLoading: isLoading,
    isSaved: isSaved
  }, setRule];
};

exports.usePersistRule = usePersistRule;