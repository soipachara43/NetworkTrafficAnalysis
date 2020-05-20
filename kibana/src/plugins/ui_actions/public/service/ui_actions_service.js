"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiActionsService = void 0;

var _trigger_internal = require("../triggers/trigger_internal");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var UiActionsService = function UiActionsService() {
  var _this = this;

  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$triggers = _ref.triggers,
      _triggers = _ref$triggers === void 0 ? new Map() : _ref$triggers,
      _ref$actions = _ref.actions,
      _actions = _ref$actions === void 0 ? new Map() : _ref$actions,
      _ref$triggerToActions = _ref.triggerToActions,
      _triggerToActions = _ref$triggerToActions === void 0 ? new Map() : _ref$triggerToActions;

  _classCallCheck(this, UiActionsService);

  _defineProperty(this, "triggers", void 0);

  _defineProperty(this, "actions", void 0);

  _defineProperty(this, "triggerToActions", void 0);

  _defineProperty(this, "registerTrigger", function (trigger) {
    if (_this.triggers.has(trigger.id)) {
      throw new Error("Trigger [trigger.id = ".concat(trigger.id, "] already registered."));
    }

    var triggerInternal = new _trigger_internal.TriggerInternal(_this, trigger);

    _this.triggers.set(trigger.id, triggerInternal);

    _this.triggerToActions.set(trigger.id, []);
  });

  _defineProperty(this, "getTrigger", function (triggerId) {
    var trigger = _this.triggers.get(triggerId);

    if (!trigger) {
      throw new Error("Trigger [triggerId = ".concat(triggerId, "] does not exist."));
    }

    return trigger.contract;
  });

  _defineProperty(this, "registerAction", function (action) {
    if (_this.actions.has(action.id)) {
      throw new Error("Action [action.id = ".concat(action.id, "] already registered."));
    }

    _this.actions.set(action.id, action);
  });

  _defineProperty(this, "getAction", function (id) {
    if (!_this.actions.has(id)) {
      throw new Error("Action [action.id = ".concat(id, "] not registered."));
    }

    return _this.actions.get(id);
  });

  _defineProperty(this, "attachAction", function (triggerId, action) {
    if (!_this.actions.has(action.id)) {
      _this.registerAction(action);
    } else {
      var registeredAction = _this.actions.get(action.id);

      if (registeredAction !== action) {
        throw new Error("A different action instance with this id is already registered.");
      }
    }

    var trigger = _this.triggers.get(triggerId);

    if (!trigger) {
      throw new Error("No trigger [triggerId = ".concat(triggerId, "] exists, for attaching action [actionId = ").concat(action.id, "]."));
    }

    var actionIds = _this.triggerToActions.get(triggerId);

    if (!actionIds.find(function (id) {
      return id === action.id;
    })) {
      _this.triggerToActions.set(triggerId, [].concat(_toConsumableArray(actionIds), [action.id]));
    }
  });

  _defineProperty(this, "detachAction", function (triggerId, actionId) {
    var trigger = _this.triggers.get(triggerId);

    if (!trigger) {
      throw new Error("No trigger [triggerId = ".concat(triggerId, "] exists, for detaching action [actionId = ").concat(actionId, "]."));
    }

    var actionIds = _this.triggerToActions.get(triggerId);

    _this.triggerToActions.set(triggerId, actionIds.filter(function (id) {
      return id !== actionId;
    }));
  });

  _defineProperty(this, "getTriggerActions", function (triggerId) {
    // This line checks if trigger exists, otherwise throws.
    _this.getTrigger(triggerId);

    var actionIds = _this.triggerToActions.get(triggerId);

    var actions = actionIds.map(function (actionId) {
      return _this.actions.get(actionId);
    }).filter(Boolean);
    return actions;
  });

  _defineProperty(this, "getTriggerCompatibleActions",
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(triggerId, context) {
      var actions, isCompatibles;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              actions = _this.getTriggerActions(triggerId);
              _context.next = 3;
              return Promise.all(actions.map(function (action) {
                return action.isCompatible(context);
              }));

            case 3:
              isCompatibles = _context.sent;
              return _context.abrupt("return", actions.reduce(function (acc, action, i) {
                return isCompatibles[i] ? [].concat(_toConsumableArray(acc), [action]) : acc;
              }, []));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }());

  _defineProperty(this, "executeTriggerActions",
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(triggerId, context) {
      var trigger;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              trigger = _this.getTrigger(triggerId);
              _context2.next = 3;
              return trigger.exec(context);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x3, _x4) {
      return _ref3.apply(this, arguments);
    };
  }());

  _defineProperty(this, "clear", function () {
    _this.actions.clear();

    _this.triggers.clear();

    _this.triggerToActions.clear();
  });

  _defineProperty(this, "fork", function () {
    var triggers = new Map();
    var actions = new Map();
    var triggerToActions = new Map();
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _this.triggers.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = _slicedToArray(_step.value, 2),
            key = _step$value[0],
            value = _step$value[1];

        triggers.set(key, value);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = _this.actions.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _step2$value = _slicedToArray(_step2.value, 2),
            _key = _step2$value[0],
            _value = _step2$value[1];

        actions.set(_key, _value);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = _this.triggerToActions.entries()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _step3$value = _slicedToArray(_step3.value, 2),
            _key2 = _step3$value[0],
            _value2 = _step3$value[1];

        triggerToActions.set(_key2, _toConsumableArray(_value2));
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    return new UiActionsService({
      triggers: triggers,
      actions: actions,
      triggerToActions: triggerToActions
    });
  });

  this.triggers = _triggers;
  this.actions = _actions;
  this.triggerToActions = _triggerToActions;
};

exports.UiActionsService = UiActionsService;