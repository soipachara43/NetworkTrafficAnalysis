"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeBuckets = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _moment = _interopRequireDefault(require("moment"));

var _common = require("../../../../../../common");

var _calc_auto_interval = require("./calc_auto_interval");

var _calc_es_interval = require("./calc_es_interval");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function isObject(o) {
  return _lodash.default.isObject(o);
}

function isString(s) {
  return _lodash.default.isString(s);
}

function isValidMoment(m) {
  return m && 'isValid' in m && m.isValid();
}

/**
 * Helper class for wrapping the concept of an "Interval",
 * which describes a timespan that will separate moments.
 *
 * @param {state} object - one of ""
 * @param {[type]} display [description]
 */
var TimeBuckets =
/*#__PURE__*/
function () {
  _createClass(TimeBuckets, null, [{
    key: "__cached__",
    value: function __cached__(self) {
      var cache = {};
      var sameMoment = same(_moment.default.isMoment);
      var sameDuration = same(_moment.default.isDuration);
      var desc = {
        __cached__: {
          value: self
        }
      };
      var breakers = {
        setBounds: 'bounds',
        clearBounds: 'bounds',
        setInterval: 'interval'
      };
      var resources = {
        bounds: {
          setup: function setup() {
            return [self._lb, self._ub];
          },
          changes: function changes(prev) {
            return !sameMoment(prev[0], self._lb) || !sameMoment(prev[1], self._ub);
          }
        },
        interval: {
          setup: function setup() {
            return self._i;
          },
          changes: function changes(prev) {
            return !sameDuration(prev, self._i);
          }
        }
      };

      function cachedGetter(prop) {
        return {
          value: function value() {
            if (cache.hasOwnProperty(prop)) {
              return cache[prop];
            }

            return cache[prop] = self[prop].apply(self, arguments);
          }
        };
      }

      function cacheBreaker(prop) {
        var resource = resources[breakers[prop]];
        var setup = resource.setup;
        var changes = resource.changes;
        var fn = self[prop];
        return {
          value: function value() {
            var prev = setup.call(self);

            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            var ret = fn.apply.apply(fn, [self].concat(args));

            if (changes.call(self, prev)) {
              cache = {};
            }

            return ret;
          }
        };
      }

      function same(checkType) {
        return function (a, b) {
          if (a === b) return true;
          if (checkType(a) === checkType(b)) return +a === +b;
          return false;
        };
      }

      _lodash.default.forOwn(TimeBuckets.prototype, function (fn, prop) {
        if (!prop || prop[0] === '_') return;

        if (breakers.hasOwnProperty(prop)) {
          desc[prop] = cacheBreaker(prop);
        } else {
          desc[prop] = cachedGetter(prop);
        }
      });

      return Object.create(self, desc);
    }
  }]);

  function TimeBuckets(_ref) {
    var uiSettings = _ref.uiSettings;

    _classCallCheck(this, TimeBuckets);

    _defineProperty(this, "getConfig", void 0);

    _defineProperty(this, "_lb", null);

    _defineProperty(this, "_ub", null);

    _defineProperty(this, "_originalInterval", null);

    _defineProperty(this, "_i", void 0);

    this.getConfig = function (key) {
      return uiSettings.get(key);
    };

    return TimeBuckets.__cached__(this);
  }
  /**
   * Get a moment duration object representing
   * the distance between the bounds, if the bounds
   * are set.
   *
   * @return {moment.duration|undefined}
   */


  _createClass(TimeBuckets, [{
    key: "getDuration",
    value: function getDuration() {
      if (this._ub === null || this._lb === null || !this.hasBounds()) {
        return;
      }

      var difference = this._ub - this._lb;
      return _moment.default.duration(difference, 'ms');
    }
    /**
     * Set the bounds that these buckets are expected to cover.
     * This is required to support interval "auto" as well
     * as interval scaling.
     *
     * @param {object} input - an object with properties min and max,
     *                       representing the edges for the time span
     *                       we should cover
     *
     * @returns {undefined}
     */

  }, {
    key: "setBounds",
    value: function setBounds(input) {
      if (!input) return this.clearBounds();
      var bounds;

      if (_lodash.default.isPlainObject(input) && !Array.isArray(input)) {
        // accept the response from timefilter.getActiveBounds()
        bounds = [input.min, input.max];
      } else {
        bounds = Array.isArray(input) ? input : [];
      }

      var moments = (0, _lodash.default)(bounds).map(_lodash.default.ary(_moment.default, 1)).sortBy(Number);
      var valid = moments.size() === 2 && moments.every(isValidMoment);

      if (!valid) {
        this.clearBounds();
        throw new Error('invalid bounds set: ' + input);
      }

      this._lb = moments.shift();
      this._ub = moments.pop();
      var duration = this.getDuration();

      if (!duration || duration.asSeconds() < 0) {
        throw new TypeError('Intervals must be positive');
      }
    }
    /**
     * Clear the stored bounds
     *
     * @return {undefined}
     */

  }, {
    key: "clearBounds",
    value: function clearBounds() {
      this._lb = this._ub = null;
    }
    /**
     * Check to see if we have received bounds yet
     *
     * @return {Boolean}
     */

  }, {
    key: "hasBounds",
    value: function hasBounds() {
      return isValidMoment(this._ub) && isValidMoment(this._lb);
    }
    /**
     * Return the current bounds, if we have any.
     *
     * THIS DOES NOT CLONE THE BOUNDS, so editing them
     * may have unexpected side-effects. Always
     * call bounds.min.clone() before editing
     *
     * @return {object|undefined} - If bounds are not defined, this
     *                      returns undefined, else it returns the bounds
     *                      for these buckets. This object has two props,
     *                      min and max. Each property will be a moment()
     *                      object
     *
     */

  }, {
    key: "getBounds",
    value: function getBounds() {
      if (!this.hasBounds()) return;
      return {
        min: this._lb,
        max: this._ub
      };
    }
    /**
     * Update the interval at which buckets should be
     * generated.
     *
     * Input can be one of the following:
     *  - Any object from src/legacy/ui/agg_types.js
     *  - "auto"
     *  - Pass a valid moment unit
     *  - a moment.duration object.
     *
     * @param {object|string|moment.duration} input - see desc
     */

  }, {
    key: "setInterval",
    value: function setInterval(input) {
      var interval = input; // selection object -> val

      if (isObject(input) && !_moment.default.isDuration(input)) {
        interval = input.val;
      }

      if (!interval || interval === 'auto') {
        this._i = 'auto';
        return;
      }

      if (isString(interval)) {
        input = interval; // Preserve the original units because they're lost when the interval is converted to a
        // moment duration object.

        this._originalInterval = input;
        interval = (0, _common.parseInterval)(interval);

        if (interval === null || +interval === 0) {
          interval = null;
        }
      } // if the value wasn't converted to a duration, and isn't
      // already a duration, we have a problem


      if (!_moment.default.isDuration(interval)) {
        throw new TypeError('"' + input + '" is not a valid interval.');
      }

      this._i = interval;
    }
    /**
     * Get the interval for the buckets. If the
     * number of buckets created by the interval set
     * is larger than config:histogram:maxBars then the
     * interval will be scaled up. If the number of buckets
     * created is less than one, the interval is scaled back.
     *
     * The interval object returned is a moment.duration
     * object that has been decorated with the following
     * properties.
     *
     * interval.description: a text description of the interval.
     *   designed to be used list "field per {{ desc }}".
     *     - "minute"
     *     - "10 days"
     *     - "3 years"
     *
     * interval.expression: the elasticsearch expression that creates this
     *   interval. If the interval does not properly form an elasticsearch
     *   expression it will be forced into one.
     *
     * interval.scaled: the interval was adjusted to
     *   accommodate the maxBars setting.
     *
     * interval.scale: the number that y-values should be
     *   multiplied by
     */

  }, {
    key: "getInterval",
    value: function getInterval() {
      var _this = this;

      var useNormalizedEsInterval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var duration = this.getDuration(); // either pull the interval from state or calculate the auto-interval

      var readInterval = function readInterval() {
        var interval = _this._i;
        if (_moment.default.isDuration(interval)) return interval;
        return (0, _calc_auto_interval.calcAutoIntervalNear)(_this.getConfig('histogram:barTarget'), Number(duration));
      };

      var parsedInterval = readInterval(); // check to see if the interval should be scaled, and scale it if so

      var maybeScaleInterval = function maybeScaleInterval(interval) {
        if (!_this.hasBounds() || !duration) {
          return interval;
        }

        var maxLength = _this.getConfig('histogram:maxBars');

        var approxLen = Number(duration) / Number(interval);
        var scaled;

        if (approxLen > maxLength) {
          scaled = (0, _calc_auto_interval.calcAutoIntervalLessThan)(maxLength, Number(duration));
        } else {
          return interval;
        }

        if (+scaled === +interval) return interval;
        interval = decorateInterval(interval);
        return Object.assign(scaled, {
          preScaled: interval,
          scale: Number(interval) / Number(scaled),
          scaled: true
        });
      }; // append some TimeBuckets specific props to the interval


      var decorateInterval = function decorateInterval(interval) {
        var esInterval = useNormalizedEsInterval ? (0, _calc_es_interval.convertDurationToNormalizedEsInterval)(interval) : (0, _calc_es_interval.convertIntervalToEsInterval)(String(_this._originalInterval));

        var prettyUnits = _moment.default.normalizeUnits(esInterval.unit);

        return Object.assign(interval, {
          description: esInterval.value === 1 ? prettyUnits : esInterval.value + ' ' + prettyUnits + 's',
          esValue: esInterval.value,
          esUnit: esInterval.unit,
          expression: esInterval.expression,
          overflow: Number(duration) > Number(interval) ? _moment.default.duration(Number(interval) - Number(duration)) : false
        });
      };

      if (useNormalizedEsInterval) {
        return decorateInterval(maybeScaleInterval(parsedInterval));
      } else {
        return decorateInterval(parsedInterval);
      }
    }
    /**
     * Get a date format string that will represent dates that
     * progress at our interval.
     *
     * Since our interval can be as small as 1ms, the default
     * date format is usually way too much. with `dateFormat:scaled`
     * users can modify how dates are formatted within series
     * produced by TimeBuckets
     *
     * @return {string}
     */

  }, {
    key: "getScaledDateFormat",
    value: function getScaledDateFormat() {
      var interval = this.getInterval();
      var rules = this.getConfig('dateFormat:scaled');

      for (var i = rules.length - 1; i >= 0; i--) {
        var rule = rules[i];

        if (!rule[0] || interval && interval >= _moment.default.duration(rule[0])) {
          return rule[1];
        }
      }

      return this.getConfig('dateFormat');
    }
  }]);

  return TimeBuckets;
}();

exports.TimeBuckets = TimeBuckets;