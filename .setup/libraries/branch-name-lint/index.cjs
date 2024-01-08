#!/usr/bin/env node

const { LintError } = require('./src/errors.cjs');
const { getConfig } = require('./src/get-config.cjs');
const { printHint, white, green } = require('./src/print-hint.cjs');
const { printError } = require('./src/print-error.cjs');
const { getBranchName } = require('./src/get-branch-name.cjs');
const { lintBranchName } = require('./src/lint-branch-name.cjs');

const RC_FILE_NAME = 'branchnamelint';

const main = async () => {
  const [config, branchName] = await Promise.all([
    getConfig(RC_FILE_NAME),
    getBranchName(),
  ]);

  try {
    lintBranchName(branchName, config);
  } catch (error) {
    if (!(error instanceof LintError)) throw error;

    console.log("\n")
    printError(error.message);
    console.log("\n")

    printHint(error, config);
    console.log(`${white('Branch name was')}: ${green(branchName)}`)
    console.log("\n")
    process.exit(1);
  }
};

main().catch((error) => {
  printError('[LintBranchName] Unhandled error occurred');
  throw error;
});

