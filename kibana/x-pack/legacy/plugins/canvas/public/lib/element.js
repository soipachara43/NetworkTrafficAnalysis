"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Element = void 0;

var _default_header = _interopRequireDefault(require("./default_header.png"));

var _tags_registry = require("./tags_registry");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Element =
/** The name of the Element. This must match the name of the function that is used to create the `type: render` object  */

/** A more friendly name for the Element */

/** Relevant labels to help identify the elements */

/** An image to use in the Element type selector */

/** A sentence or few about what this Element does */

/** A default expression that allows Canvas to render the Element */

/** The width of the Element.  Default is 500. */

/** The height of the Element.  Default is 300 */
function Element(config) {
  _classCallCheck(this, Element);

  _defineProperty(this, "name", void 0);

  _defineProperty(this, "displayName", void 0);

  _defineProperty(this, "tags", void 0);

  _defineProperty(this, "image", void 0);

  _defineProperty(this, "help", void 0);

  _defineProperty(this, "expression", void 0);

  _defineProperty(this, "filter", void 0);

  _defineProperty(this, "width", void 0);

  _defineProperty(this, "height", void 0);

  var name = config.name,
      image = config.image,
      displayName = config.displayName,
      tags = config.tags,
      expression = config.expression,
      filter = config.filter,
      help = config.help,
      width = config.width,
      height = config.height;
  this.name = name;
  this.displayName = displayName || name;
  this.image = image || _default_header.default;
  this.help = help || '';

  if (!config.expression) {
    throw new Error('Element types must have a default expression');
  }

  this.tags = tags || [];
  this.tags.forEach(function (tag) {
    if (!_tags_registry.tagsRegistry.get(tag)) {
      _tags_registry.tagsRegistry.register(function () {
        return {
          name: tag,
          color: '#666666'
        };
      });
    }
  });
  this.expression = expression;
  this.filter = filter;
  this.width = width || 500;
  this.height = height || 300;
};

exports.Element = Element;