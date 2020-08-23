const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

/**
* An HTTP endpoint that acts as a webhook for HTTP(S) request event
* @returns {object} result Your return value
*/
module.exports = async () => {
  let result = {};

  
  // **THIS IS A STAGED FILE**
  // It was created as part of your onboarding experience.
  // It can be closed and the project you're working on
  //   can be returned to safely - or you can play with it!
  
  result.message = `Welcome to Autocode! 😊`;
  

  return result;
};