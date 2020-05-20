"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWorkpad = getWorkpad;
exports.getFullWorkpadPersisted = getFullWorkpadPersisted;
exports.getWorkpadPersisted = getWorkpadPersisted;
exports.getWorkpadInfo = getWorkpadInfo;
exports.isWriteable = isWriteable;
exports.getSelectedPageIndex = getSelectedPageIndex;
exports.getSelectedPage = getSelectedPage;
exports.getPages = getPages;
exports.getPageById = getPageById;
exports.getPageIndexById = getPageIndexById;
exports.getWorkpadName = getWorkpadName;
exports.getWorkpadHeight = getWorkpadHeight;
exports.getWorkpadWidth = getWorkpadWidth;
exports.getWorkpadBoundingBox = getWorkpadBoundingBox;
exports.getWorkpadColors = getWorkpadColors;
exports.getAllElements = getAllElements;
exports.getElementCounts = getElementCounts;
exports.getElementStats = getElementStats;
exports.getGlobalFilters = getGlobalFilters;
exports.getGlobalFilterGroups = getGlobalFilterGroups;
exports.getSelectedToplevelNodes = getSelectedToplevelNodes;
exports.getSelectedElementId = getSelectedElementId;
exports.getSelectedElement = getSelectedElement;
exports.getElements = getElements;
exports.getNodesForPage = getNodesForPage;
exports.getNodes = getNodes;
exports.getElementById = getElementById;
exports.getNodeById = getNodeById;
exports.getResolvedArgs = getResolvedArgs;
exports.getSelectedResolvedArgs = getSelectedResolvedArgs;
exports.getContextForIndex = getContextForIndex;
exports.getRefreshInterval = getRefreshInterval;
exports.getAutoplay = getAutoplay;
exports.getRenderedWorkpad = getRenderedWorkpad;
exports.getRenderedWorkpadExpressions = getRenderedWorkpadExpressions;

var _lodash = require("lodash");

var _common = require("@kbn/interpreter/common");

var _modify_path = require("../../lib/modify_path");

var _assets = require("./assets");

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var workpadRoot = 'persistent.workpad';

var appendAst = function appendAst(element) {
  return _objectSpread({}, element, {
    ast: (0, _common.safeElementFromExpression)(element.expression)
  });
}; // workpad getters


function getWorkpad(state) {
  return (0, _lodash.get)(state, workpadRoot);
} // should we split `workpad.js` to eg. `workpad.js` (full) and `persistentWorkpadStructure.js` (persistent.workpad)?
// how can we better disambiguate the two? now both the entire state and `persistent.workpad` are informally called workpad


function getFullWorkpadPersisted(state) {
  return _objectSpread({}, getWorkpad(state), {
    assets: (0, _assets.getAssets)(state)
  });
}

function getWorkpadPersisted(state) {
  return getWorkpad(state);
}

function getWorkpadInfo(state) {
  return (0, _lodash.omit)(getWorkpad(state), ['pages']);
}

function isWriteable(state) {
  return (0, _lodash.get)(state, (0, _modify_path.append)(workpadRoot, 'isWriteable'), true);
} // page getters


function getSelectedPageIndex(state) {
  return (0, _lodash.get)(state, (0, _modify_path.append)(workpadRoot, 'page'));
}

function getSelectedPage(state) {
  var pageIndex = getSelectedPageIndex(state);
  var pages = getPages(state);
  return (0, _lodash.get)(pages, "[".concat(pageIndex, "].id"));
}

function getPages(state) {
  return (0, _lodash.get)(state, (0, _modify_path.append)(workpadRoot, 'pages'), []);
}

function getPageById(state, id) {
  var pages = getPages(state);
  return pages.find(function (page) {
    return page.id === id;
  });
}

function getPageIndexById(state, id) {
  var pages = getPages(state);
  return pages.findIndex(function (page) {
    return page.id === id;
  });
}

function getWorkpadName(state) {
  return (0, _lodash.get)(state, (0, _modify_path.append)(workpadRoot, 'name'));
}

function getWorkpadHeight(state) {
  return (0, _lodash.get)(state, (0, _modify_path.append)(workpadRoot, 'height'));
}

function getWorkpadWidth(state) {
  return (0, _lodash.get)(state, (0, _modify_path.append)(workpadRoot, 'width'));
}

function getWorkpadBoundingBox(state) {
  return getPages(state).reduce(function (boundingBox, page) {
    page.elements.forEach(function (_ref) {
      var position = _ref.position;
      var left = position.left,
          top = position.top,
          width = position.width,
          height = position.height;
      var right = left + width;
      var bottom = top + height;

      if (left < boundingBox.left) {
        boundingBox.left = left;
      }

      if (top < boundingBox.top) {
        boundingBox.top = top;
      }

      if (right > boundingBox.right) {
        boundingBox.right = right;
      }

      if (bottom > boundingBox.bottom) {
        boundingBox.bottom = bottom;
      }
    });
    return boundingBox;
  }, {
    left: 0,
    right: getWorkpadWidth(state),
    top: 0,
    bottom: getWorkpadHeight(state)
  });
}

function getWorkpadColors(state) {
  return (0, _lodash.get)(state, (0, _modify_path.append)(workpadRoot, 'colors'));
}

function getAllElements(state) {
  return getPages(state).reduce(function (elements, page) {
    return elements.concat(page.elements);
  }, []);
}

function getElementCounts(state) {
  var resolvedArgs = state.transient.resolvedArgs;
  var results = {
    ready: 0,
    pending: 0,
    error: 0
  };
  Object.values(resolvedArgs).filter(function (maybeResolvedArg) {
    return maybeResolvedArg !== undefined;
  }).forEach(function (resolvedArg) {
    var expressionRenderable = resolvedArg.expressionRenderable;

    if (!expressionRenderable) {
      results.pending++;
      return;
    }

    var value = expressionRenderable.value,
        readyState = expressionRenderable.state;

    if (value && value.as === 'error') {
      results.error++;
    } else if (readyState === 'ready') {
      results.ready++;
    } else {
      results.pending++;
    }
  });
  return results;
}

function getElementStats(state) {
  return (0, _lodash.get)(state, 'transient.elementStats');
}

function getGlobalFilters(state) {
  return getAllElements(state).reduce(function (acc, el) {
    // check that a filter is defined
    if (el.filter != null && el.filter.length) {
      return acc.concat(el.filter);
    }

    return acc;
  }, []);
}

function buildGroupValues(args, onValue) {
  var argNames = Object.keys(args);
  return argNames.reduce(function (values, argName) {
    // we only care about group values
    if (argName !== '_' && argName !== 'group') {
      return values;
    }

    return args[argName].reduce(function (acc, argValue) {
      // delegate to passed function to buyld list
      return acc.concat(onValue(argValue, argName, args) || []);
    }, values);
  }, []);
}

function extractFilterGroups(ast) {
  if (ast.type !== 'expression') {
    throw new Error('AST must be an expression');
  }

  return ast.chain.reduce(function (groups, item) {
    // TODO: we always get a function here, right?
    var fn = item.function,
        args = item.arguments;

    if (fn === 'filters') {
      // we have a filter function, extract groups from args
      return groups.concat(buildGroupValues(args, function (argValue) {
        // this only handles simple values
        if (argValue !== null && _typeof(argValue) !== 'object') {
          return argValue;
        }
      }));
    } else {
      // dig into other functions, looking for filters function
      return groups.concat(buildGroupValues(args, function (argValue) {
        // recursively collect filter groups
        if (argValue !== null && _typeof(argValue) === 'object' && argValue.type === 'expression') {
          return extractFilterGroups(argValue);
        }
      }));
    }
  }, []);
}

function getGlobalFilterGroups(state) {
  var filterGroups = getAllElements(state).reduce(function (acc, el) {
    // check that a filter is defined
    if (el.filter != null && el.filter.length) {
      // extract the filter group
      var filterAst = (0, _common.fromExpression)(el.filter);
      var filterGroup = (0, _lodash.get)(filterAst, "chain[0].arguments.filterGroup[0]"); // add any new group to the array

      if (filterGroup && filterGroup !== '' && !acc.includes(String(filterGroup))) {
        acc.push(String(filterGroup));
      }
    } // extract groups from all expressions that use filters function


    if (el.expression != null && el.expression.length) {
      var expressionAst = (0, _common.fromExpression)(el.expression);
      var groups = extractFilterGroups(expressionAst);
      groups.forEach(function (group) {
        if (!acc.includes(String(group))) {
          acc.push(String(group));
        }
      });
    }

    return acc;
  }, []);
  return filterGroups.sort();
} // element getters


function getSelectedToplevelNodes(state) {
  return (0, _lodash.get)(state, 'transient.selectedToplevelNodes', []);
}

function getSelectedElementId(state) {
  var toplevelNodes = getSelectedToplevelNodes(state);
  return toplevelNodes.length === 1 ? toplevelNodes[0] : null;
}

function getSelectedElement(state) {
  return getElementById(state, getSelectedElementId(state));
}

function getElements(state) {
  var pageId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var withAst = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var id = pageId || getSelectedPage(state);

  if (!id) {
    return [];
  }

  var page = getPageById(state, id);
  var elements = (0, _lodash.get)(page, 'elements');

  if (!elements) {
    return [];
  } // explicitly strip the ast, basically a fix for corrupted workpads
  // due to https://github.com/elastic/kibana-canvas/issues/260
  // TODO: remove this once it's been in the wild a bit


  if (!withAst) {
    return elements.map(function (el) {
      return (0, _lodash.omit)(el, ['ast']);
    });
  }

  return elements.map(appendAst);
}

var augment = function augment(type) {
  return function (n) {
    return _objectSpread({}, n, {
      position: _objectSpread({}, n.position, {
        type: type
      })
    }, type === 'group' && {
      expression: 'shape fill="rgba(255,255,255,0)" | render'
    });
  };
};

var getNodesOfPage = function getNodesOfPage(page) {
  var elements = (0, _lodash.get)(page, 'elements').map(augment('element'));
  var groups = (0, _lodash.get)(page, 'groups', []).map(augment('group'));
  return elements.concat(groups);
};

function getNodesForPage(page, withAst) {
  var elements = getNodesOfPage(page);

  if (!elements) {
    return [];
  } // explicitly strip the ast, basically a fix for corrupted workpads
  // due to https://github.com/elastic/kibana-canvas/issues/260
  // TODO: remove this once it's been in the wild a bit


  if (!withAst) {
    return elements.map(function (el) {
      return (0, _lodash.omit)(el, ['ast']);
    });
  }

  return elements.map(appendAst);
} // todo unify or DRY up with `getElements`


function getNodes(state, pageId) {
  var withAst = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var id = pageId || getSelectedPage(state);

  if (!id) {
    return [];
  }

  var page = getPageById(state, id);

  if (!page) {
    return [];
  }

  return getNodesForPage(page, withAst);
}

function getElementById(state, id, pageId) {
  var element = getElements(state, pageId, true).find(function (el) {
    return el.id === id;
  });

  if (element) {
    return appendAst(element);
  }
}

function getNodeById(state, id, pageId) {
  // do we need to pass a truthy empty array instead of `true`?
  var group = getNodes(state, pageId, true).find(function (el) {
    return el.id === id;
  });

  if (group) {
    return appendAst(group);
  }
} // FIX: Fix the "any" typings below. Need to figure out how to properly type any "resolvedArg"


function getResolvedArgs(state, elementId, path) {
  if (!elementId) {
    return;
  }

  var args = (0, _lodash.get)(state, ['transient', 'resolvedArgs', elementId]);

  if (path) {
    return (0, _lodash.get)(args, path);
  }

  return args;
}

function getSelectedResolvedArgs(state, path) {
  var elementId = getSelectedElementId(state);

  if (elementId) {
    return getResolvedArgs(state, elementId, path);
  }
}

function getContextForIndex(state, index) {
  return getSelectedResolvedArgs(state, ['expressionContext', index - 1]);
}

function getRefreshInterval(state) {
  return (0, _lodash.get)(state, 'transient.refresh.interval', 0);
}

function getAutoplay(state) {
  return (0, _lodash.get)(state, 'transient.autoplay');
}

function getRenderedWorkpad(state) {
  var currentPages = getPages(state);
  var args = state.transient.resolvedArgs;
  var renderedPages = currentPages.map(function (page) {
    var elements = page.elements,
        rest = _objectWithoutProperties(page, ["elements"]);

    return _objectSpread({}, rest, {
      elements: elements.map(function (element) {
        var id = element.id,
            position = element.position;
        var arg = args[id];

        if (!arg) {
          return null;
        }

        var expressionRenderable = arg.expressionRenderable;
        return {
          id: id,
          position: position,
          expressionRenderable: expressionRenderable
        };
      })
    });
  });
  var workpad = getWorkpad(state); // eslint-disable-next-line no-unused-vars

  var pages = workpad.pages,
      rest = _objectWithoutProperties(workpad, ["pages"]);

  return _objectSpread({
    pages: renderedPages
  }, rest);
}

function getRenderedWorkpadExpressions(state) {
  var workpad = getRenderedWorkpad(state);
  var pages = workpad.pages;
  var expressions = [];
  pages.forEach(function (page) {
    return page.elements.forEach(function (element) {
      if (element && element.expressionRenderable) {
        var value = element.expressionRenderable.value;

        if (value) {
          var as = value.as;

          if (!expressions.includes(as)) {
            expressions.push(as);
          }
        }
      }
    });
  });
  return expressions;
}