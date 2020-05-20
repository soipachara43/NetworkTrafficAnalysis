"use strict";

var _lodash = _interopRequireDefault(require("lodash"));

var _path = require("path");

var _utils = require("../core/server/utils");

var _command = _interopRequireDefault(require("../cli/command"));

var _path2 = require("../core/server/path");

var _keystore = require("../legacy/server/keystore");

var _create = require("./create");

var _list = require("./list");

var _add = require("./add");

var _remove = require("./remove");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
const path = (0, _path.join)((0, _path2.getDataPath)(), 'kibana.keystore');
const keystore = new _keystore.Keystore(path);
const argv = process.env.kbnWorkerArgv ? JSON.parse(process.env.kbnWorkerArgv) : process.argv.slice();
const program = new _command.default('bin/kibana-keystore');
program.version(_utils.pkg.version).description('A tool for managing settings stored in the Kibana keystore');
(0, _create.createCli)(program, keystore);
(0, _list.listCli)(program, keystore);
(0, _add.addCli)(program, keystore);
(0, _remove.removeCli)(program, keystore);
program.command('help <command>').description('get the help for a specific command').action(function (cmdName) {
  const cmd = _lodash.default.find(program.commands, {
    _name: cmdName
  });

  if (!cmd) return program.error(`unknown command ${cmdName}`);
  cmd.help();
});
program.command('*', null, {
  noHelp: true
}).action(function (cmd) {
  program.error(`unknown command ${cmd}`);
}); // check for no command name

const subCommand = argv[2] && !String(argv[2][0]).match(/^-|^\.|\//);

if (!subCommand) {
  program.defaultHelp();
}

program.parse(process.argv);