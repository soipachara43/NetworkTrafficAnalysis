"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keymap = void 0;

var _lodash = require("lodash");

var _shortcuts = require("../../i18n/shortcuts");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var shortcutHelp = _shortcuts.ShortcutStrings.getShortcutHelp();

var namespaceDisplayNames = _shortcuts.ShortcutStrings.getNamespaceDisplayNames();

// maps key for all OS's with optional modifiers
var getShortcuts = function getShortcuts(shortcuts, _ref) {
  var _ref$modifiers = _ref.modifiers,
      modifiers = _ref$modifiers === void 0 ? [] : _ref$modifiers,
      help = _ref.help;

  // normalize shortcut values
  if (!Array.isArray(shortcuts)) {
    shortcuts = [shortcuts];
  } // normalize modifier values


  if (!Array.isArray(modifiers)) {
    modifiers = [modifiers];
  }

  var macShortcuts = _toConsumableArray(shortcuts); // handle shift modifier


  if (modifiers.includes('shift')) {
    macShortcuts = macShortcuts.map(function (shortcut) {
      return "shift+".concat(shortcut);
    });
    shortcuts = shortcuts.map(function (shortcut) {
      return "shift+".concat(shortcut);
    });
  } // handle alt modifier


  if (modifiers.includes('alt') || modifiers.includes('option')) {
    macShortcuts = macShortcuts.map(function (shortcut) {
      return "option+".concat(shortcut);
    });
    shortcuts = shortcuts.map(function (shortcut) {
      return "alt+".concat(shortcut);
    });
  } // handle ctrl modifier


  if (modifiers.includes('ctrl') || modifiers.includes('command')) {
    macShortcuts = macShortcuts.map(function (shortcut) {
      return "command+".concat(shortcut);
    });
    shortcuts = shortcuts.map(function (shortcut) {
      return "ctrl+".concat(shortcut);
    });
  }

  return {
    osx: macShortcuts,
    windows: shortcuts,
    linux: shortcuts,
    other: shortcuts,
    help: help
  };
};

var refreshShortcut = getShortcuts('r', {
  modifiers: 'alt',
  help: shortcutHelp.REFRESH
});
var previousPageShortcut = getShortcuts('[', {
  modifiers: 'alt',
  help: shortcutHelp.PREV
});
var nextPageShortcut = getShortcuts(']', {
  modifiers: 'alt',
  help: shortcutHelp.NEXT
});
var fullscreenShortcut = getShortcuts(['f', 'p'], {
  modifiers: 'alt',
  help: shortcutHelp.FULLSCREEN
});
var keymap = {
  ELEMENT: {
    displayName: namespaceDisplayNames.ELEMENT,
    CUT: getShortcuts('x', {
      modifiers: 'ctrl',
      help: shortcutHelp.CUT
    }),
    COPY: getShortcuts('c', {
      modifiers: 'ctrl',
      help: shortcutHelp.COPY
    }),
    PASTE: getShortcuts('v', {
      modifiers: 'ctrl',
      help: shortcutHelp.PASTE
    }),
    CLONE: getShortcuts('d', {
      modifiers: 'ctrl',
      help: shortcutHelp.CLONE
    }),
    DELETE: getShortcuts(['del', 'backspace'], {
      help: shortcutHelp.DELETE
    }),
    BRING_FORWARD: getShortcuts('up', {
      modifiers: 'ctrl',
      help: shortcutHelp.BRING_TO_FRONT
    }),
    BRING_TO_FRONT: getShortcuts('up', {
      modifiers: ['ctrl', 'shift'],
      help: shortcutHelp.BRING_FORWARD
    }),
    SEND_BACKWARD: getShortcuts('down', {
      modifiers: 'ctrl',
      help: shortcutHelp.SEND_BACKWARD
    }),
    SEND_TO_BACK: getShortcuts('down', {
      modifiers: ['ctrl', 'shift'],
      help: shortcutHelp.SEND_TO_BACK
    }),
    GROUP: getShortcuts('g', {
      help: shortcutHelp.GROUP
    }),
    UNGROUP: getShortcuts('u', {
      help: shortcutHelp.UNGROUP
    }),
    SHIFT_UP: getShortcuts('up', {
      help: shortcutHelp.SHIFT_UP
    }),
    SHIFT_DOWN: getShortcuts('down', {
      help: shortcutHelp.SHIFT_DOWN
    }),
    SHIFT_LEFT: getShortcuts('left', {
      help: shortcutHelp.SHIFT_LEFT
    }),
    SHIFT_RIGHT: getShortcuts('right', {
      help: shortcutHelp.SHIFT_RIGHT
    }),
    NUDGE_UP: getShortcuts('up', {
      modifiers: ['shift'],
      help: shortcutHelp.NUDGE_UP
    }),
    NUDGE_DOWN: getShortcuts('down', {
      modifiers: ['shift'],
      help: shortcutHelp.NUDGE_DOWN
    }),
    NUDGE_LEFT: getShortcuts('left', {
      modifiers: ['shift'],
      help: shortcutHelp.NUDGE_LEFT
    }),
    NUDGE_RIGHT: getShortcuts('right', {
      modifiers: ['shift'],
      help: shortcutHelp.NUDGE_RIGHT
    })
  },
  EXPRESSION: {
    displayName: namespaceDisplayNames.EXPRESSION,
    RUN: getShortcuts('enter', {
      modifiers: 'ctrl',
      help: shortcutHelp.RUN
    })
  },
  EDITOR: {
    displayName: namespaceDisplayNames.EDITOR,
    // added for documentation purposes, not handled by `react-shortcuts`
    MULTISELECT: getShortcuts('click', {
      modifiers: 'shift',
      help: shortcutHelp.MULTISELECT
    }),
    // added for documentation purposes, not handled by `react-shortcuts`
    RESIZE_FROM_CENTER: getShortcuts('drag', {
      modifiers: 'alt',
      help: shortcutHelp.RESIZE_FROM_CENTER
    }),
    // added for documentation purposes, not handled by `react-shortcuts`
    IGNORE_SNAP: getShortcuts('drag', {
      modifiers: 'ctrl',
      help: shortcutHelp.IGNORE_SNAP
    }),
    // added for documentation purposes, not handled by `react-shortcuts`
    SELECT_BEHIND: getShortcuts('click', {
      modifiers: 'ctrl',
      help: shortcutHelp.SELECT_BEHIND
    }),
    UNDO: getShortcuts('z', {
      modifiers: 'ctrl',
      help: shortcutHelp.UNDO
    }),
    REDO: getShortcuts('z', {
      modifiers: ['ctrl', 'shift'],
      help: shortcutHelp.REDO
    }),
    PREV: previousPageShortcut,
    NEXT: nextPageShortcut,
    EDITING: getShortcuts('e', {
      modifiers: 'alt',
      help: shortcutHelp.EDITING
    }),
    GRID: getShortcuts('g', {
      modifiers: 'alt',
      help: shortcutHelp.GRID
    }),
    REFRESH: refreshShortcut,
    ZOOM_IN: getShortcuts('plus', {
      modifiers: ['ctrl', 'alt'],
      help: shortcutHelp.ZOOM_IN
    }),
    ZOOM_OUT: getShortcuts('minus', {
      modifiers: ['ctrl', 'alt'],
      help: shortcutHelp.ZOOM_OUT
    }),
    ZOOM_RESET: getShortcuts('[', {
      modifiers: ['ctrl', 'alt'],
      help: shortcutHelp.ZOOM_RESET
    }),
    FULLSCREEN: fullscreenShortcut
  },
  PRESENTATION: {
    displayName: namespaceDisplayNames.PRESENTATION,
    FULLSCREEN: fullscreenShortcut,
    FULLSCREEN_EXIT: getShortcuts('esc', {
      help: shortcutHelp.FULLSCREEN_EXIT
    }),
    PREV: (0, _lodash.mapValues)(previousPageShortcut, function (osShortcuts, key) {
      return (// adds 'backspace' and 'left' to list of shortcuts per OS
        key === 'help' ? osShortcuts : osShortcuts.concat(['backspace', 'left'])
      );
    }),
    NEXT: (0, _lodash.mapValues)(nextPageShortcut, function (osShortcuts, key) {
      return (// adds 'space' and 'right' to list of shortcuts per OS
        key === 'help' ? osShortcuts : osShortcuts.concat(['space', 'right'])
      );
    }),
    REFRESH: refreshShortcut,
    PAGE_CYCLE_TOGGLE: getShortcuts('p', {
      help: shortcutHelp.PAGE_CYCLE_TOGGLE
    })
  }
};
exports.keymap = keymap;