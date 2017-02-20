'use strict';
const Hello = require('./lib/hello.class.js');

module.exports.hello = (event, context, callback) => {
  const hello = new Hello();
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: hello.sayHello(),
      input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
