'use strict';
const expect = require('chai').expect;
const Hello = require('./hello.class.js');

describe('Hello', () => {
  let hello;

  beforeEach(() => {
    hello = new Hello();
  });

  describe('sayHello', () => {
    it('should return the value',
      () => expect(hello.sayHello())
      .to.be.equal('Go Serverless v1.0! Your function executed successfully!'));
  });
});
