"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureBrowserDownloaded = ensureBrowserDownloaded;
exports.ensureAllBrowsersDownloaded = ensureAllBrowsersDownloaded;

var _path = require("path");

var _fs = require("fs");

var _index = require("../index");

var _checksum = require("./checksum");

var _util = require("./util");

var _download = require("./download");

var _clean = require("./clean");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Check for the downloaded archive of each requested browser type and
 * download them if they are missing or their checksum is invalid
 * @param  {String} browserType
 * @return {Promise<undefined>}
 */
async function ensureBrowserDownloaded(browserType) {
  await ensureDownloaded([_index.chromium]);
}
/**
 * Like ensureBrowserDownloaded(), except it applies to all browsers
 * @return {Promise<undefined>}
 */


async function ensureAllBrowsersDownloaded() {
  await ensureDownloaded([_index.chromium]);
}
/**
 * Clears the unexpected files in the browsers archivesPath
 * and ensures that all packages/archives are downloaded and
 * that their checksums match the declared value
 * @param  {BrowserSpec} browsers
 * @return {Promise<undefined>}
 */


async function ensureDownloaded(browsers) {
  await (0, _util.asyncMap)(browsers, async browser => {
    const {
      archivesPath
    } = browser.paths;
    await (0, _clean.clean)(archivesPath, browser.paths.packages.map(p => (0, _path.resolve)(archivesPath, p.archiveFilename)));
    const invalidChecksums = [];
    await (0, _util.asyncMap)(browser.paths.packages, async ({
      archiveFilename,
      archiveChecksum
    }) => {
      const url = `${browser.paths.baseUrl}${archiveFilename}`;
      const path = (0, _path.resolve)(archivesPath, archiveFilename);

      if ((0, _fs.existsSync)(path) && (await (0, _checksum.md5)(path)) === archiveChecksum) {
        return;
      }

      const downloadedChecksum = await (0, _download.download)(url, path);

      if (downloadedChecksum !== archiveChecksum) {
        invalidChecksums.push(`${url} => ${path}`);
      }
    });

    if (invalidChecksums.length) {
      throw new Error(`Error downloading browsers, checksums incorrect for:\n    - ${invalidChecksums.join('\n    - ')}`);
    }
  });
}