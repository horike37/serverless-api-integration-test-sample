'use strict';

const expect = require('chai').expect;
const Utils = require('./utils');
const BbPromise = require('bluebird');
const AWS = require('aws-sdk');
const fetch = require('node-fetch');
const _ = require('lodash');

const CF = new AWS.CloudFormation({ region: 'us-east-1' });
BbPromise.promisifyAll(CF, { suffix: 'Promised' });

describe('S3 Integration test', () => {
  let stackName;
  let endpoint;

  beforeAll(() => {
    Utils.deployService();
    stackName = 'sls-workshop-integrationTest'
  });

  it('should trigger function when object created in bucket', () => Utils
    .createAndRemoveInBucket('shimokitaoss')
    .delay(60000)
    .then(() => {
      const logs = Utils.getFunctionLogs('s3event');
      expect(/aws:s3/g.test(logs)).to.equal(true);
      expect(/ObjectCreated:Put/g.test(logs)).to.equal(true);
    })
  );

  afterAll(() => {
    Utils.removeService();
  });
});
