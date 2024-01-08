class LintError extends Error {
  constructor(message) {
    super(`[BranchNameLint] ${message}`);
  }
}
const branchProtectedError = new LintError(' Protected branch ');
const branchNamePatternError = new LintError(' Branch name doesnt match the pattern ');

module.exports = {
    LintError,
    branchProtectedError,
    branchNamePatternError
}
