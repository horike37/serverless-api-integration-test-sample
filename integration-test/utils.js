'use strict';

const BbPromise = require('bluebird');
const AWS = require('aws-sdk');
const execSync = require('child_process').execSync;

module.exports = {
  deployService() {
    execSync('sls deploy --stage integrationtest', { stdio: 'inherit' });
  },

  removeService() {
    execSync('sls remove --stage integrationtest', { stdio: 'inherit' });
  },

  createAndRemoveInBucket(bucketName) {
    const S3 = new AWS.S3({ region: 'us-east-1' });
    BbPromise.promisifyAll(S3, { suffix: 'Promised' });

    const params = {
      Bucket: 'shimokitaoss-integrationtest',
      Key: 'object',
      Body: 'hello world',
    };

    return S3.putObjectPromised(params)
      .then(() => {
        delete params.Body;
        return S3.deleteObjectPromised(params);
      });
  },

  getFunctionLogs(functionName) {
    const logs = execSync(`sls logs --function ${functionName} --stage integrationtest --noGreeting true`);
    const logsString = new Buffer(logs, 'base64').toString();
    process.stdout.write(logsString);
    return logsString;
  },
}
