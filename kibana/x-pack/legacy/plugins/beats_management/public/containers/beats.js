"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BeatsContainer = void 0;

var _unstated = require("unstated");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BeatsContainer =
/*#__PURE__*/
function (_Container) {
  _inherits(BeatsContainer, _Container);

  function BeatsContainer(libs) {
    var _this;

    _classCallCheck(this, BeatsContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BeatsContainer).call(this));
    _this.libs = libs;

    _defineProperty(_assertThisInitialized(_this), "query", void 0);

    _defineProperty(_assertThisInitialized(_this), "getBeatWithToken",
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(token) {
        var beat;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this.libs.beats.getBeatWithToken(token);

              case 2:
                beat = _context.sent;

                if (!beat) {
                  _context.next = 6;
                  break;
                }

                _this.setState({
                  list: [beat].concat(_toConsumableArray(_this.state.list))
                });

                return _context.abrupt("return", beat);

              case 6:
                return _context.abrupt("return", null);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "reload",
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(kuery) {
        var beats;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (kuery) {
                  _this.query = kuery;
                } else {
                  _this.query = undefined;
                }

                _context2.next = 3;
                return _this.libs.beats.getAll(_this.query);

              case 3:
                beats = _context2.sent;

                _this.setState({
                  list: beats
                });

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "deactivate",
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(beats) {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, beat;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context4.prev = 3;
                _iterator = beats[Symbol.iterator]();

              case 5:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context4.next = 12;
                  break;
                }

                beat = _step.value;
                _context4.next = 9;
                return _this.libs.beats.update(beat.id, {
                  active: false
                });

              case 9:
                _iteratorNormalCompletion = true;
                _context4.next = 5;
                break;

              case 12:
                _context4.next = 18;
                break;

              case 14:
                _context4.prev = 14;
                _context4.t0 = _context4["catch"](3);
                _didIteratorError = true;
                _iteratorError = _context4.t0;

              case 18:
                _context4.prev = 18;
                _context4.prev = 19;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }

              case 21:
                _context4.prev = 21;

                if (!_didIteratorError) {
                  _context4.next = 24;
                  break;
                }

                throw _iteratorError;

              case 24:
                return _context4.finish(21);

              case 25:
                return _context4.finish(18);

              case 26:
                // because the compile code above has a very minor race condition, we wait,
                // the max race condition time is really 10ms but doing 100 to be safe
                setTimeout(
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee3() {
                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          _context3.next = 2;
                          return _this.reload(_this.query);

                        case 2:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3);
                })), 100);

              case 27:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[3, 14, 18, 26], [19,, 21, 25]]);
      }));

      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "toggleTagAssignment",
    /*#__PURE__*/
    function () {
      var _ref5 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(tagId, beats) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!beats.some(function (beat) {
                  return beat.tags !== undefined && beat.tags.some(function (id) {
                    return id === tagId;
                  });
                })) {
                  _context5.next = 4;
                  break;
                }

                _context5.next = 3;
                return _this.removeTagsFromBeats(beats, tagId);

              case 3:
                return _context5.abrupt("return", 'removed');

              case 4:
                _context5.next = 6;
                return _this.assignTagsToBeats(beats, tagId);

              case 6:
                return _context5.abrupt("return", 'added');

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function (_x4, _x5) {
        return _ref5.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "removeTagsFromBeats",
    /*#__PURE__*/
    function () {
      var _ref6 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(beats, tagId) {
        var assignments;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (beats.length) {
                  _context7.next = 2;
                  break;
                }

                return _context7.abrupt("return", false);

              case 2:
                assignments = createBeatTagAssignments(beats, tagId);
                _context7.next = 5;
                return _this.libs.beats.removeTagsFromBeats(assignments);

              case 5:
                // ES responds incorrectly when we call too soon
                setTimeout(
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee6() {
                  return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                      switch (_context6.prev = _context6.next) {
                        case 0:
                          _context6.next = 2;
                          return _this.reload(_this.query);

                        case 2:
                        case "end":
                          return _context6.stop();
                      }
                    }
                  }, _callee6);
                })), 150);

              case 6:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      return function (_x6, _x7) {
        return _ref6.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "assignTagsToBeats",
    /*#__PURE__*/
    function () {
      var _ref8 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9(beats, tagId) {
        var assignments;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (beats.length) {
                  _context9.next = 2;
                  break;
                }

                return _context9.abrupt("return", false);

              case 2:
                assignments = createBeatTagAssignments(beats, tagId);
                _context9.next = 5;
                return _this.libs.beats.assignTagsToBeats(assignments);

              case 5:
                // ES responds incorrectly when we call too soon
                setTimeout(
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee8() {
                  return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                      switch (_context8.prev = _context8.next) {
                        case 0:
                          _context8.next = 2;
                          return _this.reload(_this.query);

                        case 2:
                        case "end":
                          return _context8.stop();
                      }
                    }
                  }, _callee8);
                })), 150);

              case 6:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      return function (_x8, _x9) {
        return _ref8.apply(this, arguments);
      };
    }());

    _this.state = {
      list: []
    };
    return _this;
  }

  return BeatsContainer;
}(_unstated.Container);

exports.BeatsContainer = BeatsContainer;

function createBeatTagAssignments(beats, tagId) {
  if (typeof beats[0] === 'string') {
    return beats.map(function (id) {
      return {
        beatId: id,
        tag: tagId
      };
    });
  } else {
    return beats.map(function (_ref10) {
      var id = _ref10.id;
      return {
        beatId: id,
        tag: tagId
      };
    });
  }
}