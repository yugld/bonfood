const { match } = require('./libs/path-to-regex');

const {
  branchNamePatternError,
  branchProtectedError,
} = require('./errors.cjs');

const lintBranchName = (branchName, config) => {
  let { pattern } = config;
  const { params, prohibited } = config;

  if (prohibited.includes(branchName)) throw branchProtectedError;
  if (!pattern) return true;

  if (params) {
    Object
      .keys(params)
      .forEach((key) => {
        let values = params[key];

        if (!values) return;
        if (typeof values === 'string') values = [values];

        pattern = pattern.replace(`:${key}`, `:${key}(${values.join('|')})`);
      });
  }

  const branch = match(pattern, { decode: decodeURIComponent })(branchName);

  if (!branch) throw branchNamePatternError;

  return true;
};

module.exports = { lintBranchName }
