"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keyCodes = exports.HOME = exports.END = exports.PAGE_DOWN = exports.PAGE_UP = exports.RIGHT = exports.LEFT = exports.UP = exports.DOWN = exports.F2 = exports.BACKSPACE = exports.TAB = exports.ESCAPE = exports.SPACE = exports.ENTER = void 0;
var ENTER = 13;
exports.ENTER = ENTER;
var SPACE = 32;
exports.SPACE = SPACE;
var ESCAPE = 27;
exports.ESCAPE = ESCAPE;
var TAB = 9;
exports.TAB = TAB;
var BACKSPACE = 8;
exports.BACKSPACE = BACKSPACE;
var F2 = 113; // Arrow keys

exports.F2 = F2;
var DOWN = 40;
exports.DOWN = DOWN;
var UP = 38;
exports.UP = UP;
var LEFT = 37;
exports.LEFT = LEFT;
var RIGHT = 39;
exports.RIGHT = RIGHT;
var PAGE_UP = 33;
exports.PAGE_UP = PAGE_UP;
var PAGE_DOWN = 34;
exports.PAGE_DOWN = PAGE_DOWN;
var END = 35;
exports.END = END;
var HOME = 36;
exports.HOME = HOME;
var keyCodes;
exports.keyCodes = keyCodes;

(function (keyCodes) {
  keyCodes[keyCodes["ENTER"] = 13] = "ENTER";
  keyCodes[keyCodes["SPACE"] = 32] = "SPACE";
  keyCodes[keyCodes["ESCAPE"] = 27] = "ESCAPE";
  keyCodes[keyCodes["TAB"] = 9] = "TAB";
  keyCodes[keyCodes["BACKSPACE"] = 8] = "BACKSPACE";
  keyCodes[keyCodes["F2"] = 113] = "F2";
  keyCodes[keyCodes["DOWN"] = 40] = "DOWN";
  keyCodes[keyCodes["UP"] = 38] = "UP";
  keyCodes[keyCodes["LEFT"] = 37] = "LEFT";
  keyCodes[keyCodes["RIGHT"] = 39] = "RIGHT";
  keyCodes[keyCodes["PAGE_UP"] = 33] = "PAGE_UP";
  keyCodes[keyCodes["PAGE_DOWN"] = 34] = "PAGE_DOWN";
  keyCodes[keyCodes["END"] = 35] = "END";
  keyCodes[keyCodes["HOME"] = 36] = "HOME";
})(keyCodes || (exports.keyCodes = keyCodes = {}));