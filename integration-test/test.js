'use strict';

const expect = require('chai').expect;
const Utils = require('./utils');
const BbPromise = require('bluebird');
const AWS = require('aws-sdk');
const fetch = require('node-fetch');
const _ = require('lodash');

const CF = new AWS.CloudFormation({ region: 'us-east-1' });
BbPromise.promisifyAll(CF, { suffix: 'Promised' });

describe('API Integration test', () => {
  let stackName;
  let endpoint;

  beforeAll(() => {
    Utils.deployService();
    stackName = 'panpanpan-integrationTest'
  });

  it('should expose the endpoint(s) in the CloudFormation Outputs', () =>
    CF.describeStacksPromised({ StackName: stackName })
      .then((result) => _.find(result.Stacks[0].Outputs,
        { OutputKey: 'ServiceEndpoint' }).OutputValue)
      .then((endpointOutput) => {
        endpoint = endpointOutput.match(/https:\/\/.+\.execute-api\..+\.amazonaws\.com.+/)[0];
        endpoint = `${endpoint}`;
      })
  );

  it('should return correct values from all apis', () => {
     const testEndpoint = `${endpoint}/hello`;

     return fetch(testEndpoint, { method: 'GET' })
       .then(response => response.json())
       .then((json) => expect(json.message).to.equal('Go Serverless v1.0! Your function executed successfully!'));
  });

  afterAll(() => {
    Utils.removeService();
  });
});