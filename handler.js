'use strict';
const Hello = require('./lib/hello.class.js');

module.exports.hello = (event, context, callback) => {
  const hello = new Hello();
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: hello.say(),
      input: event,
    }),
  };

  callback(null, response);
};

module.exports.s3event = (event, context, callback) => {
  process.stdout.write(event.Records[0].eventSource);
  process.stdout.write(event.Records[0].eventName);
  callback(null, { message: 'Hello from S3!', event });
};
