const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

/**
* An HTTP endpoint that acts as a webhook for Slack member_joined_channel event
* @param {object} event
* @returns {object} result Your return value
*/
module.exports = async (event) => {
  let result = {slack: {}};

  console.log(`Running [Slack → Retrieve Channel, DM, or Group DM by id]...`);
  result.slack.channel = await lib.slack.conversations['@0.2.14'].info({
    id: `${event.event.channel}`
  });

  console.log(`Running [Slack → Retrieve a User]...`);
  result.slack.user = await lib.slack.users['@0.4.0'].retrieve({
    user: `${event.event.user}`
  });
if(result.slack.channel.is_member){
    await lib.slack.users['@0.4.0'].messages.create({
      user: `@${result.slack.user.name}`,
      
        "text": `Hi ${result.slack.user.name}! I'm your friendly friend maker app. Every friday, I will match you with a few people with common interests in your workspace for a water-cooler chat! All you need to do is to answer a few yes or no questions to sign up. Would you like that?`,
        "attachments": [
          {
            "text": "",
            "fallback": "You are unable to choose a game",
            "callback_id": "wopr_game",
            "color": "#3AA3E3",
            "attachment_type": "default",
            "actions": [
              {
                "name": "game",
                "text": "Yes! Sign me up.",
                "type": "button",
                "value": "chess",
                "style":"primary",
              },
              {
                "name": "game",
                "text": "No thanks.",
                "type": "button",
                "style": "danger",
                "value": "maze"
              },
            ]
          }
        ]
      ,
      as_user: true
    });
  }
  return result;
};