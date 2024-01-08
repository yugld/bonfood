const { cosmiconfig } = require('./libs/cosmiconfig');

const defaultConfig = {
    pattern: ':type/:name',
    params: {
      type: ['fix', 'hotfix', 'style', 'chore', 'feat', 'feature', 'docs', 'misc', 'improve', 'introduce', 'implement'],
      name: ['[a-z0-9-]+'],
    },
    prohibited: ['ci', 'wip', 'main', 'dev', 'develop', 'production', 'test', 'build', 'master', 'release'],
};

const getConfig = async (moduleName) => {
  const explorer = await cosmiconfig(moduleName).search();

  return {
    ...defaultConfig,
    ...explorer?.config,
  };
};

module.exports = {
  getConfig
}
