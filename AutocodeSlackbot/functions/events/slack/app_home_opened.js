const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

/**
* An HTTP endpoint that acts as a webhook for Slack app_home_opened event
* @param {object} event
* @returns {object} result Your return value
*/
module.exports = async (event) => {
  
  let result = {};
  
  console.log(await lib.slack.users['@0.4.0'].retrieve({
    user: `${event.event.user}`
  })
  );
  
  await lib.slack.users['@0.4.0'].messages.create({
    user: `@zhangshirleyemail`,
    text: `plzwork`,
    as_user: true
  });
  // await lib.slack.messages['@0.6.1'].create({
    // id: `${event.event.user}`,
    // text: `yoyoyoyoyooo`,
    // as_user: true
  // });
  
  return result;
};