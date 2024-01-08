const errors = require('./errors.cjs');

const gray = (message) => `\x1b[1;32m${message}\x1b[0m`;
const white = (message) => `\x1b[37m${message}\x1b[0m`;
const green = (message) => `\x1b[92m${message}\x1b[0m`;

const printHint = (error, config) => {
  const { pattern, params, prohibited } = config;
  const paramKeys = Object.keys(params);

  switch (true) {
    case error === errors.branchProtectedError: {
      console.log(white('Prohibited branch names:'));
      console.log(green(`  ${prohibited.join(', ')}`));
      break;
    }
    case error === errors.branchNamePatternError: {
      console.log(gray('Branch name'));
      console.log(white('  pattern:'), green(`${pattern}`));
      if (paramKeys.length) {
        console.log(gray('Name params'));
        paramKeys.forEach((key) => {
          console.log(white(`  ${key}:`), green(`${params[key]?.join(', ')}`));
        });
      }
      break;
    }
  }
  console.log('\n');
};

module.exports = {
  printHint,
  white,
  gray,
  green
}
