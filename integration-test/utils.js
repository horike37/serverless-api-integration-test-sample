'use strict';

const execSync = require('child_process').execSync;

module.exports = {
  deployService() {
    execSync('sls deploy --stage integrationTest', { stdio: 'inherit' });
  },

  removeService() {
    execSync('sls remove --stage integrationTest', { stdio: 'inherit' });
  },
}