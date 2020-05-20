"use strict";

var _eui = require("@elastic/eui");

var _react = require("@storybook/react");

var _cytoscape = _interopRequireDefault(require("cytoscape"));

var _react2 = _interopRequireDefault(require("react"));

var _Cytoscape = require("./Cytoscape");

var _cytoscapeLayoutTestResponse = _interopRequireDefault(require("./cytoscape-layout-test-response.json"));

var _icons = require("./icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var elementsFromResponses = _cytoscapeLayoutTestResponse.default.elements;
(0, _react.storiesOf)('app/ServiceMap/Cytoscape', module).add('example', function () {
  var elements = [{
    data: {
      id: 'opbeans-python',
      'service.name': 'opbeans-python',
      'agent.name': 'python'
    }
  }, {
    data: {
      id: 'opbeans-node',
      'service.name': 'opbeans-node',
      'agent.name': 'nodejs'
    }
  }, {
    data: {
      id: 'opbeans-ruby',
      'service.name': 'opbeans-ruby',
      'agent.name': 'ruby'
    }
  }, {
    data: {
      source: 'opbeans-python',
      target: 'opbeans-node'
    }
  }, {
    data: {
      bidirectional: true,
      source: 'opbeans-python',
      target: 'opbeans-ruby'
    }
  }];
  var height = 300;
  var width = 1340;
  var serviceName = 'opbeans-python';
  return _react2.default.createElement(_Cytoscape.Cytoscape, {
    elements: elements,
    height: height,
    width: width,
    serviceName: serviceName
  });
}, {
  info: {
    propTables: false,
    source: false
  }
});
(0, _react.storiesOf)('app/ServiceMap/Cytoscape', module).add('node icons', function () {
  var cy = (0, _cytoscape.default)();
  var elements = [{
    data: {
      id: 'default'
    }
  }, {
    data: {
      id: 'cache',
      'span.type': 'cache'
    }
  }, {
    data: {
      id: 'database',
      'span.type': 'db'
    }
  }, {
    data: {
      id: 'elasticsearch',
      'span.type': 'db',
      'span.subtype': 'elasticsearch'
    }
  }, {
    data: {
      id: 'external',
      'span.type': 'external'
    }
  }, {
    data: {
      id: 'ext',
      'span.type': 'ext'
    }
  }, {
    data: {
      id: 'messaging',
      'span.type': 'messaging'
    }
  }, {
    data: {
      id: 'dotnet',
      'service.name': 'dotnet service',
      'agent.name': 'dotnet'
    }
  }, {
    data: {
      id: 'go',
      'service.name': 'go service',
      'agent.name': 'go'
    }
  }, {
    data: {
      id: 'java',
      'service.name': 'java service',
      'agent.name': 'java'
    }
  }, {
    data: {
      id: 'RUM (js-base)',
      'service.name': 'RUM service',
      'agent.name': 'js-base'
    }
  }, {
    data: {
      id: 'RUM (rum-js)',
      'service.name': 'RUM service',
      'agent.name': 'rum-js'
    }
  }, {
    data: {
      id: 'nodejs',
      'service.name': 'nodejs service',
      'agent.name': 'nodejs'
    }
  }, {
    data: {
      id: 'php',
      'service.name': 'php service',
      'agent.name': 'php'
    }
  }, {
    data: {
      id: 'python',
      'service.name': 'python service',
      'agent.name': 'python'
    }
  }, {
    data: {
      id: 'ruby',
      'service.name': 'ruby service',
      'agent.name': 'ruby'
    }
  }];
  cy.add(elements);
  return _react2.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "l",
    wrap: true
  }, cy.nodes().map(function (node) {
    return _react2.default.createElement(_eui.EuiFlexItem, {
      key: node.data('id')
    }, _react2.default.createElement(_eui.EuiCard, {
      description: _react2.default.createElement("pre", null, "agent.name: ", node.data('agent.name') || 'undefined', ", span.type: ", node.data('span.type') || 'undefined', ", span.subtype: ", node.data('span.subtype') || 'undefined'),
      icon: _react2.default.createElement("img", {
        alt: node.data('label'),
        src: (0, _icons.iconForNode)(node),
        height: 80,
        width: 80
      }),
      title: node.data('id')
    }));
  }));
}, {
  info: {
    propTables: false,
    source: false
  }
}).add('layout', function () {
  var height = 640;
  var width = 1340;
  var serviceName = undefined; // global service map

  return _react2.default.createElement(_Cytoscape.Cytoscape, {
    elements: elementsFromResponses,
    height: height,
    width: width,
    serviceName: serviceName
  });
}, {
  info: {
    source: false
  }
}).addParameters({
  options: {
    showPanel: false
  }
});