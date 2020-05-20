"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.safeChildProcess = safeChildProcess;

var Rx = _interopRequireWildcard(require("rxjs"));

var _operators = require("rxjs/operators");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// Our process can get sent various signals, and when these occur we wish to
// kill the subprocess and then kill our process as long as the observer isn't cancelled
function safeChildProcess(logger, childProcess) {
  const ownTerminateSignal$ = Rx.merge(Rx.fromEvent(process, 'SIGTERM').pipe((0, _operators.mapTo)('SIGTERM')), Rx.fromEvent(process, 'SIGINT').pipe((0, _operators.mapTo)('SIGINT')), Rx.fromEvent(process, 'SIGBREAK').pipe((0, _operators.mapTo)('SIGBREAK'))).pipe((0, _operators.take)(1), (0, _operators.share)());
  const ownTerminateMapToKill$ = ownTerminateSignal$.pipe((0, _operators.tap)(signal => {
    logger.debug(`Kibana process received terminate signal: ${signal}`);
  }), (0, _operators.mapTo)('SIGKILL'));
  const kibanaForceExit$ = Rx.fromEvent(process, 'exit').pipe((0, _operators.take)(1), (0, _operators.tap)(signal => {
    logger.debug(`Kibana process forcefully exited with signal: ${signal}`);
  }), (0, _operators.mapTo)('SIGKILL'));
  const signalForChildProcess$ = Rx.merge(ownTerminateMapToKill$, kibanaForceExit$);
  const logAndKillChildProcess = (0, _operators.tap)(signal => {
    logger.debug(`Child process terminate signal was: ${signal}. Closing the browser...`);
    return childProcess.kill(signal);
  }); // send termination signals

  const terminate$ = Rx.merge(signalForChildProcess$.pipe(logAndKillChildProcess), ownTerminateSignal$.pipe((0, _operators.delay)(1), (0, _operators.tap)(signal => {
    logger.debug(`Kibana process terminate signal was: ${signal}. Closing the browser...`);
    return process.kill(process.pid, signal);
  })));
  return {
    terminate$
  };
}