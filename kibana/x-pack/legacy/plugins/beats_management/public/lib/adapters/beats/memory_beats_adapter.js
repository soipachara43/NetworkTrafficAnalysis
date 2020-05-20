"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MemoryBeatsAdapter = void 0;

var _lodash = require("lodash");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MemoryBeatsAdapter =
/*#__PURE__*/
function () {
  function MemoryBeatsAdapter(beatsDB) {
    _classCallCheck(this, MemoryBeatsAdapter);

    _defineProperty(this, "beatsDB", void 0);

    this.beatsDB = beatsDB;
  }

  _createClass(MemoryBeatsAdapter, [{
    key: "get",
    value: function () {
      var _get = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(id) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this.beatsDB.find(function (beat) {
                  return beat.id === id;
                }) || null);

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function get(_x) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(id, beatData) {
        var index;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                index = this.beatsDB.findIndex(function (beat) {
                  return beat.id === id;
                });

                if (!(index === -1)) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return", false);

              case 3:
                this.beatsDB[index] = _objectSpread({}, this.beatsDB[index], {}, beatData);
                return _context2.abrupt("return", true);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function update(_x2, _x3) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "getAll",
    value: function () {
      var _getAll = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", this.beatsDB.map(function (beat) {
                  return (0, _lodash.omit)(beat, ['access_token']);
                }));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getAll() {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }()
  }, {
    key: "getBeatsWithTag",
    value: function () {
      var _getBeatsWithTag = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(tagId) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", this.beatsDB.map(function (beat) {
                  return (0, _lodash.omit)(beat, ['access_token']);
                }));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getBeatsWithTag(_x4) {
        return _getBeatsWithTag.apply(this, arguments);
      }

      return getBeatsWithTag;
    }()
  }, {
    key: "getBeatWithToken",
    value: function () {
      var _getBeatWithToken = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(enrollmentToken) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", this.beatsDB.map(function (beat) {
                  return (0, _lodash.omit)(beat, ['access_token']);
                })[0]);

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getBeatWithToken(_x5) {
        return _getBeatWithToken.apply(this, arguments);
      }

      return getBeatWithToken;
    }()
  }, {
    key: "removeTagsFromBeats",
    value: function () {
      var _removeTagsFromBeats = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(removals) {
        var beatIds, response;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                beatIds = removals.map(function (r) {
                  return r.beatId;
                });
                response = this.beatsDB.filter(function (beat) {
                  return beatIds.includes(beat.id);
                }).map(function (beat) {
                  var tagData = removals.find(function (r) {
                    return r.beatId === beat.id;
                  });

                  if (tagData) {
                    if (beat.tags) {
                      beat.tags = beat.tags.filter(function (tag) {
                        return tag !== tagData.tag;
                      });
                    }
                  }

                  var removalsForBeat = removals.filter(function (r) {
                    return r.beatId === beat.id;
                  });

                  if (removalsForBeat.length) {
                    removalsForBeat.forEach(function (assignment) {
                      if (beat.tags) {
                        beat.tags = beat.tags.filter(function (tag) {
                          return tag !== assignment.tag;
                        });
                      }
                    });
                  }

                  return beat;
                });
                return _context6.abrupt("return", response.map(function (item, resultIdx) {
                  return {
                    idxInRequest: removals[resultIdx].idxInRequest,
                    result: 'updated',
                    status: 200
                  };
                }));

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function removeTagsFromBeats(_x6) {
        return _removeTagsFromBeats.apply(this, arguments);
      }

      return removeTagsFromBeats;
    }()
  }, {
    key: "assignTagsToBeats",
    value: function () {
      var _assignTagsToBeats = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(assignments) {
        var beatIds;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                beatIds = assignments.map(function (r) {
                  return r.beatId;
                });
                this.beatsDB.filter(function (beat) {
                  return beatIds.includes(beat.id);
                }).map(function (beat) {
                  // get tags that need to be assigned to this beat
                  var tags = assignments.filter(function (a) {
                    return a.beatId === beat.id;
                  }).map(function (t) {
                    return t.tag;
                  });

                  if (tags.length > 0) {
                    if (!beat.tags) {
                      beat.tags = [];
                    }

                    var nonExistingTags = tags.filter(function (t) {
                      return beat.tags && !beat.tags.includes(t);
                    });

                    if (nonExistingTags.length > 0) {
                      beat.tags = beat.tags.concat(nonExistingTags);
                    }
                  }

                  return beat;
                });
                return _context7.abrupt("return", assignments.map(function (item, resultIdx) {
                  return {
                    idxInRequest: assignments[resultIdx].idxInRequest,
                    result: 'updated',
                    status: 200
                  };
                }));

              case 3:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function assignTagsToBeats(_x7) {
        return _assignTagsToBeats.apply(this, arguments);
      }

      return assignTagsToBeats;
    }()
  }]);

  return MemoryBeatsAdapter;
}();

exports.MemoryBeatsAdapter = MemoryBeatsAdapter;