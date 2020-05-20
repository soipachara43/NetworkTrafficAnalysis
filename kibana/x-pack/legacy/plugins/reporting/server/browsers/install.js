"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.installBrowser = installBrowser;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _util = require("util");

var _extract = require("./extract");

var _checksum = require("./download/checksum");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
// @ts-ignore
const chmod = (0, _util.promisify)(_fs.default.chmod);

/**
 * "install" a browser by type into installs path by extracting the downloaded
 * archive. If there is an error extracting the archive an `ExtractError` is thrown
 */
async function installBrowser(logger, browser, installsPath) {
  const pkg = browser.paths.packages.find(p => p.platforms.includes(process.platform));

  if (!pkg) {
    throw new Error(`Unsupported platform: ${JSON.stringify(browser, null, 2)}`);
  }

  const binaryPath = _path.default.join(installsPath, pkg.binaryRelativePath);

  const binaryChecksum = await (0, _checksum.md5)(binaryPath).catch(() => '');

  if (binaryChecksum !== pkg.binaryChecksum) {
    const archive = _path.default.join(browser.paths.archivesPath, pkg.archiveFilename);

    logger.debug(`Extracting [${archive}] to [${binaryPath}]`);
    await (0, _extract.extract)(archive, installsPath);
    await chmod(binaryPath, '755');
  }

  logger.debug(`Browser installed at ${binaryPath}`);
  return {
    binaryPath
  };
}