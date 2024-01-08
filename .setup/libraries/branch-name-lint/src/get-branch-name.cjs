const { exec } = require('child_process');

const getBranchName = (branchNameArg = process.argv[2]) => {
    return new Promise((resolve, reject) => {
      if (branchNameArg && branchNameArg.trim() !== '') {
        resolve(branchNameArg.trim());
      } else {
        exec('git rev-parse --abbrev-ref HEAD', (err, stdout) => {
          if (err) {
            reject(err);
          } else {
            resolve(stdout.trim());
          }
        });
      }
    });
  };

module.exports = { getBranchName }
