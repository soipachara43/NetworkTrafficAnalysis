export var ENTER = 13;
export var SPACE = 32;
export var ESCAPE = 27;
export var TAB = 9;
export var BACKSPACE = 8;
export var F2 = 113; // Arrow keys

export var DOWN = 40;
export var UP = 38;
export var LEFT = 37;
export var RIGHT = 39;
export var PAGE_UP = 33;
export var PAGE_DOWN = 34;
export var END = 35;
export var HOME = 36;
export var keyCodes;

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
})(keyCodes || (keyCodes = {}));